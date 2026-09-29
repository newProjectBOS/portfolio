import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useAppReady } from "../../loading/loadingStore";

const TEXTURES = {
  day: "/textures/earth/earth_atmos_2048.jpg",
  night: "/textures/earth/earth_lights_2048.png",
  clouds: "/textures/earth/earth_clouds_1024.png",
  specular: "/textures/earth/earth_specular_2048.jpg",
};

const SUN_DIR = new THREE.Vector3(-1, 0.12, 0).normalize();
const AXIAL_TILT = THREE.MathUtils.degToRad(23.4);
const ROTATION_SPEED = 0.06;
const CLOUD_DRIFT = 0.0015;
const INTRO_DURATION = 2.6;
const STARS_Z = -40;

const earthVertex = `
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPosW = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const earthFragment = `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uClouds;
  uniform sampler2D uSpecular;
  uniform vec3 uSunDir;
  uniform float uCloudOffset;

  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(cameraPosition - vPosW);
    float ndl = dot(n, uSunDir);
    float dayMix = smoothstep(-0.18, 0.22, ndl);
    float diffuse = pow(max(ndl, 0.0), 0.55) * smoothstep(-0.05, 0.35, ndl);

    vec3 day = texture2D(uDay, vUv).rgb;
    float luma = dot(day, vec3(0.299, 0.587, 0.114));
    day = mix(vec3(luma), day, 1.25);

    float cloud = texture2D(uClouds, vUv + vec2(uCloudOffset, 0.0)).a;
    float ocean = texture2D(uSpecular, vUv).r;

    vec3 lit = day * (diffuse * 1.4 + 0.08);
    lit = mix(lit, vec3(diffuse * 1.2), cloud * 0.7);

    vec3 h = normalize(uSunDir + v);
    float spec = pow(max(dot(n, h), 0.0), 140.0) * ocean * (1.0 - cloud);
    lit += vec3(0.65, 0.8, 1.0) * spec * 0.08;
    float lights = dot(texture2D(uNight, vUv).rgb, vec3(0.333));
    lights = pow(smoothstep(0.03, 0.55, lights), 0.65);
    vec3 city = vec3(1.0, 0.72, 0.38) * lights * 3.6;
    city *= 1.0 - cloud * 0.6;
    vec3 moonlit = day * vec3(0.35, 0.45, 0.8) * 0.18 + vec3(cloud) * vec3(0.3, 0.38, 0.6) * 0.12;

    vec3 color = lit * dayMix + (city + moonlit) * (1.0 - dayMix);

    float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.0);
    float rimLight = smoothstep(-0.35, 0.55, ndl);
    color += vec3(0.28, 0.55, 1.0) * fresnel * rimLight * 1.4;

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const atmosphereVertex = `
  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vPosW = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const atmosphereFragment = `
  uniform vec3 uSunDir;
  uniform float uEdge;

  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(cameraPosition - vPosW);
    float f = clamp(-dot(n, v) / uEdge, 0.0, 1.0);
    float glow = pow(f, 2.6);
    float sun = smoothstep(-0.45, 0.6, dot(n, uSunDir));
    vec3 color = mix(vec3(0.05, 0.25, 1.0), vec3(0.3, 0.6, 1.0), sun);
    gl_FragColor = vec4(color * glow * (0.2 + sun * 1.1), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const ATMOSPHERE_SCALE = 1.05;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Earth = () => {
  const ready = useAppReady();
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const intro = useRef(0);

  const [day, night, clouds, specular] = useTexture(
    [TEXTURES.day, TEXTURES.night, TEXTURES.clouds, TEXTURES.specular],
    (textures) => {
      textures.forEach((t, i) => {
        if (i < 2) t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        t.wrapS = THREE.RepeatWrapping;
      });
    }
  );

  const earthUniforms = useMemo(
    () => ({
      uDay: { value: day },
      uNight: { value: night },
      uClouds: { value: clouds },
      uSpecular: { value: specular },
      uSunDir: { value: SUN_DIR },
      uCloudOffset: { value: 0 },
    }),
    [day, night, clouds, specular]
  );

  const atmosphereUniforms = useMemo(
    () => ({
      uSunDir: { value: SUN_DIR },
      uEdge: { value: Math.sqrt(1 - 1 / (ATMOSPHERE_SCALE * ATMOSPHERE_SCALE)) },
    }),
    []
  );

  const radius = Math.min(viewport.width * 0.4, viewport.height * 0.36);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    if (ready && intro.current < 1) {
      intro.current = REDUCED_MOTION ? 1 : Math.min(1, intro.current + dt / INTRO_DURATION);
    }
    const t = easeOutCubic(intro.current);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(radius * THREE.MathUtils.lerp(0.85, 1, t));
      groupRef.current.position.y = -viewport.height * 0.12 * (1 - t);
    }

    if (spinRef.current && materialRef.current) {
      spinRef.current.rotation.y += dt * ROTATION_SPEED;
      const offset = materialRef.current.uniforms.uCloudOffset;
      offset.value = (offset.value + dt * CLOUD_DRIFT) % 1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -viewport.height * 0.12, 0]} scale={radius * 0.85}>
      <group rotation={[0.2, 0, AXIAL_TILT]}>
        <group ref={spinRef} rotation={[0, -1.2, 0]}>
          <mesh>
            <sphereGeometry args={[1, 128, 128]} />
            <shaderMaterial
              ref={materialRef}
              vertexShader={earthVertex}
              fragmentShader={earthFragment}
              uniforms={earthUniforms}
            />
          </mesh>
        </group>
      </group>
      <mesh scale={ATMOSPHERE_SCALE}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmosphereUniforms}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const STAR_COLORS = [
  [0.82, 0.87, 1.0],
  [1.0, 1.0, 1.0],
  [1.0, 0.88, 0.72],
  [0.7, 0.78, 1.0],
];

const STAR_DATA = (() => {
  const count = 6000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 2] = STARS_Z;

    const r = Math.random();
    sizes[i] = r < 0.75 ? 2.5 + Math.random() * 1.5 : r < 0.96 ? 4 + Math.random() * 2 : 7 + Math.random() * 4;
    phases[i] = Math.random();

    const roll = Math.random();
    const c = STAR_COLORS[roll < 0.45 ? 0 : roll < 0.8 ? 1 : roll < 0.92 ? 2 : 3];
    colors.set(c, i * 3);
  }
  return { positions, colors, sizes, phases };
})();

const starVertex = `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = aColor;
    float speed = 0.6 + aPhase * 2.2;
    vTwinkle = 0.6 + 0.4 * sin(uTime * speed + aPhase * 6.2831);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio;
  }
`;

const starFragment = `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.28, 0.0, d);
    float glow = smoothstep(0.5, 0.0, d) * 0.35;
    float a = (core + glow) * vTwinkle;
    gl_FragColor = vec4(vColor * a * 1.3, a);
  }
`;

const Stars = () => {
  const { gl } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: gl.getPixelRatio() } }),
    [gl]
  );

  useFrame(({ clock }) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STAR_DATA.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[STAR_DATA.colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[STAR_DATA.sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[STAR_DATA.phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starVertex}
        fragmentShader={starFragment}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

const METEOR_POOL = 4;

const meteorVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const meteorFragment = `
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    float tail = pow(vUv.x, 2.5);
    float across = 1.0 - abs(vUv.y - 0.5) * 2.0;
    float head = smoothstep(0.92, 1.0, vUv.x) * 1.5;
    float a = (tail + head) * pow(across, 1.5) * uOpacity;
    gl_FragColor = vec4(vec3(0.85, 0.92, 1.0) * a, a);
  }
`;

type Meteor = {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  duration: number;
  length: number;
};

const createMeteors = (): Meteor[] =>
  Array.from({ length: METEOR_POOL }, () => ({
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    age: 0,
    duration: 1,
    length: 1,
  }));

const ShootingStars = () => {
  const { camera, viewport } = useThree();
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const meteors = useRef<Meteor[]>(createMeteors());
  const nextSpawn = useRef(1.2);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, STARS_Z]);

    nextSpawn.current -= dt;
    if (nextSpawn.current <= 0) {
      nextSpawn.current = 1.2 + Math.random() * 2.8;
      const m = meteors.current.find((item) => !item.active);
      if (m) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        const angle = THREE.MathUtils.degToRad(20 + Math.random() * 25);
        const speed = width * (0.45 + Math.random() * 0.35);
        m.active = true;
        m.age = 0;
        m.duration = 0.9 + Math.random() * 0.8;
        m.length = width * (0.06 + Math.random() * 0.08);
        m.vx = Math.cos(angle) * speed * dir;
        m.vy = -Math.sin(angle) * speed;
        m.x = (Math.random() * 0.8 - 0.4) * width - (m.vx * m.duration) / 2;
        m.y = (0.1 + Math.random() * 0.4) * height;
      }
    }

    meteors.current.forEach((m, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      if (!m.active) {
        mesh.visible = false;
        return;
      }

      m.age += dt;
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      const p = m.age / m.duration;
      if (p >= 1) {
        m.active = false;
        mesh.visible = false;
        return;
      }

      const rot = Math.atan2(m.vy, m.vx);
      const len = m.length * Math.min(1, p * 4);
      mesh.visible = true;
      mesh.rotation.z = rot;
      mesh.scale.set(len, height * 0.004, 1);
      mesh.position.set(m.x - (Math.cos(rot) * len) / 2, m.y - (Math.sin(rot) * len) / 2, STARS_Z);
      (mesh.material as THREE.ShaderMaterial).uniforms.uOpacity.value = Math.sin(Math.PI * p) ** 0.6;
    });
  });

  return (
    <>
      {Array.from({ length: METEOR_POOL }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          visible={false}
        >
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            vertexShader={meteorVertex}
            fragmentShader={meteorFragment}
            uniforms={{ uOpacity: { value: 0 } }}
            blending={THREE.AdditiveBlending}
            transparent
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
};

export default function EarthBackground() {
  return (
    <div className="absolute inset-0 bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 8, near: 1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <Stars />
        <ShootingStars />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default () => {
    const PARTICLE_COUNT = 60;
    const CONNECT_DISTANCE = 2.2;
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 14;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

            velocities[i * 3] = (Math.random() - 0.5) * 0.004;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
        }

        return { positions, velocities };
    }, []);

    const maxLines = PARTICLE_COUNT * PARTICLE_COUNT;
    const linePositions = useMemo(
        () => new Float32Array(maxLines * 2 * 3),
        [maxLines]
    );

    useFrame(() => {
        const posAttr = pointsRef.current?.geometry.attributes.position;
        if (!posAttr) return;

        const pos = posAttr.array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const ix = i * 3;
            pos[ix] += velocities[ix];
            pos[ix + 1] += velocities[ix + 1];
            pos[ix + 2] += velocities[ix + 2];

            if (Math.abs(pos[ix]) > 7) velocities[ix] *= -1;
            if (Math.abs(pos[ix + 1]) > 4) velocities[ix + 1] *= -1;
            if (Math.abs(pos[ix + 2]) > 2) velocities[ix + 2] *= -1;
        }
        posAttr.needsUpdate = true;

        let lineCount = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const ix = i * 3;
                const jx = j * 3;
                const dx = pos[ix] - pos[jx];
                const dy = pos[ix + 1] - pos[jx + 1];
                const dz = pos[ix + 2] - pos[jx + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < CONNECT_DISTANCE) {
                    const base = lineCount * 6;
                    linePositions[base] = pos[ix];
                    linePositions[base + 1] = pos[ix + 1];
                    linePositions[base + 2] = pos[ix + 2];
                    linePositions[base + 3] = pos[jx];
                    linePositions[base + 4] = pos[jx + 1];
                    linePositions[base + 5] = pos[jx + 2];
                    lineCount++;
                }
            }
        }

        const lineAttr = linesRef.current?.geometry.attributes.position;
        if (lineAttr) {
            lineAttr.needsUpdate = true;
            linesRef.current!.geometry.setDrawRange(0, lineCount * 2);
        }
    });

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={PARTICLE_COUNT}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#94a3b8"
                    size={0.06}
                    sizeAttenuation
                    transparent
                    opacity={0.6}
                />
            </points>

            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={maxLines * 2}
                        array={linePositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#cbd5e1" transparent opacity={0.25} />
            </lineSegments>
        </>
    );
};
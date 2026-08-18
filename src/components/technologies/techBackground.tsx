import { useEffect, useRef, useState } from "react";
import Particles from "../../effects/Particles";
import { Canvas } from "@react-three/fiber";

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "150px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

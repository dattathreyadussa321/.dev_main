"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { createThreeRenderer } from "./three-utils";

// ── Scene ─────────────────────────────────────────────────────────────────────

function HeroScene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  // Group hierarchy:
  //   scrollGroup  → scroll: scale + translateX + full Y spin
  //     mouseGroup → mouse parallax: X/Y tilt
  //       sculpture → idle auto-rotation
  const scrollGroupRef = React.useRef<THREE.Group>(null);
  const mouseGroupRef  = React.useRef<THREE.Group>(null);
  const sculptureRef   = React.useRef<THREE.Group>(null);

  // Raw mouse position updated via global listener so the canvas stays pointer-events:none
  const mouse   = React.useRef({ x: 0, y: 0 });
  const isTouch = React.useRef(false);

  // Lerp accumulators
  const lerpMX = React.useRef(0);
  const lerpMY = React.useRef(0);
  const lerpCX = React.useRef(0);
  const lerpCY = React.useRef(0);

  React.useEffect(() => {
    isTouch.current = window.matchMedia("(hover: none)").matches;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ camera, clock }) => {
    const s = scrollProgress.current; // 0 = top, 1 = hero scrolled off
    const m = mouse.current;

    // ── Mouse parallax (pointer devices only) ──────────────────────────────
    if (!isTouch.current) {
      lerpMX.current += (m.x *  0.4  - lerpMX.current) * 0.05;
      lerpMY.current += (m.y * -0.25 - lerpMY.current) * 0.05;
      lerpCX.current += (m.x *  0.15 - lerpCX.current) * 0.05;
      lerpCY.current += (m.y * -0.15 - lerpCY.current) * 0.05;
      camera.position.x = lerpCX.current;
      camera.position.y = lerpCY.current;
    }

    if (mouseGroupRef.current) {
      mouseGroupRef.current.rotation.y = lerpMX.current;
      mouseGroupRef.current.rotation.x = lerpMY.current;
    }

    // ── Scroll: scale 1→0.4, drift right, full Y spin ─────────────────────
    if (scrollGroupRef.current) {
      const sg = scrollGroupRef.current;
      sg.scale.setScalar(THREE.MathUtils.lerp(1, 0.4, s));
      sg.position.x   = THREE.MathUtils.lerp(0, 2.5, s);
      sg.rotation.y   = s * Math.PI * 2;
    }

    // ── Idle auto-rotation on the sculpture group ──────────────────────────
    if (sculptureRef.current) {
      sculptureRef.current.rotation.y = clock.elapsedTime * 0.18;
    }
  });

  return (
    <group ref={scrollGroupRef}>
      {/* Lights stay world-fixed — outside mouseGroup so they don't tilt with parallax */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight color="#6C63FF" position={[-3, 2, 3]} intensity={40} />

      <group ref={mouseGroupRef}>
        <group ref={sculptureRef}>
          {/* Solid icosahedron */}
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshStandardMaterial
              color="#4f46e5"
              emissive="#818cf8"
              emissiveIntensity={0.5}
              roughness={0.25}
              metalness={0.7}
            />
          </mesh>
          {/* Wireframe overlay — scale 1.015 avoids z-fighting */}
          <mesh scale={1.015}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ── Canvas ────────────────────────────────────────────────────────────────────

export default function HeroCanvas({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={createThreeRenderer}
      aria-hidden
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    >
      <HeroScene scrollProgress={scrollProgress} />
    </Canvas>
  );
}

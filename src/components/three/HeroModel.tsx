"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { createThreeRenderer } from "./three-utils";

class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}

function KnotModel() {
  const group = React.useRef<THREE.Group>(null);
  const knot = React.useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.6) * 0.18;
    }
    if (knot.current) {
      knot.current.rotation.x = t * 0.18;
      knot.current.rotation.y = t * 0.24;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.05, 0.34, 220, 36]} />
        <meshPhysicalMaterial
          color="#2e4a32"
          metalness={0.55}
          roughness={0.28}
          clearcoat={0.7}
          clearcoatRoughness={0.25}
          sheen={0.4}
          sheenColor="#a9c0a6"
        />
      </mesh>
      <mesh position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial color="#1C2E1E" transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

export default function HeroModel() {
  return (
    <ThreeErrorBoundary>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 5.4], fov: 40 }}
        gl={createThreeRenderer}
        aria-hidden
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} color="#fdfdf6" />
        <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#dbe7d8" />
        <pointLight position={[0, -3, 2]} intensity={6} color="#88a384" />
        <KnotModel />
      </Canvas>
    </ThreeErrorBoundary>
  );
}

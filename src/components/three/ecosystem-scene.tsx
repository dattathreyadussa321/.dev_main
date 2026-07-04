"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { createThreeRenderer } from "./three-utils";

const NODES = [
  { label: "SaaS",      color: "#818cf8", radius: 2.5, speed: 0.22, tilt:  0.20, phase: 0.0 },
  { label: "LMS",       color: "#34d399", radius: 2.9, speed: 0.18, tilt: -0.35, phase: 1.1 },
  { label: "CRM",       color: "#f472b6", radius: 2.6, speed: 0.26, tilt:  0.50, phase: 2.2 },
  { label: "Training",  color: "#fbbf24", radius: 3.2, speed: 0.15, tilt: -0.15, phase: 3.1 },
  { label: "Agri Rover",color: "#4ade80", radius: 3.5, speed: 0.12, tilt:  0.65, phase: 4.2 },
  { label: "Analytics", color: "#22d3ee", radius: 2.3, speed: 0.30, tilt: -0.55, phase: 5.0 },
  { label: "Cloud",     color: "#a78bfa", radius: 3.0, speed: 0.20, tilt:  0.05, phase: 5.9 },
] as const;

function nodePosition(node: (typeof NODES)[number], t: number, out: THREE.Vector3) {
  const a = node.phase + t * node.speed;
  out.set(
    Math.cos(a) * node.radius,
    Math.sin(a * 0.9) * node.radius * Math.sin(node.tilt) * 0.55,
    Math.sin(a) * node.radius * Math.cos(node.tilt) * 0.7,
  );
  return out;
}

function OrbitingNode({ node }: { node: (typeof NODES)[number] }) {
  const group = React.useRef<THREE.Group>(null);
  const v = React.useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.copy(nodePosition(node, clock.elapsedTime, v));
  });
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={2.4}>
        <sphereGeometry args={[0.13, 8, 8]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.12} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ConnectionLines() {
  const ref = React.useRef<THREE.LineSegments>(null);
  const positions = React.useMemo(() => new Float32Array(NODES.length * 2 * 3), []);
  const v = React.useMemo(() => new THREE.Vector3(), []);
  const geometry = React.useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame(({ clock }) => {
    NODES.forEach((node, i) => {
      nodePosition(node, clock.elapsedTime, v);
      positions.set([0, 0, 0, v.x, v.y, v.z], i * 6);
    });
    const attr = ref.current?.geometry.attributes.position;
    if (attr) attr.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.28} toneMapped={false} />
    </lineSegments>
  );
}

function Core() {
  const ref = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.25;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#6366f1"
          emissiveIntensity={0.7}
          wireframe
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = i * 2.399963; // golden angle
      const r = 3.4 + (i % 17) * 0.13;
      arr[i * 3]     = Math.cos(a) * r;
      arr[i * 3 + 1] = (((i * 7919) % 100) / 100 - 0.5) * 4.4;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count]);
  const ref = React.useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#818cf8" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Scene({ quality }: { quality: "high" | "low" }) {
  const group = React.useRef<THREE.Group>(null);
  const particleCount = quality === "high" ? 140 : 60;

  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-pointer.y * 0.15 - group.current.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#818cf8" />
      <pointLight position={[-4, -2, -4]} intensity={24} color="#2dd4bf" />
      <Core />
      <ConnectionLines />
      {NODES.map((n) => (
        <OrbitingNode key={n.label} node={n} />
      ))}
      <Particles count={particleCount} />
    </group>
  );
}

export default function EcosystemScene({ quality = "high" }: { quality?: "high" | "low" }) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.75] : [1, 1.2]}
      camera={{ position: [0, 0.6, 7.2], fov: 45 }}
      gl={createThreeRenderer}
      aria-hidden
      className="!pointer-events-auto"
    >
      <Scene quality={quality} />
    </Canvas>
  );
}

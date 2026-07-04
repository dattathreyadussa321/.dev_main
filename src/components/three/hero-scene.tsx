"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { isWebGLAvailable } from "./three-utils";

/**
 * Hero background scene ported from the "Patashala Website Redesign" prototype:
 * wireframe icosahedron pair, torus knot, octahedron and a particle field with
 * gentle mouse parallax. Renders nothing when WebGL is unavailable or the user
 * prefers reduced motion — the CSS glow orbs behind it remain.
 */
export function HeroScene() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced || !isWebGLAvailable()) return;

    let raf = 0;
    let alive = true;
    let cleanupScene: (() => void) | undefined;

    void import("three").then((THREE) => {
      if (!alive || !canvasRef.current) return;
      const parent = canvas.parentElement!;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 10;

      const mint = new THREE.Color("#53F3CF");
      const teal = new THREE.Color("#2CC5B2");
      const violet = new THREE.Color("#A78BFA");

      // Big wireframe icosahedron — hero object, right side
      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(3.1, 1),
        new THREE.MeshBasicMaterial({ color: teal, wireframe: true, transparent: true, opacity: 0.34 }),
      );
      ico.position.set(4.6, 0.4, -2);
      scene.add(ico);

      // Inner icosahedron
      const icoInner = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.5, 0),
        new THREE.MeshBasicMaterial({ color: mint, wireframe: true, transparent: true, opacity: 0.5 }),
      );
      icoInner.position.copy(ico.position);
      scene.add(icoInner);

      // Torus knot — small, floating left-bottom
      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.9, 0.26, 110, 16),
        new THREE.MeshBasicMaterial({ color: violet, wireframe: true, transparent: true, opacity: 0.22 }),
      );
      knot.position.set(-5.2, -2.6, -3);
      scene.add(knot);

      // Octahedron top-left
      const octa = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.8, 0),
        new THREE.MeshBasicMaterial({ color: mint, wireframe: true, transparent: true, opacity: 0.4 }),
      );
      octa.position.set(-3.4, 2.9, -4);
      scene.add(octa);

      // Particle field
      const N = 420;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 26;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 2] = -2 - Math.random() * 10;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const points = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({ color: teal, size: 0.035, transparent: true, opacity: 0.65 }),
      );
      scene.add(points);

      const mouse = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("mousemove", onMouse);

      const resize = () => {
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", resize);
      resize();

      const clock = new THREE.Clock();
      const tick = () => {
        if (!alive) return;
        const t = clock.getElapsedTime();
        ico.rotation.y = t * 0.16 + mouse.x * 0.45;
        ico.rotation.x = t * 0.08 + mouse.y * 0.3;
        icoInner.rotation.y = -t * 0.3 - mouse.x * 0.6;
        icoInner.rotation.z = t * 0.14;
        knot.rotation.y = t * 0.22 + mouse.x * 0.25;
        knot.rotation.x = mouse.y * 0.25;
        knot.position.y = -2.6 + Math.sin(t * 0.7) * 0.25;
        octa.rotation.y = t * 0.4;
        octa.position.y = 2.9 + Math.sin(t * 0.9 + 1) * 0.2;
        points.rotation.y = t * 0.012 + mouse.x * 0.03;
        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
        camera.position.y += (-mouse.y * 0.35 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, -2);
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      tick();

      cleanupScene = () => {
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", resize);
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
            obj.geometry.dispose();
            const mat = obj.material;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat.dispose();
          }
        });
        renderer.dispose();
      };
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      cleanupScene?.();
    };
  }, [prefersReduced]);

  // Always render the canvas so server and client markup match — reduced
  // motion and missing WebGL are handled inside the effect (canvas stays blank).
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );
}

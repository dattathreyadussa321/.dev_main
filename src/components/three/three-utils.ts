"use client";

import * as THREE from "three";

/** Returns true if WebGL 2 (or WebGL 1) is available in this browser. */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      (window as Window & typeof globalThis).WebGL2RenderingContext &&
        canvas.getContext("webgl2") ||
      (window as Window & typeof globalThis).WebGLRenderingContext &&
        canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

// R3F defines its own stub OffscreenCanvas (just `extends EventTarget`, no
// width/height) which is unrelated to lib.dom's OffscreenCanvas. Using
// EventTarget here lets both pass the function-parameter assignability check
// while matching R3F's DefaultGLProps exactly.
type GLFactoryProps = Omit<THREE.WebGLRendererParameters, "canvas"> & {
  canvas: HTMLCanvasElement | EventTarget;
};

/**
 * Async GL factory for R3F's Canvas `gl` prop.
 *
 * Pass directly as: <Canvas gl={createThreeRenderer} />
 *
 * R3F awaits this factory and checks for a `.render` method before using
 * the returned object. We try WebGPU first (Chrome 113+/Edge 113+) and
 * fall back to WebGL on failure.
 *
 * Note: WebGPURenderer.render() is async; R3F doesn't await it, but GPU
 * commands are submitted synchronously so frames still display correctly.
 */
export async function createThreeRenderer(
  props: GLFactoryProps,
): Promise<THREE.WebGLRenderer> {
  const canvas = props.canvas as HTMLCanvasElement;

  if (typeof navigator !== "undefined" && "gpu" in navigator) {
    try {
      const { WebGPURenderer } = await import("three/webgpu");
      const renderer = new WebGPURenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      await renderer.init();
      return renderer as unknown as THREE.WebGLRenderer;
    } catch {
      // WebGPU unavailable or init failed — fall through to WebGL
    }
  }

  return new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
}

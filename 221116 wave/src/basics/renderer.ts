import { WebGLRenderer } from "three";

export function renderer() {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener("resize", () =>
    renderer.setSize(window.innerWidth, window.innerHeight)
  );

  return renderer;
}

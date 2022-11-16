import { PerspectiveCamera } from "three";

export function camera() {
  const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    50
  );

  camera.position.x = 2;
  camera.position.y = 3;
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  return camera;
}

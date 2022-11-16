import { DirectionalLight, Scene } from "three";

export function lighting(scene: Scene) {
  const light = new DirectionalLight(0xffffff, 0.5);
  scene.add(light);
}

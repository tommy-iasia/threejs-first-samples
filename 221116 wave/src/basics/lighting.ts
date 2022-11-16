import { AmbientLight, DirectionalLight, Scene } from "three";

export function lighting(scene: Scene) {
  const light = new DirectionalLight(0xffffff, 0.5);
  scene.add(light);

  const light2 = new AmbientLight(0xffffff, 0.5);
  scene.add(light2);
}

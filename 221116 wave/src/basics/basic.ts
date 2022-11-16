import { Clock, Scene } from "three";
import { camera as createCamera } from "./camera";
import { lighting } from "./lighting";
import { renderer as createRenderer } from "./renderer";
import { tickers as createTickers } from "./tickers";

export type Basic = ReturnType<typeof basic>;

export function basic() {
  const scene = new Scene();

  lighting(scene);

  const renderer = createRenderer();

  const clock = new Clock(true);
  const { tickers, tick } = createTickers();

  const camera = createCamera();

  renderer.setAnimationLoop(() => {
    const deltaTime = clock.getDelta();
    tick(deltaTime);

    renderer.render(scene, camera);
  });

  return {
    canvas: renderer.domElement,
    renderer,
    scene,
    camera,
    tickers,
  };
}

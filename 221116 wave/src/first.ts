import { BoxGeometry, Color, Mesh, MeshPhongMaterial, Raycaster } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Basic } from "./basics/basic";
import { Box } from "./box";

export function first({ canvas, scene, camera, tickers }: Basic) {
  const boxes: Box[] = [];
  const map: Box[][] = [];

  for (let i = 0; i < 31; i++) {
    const row: Box[] = [];
    map.push(row);

    for (let j = 0; j < 31; j++) {
      const material = new MeshPhongMaterial({ color: 0xb504f4 });

      const visibleGeometry = new BoxGeometry(0.2, 0.2, 0.2);
      const visibleMesh = new Mesh(visibleGeometry, material);

      visibleMesh.position.x = (i - 15) * 0.25;
      visibleMesh.position.z = (j - 15) * 0.25;

      scene.add(visibleMesh);

      const invisibleGeometry = new BoxGeometry(0.25, 0.2, 0.25);
      const invisibleMesh = new Mesh(invisibleGeometry, material);

      invisibleMesh.visible = false;
      invisibleMesh.position.x = (i - 15) * 0.25;
      invisibleMesh.position.z = (j - 15) * 0.25;

      scene.add(invisibleMesh);

      const box = {
        i,
        j,
        visibleMesh,
        material,
        invisibleMesh,
        velocity: 0,
      };

      boxes.push(box);
      row.push(box);
    }
  }

  let hovered: Box | undefined = undefined;
  canvas.addEventListener("mousemove", (event) => {
    const x = (event.clientX / canvas.clientWidth) * 2 - 1;
    const y = -(event.clientY / canvas.clientHeight) * 2 + 1;

    const raycaster = new Raycaster();
    raycaster.setFromCamera({ x, y }, camera);

    const meshes = boxes.map((box) => box.invisibleMesh);

    const intersections = raycaster.intersectObjects(meshes);
    if (intersections.length <= 0) {
      hovered = undefined;
      return;
    }

    const intersection = intersections[0];
    hovered = boxes.find((box) => box.invisibleMesh === intersection.object);
  });

  for (const box of boxes) {
    tickers.push(() => {
      if (box === hovered) {
        box.material.color = new Color(0xffffff);

        box.visibleMesh.position.y = 1;
        box.velocity = 0;
      } else {
        const y = Math.abs(box.visibleMesh.position.y);
        const ratio = Math.min(y / 0.3, 1);
        box.material.color = new Color(0xb504f4 - 0x0000f4 * ratio);
      }
    });
  }

  for (const box of boxes) {
    tickers.push((deltaTime) => {
      box.visibleMesh.position.y += box.velocity * Math.min(deltaTime, 1);

      if (box.visibleMesh.position.y > 1) {
        box.visibleMesh.position.y = 1;
      } else if (box.visibleMesh.position.y < -1) {
        box.visibleMesh.position.y = -1;
      }
    });
  }

  for (const box of boxes) {
    tickers.push((deltaTime) => {
      for (let i = -3; i <= 3; i++) {
        for (let j = -3; j <= 3; j++) {
          if (!(i === 0 && j === 0)) {
            const neighborI = box.i + i;
            const neighborJ = box.j + j;

            if (neighborI >= 0 && neighborI < map.length) {
              const row = map[neighborI];

              if (neighborJ >= 0 && neighborJ < row.length) {
                const neighborBox = row[neighborJ];

                const difference =
                  box.visibleMesh.position.y -
                  neighborBox.visibleMesh.position.y;

                const distance = Math.sqrt(i * i + j * j);

                neighborBox.velocity +=
                  ((20 * difference) / (distance * distance)) *
                  Math.min(deltaTime, 1);
              }
            }
          }
        }
      }
    });
  }

  for (const box of boxes) {
    tickers.push(() => {
      box.velocity *= 0.98;
      box.visibleMesh.position.y *= 0.98;
    });
  }

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
}

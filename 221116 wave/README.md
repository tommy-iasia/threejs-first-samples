# 221116 Wave

Wave created by a simple velocity and force physics model

## Prerequisite

You need to understand the project structure of https://github.com/tommy-iasia/threejs-first first,  

## Boxes

In **src/first.ts**, you can see that a 31x31 sea of boxes is created.

```ts
const boxes: Box[] = [];
const map: Box[][] = [];

for (let i = 0; i < 31; i++) {
  const row: Box[] = [];
  map.push(row);

  for (let j = 0; j < 31; j++) {
    //...

    boxes.push(box);
    row.push(box);
  }
}
```

## Interaction

Raycaster is used with `mousemove` event.

```ts
let hovered: Box | undefined = undefined;
canvas.addEventListener("mousemove", (event) => {
  const x = (event.clientX / canvas.clientWidth) * 2 - 1;
  const y = -(event.clientY / canvas.clientHeight) * 2 + 1;

  const raycaster = new Raycaster();
  raycaster.setFromCamera({ x, y }, camera);

  //...
});
```

After picking, the hovered box is highlighted and raised in next tick.

```ts
if (box === hovered) {
  box.material.color = new Color(0xffffff);

  box.visibleMesh.position.y = 1;
  box.velocity = 0;
}
```

## Velocity

Since ThreeJS is just a rendering library. It doesn't have any Physics in its mind.

We need create our own **velocity** attribute by ourselves. For example, we create a velocity **number**.
Positive number represents that the box is moving upward in y-axis. Negative number means downward.

We apply our velocity to ThreeJS's mesh's position in every tick for every box.

```ts
for (const box of boxes) {
  tickers.push((deltaTime) => {
    box.visibleMesh.position.y += box.velocity * Math.min(deltaTime, 1);

    //...
  });
}
```

## Force

In order to make wave, the sea must be elastic. In other word, boxes are connected to each other by some spring-like force.
When boxes are separated by a distance, the force will pull them back together. The farer they are separated, the stronger the force is.

In addition, the force should only be applied locally. The force is stronger when two boxes are neighbor, but is weaker when boxes are just neighbours of neighbours.

```ts
const neighborBox = row[neighborJ];

const difference =
  box.visibleMesh.position.y -
  neighborBox.visibleMesh.position.y;

const distance = Math.sqrt(i * i + j * j);

neighborBox.velocity +=
  ((20 * difference) / (distance * distance)) *
  Math.min(deltaTime, 1);
```

Poisition generates force; force generates velocity; veloctiy generates position again. As a result, we have created a cycle among position, velocity and force. And this cycle will appear as wave.

## Damping

Lastly, we give some damping preventing user from brusting the system when they move the mouse vigorously.

```ts
box.velocity *= 0.98;
box.visibleMesh.position.y *= 0.98;
```

## Demo

https://tommy-iasia.github.io/threejs-first-samples/221116%20wave/index.html

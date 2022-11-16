import { Mesh, MeshPhongMaterial } from "three";

export interface Box {
  i: number;
  j: number;

  visibleMesh: Mesh;
  material: MeshPhongMaterial;

  invisibleMesh: Mesh;

  velocity: number;
}

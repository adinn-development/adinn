import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function setupRoadshow(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  controls: any,
  onLoaded: (model: THREE.Object3D) => void
) {
  const loader = new GLTFLoader();

  let model: THREE.Object3D | null = null;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let vehicles: THREE.Object3D[] = [];
  let selected: THREE.Object3D | null = null;
  let isDragging = false;
  let prevX = 0;

  function onDown(e: MouseEvent) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hit = raycaster.intersectObjects(vehicles, true);

    if (hit.length) {
      selected = hit[0].object;

      while (
        selected &&
        !vehicles.includes(selected) &&
        selected.parent
      ) {
        selected = selected.parent;
      }

      isDragging = true;
      prevX = e.clientX;

      controls.enabled = false;
    }
  }

  function onMove(e: MouseEvent) {
    if (!isDragging || !selected || !selected.parent) return;

    const delta = e.clientX - prevX;
    prevX = e.clientX;

    selected.rotateOnWorldAxis(
      new THREE.Vector3(0, 1, 0),
      delta * 0.01
    );
  }

  function onUp() {
    isDragging = false;
    selected = null;
    controls.enabled = true;
  }

  loader.load("/models/roadshow.glb", (gltf) => {
    model = gltf.scene;
    scene.add(model);

    const v1 = model.getObjectByName("vehicle_1");
    const v2 = model.getObjectByName("vehicle_2");
    const v3 = model.getObjectByName("vehicle_3");

    vehicles = [v1, v2, v3].filter(Boolean) as THREE.Object3D[];

    onLoaded(model);
  });

  window.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);

  return () => {
    window.removeEventListener("mousedown", onDown);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);

    if (model) scene.remove(model);

    controls.enabled = true;
  };
}
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function initRoadshow({ scene, camera, controls, renderer }: any) {
  const loader = new GLTFLoader();

  let vehicles: THREE.Object3D[] = [];

  loader.load("/models/roadshow.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.frustumCulled = true;
        obj.castShadow = false;
        obj.receiveShadow = false;
      }
    });

    const v1 = model.getObjectByName("vehicle_1");
    const v2 = model.getObjectByName("vehicle_2");
    const v3 = model.getObjectByName("vehicle_3");

    vehicles = [v1, v2, v3].filter(Boolean) as THREE.Object3D[];
  });

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let selectedObject: THREE.Object3D | null = null;
  let isDragging = false;
  let prevMouseX = 0;

  function onMouseDown(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(vehicles, true);

    if (intersects.length > 0) {
      selectedObject = intersects[0].object;

      while (
        selectedObject &&
        !vehicles.includes(selectedObject) &&
        selectedObject.parent
      ) {
        selectedObject = selectedObject.parent;
      }

      isDragging = true;
      prevMouseX = event.clientX;

      controls.enabled = false;
    }
  }

  function onMouseMove(event: MouseEvent) {
    if (!isDragging || !selectedObject) return;

    const deltaX = event.clientX - prevMouseX;
    prevMouseX = event.clientX;

    selectedObject.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), deltaX * 0.01);
  }

  function onMouseUp() {
    isDragging = false;
    selectedObject = null;
    controls.enabled = true;
  }

  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

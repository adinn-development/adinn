import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type InitWallPaintingParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
};

export async function initWallPainting({
  scene,
  camera,
  controls,
  renderer,
}: InitWallPaintingParams) {
 /* =========================
     CONTROLS SETUP (2nd SCREEN)
  ========================= */

  controls.enabled = true;

  controls.minAzimuthAngle = -Infinity;
  controls.maxAzimuthAngle = Infinity;

  controls.minPolarAngle = 0.01;
  controls.maxPolarAngle = Math.PI - 0.01;

  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enableDamping = true;

  // better viewing angle (IMPORTANT)
  camera.position.set(10, 5, 10);

  controls.target.set(0, 0, 0);
  controls.update();

  /* =========================
     VARIABLES
  ========================= */

  let rotationVelocity = 0;

  const loader = new GLTFLoader();
  let vehicles: THREE.Object3D[] = [];

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let selectedObject: THREE.Object3D | null = null;
  
  let isDragging = false;
  let prevMouseX = 0;

  const Y_AXIS = new THREE.Vector3(0, 1, 0);

  /* =========================
     LOAD MODEL
  ========================= */

  loader.load("/models/wall_painting_building_grp.glb", (gltf) => {
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

  /* =========================
     MOUSE EVENTS
  ========================= */

  function onMouseDown(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(vehicles, true);

    if (intersects.length > 0) {
      let obj = intersects[0].object;

      // ensure full vehicle selection
      while (obj.parent && !vehicles.includes(obj)) {
        obj = obj.parent;
      }

      selectedObject = obj;

      isDragging = true;
      prevMouseX = event.clientX;

      rotationVelocity = 0;

      // disable camera movement while dragging
      controls.enableRotate = false;
      controls.enablePan = false;
      controls.enableZoom = false;
    }
  }

  function onMouseMove(event: MouseEvent) {
    if (!isDragging || !selectedObject) return;

    const deltaX = event.clientX - prevMouseX;
    prevMouseX = event.clientX;

    // store velocity (smooth rotation)
    rotationVelocity = deltaX * 0.005;
  }

  function onMouseUp() {
    isDragging = false;
    selectedObject = null;

    // re-enable camera
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.enableZoom = true;
  }

  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);

  /* =========================
     ANIMATION LOOP
  ========================= */

  function animate() {
    requestAnimationFrame(animate);

    if (selectedObject) {
      selectedObject.rotateOnWorldAxis(Y_AXIS, rotationVelocity);

      // smooth slowdown
      rotationVelocity *= 0.9;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
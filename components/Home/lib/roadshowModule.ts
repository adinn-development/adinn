import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createBackToMainButton } from "./createBackToMainButton";

type InitRoadshowParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  onBackToMain: () => void;
};

export function initRoadshow({
  scene,
  camera,
  controls,
  renderer,
  onBackToMain,
}: InitRoadshowParams) {
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

  camera.position.set(
    -16.651605760184015,
    6.8,
    16.2,
  );

  controls.target.set(-2.3, 1.0, -3);
  controls.update();

  /* =========================
     VARIABLES
  ========================= */

  let rotationVelocity = 0;
  let animationId = 0;
  const removeBackButton = createBackToMainButton(onBackToMain);

  const loader = new GLTFLoader();
  let roadshowRoot: THREE.Object3D | null = null;
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

  loader.load("/models/roadshow.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    roadshowRoot = model;

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

      while (obj.parent && !vehicles.includes(obj)) {
        obj = obj.parent;
      }

      selectedObject = obj;
      isDragging = true;
      prevMouseX = event.clientX;
      rotationVelocity = 0;

      controls.enableRotate = false;
      controls.enablePan = false;
      controls.enableZoom = false;
    }
  }

  function onMouseMove(event: MouseEvent) {
    if (!isDragging || !selectedObject) return;

    const deltaX = event.clientX - prevMouseX;
    prevMouseX = event.clientX;

    rotationVelocity = deltaX * 0.005;
  }

  function onMouseUp() {
    isDragging = false;
    selectedObject = null;

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
    animationId = requestAnimationFrame(animate);

    if (selectedObject) {
      selectedObject.rotateOnWorldAxis(Y_AXIS, rotationVelocity);
      rotationVelocity *= 0.9;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  return () => {
    cancelAnimationFrame(animationId);

    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);

    removeBackButton();

    if (roadshowRoot) {
      roadshowRoot.traverse((obj: any) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();

          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m: any) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });

      scene.remove(roadshowRoot);
      roadshowRoot = null;
    }

    vehicles = [];
  };
}
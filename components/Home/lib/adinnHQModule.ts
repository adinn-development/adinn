import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type InitAdinnHQParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
};

export async function initAdinnHQ({
  scene,
  camera,
  controls,
  renderer,
}: InitAdinnHQParams) {
  controls.enabled = true;

  // cameraTargets.ts la adinnHQ values vechukonga
  camera.position.set(
    2.5,
    5.2,
    14.8,
  );

  controls.target.set(
    2.0,
    1.4,
    0.5,
  );

  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableRotate = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  controls.minPolarAngle = Math.PI / 2.45;
  controls.maxPolarAngle = Math.PI / 2.42;

  controls.minDistance = 5;
  controls.maxDistance = 30;

  controls.update();

  const loader = new GLTFLoader();
  let adinnHQRoot: THREE.Object3D | null = null;

  const mouse = new THREE.Vector2();

  let targetRotationY = 0;
  let isLeftMouseDown = false;
  let lastMouseX = 0;

  let targetTiltValue = 0;
  let currentTiltValue = 0;
  let lastAppliedTiltValue = 0;

  const baseObjectPosition = new THREE.Vector3(0, 0, 0);
  const baseObjectRotation = new THREE.Euler(0, 0, 0);
  const baseObjectScale = new THREE.Vector3(1, 1, 1);

  const rotationSmooth = 0.08;
  const autoTiltAmount = 0.14;
  const tiltSmooth = 0.1;
  const edgeSoftness = 0.85;
  const maxTiltLimit = 0.11;

  loader.load("/models/adinn_hq_building_grp.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    adinnHQRoot = model;

    adinnHQRoot.position.copy(baseObjectPosition);
    adinnHQRoot.rotation.copy(baseObjectRotation);
    adinnHQRoot.scale.copy(baseObjectScale);

    targetRotationY = adinnHQRoot.rotation.y;

    model.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.frustumCulled = true;
        obj.castShadow = false;
        obj.receiveShadow = false;
      }
    });
  });

  function onMouseDown(event: MouseEvent) {
    if (event.button !== 0) return;
    isLeftMouseDown = true;
    lastMouseX = event.clientX;
  }

  function onMouseMove(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const absY = Math.abs(mouse.y);
    const easedY = mouse.y * absY;
    const edgeFactor = 1 - Math.pow(absY, 2) * (1 - edgeSoftness);
    const nextTilt = easedY * autoTiltAmount * edgeFactor;

    targetTiltValue = THREE.MathUtils.clamp(
      nextTilt,
      -maxTiltLimit,
      maxTiltLimit,
    );

    if (!adinnHQRoot || !isLeftMouseDown) return;

    const deltaX = event.clientX - lastMouseX;
    lastMouseX = event.clientX;

    targetRotationY += deltaX * 0.01;
  }

  function onMouseUp(event: MouseEvent) {
    if (event.button !== 0) return;
    isLeftMouseDown = false;
  }

  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  function animate() {
    requestAnimationFrame(animate);

    if (adinnHQRoot) {
      adinnHQRoot.rotation.y = THREE.MathUtils.lerp(
        adinnHQRoot.rotation.y,
        targetRotationY,
        rotationSmooth,
      );

      adinnHQRoot.position.x = baseObjectPosition.x;
      adinnHQRoot.position.y = baseObjectPosition.y;
      adinnHQRoot.position.z = baseObjectPosition.z;
    }

    currentTiltValue = THREE.MathUtils.lerp(
      currentTiltValue,
      targetTiltValue,
      tiltSmooth,
    );

    let tiltDelta = currentTiltValue - lastAppliedTiltValue;

    if (Math.abs(tiltDelta) < 0.00015) {
      tiltDelta = 0;
    }

    lastAppliedTiltValue = currentTiltValue;

    controls.rotateUp(tiltDelta);

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type InitMediaAdsParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
};

export async function initMediaAds({
  scene,
  camera,
  controls,
  renderer,
}: InitMediaAdsParams) {
  /* =========================
     CONTROLS SETUP (2nd SCREEN)
  ========================= */

  controls.enabled = true;

  camera.position.set(
    -12.53877647614928,
    5.915949256331285,
    9.312708289037815,
  );

  controls.target.set(
    -1.4300768090060412,
    -1.5972734141224055e-17,
    -8.69452699576114,
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

  /* =========================
     VARIABLES
  ========================= */

  const loader = new GLTFLoader();
  let mediaAdsRoot: THREE.Object3D | null = null;

  const mouse = new THREE.Vector2();

  const DEBUG_VALUES = true;

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

  /* =========================
     LOAD MODEL
  ========================= */

  loader.load("/models/media_ads_building_grp.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    mediaAdsRoot = model;

    mediaAdsRoot.position.copy(baseObjectPosition);
    mediaAdsRoot.rotation.copy(baseObjectRotation);
    mediaAdsRoot.scale.copy(baseObjectScale);

    targetRotationY = mediaAdsRoot.rotation.y;

    model.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.frustumCulled = true;
        obj.castShadow = false;
        obj.receiveShadow = false;
      }
    });

    if (DEBUG_VALUES) {
      printAllValues("MODEL LOADED");
    }
  });

  function printAllValues(label = "DEBUG") {
    if (!mediaAdsRoot) return;

    console.log(`
[${label}]

camera.position:
x: ${camera.position.x},
y: ${camera.position.y},
z: ${camera.position.z}

controls.target:
x: ${controls.target.x},
y: ${controls.target.y},
z: ${controls.target.z}

object.position:
x: ${mediaAdsRoot.position.x},
y: ${mediaAdsRoot.position.y},
z: ${mediaAdsRoot.position.z}

object.rotation:
x: ${mediaAdsRoot.rotation.x},
y: ${mediaAdsRoot.rotation.y},
z: ${mediaAdsRoot.rotation.z}

object.scale:
x: ${mediaAdsRoot.scale.x},
y: ${mediaAdsRoot.scale.y},
z: ${mediaAdsRoot.scale.z}
`);
  }

  /* =========================
     MOUSE INTERACTION
  ========================= */

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

    if (!mediaAdsRoot || !isLeftMouseDown) return;

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

  /* =========================
     ANIMATION LOOP
  ========================= */

  function animate() {
    requestAnimationFrame(animate);

    if (mediaAdsRoot) {
      mediaAdsRoot.rotation.y = THREE.MathUtils.lerp(
        mediaAdsRoot.rotation.y,
        targetRotationY,
        rotationSmooth,
      );

      mediaAdsRoot.position.x = baseObjectPosition.x;
      mediaAdsRoot.position.y = baseObjectPosition.y;
      mediaAdsRoot.position.z = baseObjectPosition.z;
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
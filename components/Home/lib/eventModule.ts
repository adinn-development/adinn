import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createBackToMainButton } from "./createBackToMainButton";

type InitEventParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  onBackToMain: () => void;
};

export function initEvent({
  scene,
  camera,
  controls,
  renderer,
  onBackToMain,
}: InitEventParams) {
  controls.enabled = true;

  camera.position.set(6.59448535746776, 1.5317653135284646, 7.402466638312257);

  controls.target.set(
    4.265388321241643,
    -6.824950865944959e-19,
    -1.8781783520011979,
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
  let eventRoot: THREE.Object3D | null = null;

  const mouse = new THREE.Vector2();
  const DEBUG_VALUES = true;

  let animationId = 0;
  const removeBackButton = createBackToMainButton(onBackToMain);

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

  loader.load("/models/event_building_grp.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    eventRoot = model;

    eventRoot.position.copy(baseObjectPosition);
    eventRoot.rotation.copy(baseObjectRotation);
    eventRoot.scale.copy(baseObjectScale);

    targetRotationY = eventRoot.rotation.y;

    model.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.frustumCulled = true;
        obj.castShadow = false;
        obj.receiveShadow = false;
      }
    });

    if (DEBUG_VALUES) {
      printAllValues("EVENT MODEL LOADED");
    }
  });

  function printAllValues(label = "DEBUG") {
    if (!eventRoot) return;

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
x: ${eventRoot.position.x},
y: ${eventRoot.position.y},
z: ${eventRoot.position.z}

object.rotation:
x: ${eventRoot.rotation.x},
y: ${eventRoot.rotation.y},
z: ${eventRoot.rotation.z}

object.scale:
x: ${eventRoot.scale.x},
y: ${eventRoot.scale.y},
z: ${eventRoot.scale.z}
`);
  }

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

    if (!eventRoot || !isLeftMouseDown) return;

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
    animationId = requestAnimationFrame(animate);

    if (eventRoot) {
      eventRoot.rotation.y = THREE.MathUtils.lerp(
        eventRoot.rotation.y,
        targetRotationY,
        rotationSmooth,
      );

      eventRoot.position.x = baseObjectPosition.x;
      eventRoot.position.y = baseObjectPosition.y;
      eventRoot.position.z = baseObjectPosition.z;
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

  return () => {
    cancelAnimationFrame(animationId);

    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);

    removeBackButton();

    if (eventRoot) {
      eventRoot.traverse((obj: any) => {
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

      scene.remove(eventRoot);
      eventRoot = null;
    }
  };
}
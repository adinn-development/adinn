import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createBackToMainButton } from "./createBackToMainButton";

type InitDigitalMarketingParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  onBackToMain: () => void;
};

export function initDigitalMarketing({
  scene,
  camera,
  controls,
  renderer,
  onBackToMain,
}: InitDigitalMarketingParams) {
  controls.enabled = true;

  camera.position.set(
    -7.3771064604067895,
    4.538773150841211,
    16.53152625774275,
  );

  controls.target.set(
    1.8173932258873564,
    -3.269266320232634e-17,
    3.1518557902791082,
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
  let digitalMarketingRoot: THREE.Object3D | null = null;
  const mouse = new THREE.Vector2();

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

  loader.load("/models/digital_marketing_building_grp.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    digitalMarketingRoot = model;
    digitalMarketingRoot.position.copy(baseObjectPosition);
    digitalMarketingRoot.rotation.copy(baseObjectRotation);
    digitalMarketingRoot.scale.copy(baseObjectScale);

    targetRotationY = digitalMarketingRoot.rotation.y;

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

    if (!digitalMarketingRoot || !isLeftMouseDown) return;

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

  function animate() {
    animationId = requestAnimationFrame(animate);

    if (digitalMarketingRoot) {
      digitalMarketingRoot.rotation.y = THREE.MathUtils.lerp(
        digitalMarketingRoot.rotation.y,
        targetRotationY,
        rotationSmooth,
      );

      digitalMarketingRoot.position.copy(baseObjectPosition);
    }

    currentTiltValue = THREE.MathUtils.lerp(
      currentTiltValue,
      targetTiltValue,
      tiltSmooth,
    );

    let tiltDelta = currentTiltValue - lastAppliedTiltValue;
    if (Math.abs(tiltDelta) < 0.00015) tiltDelta = 0;

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

    if (digitalMarketingRoot) {
      digitalMarketingRoot.traverse((obj: any) => {
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

      scene.remove(digitalMarketingRoot);
      digitalMarketingRoot = null;
    }
  };
}
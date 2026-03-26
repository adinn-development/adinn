import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type InitDigitalMarketingParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
};

export async function initDigitalMarketing({
  scene,
  camera,
  controls,
  renderer,
}: InitDigitalMarketingParams) {
  /* =========================
     CONTROLS SETUP (2nd SCREEN)
  ========================= */

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

  controls.minPolarAngle = Math.PI / 2.45; // up
  controls.maxPolarAngle = Math.PI / 2.42; // down

  controls.minDistance = 5;
  controls.maxDistance = 30;

  controls.update();

  /* =========================
     VARIABLES
  ========================= */

  const loader = new GLTFLoader();
  let digitalMarketingRoot: THREE.Object3D | null = null;

  const mouse = new THREE.Vector2();

  const DEBUG_VALUES = true;

  let targetRotationY = 0;
  let isLeftMouseDown = false;
  let lastMouseX = 0;

  // smooth tilt values
  let targetTiltValue = 0;
  let currentTiltValue = 0;
  let lastAppliedTiltValue = 0;

  // model oda original transform preserve pannrom
  const baseObjectPosition = new THREE.Vector3();
  const baseObjectRotation = new THREE.Euler();
  const baseObjectScale = new THREE.Vector3(1, 1, 1);

  const rotationSmooth = 0.08;
  const autoTiltAmount = 0.14;
  const tiltSmooth = 0.10;
  const edgeSoftness = 0.85;
  const maxTiltLimit = 0.11;

  /* =========================
     LOAD MODEL
  ========================= */

  loader.load("/models/digital_marketing_building_grp.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    digitalMarketingRoot = model;

    // current exported model transform ah base-a store pannrom
    baseObjectPosition.copy(model.position);
    baseObjectRotation.copy(model.rotation);
    baseObjectScale.copy(model.scale);

    targetRotationY = digitalMarketingRoot.rotation.y;

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
    if (!digitalMarketingRoot) return;

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
x: ${digitalMarketingRoot.position.x},
y: ${digitalMarketingRoot.position.y},
z: ${digitalMarketingRoot.position.z}

object.rotation:
x: ${digitalMarketingRoot.rotation.x},
y: ${digitalMarketingRoot.rotation.y},
z: ${digitalMarketingRoot.rotation.z}

object.scale:
x: ${digitalMarketingRoot.scale.x},
y: ${digitalMarketingRoot.scale.y},
z: ${digitalMarketingRoot.scale.z}
`);
  }

  /* =========================
     MOUSE INTERACTION
  ========================= */

  function onMouseDown(event: MouseEvent) {
    if (event.button !== 0) return; // left click only
    isLeftMouseDown = true;
    lastMouseX = event.clientX;
  }

  function onMouseMove(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // center la normal response
    // edge kitta pona speed reduce aagum
    const absY = Math.abs(mouse.y);
    const easedY = mouse.y * absY;

    // boundary pakkam pona soft falloff
    const edgeFactor = 1 - Math.pow(absY, 2) * (1 - edgeSoftness);

    const nextTilt = easedY * autoTiltAmount * edgeFactor;

    // manual safe clamp before OrbitControls clamp
    targetTiltValue = THREE.MathUtils.clamp(
      nextTilt,
      -maxTiltLimit,
      maxTiltLimit,
    );

    // left click hold pannina mattum object rotate
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
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  /* =========================
     ANIMATION LOOP
  ========================= */

  function animate() {
    requestAnimationFrame(animate);

    if (digitalMarketingRoot) {
      digitalMarketingRoot.rotation.y = THREE.MathUtils.lerp(
        digitalMarketingRoot.rotation.y,
        targetRotationY,
        rotationSmooth,
      );

      digitalMarketingRoot.position.x = baseObjectPosition.x;
      digitalMarketingRoot.position.y = baseObjectPosition.y;
      digitalMarketingRoot.position.z = baseObjectPosition.z;

      digitalMarketingRoot.scale.copy(baseObjectScale);
      digitalMarketingRoot.rotation.x = baseObjectRotation.x;
      digitalMarketingRoot.rotation.z = baseObjectRotation.z;
    }

    // smooth tilt apply
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
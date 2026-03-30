import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type InitWallPaintingParams = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
};
export function initWallPainting({
  scene,
  camera,
  controls,
  renderer,
}: InitWallPaintingParams) {
  /* =========================
     CONTROLS SETUP (2nd SCREEN)
  ========================= */

  controls.enabled = true;

  camera.position.set(
    -10.610568933641602,
    3.8282194178856863,
    15.053302140309448,
  );

  controls.target.set(
    0.8937263705648809,
    -9.90993256925678e-18,
    0.05298164520602297,
  );

  controls.enablePan = false;
  controls.enableZoom = true;
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
  let wallPaintingRoot: THREE.Object3D | null = null;

  const mouse = new THREE.Vector2();

  const DEBUG_VALUES = true;

  let animationId = 0;

  

  let targetRotationY = 0;
  let isLeftMouseDown = false;
  let lastMouseX = 0;

  // smooth tilt values
  let targetTiltValue = 0;
  let currentTiltValue = 0;
  let lastAppliedTiltValue = 0;

  const baseObjectPosition = new THREE.Vector3(
    -0.8022948871239564,
    -8.881784197001252e-16,
    1.4786092764825085,
  );

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

  loader.load("/models/wall_painting_building_grp.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    wallPaintingRoot = model;

    wallPaintingRoot.position.copy(baseObjectPosition);
    wallPaintingRoot.rotation.copy(baseObjectRotation);
    wallPaintingRoot.scale.copy(baseObjectScale);

    targetRotationY = wallPaintingRoot.rotation.y;

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
    if (!wallPaintingRoot) return;

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
x: ${wallPaintingRoot.position.x},
y: ${wallPaintingRoot.position.y},
z: ${wallPaintingRoot.position.z}

object.rotation:
x: ${wallPaintingRoot.rotation.x},
y: ${wallPaintingRoot.rotation.y},
z: ${wallPaintingRoot.rotation.z}

object.scale:
x: ${wallPaintingRoot.scale.x},
y: ${wallPaintingRoot.scale.y},
z: ${wallPaintingRoot.scale.z}
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
    if (!wallPaintingRoot || !isLeftMouseDown) return;

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
    animationId = requestAnimationFrame(animate);

    if (wallPaintingRoot) {
      wallPaintingRoot.rotation.y = THREE.MathUtils.lerp(
        wallPaintingRoot.rotation.y,
        targetRotationY,
        rotationSmooth,
      );

      wallPaintingRoot.position.x = baseObjectPosition.x;
      wallPaintingRoot.position.y = baseObjectPosition.y;
      wallPaintingRoot.position.z = baseObjectPosition.z;
    }

    // smooth tilt apply
    // smooth tilt apply
    currentTiltValue = THREE.MathUtils.lerp(
      currentTiltValue,
      targetTiltValue,
      tiltSmooth,
    );

    // very small delta near boundary / settling time la jitter avoid
    let tiltDelta = currentTiltValue - lastAppliedTiltValue;

    // deadzone for smoother landing
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

    

    if (wallPaintingRoot) {
      wallPaintingRoot.traverse((obj: any) => {
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

      scene.remove(wallPaintingRoot);
      wallPaintingRoot = null;
    }
  };
}

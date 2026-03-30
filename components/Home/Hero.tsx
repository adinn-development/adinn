"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { createThreeBase } from "./lib/threeSetup";
import { cameraTargets } from "./lib/cameraTargets";
import {
  createCameraRig,
  createFlyState,
  updateFlyAnimation,
  startFlyToTarget,
} from "./lib/cameraTransitions";
import {
  createIntroState,
  createIntroRig,
  updateIntroAnimation,
} from "./lib/introCamera";

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let currentScreen:
      | "main"
      | "roadshow"
      | "wallPainting"
      | "digitalMarketing"
      | "fixtures"
      | "event"
      | "adinnHQ"
      | "mediaAds"
      | "sinageSide" = "main";
    if (!mountRef.current) return;

    const { scene, camera, renderer, controls } = createThreeBase(
      mountRef.current,
    );

    let mouseMovedAfterIntro = false;
    let targetAzimuth = 0;
    let targetPolar = 0;
    let isDisposed = false;
    let isReturningToMain = false;
    let isMouseMoving = false;
    let mouseStopTimer: NodeJS.Timeout | null = null;
    let introCanStart = false;
    const ENABLE_INTRO = true;
    let skipNextControlsUpdate = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let mouseDeltaX = 0;
    let mouseDeltaY = 0;

    /* SCENE */
    scene.background = new THREE.Color(0xa0d8f0);

    let isUserControllingCamera = false;
    let activeDestination:
      | "roadshow"
      | "wallPainting"
      | "digitalMarketing"
      | "fixtures"
      | "event"
      | "adinnHQ"
      | "mediaAds"
      | "sinageSide"
      | "backToMain"
      | null = null;
    /* CAMERA */
    const endCameraPosition = new THREE.Vector3(
      -28.349296,
      14.187888,
      36.354076,
    );

    const endTarget = new THREE.Vector3(0.548582, 0.0, -1.804985);

    const startCameraPosition = new THREE.Vector3(
      -6.154139265092018,
      11.340652744420645,
      6.6360819245299645,
    );

    const startTarget = new THREE.Vector3(
      8.42669997773453,
      0,
      -11.184943816702475,
    );

    // visible intro should start from a later point
    const introVisibleStartCameraPosition = new THREE.Vector3(
      -12.5,
      12.6,
      14.5,
    );

    const introVisibleStartTarget = new THREE.Vector3(5.8, 0, -8.8);

    const cameraRig = createCameraRig(
      introVisibleStartCameraPosition,
      introVisibleStartTarget,
    );

    const introState = createIntroState({
      startCameraPosition: introVisibleStartCameraPosition,
      endCameraPosition,
      startTarget: introVisibleStartTarget,
      endTarget,
      duration: 6,
    });

    const introRig = createIntroRig(
      introVisibleStartCameraPosition,
      introVisibleStartTarget,
    );

    /* RENDERER */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current?.appendChild(renderer.domElement);

    /* CONTROLS */
    camera.position.copy(introVisibleStartCameraPosition);
    controls.target.copy(introVisibleStartTarget);

    cameraRig.position.copy(introVisibleStartCameraPosition);
    cameraRig.target.copy(introVisibleStartTarget);

    introRig.position.copy(introVisibleStartCameraPosition);
    introRig.target.copy(introVisibleStartTarget);

    camera.position.copy(introRig.position);
    controls.target.copy(introRig.target);
    camera.lookAt(introRig.target);

    controls.enabled = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controls.enableZoom = true;

    controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
    controls.mouseButtons.LEFT = THREE.MOUSE.PAN;

    controls.minPolarAngle = Math.PI / 2.45; // up
    controls.maxPolarAngle = Math.PI / 2.42; // down

    /* VIDEO TEXTURE */
    const video = document.createElement("video");
    video.src = "/led-video.mp4";
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;

    video.play().catch(() => {});

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.flipY = false;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.generateMipmaps = false;
    videoTexture.wrapS = THREE.ClampToEdgeWrapping;
    videoTexture.wrapT = THREE.ClampToEdgeWrapping;

    /* GLB */
    const loader = new GLTFLoader();

    /* DRACO LOADER */
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);

    let currentModel: THREE.Object3D | null = null;

    const modelCache: Record<string, THREE.Object3D> = {};
    let mixer: THREE.AnimationMixer | null = null;

    let disposeActiveModule: (() => void) | null = null;
    const buildingGroups: Record<string, THREE.Object3D> = {};

    const raycaster = new THREE.Raycaster();
    raycaster.firstHitOnly = true;

    const mouse = new THREE.Vector2();
    const groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({ visible: false }),
    );

    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = 0;
    scene.add(groundPlane);

    let hoveredBuilding: THREE.Object3D | null = null;

    const HOVER_DIM_COLOR = new THREE.Color("#B7BCC0");
    const HOVER_FADE_SPEED = 1.35;

    function ensureFadeData(mesh: THREE.Mesh) {
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((mat: any) => {
          const clonedMat = mat.clone();

          if (clonedMat.color && !clonedMat.userData.originalColor) {
            clonedMat.userData.originalColor = clonedMat.color.clone();
          }

          if (clonedMat.userData.fadeMix === undefined) {
            clonedMat.userData.fadeMix = 0;
          }

          if (clonedMat.userData.targetFadeMix === undefined) {
            clonedMat.userData.targetFadeMix = 0;
          }

          return clonedMat;
        });
      } else {
        const mat: any = mesh.material.clone();

        if (mat.color && !mat.userData.originalColor) {
          mat.userData.originalColor = mat.color.clone();
        }

        if (mat.userData.fadeMix === undefined) {
          mat.userData.fadeMix = 0;
        }

        if (mat.userData.targetFadeMix === undefined) {
          mat.userData.targetFadeMix = 0;
        }

        mesh.material = mat;
      }
    }

    function setMeshFadeTarget(mesh: THREE.Mesh, target: number) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat: any) => {
          if (mat.color) {
            mat.userData.targetFadeMix = target;
          }
        });
      } else {
        const mat: any = mesh.material;
        if (mat.color) {
          mat.userData.targetFadeMix = target;
        }
      }
    }

    function updateMeshFade(mesh: THREE.Mesh) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat: any) => {
          if (!mat.color || !mat.userData.originalColor) return;

          const current = mat.userData.fadeMix ?? 0;
          const target = mat.userData.targetFadeMix ?? 0;
          const next = THREE.MathUtils.lerp(current, target, HOVER_FADE_SPEED);

          mat.userData.fadeMix = next;
          mat.color
            .copy(mat.userData.originalColor)
            .lerp(HOVER_DIM_COLOR, next);
        });
      } else {
        const mat: any = mesh.material;
        if (!mat.color || !mat.userData.originalColor) return;

        const current = mat.userData.fadeMix ?? 0;
        const target = mat.userData.targetFadeMix ?? 0;
        const next = THREE.MathUtils.lerp(current, target, HOVER_FADE_SPEED);

        mat.userData.fadeMix = next;
        mat.color.copy(mat.userData.originalColor).lerp(HOVER_DIM_COLOR, next);
      }
    }

    function storeOriginalMaterial(mesh: THREE.Mesh) {
      ensureFadeData(mesh);
    }

    function highlightOtherBuildings(activeName: string) {
      Object.entries(buildingGroups).forEach(([name, group]) => {
        group.traverse((obj: THREE.Object3D) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            setMeshFadeTarget(mesh, name !== activeName ? 1 : 0);
          }
        });
      });
    }

    function resetBuildingColors() {
      Object.values(buildingGroups).forEach((group) => {
        group.traverse((obj: THREE.Object3D) => {
          if ((obj as THREE.Mesh).isMesh) {
            setMeshFadeTarget(obj as THREE.Mesh, 0);
          }
        });
      });
    }

    const nonClickable = ["hq_back_dummy_building_grp"];
    const buildingModels = ["all_services"];

    // controls pan limit

    function limitPan() {
      const minX = -2.3;
      const maxX = 12.6;

      const minY = -6.4;
      const maxY = 7.4;

      const minZ = -14.7;
      const maxZ = -0.3;

      const target = controls.target;

      const clampedX = THREE.MathUtils.clamp(target.x, minX, maxX);
      const clampedY = THREE.MathUtils.clamp(target.y, minY, maxY);
      const clampedZ = THREE.MathUtils.clamp(target.z, minZ, maxZ);

      // Only update if actually outside bounds
      if (
        clampedX !== target.x ||
        clampedY !== target.y ||
        clampedZ !== target.z
      ) {
        const delta = new THREE.Vector3(
          clampedX - target.x,
          clampedY - target.y,
          clampedZ - target.z,
        );

        target.set(clampedX, clampedY, clampedZ);
        camera.position.add(delta);
      }
    }

    /* CAMERA INTRO */
    const flyState = createFlyState(2.35);
    const clock = new THREE.Clock();
    const cameraSpeed = 1.25;
    let animationId: number;

    function animate() {
      if (isDisposed) return;
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      /* CAMERA INTRO ANIMATION */
      if (
        ENABLE_INTRO &&
        currentScreen === "main" &&
        introCanStart &&
        !introState.finished &&
        modelsReady
      ) {
        const introDone = updateIntroAnimation({
          delta,
          cameraSpeed,
          camera,
          controls,
          introState,
          introRig,
        });

        if (introDone) {
          camera.position.copy(introRig.position);
          controls.target.copy(introRig.target);
          camera.lookAt(introRig.target);

          controls.enabled = true;
          controls.minDistance = 1;
          controls.maxDistance = 50;
          controls.minAzimuthAngle = -0.65;
          controls.maxAzimuthAngle = -0.55;

          // intro mudinja odane zoom cut
          controls.enableZoom = false;

          // intro mudinja odane pan limit apply pannanum
          limitPan();

          mouse.set(999, 999);
          hoveredBuilding = null;

          targetAzimuth = controls.getAzimuthalAngle();
          targetPolar = controls.getPolarAngle();
        }
      }

      if (mixer) mixer.update(delta);

      Object.values(buildingGroups).forEach((group) => {
        group.traverse((obj: THREE.Object3D) => {
          if ((obj as THREE.Mesh).isMesh) {
            updateMeshFade(obj as THREE.Mesh);
          }
        });
      });

      if (
        currentScreen === "main" &&
        modelsReady &&
        introState.finished &&
        mouseMovedAfterIntro &&
        !isUserControllingCamera &&
        !flyState.isFlying &&
        !isReturningToMain &&
        activeDestination !== "wallPainting"
      ) {
        const rotationSpeedX = 0.35;
        const rotationSpeedY = 1.2;

        // update target rotation
        targetAzimuth -= mouseDeltaX * rotationSpeedX;
        targetPolar -= mouseDeltaY * rotationSpeedY;

        // clamp limits
        targetAzimuth = THREE.MathUtils.clamp(
          targetAzimuth,
          controls.minAzimuthAngle,
          controls.maxAzimuthAngle,
        );

        targetPolar = THREE.MathUtils.clamp(
          targetPolar,
          controls.minPolarAngle,
          controls.maxPolarAngle,
        );

        // current camera angles
        const currentAzimuth = controls.getAzimuthalAngle();
        const currentPolar = controls.getPolarAngle();

        // smooth interpolation
        const smooth = 0.08;

        const newAzimuth = THREE.MathUtils.lerp(
          currentAzimuth,
          targetAzimuth,
          smooth,
        );
        const newPolar = THREE.MathUtils.lerp(
          currentPolar,
          targetPolar,
          smooth,
        );

        controls.rotateLeft(currentAzimuth - newAzimuth);
        controls.rotateUp(currentPolar - newPolar);

        mouseDeltaX = 0;
        mouseDeltaY = 0;
      }

      if (
        !isReturningToMain &&
        (currentScreen === "main" || currentScreen === "adinnHQ") &&
        introState.finished &&
        !flyState.isFlying &&
        (activeDestination !== "wallPainting" || controls.enabled)
      ) {
        if (skipNextControlsUpdate) {
          skipNextControlsUpdate = false;
        } else {
          controls.update();
        }
      }

      /* HOVER DETECTION */
      if (
        currentScreen === "main" &&
        introState.finished &&
        !isUserControllingCamera &&
        !isMouseMoving &&
        !flyState.isFlying &&
        !isReturningToMain
      ) {
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(
          Object.values(buildingGroups),
          true,
        );

        if (intersects.length > 0) {
          let obj: THREE.Object3D | null = intersects[0].object;

          while (obj && !obj.name.endsWith("_grp")) {
            obj = obj.parent;
          }

          if (obj && obj !== hoveredBuilding) {
            hoveredBuilding = obj;

            const modelName = obj.name;
            if (!nonClickable.includes(modelName)) {
              highlightOtherBuildings(modelName);
            }
          }
        } else {
          if (hoveredBuilding) {
            hoveredBuilding = null;
            resetBuildingColors();
          }
        }
      }

      /* FLOATING CAMERA */
      if (
        introState.finished &&
        currentScreen === "main" &&
        !flyState.isFlying &&
        !isUserControllingCamera &&
        !isReturningToMain &&
        activeDestination !== "wallPainting"
      ) {
        camera.position.x += Math.sin(clock.elapsedTime * 0.2) * 0.001;
        camera.position.y += Math.cos(clock.elapsedTime * 0.2) * 0.001;
      }

      /* CAMERA FLY */
      const finished = updateFlyAnimation({
        delta,
        camera,
        controls,
        rig: cameraRig,
        flyState,
      });

      if (finished) {
        hoveredBuilding = null;

        if (activeDestination === "backToMain") {
          activeDestination = null;
          currentScreen = "main";

          // hard lock exact final main camera state
          camera.position.copy(endCameraPosition);
          controls.target.copy(endTarget);
          camera.lookAt(endTarget);

          cameraRig.position.copy(endCameraPosition);
          cameraRig.target.copy(endTarget);

          // reset all motion leftovers
          hoveredBuilding = null;
          mouseMovedAfterIntro = false;
          isMouseMoving = false;
          mouseDeltaX = 0;
          mouseDeltaY = 0;
          prevMouseX = mouse.x;
          prevMouseY = mouse.y;

          controls.enabled = true;
          controls.enableDamping = true;
          controls.enablePan = true;
          controls.enableRotate = true;
          controls.enableZoom = false;

          controls.minDistance = 1;
          controls.maxDistance = 50;
          controls.minAzimuthAngle = -0.65;
          controls.maxAzimuthAngle = -0.55;
          controls.minPolarAngle = Math.PI / 2.45;
          controls.maxPolarAngle = Math.PI / 2.42;

          controls.update();
          limitPan();

          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("click", handleClick);

          window.addEventListener("mousemove", handleMouseMove);
          window.addEventListener("click", handleClick);

          targetAzimuth = controls.getAzimuthalAngle();
          targetPolar = controls.getPolarAngle();

          // wait a tiny bit before allowing main logic again
          setTimeout(() => {
            isUserControllingCamera = false;
            isReturningToMain = false;
          }, 120);

          return;
        }

        if (
          activeDestination === "roadshow" ||
          activeDestination === "wallPainting" ||
          activeDestination === "digitalMarketing" ||
          activeDestination === "fixtures" ||
          activeDestination === "event" ||
          activeDestination === "adinnHQ" ||
          activeDestination === "mediaAds" ||
          activeDestination === "sinageSide"
        ) {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("click", handleClick);

          setMainSceneVisible(false);

          if (activeDestination === "roadshow") {
            loadRoadshowModule();
          } else if (activeDestination === "wallPainting") {
            loadWallPaintingModule();
          } else if (activeDestination === "digitalMarketing") {
            loadDigitalMarketingModule();
          } else if (activeDestination === "fixtures") {
            loadFixturesModule();
          } else if (activeDestination === "event") {
            loadEventModule();
          } else if (activeDestination === "adinnHQ") {
            loadAdinnHQModule();
          } else if (activeDestination === "mediaAds") {
            loadMediaAdsModule();
          } else if (activeDestination === "sinageSide") {
            loadSinageSideModule();
          }
        }
      }

      renderer.render(scene, camera);
    }

    let modelsLoaded = 0;
    const totalModels = buildingModels.length;
    let modelsReady = false;

    preloadModels();
    animate();

    function preloadModels(options?: {
      skipIntro?: boolean;
      onComplete?: () => void;
    }) {
      const { skipIntro = false, onComplete } = options ?? {};

      modelsLoaded = 0;
      modelsReady = false;

      Object.keys(buildingGroups).forEach((key) => {
        delete buildingGroups[key];
      });

      buildingModels.forEach((name) => {
        const path = `/models/${name}.glb`;

        loader.load(path, (gltf: GLTF) => {
          const model = gltf.scene;

          if (name === "all_services" && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);

            gltf.animations.forEach((clip, index) => {
              console.log(`Playing clip ${index}: ${clip.name}`);

              const action = mixer!.clipAction(clip);
              action.reset();
              action.play();
            });
          }

          const videoScreenNames = ["l_type_led_screen", "l_type_led_screen_1"];

          model.traverse((obj: THREE.Object3D) => {
            if (obj.isMesh) {
              const mesh = obj as THREE.Mesh;
              storeOriginalMaterial(mesh);
            }

            if (obj.isMesh && obj.name === "Ground1") {
              const mesh = obj as THREE.Mesh;

              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat: any) => {
                  if (mat.color) {
                    mat.color.set("#b9b9b9");
                    mat.userData.originalColor = mat.color.clone();
                  }
                });
              } else {
                const material = mesh.material as any;
                if (material.color) {
                  material.color.set("#b9b9b9");
                  material.userData.originalColor = material.color.clone();
                }
              }
            }

            if (obj.name.endsWith("_grp")) {
              buildingGroups[obj.name] = obj;
            }

            if (obj.isMesh && videoScreenNames.includes(obj.name)) {
              const mesh = obj as THREE.Mesh;

              mesh.material = new THREE.MeshBasicMaterial({
                map: videoTexture,
                toneMapped: false,
                side: THREE.DoubleSide,
              });
            }
          });

          model.scale.set(1, 1, 1);
          model.position.set(0, 0, 0);
          model.rotation.set(0, 0, 0);
          model.visible = false;

          scene.add(model);
          modelCache[name] = model;

          if (name === "all_services") {
            model.visible = true;
            currentModel = model;
          }

          model.traverse((obj: any) => {
            if (obj.isMesh) {
              obj.frustumCulled = true;
              obj.castShadow = false;
              obj.receiveShadow = false;
            }
          });

          modelsLoaded++;

          if (modelsLoaded === totalModels) {
            modelsReady = true;
            console.log("All models loaded.");

            const finishLoad = () => {
              if (skipIntro) {
                introState.finished = true;
                introCanStart = false;
                onComplete?.();
                return;
              }

              if (ENABLE_INTRO) {
                introState.progress = 0;
                introState.finished = false;

                introRig.position.copy(introVisibleStartCameraPosition);
                introRig.target.copy(introVisibleStartTarget);

                camera.position.copy(introVisibleStartCameraPosition);
                controls.target.copy(introVisibleStartTarget);
                camera.lookAt(introVisibleStartTarget);

                introCanStart = true;
              } else {
                introState.finished = true;

                camera.position.copy(endCameraPosition);
                controls.target.copy(endTarget);
                camera.lookAt(endTarget);

                controls.enabled = true;
                controls.minDistance = 1;
                controls.maxDistance = 50;
                controls.minAzimuthAngle = -0.65;
                controls.maxAzimuthAngle = -0.55;

                targetAzimuth = controls.getAzimuthalAngle();
                targetPolar = controls.getPolarAngle();
              }

              onComplete?.();
            };

            if (!skipIntro && loaderRef.current) {
              loaderRef.current.style.opacity = "0";

              setTimeout(() => {
                if (!loaderRef.current) return;
                loaderRef.current.style.display = "none";
                finishLoad();
              }, 500);
            } else {
              finishLoad();
            }
          }
        });
      });
    }

    /* RESIZE */
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (event: MouseEvent) => {
      const newMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const newMouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      mouse.x = newMouseX;
      mouse.y = newMouseY;

      mouseDeltaX = THREE.MathUtils.clamp(newMouseX - prevMouseX, -0.05, 0.05);
      mouseDeltaY = THREE.MathUtils.clamp(newMouseY - prevMouseY, -0.05, 0.05);

      prevMouseX = newMouseX;
      prevMouseY = newMouseY;

      if (introState.finished) mouseMovedAfterIntro = true;

      // Detect movement
      isMouseMoving = true;

      if (mouseStopTimer) clearTimeout(mouseStopTimer);

      mouseStopTimer = setTimeout(() => {
        isMouseMoving = false;
      }, 150); // hover activates after mouse stops
    };

    window.addEventListener("mousemove", handleMouseMove);

    function loadRoadshowModule() {
      controls.enableZoom = false;

      import("./lib/roadshowModule").then((mod) => {
        mod.initRoadshow({
          scene,
          camera,
          controls,
          renderer,
        });
      });
    }

    function handleBackToMain() {
      if (disposeActiveModule) {
        disposeActiveModule();
        disposeActiveModule = null;
      }

      activeDestination = "backToMain";
      isReturningToMain = true;
      hoveredBuilding = null;
      mouseMovedAfterIntro = false;
      isMouseMoving = false;
      isUserControllingCamera = true;

      // freeze controls immediately so there is no settling / damping shake
      controls.enabled = false;
      controls.enableDamping = false;
      controls.update();

      // show main city immediately, no reload
      setMainSceneVisible(true);

      // start tween from exact current module camera state
      cameraRig.position.copy(camera.position);
      cameraRig.target.copy(controls.target);

      startFlyToTarget({
        camera,
        controls,
        rig: cameraRig,
        flyState,
        destinationPosition: endCameraPosition.clone(),
        destinationTarget: endTarget.clone(),
        duration: 2.8,
        ease: "power3.inOut",
      });
    }
function loadWallPaintingModule() {
  controls.enableZoom = false;

  import("./lib/wallPaintingModule").then((mod) => {
    disposeActiveModule = mod.initWallPainting({
      scene,
      camera,
      controls,
      renderer,
    });
  });
}

    function loadDigitalMarketingModule() {
      controls.enableZoom = false;

      import("./lib/digitalMarketingModule").then((mod) => {
        disposeActiveModule = mod.initDigitalMarketing({
          scene,
          camera,
          controls,
          renderer,
          onBackToMain: handleBackToMain,
        });
      });
    }

    function loadAdinnHQModule() {
      controls.enableZoom = false;

      import("./lib/adinnHQModule").then((mod) => {
        mod.initAdinnHQ({
          scene,
          camera,
          controls,
          renderer,
        });
      });
    }

    function loadMediaAdsModule() {
      controls.enableZoom = false;

      import("./lib/mediaAdsModule").then((mod) => {
        mod.initMediaAds({
          scene,
          camera,
          controls,
          renderer,
        });
      });
    }

    function loadSinageSideModule() {
      controls.enableZoom = false;

      import("./lib/sinageSideModule").then((mod) => {
        mod.initSinageSide({
          scene,
          camera,
          controls,
          renderer,
        });
      });
    }
    function loadFixturesModule() {
      controls.enableZoom = false;

      import("./lib/fixturesModule").then((mod) => {
        mod.initFixtures({
          scene,
          camera,
          controls,
          renderer,
        });
      });
    }

    function loadEventModule() {
      controls.enableZoom = false;

      import("./lib/eventModule").then((mod) => {
        mod.initEvent({
          scene,
          camera,
          controls,
          renderer,
        });
      });
    }

    function disposeModel(model: THREE.Object3D) {
      model.traverse((obj: any) => {
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

      scene.remove(model);
    }

    function getFocusTargetFromObject(obj: THREE.Object3D) {
      const box = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();

      box.getCenter(center);
      box.getSize(size);

      center.y += size.y * 0.2;
      return center;
    }

    const handleClick = (event: MouseEvent) => {
      const clickMouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      );

      raycaster.setFromCamera(clickMouse, camera);

      const intersects = raycaster.intersectObjects(
        Object.values(buildingGroups),
        true,
      );

      if (intersects.length === 0) return;

      let obj: THREE.Object3D | null = intersects[0].object;

      while (obj && !obj.name.endsWith("_grp")) {
        obj = obj.parent;
      }

      if (!obj) return;

      if (
        obj.name === "road_show_building_grp" ||
        obj.name === "wall_painting_building_grp" ||
        obj.name === "digital_marketing_building_grp" ||
        obj.name === "fixtures_building_grp" ||
        obj.name === "event_building_grp" ||
        obj.name === "adinn_hq_building_grp" ||
        obj.name === "media_ads_building_grp" ||
        obj.name === "sinage_side_building_grp"
      ) {
        console.log("✅ CLICK DETECTED:", obj.name);

        mouseMovedAfterIntro = false;
        hoveredBuilding = null;
        isMouseMoving = false;
        isUserControllingCamera = true;

        let destinationPosition: THREE.Vector3;
        let destinationTarget: THREE.Vector3;

        if (obj.name === "road_show_building_grp") {
          currentScreen = "roadshow";
          activeDestination = "roadshow";

          destinationPosition = cameraTargets.roadshow.position.clone();
          destinationTarget = cameraTargets.roadshow.target.clone();
        } else if (obj.name === "wall_painting_building_grp") {
          currentScreen = "wallPainting";
          activeDestination = "wallPainting";

          destinationPosition = cameraTargets.wallPainting.position.clone();
          destinationTarget = cameraTargets.wallPainting.target.clone();
        } else if (obj.name === "digital_marketing_building_grp") {
          currentScreen = "digitalMarketing";
          activeDestination = "digitalMarketing";

          destinationPosition = cameraTargets.digitalMarketing.position.clone();
          destinationTarget = cameraTargets.digitalMarketing.target.clone();
        } else if (obj.name === "fixtures_building_grp") {
          currentScreen = "fixtures";
          activeDestination = "fixtures";

          destinationPosition = cameraTargets.fixtures.position.clone();
          destinationTarget = cameraTargets.fixtures.target.clone();
        } else if (obj.name === "event_building_grp") {
          currentScreen = "event";
          activeDestination = "event";

          destinationPosition = cameraTargets.event.position.clone();
          destinationTarget = cameraTargets.event.target.clone();
        } else if (obj.name === "adinn_hq_building_grp") {
          currentScreen = "adinnHQ";
          activeDestination = "adinnHQ";

          destinationPosition = cameraTargets.adinnHQ.position.clone();
          destinationTarget = cameraTargets.adinnHQ.target.clone();
        } else if (obj.name === "media_ads_building_grp") {
          currentScreen = "mediaAds";
          activeDestination = "mediaAds";

          destinationPosition = cameraTargets.mediaAds.position.clone();
          destinationTarget = cameraTargets.mediaAds.target.clone();
        } else if (obj.name === "sinage_side_building_grp") {
          currentScreen = "sinageSide";
          activeDestination = "sinageSide";

          destinationPosition = cameraTargets.sinageSide.position.clone();
          destinationTarget = cameraTargets.sinageSide.target.clone();
        } else {
          return;
        }

        controls.enableZoom = true;

        startFlyToTarget({
          camera,
          controls,
          rig: cameraRig,
          flyState,
          destinationPosition,
          destinationTarget,
          duration: 2.5,
          ease: "power4.inOut",
        });

        controls.enabled = false;
        controls.enableDamping = false;
      }
    };

    window.addEventListener("click", handleClick);

    controls.addEventListener("start", () => {
      isUserControllingCamera = true;
    });

    controls.addEventListener("end", () => {
      setTimeout(() => {
        isUserControllingCamera = false;
      }, 100); // small delay prevents accidental hover switch
    });

    controls.addEventListener("change", () => {
      console.log(`
garageCameraPosition:
${camera.position.x},
${camera.position.y},
${camera.position.z}

garageTarget:
${controls.target.x},
${controls.target.y},
${controls.target.z}
  `);
    });
    function setMainSceneVisible(visible: boolean) {
      Object.values(modelCache).forEach((model) => {
        model.visible = visible;
      });
    }

    return () => {
      isDisposed = true;

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (flyState.tween) {
        flyState.tween.kill();
      }
      cancelAnimationFrame(animationId);

      controls.dispose();
      dracoLoader.dispose();

      video.pause();
      video.src = "";

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }

        if ((obj as THREE.Mesh).material) {
          const material = (obj as THREE.Mesh).material;

          if (Array.isArray(material)) {
            material.forEach((m) => m.dispose());
          } else {
            material.dispose();
          }
        }
      });

      if (renderer) renderer.dispose();

      if (mountRef.current && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <video
        ref={loaderRef}
        src="/adinn-loader.webm"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 5,
          transition: "opacity 0.5s ease",
        }}
      />

      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

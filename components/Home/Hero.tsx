//All completed
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { createThreeBase } from "./lib/threeSetup";
import { roadshowModule } from "./lib/roadshowModule";
export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    let currentScreen: "main" | "roadshow" = "main";
    if (!mountRef.current) return;
    const { scene, camera, renderer, controls } = createThreeBase(
      mountRef.current,
    );

    let mouseMovedAfterIntro = false;
    let targetAzimuth = 0;
    let targetPolar = 0;
    let isDisposed = false;
    let isMouseMoving = false;
    let mouseStopTimer: NodeJS.Timeout | null = null;

    const mouseRotationStrength = 0.35; // sensitivity
    const rotationSmooth = 0.05;

    // PARALLAX CAMERA
    const parallaxStrengthX = 2.5;
    const parallaxStrengthY = 1.2;

    const parallaxTarget = new THREE.Vector3();
    const parallaxCurrent = new THREE.Vector3();

    const parallaxSmooth = 0.05;

    let prevMouseX = 0;
    let prevMouseY = 0;
    let mouseDeltaX = 0;
    let mouseDeltaY = 0;
    /* SCENE */

    scene.background = new THREE.Color(0xa0d8f0);

    let isUserControllingCamera = false;
    /* CAMERA */

    const endCameraPosition = new THREE.Vector3(
      -28.13668254050927,
      21.167207849058023,
      33.25360768404889,
    );

    const endTarget = new THREE.Vector3(
      0.5485824189341167,
      0,
      -1.804984502194208,
    );

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

    /* CAMERA PATH */

    const cameraCurve = new THREE.CatmullRomCurve3([
      startCameraPosition,
      new THREE.Vector3(-15, 14, 10),
      endCameraPosition,
    ]);

    /* RENDERER */

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current?.appendChild(renderer.domElement);

    /* CONTROLS */

    camera.position.copy(startCameraPosition);
    controls.target.copy(startTarget);

    controls.enabled = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 50;

    controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
    controls.mouseButtons.LEFT = THREE.MOUSE.PAN;

    controls.minAzimuthAngle = -0.65; // left
    controls.maxAzimuthAngle = -0.55; // right

    controls.minPolarAngle = Math.PI / 2.45; // up
    controls.maxPolarAngle = Math.PI / 2.42; // down

    // /* HDRI */

    // const exrLoader = new EXRLoader();

    // exrLoader.load("/light-settings.exr", (texture: THREE.DataTexture) => {
    //   texture.mapping = THREE.EquirectangularReflectionMapping;
    //   scene.environment = texture;
    // });

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
    let currentModelName = "all_services";
    const modelCache: Record<string, THREE.Object3D> = {};
    let mixer: THREE.AnimationMixer | null = null;
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
    let roadTimer: NodeJS.Timeout | null = null;
    const ROAD_DELAY = 600; // 1.2 seconds

    const nonClickable = ["hq_back_dummy_building_grp"];

    const buildingModels = [
      "all_services",
      "adinn_hq_building_grp",
      "digital_marketing_building_grp",
      "event_building_grp",
      "fixtures_building_grp",
      "media_ads_building_grp",
      "road_show_building_grp",
      "sinage_side_building_grp",
      "wall_painting_building_grp",
      "ooh_building_grp",
    ];

    let mouseX = 0;
    let mouseY = 0;

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

        // Move camera with target so zoom doesn't change
        camera.position.add(delta);
      }
    }
    /* CAMERA INTRO */

    let introProgress = 0;
    const introDuration = 6;
    let introFinished = false;
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    const clock = new THREE.Clock();
    const cameraSpeed = 1.25;
    let animationId: number;
    function animate() {
      if (isDisposed) return;
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      /* CAMERA INTRO ANIMATION */

      if (currentScreen === "main" && introProgress < 1 && modelsReady) {
        introProgress += (delta * cameraSpeed) / introDuration;

        const t = Math.min(introProgress, 1);
        const easedT = easeInOutCubic(t);

        const curvePoint = cameraCurve.getPoint(easedT);
        camera.position.copy(curvePoint);

        const target = new THREE.Vector3();
        target.lerpVectors(startTarget, endTarget, easedT);

        controls.target.lerp(target, 0.08);
        if (t >= 1) {
          controls.enabled = true;
          introFinished = true;
          // LOCK ZOOM AFTER INTRO
          controls.minDistance = 50;
          controls.maxDistance = 50;
          mouse.set(999, 999);
          // mouse.set(0, 0);
          hoveredBuilding = null;

          targetAzimuth = controls.getAzimuthalAngle();
          targetPolar = controls.getPolarAngle();
        }
      }

      if (mixer) mixer.update(delta);

      limitPan();
      if (
        currentScreen === "main" &&
        modelsReady &&
        introFinished &&
        mouseMovedAfterIntro &&
        !isUserControllingCamera
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
      controls.update();

      /* ---------- HOVER DETECTION ---------- */

      if (
        currentScreen === "main" &&
        introFinished &&
        !isUserControllingCamera &&
        !isMouseMoving
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
              // switchModel(modelName);
            }
          }
        } else {
          hoveredBuilding = null;
          switchModel("all_services");
        }
      }
      /* ---------- FLOATING CAMERA ---------- */

      if (introProgress >= 1) {
        camera.position.x += Math.sin(clock.elapsedTime * 0.2) * 0.001;
        camera.position.y += Math.cos(clock.elapsedTime * 0.2) * 0.001;
      }

      renderer.render(scene, camera);
    }

    function switchModel(name: string) {
      if (name === currentModelName) return;

      const newModel = modelCache[name];
      const oldModel = modelCache[currentModelName];

      if (!newModel) return;

      if (oldModel) oldModel.visible = false;

      newModel.visible = true;

      currentModelName = name;
      currentModel = newModel;
    }

    let modelsLoaded = 0;
    const totalModels = buildingModels.length;
    let modelsReady = false;
    preloadModels();
    animate();
    function preloadModels() {
      buildingModels.forEach((name) => {
        const path = `/models/${name}.glb`;

        loader.load(path, (gltf: GLTF) => {
          const model = gltf.scene;

          model.traverse((obj: THREE.Object3D) => {
            /* change Ground1 color */ if (
              obj.isMesh &&
              obj.name === "Ground1"
            ) {
              const mesh = obj as THREE.Mesh;
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat: any) => {
                  if (mat.color) mat.color.set("#b9b9b9");
                });
              } else {
                const material = mesh.material as THREE.MeshStandardMaterial;
                material.color.set("#b9b9b9");
              }
            } /* change Ground1 color */

            if (obj.name.endsWith("_grp")) {
              buildingGroups[obj.name] = obj;
            }

            if (obj.isMesh && obj.name === "animation_led") {
              obj.material = new THREE.MeshBasicMaterial({
                map: videoTexture,
                emissive: new THREE.Color(0xffffff),
                emissiveMap: videoTexture,
                emissiveIntensity: 0.5,
                toneMapped: false,
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
            console.log("All models loaded. Starting intro animation.");

            if (loaderRef.current) {
              loaderRef.current.style.opacity = "0";
              setTimeout(() => {
                loaderRef.current!.style.display = "none";
              }, 500);
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

      if (introFinished) mouseMovedAfterIntro = true;

      // Detect movement
      isMouseMoving = true;

      if (mouseStopTimer) clearTimeout(mouseStopTimer);

      mouseStopTimer = setTimeout(() => {
        isMouseMoving = false;
      }, 150); // hover activates after mouse stops
    };
    window.addEventListener("mousemove", handleMouseMove);

    function loadRoadshowModule() {
      import("./lib/roadshowModule").then((mod) => {
        mod.initRoadshow({
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

    const handleClick = () => {
      if (!hoveredBuilding) return;

      const name = hoveredBuilding.name;
      if (name === "road_show_building_grp") {
        currentScreen = "roadshow";

        // ❌ STOP main screen mouse logic
        window.removeEventListener("mousemove", handleMouseMove);
         window.removeEventListener("click", handleClick);

        // ❌ STOP hover detection completely
        hoveredBuilding = null;

        // 🧹 clear models
        Object.values(modelCache).forEach((model) => {
          disposeModel(model);
        });

        for (const key in modelCache) {
          delete modelCache[key];
        }

        loadRoadshowModule();
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
      console.clear();

      console.log("PAN TARGET POSITION");
      console.log("X (Left / Right):", controls.target.x);
      console.log("Y (Up / Down):", controls.target.y);
      console.log("Z (Forward / Back):", controls.target.z);
    });
    return () => {
      isDisposed = true;

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);

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
      {/* Loader */}
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

      {/* ThreeJS Canvas */}
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

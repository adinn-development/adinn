"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let renderer: THREE.WebGLRenderer | null = null;
    let mouseMovedAfterIntro = false;
    /* SCENE */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0d8f0);

    /* CAMERA */

    const camera = new THREE.PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );

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

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current?.appendChild(renderer.domElement);

    /* CONTROLS */

    const controls = new OrbitControls(camera, renderer.domElement);

    camera.position.copy(startCameraPosition);
    controls.target.copy(startTarget);

    controls.enabled = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 25;
    controls.maxDistance = 50;

    controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
    controls.mouseButtons.LEFT = THREE.MOUSE.PAN;

    controls.minAzimuthAngle = Math.PI / 0.7;
    controls.maxAzimuthAngle = Math.PI / 2;

    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.4;

    /* HDRI */

    const exrLoader = new EXRLoader();

    exrLoader.load("/light-settings.exr", (texture: THREE.DataTexture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

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
      const minX = -10;
      const maxX = 10;
      const minZ = -1;
      const maxZ = 5;

      const minY = -5;
      const maxY = 10;

      controls.target.x = Math.max(minX, Math.min(maxX, controls.target.x));
      controls.target.y = Math.max(minY, Math.min(maxY, controls.target.y));
      controls.target.z = Math.max(minZ, Math.min(maxZ, controls.target.z));
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
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      /* CAMERA INTRO ANIMATION */

      if (introProgress < 1) {
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
           mouse.set(999, 999);
            hoveredBuilding = null;
        }
      }

      if (mixer) mixer.update(delta);

      controls.update();

      /* ---------- HOVER DETECTION ---------- */
      if (introFinished && mouseMovedAfterIntro) {
        const groups = Object.values(buildingGroups);

        if (groups.length > 0) {
          raycaster.setFromCamera(mouse, camera);

          const buildingIntersects = raycaster.intersectObjects(groups, true);
          const groundIntersects = raycaster.intersectObject(groundPlane);

          if (buildingIntersects.length > 0) {
            if (roadTimer) {
              clearTimeout(roadTimer);
              roadTimer = null;
            }
            document.body.style.cursor = "pointer";

            let building: THREE.Object3D | null = buildingIntersects[0].object;

            while (building && !building.name.endsWith("_grp")) {
              building = building.parent;
            }

            if (!building) {
              renderer.render(scene, camera);
              return;
            }

            if (nonClickable.includes(building.name)) {
              if (currentModelName !== "all_services") {
                switchModel("all_services");
              }

              hoveredBuilding = null;

              return;
            }
            if (building !== hoveredBuilding) {
              hoveredBuilding = building;

              const modelName = building.name;

              switchModel(modelName);
            }
          } else {
            document.body.style.cursor = "default";

            if (groundIntersects.length > 0) {
              if (hoveredBuilding !== null) {
                hoveredBuilding = null;

                if (roadTimer) clearTimeout(roadTimer);

                roadTimer = setTimeout(() => {
                  if (currentModelName !== "all_services") {
                    switchModel("all_services");
                  }
                }, ROAD_DELAY);
              }
            }
          }
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
                  if (mat.color) mat.color.set("#F1F0F0");
                });
              } else {
                const material = mesh.material as THREE.MeshStandardMaterial;
                material.color.set("#F1F0F0");
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
        });
      });
    }
    preloadModels();
    animate();

    /* RESIZE */

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (introFinished) {
        mouseMovedAfterIntro = true;
      }
    });

    window.addEventListener("click", () => {
      if (!hoveredBuilding) return;

      if (nonClickable.includes(hoveredBuilding.name)) return;

      // alert("Clicked Building : " + hoveredBuilding.name);
    });

    return () => {
      window.removeEventListener("resize", handleResize);

      cancelAnimationFrame(animationId);

      controls.dispose();
      dracoLoader.dispose();
      if (renderer) renderer.dispose();

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    />
  );
}

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { setupRoadshow } from "./modules/roadshowModule";

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    /* ---------------- SCENE ---------------- */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0d8f0);

    /* ---------------- CAMERA ---------------- */
    const camera = new THREE.PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    camera.position.set(-28, 21, 33);

    /* ---------------- RENDERER ---------------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current.appendChild(renderer.domElement);

    /* ---------------- CONTROLS ---------------- */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    /* ---------------- HDR ---------------- */
    new EXRLoader().load("/light-settings.exr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    /* ---------------- LOADERS ---------------- */
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(draco);

    /* ---------------- STATE ---------------- */
    let mainModel: THREE.Object3D;
    let currentSubModel: THREE.Object3D | null = null;

    const buildingGroups: Record<string, THREE.Object3D> = {};

    /* ---------------- LOAD MAIN MODEL ---------------- */
    loader.load("/models/all_services.glb", (gltf) => {
      mainModel = gltf.scene;
      scene.add(mainModel);

      mainModel.traverse((obj: any) => {
        if (obj.name.endsWith("_grp")) {
          buildingGroups[obj.name] = obj;
        }
      });
    });

    /* ---------------- SWITCH MODEL ---------------- */
    let cleanupSubModel: (() => void) | null = null;

    function loadSubModel(name: string) {
      // cleanup previous
      if (cleanupSubModel) {
        cleanupSubModel();
        cleanupSubModel = null;
      }

      if (currentSubModel) {
        scene.remove(currentSubModel);
        currentSubModel = null;
      }

      mainModel.visible = false;

      if (name === "road_show_building_grp") {
        cleanupSubModel = setupRoadshow(scene, camera, controls, (model) => {
          currentSubModel = model;
        });
      }
    }
    /* ---------------- BACK TO MAIN ---------------- */
    function backToMain() {
      if (cleanupSubModel) {
        cleanupSubModel();
        cleanupSubModel = null;
      }

      if (currentSubModel) {
        scene.remove(currentSubModel);
        currentSubModel = null;
      }

      mainModel.visible = true;
    }

    /* ---------------- CLICK ---------------- */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("click", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(
        Object.values(buildingGroups),
        true,
      );

      if (intersects.length > 0) {
        let obj: any = intersects[0].object;

        while (obj && !obj.name.endsWith("_grp")) {
          obj = obj.parent;
        }

        if (obj) {
          loadSubModel(obj.name);
        }
      }
    });

    /* ---------------- ANIMATE ---------------- */
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    /* ---------------- RESIZE ---------------- */
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}

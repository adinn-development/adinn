"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let animationId: number;

    /* SCENE */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0d8f0);

    /* CAMERA */
    const camera = new THREE.PerspectiveCamera(
      15,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(60, 20, 60);

    /* RENDERER */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current.appendChild(renderer.domElement);

    /* CONTROLS */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    controls.minDistance = 55;
    controls.maxDistance = 72;

    controls.minPolarAngle = Math.PI / 2.45;
    controls.maxPolarAngle = Math.PI / 2.3;

    /* HDR */
    new EXRLoader().load("/light-settings.exr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    /* MODEL */
    let vehicles: THREE.Object3D[] = [];

    new GLTFLoader().load("/models/roadshow.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      const v1 = model.getObjectByName("vehicle_1");
      const v2 = model.getObjectByName("vehicle_2");
      const v3 = model.getObjectByName("vehicle_3");

      vehicles = [v1, v2, v3].filter(Boolean) as THREE.Object3D[];
    });

    /* RAYCASTER */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let selectedObject: THREE.Object3D | null = null;
    let isDragging = false;
    let prevMouseX = 0;

    function onMouseDown(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(vehicles, true);

      if (intersects.length > 0) {
        selectedObject = intersects[0].object;

        while (
          selectedObject &&
          !vehicles.includes(selectedObject) &&
          selectedObject.parent
        ) {
          selectedObject = selectedObject.parent;
        }

        isDragging = true;
        prevMouseX = event.clientX;

        controls.enabled = false;
      }
    }

    function onMouseMove(event: MouseEvent) {
      if (!isDragging || !selectedObject) return;

      const deltaX = event.clientX - prevMouseX;
      prevMouseX = event.clientX;

      // ✅ FIX: rotate in WORLD Y axis (pure left-right)
      selectedObject.rotateOnWorldAxis(
        new THREE.Vector3(0, 1, 0),
        deltaX * 0.01
      );
    }

    function onMouseUp() {
      isDragging = false;
      selectedObject = null;
      controls.enabled = true;
    }

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    /* PAN LIMIT */
    function limitPan() {
      const target = controls.target;

      const clamped = new THREE.Vector3(
        THREE.MathUtils.clamp(target.x, -2.3, 12.6),
        THREE.MathUtils.clamp(target.y, -6.4, 7.4),
        THREE.MathUtils.clamp(target.z, -14.7, -0.3)
      );

      if (!target.equals(clamped)) {
        const delta = clamped.clone().sub(target);
        target.copy(clamped);
        camera.position.add(delta);
      }
    }

    /* ANIMATION */
    function animate() {
      animationId = requestAnimationFrame(animate);

      limitPan();
      controls.update();

      renderer.render(scene, camera);
    }
    animate();

    /* RESIZE */
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    /* CLEANUP */
    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      controls.dispose();

      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();

        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
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
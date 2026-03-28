import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type CameraRig = {
  position: THREE.Vector3;
  target: THREE.Vector3;
};

export type FlyState = {
  isFlying: boolean;
  progress: number;
  duration: number;
  startPosition: THREE.Vector3;
  startTarget: THREE.Vector3;
  endPosition: THREE.Vector3;
  endTarget: THREE.Vector3;
  tween: gsap.core.Tween | null;
  justCompleted: boolean;
};

export function createCameraRig(
  startPosition: THREE.Vector3,
  startTarget: THREE.Vector3,
): CameraRig {
  // compatibility only
  return {
    position: startPosition.clone(),
    target: startTarget.clone(),
  };
}

export function createFlyState(duration = 2.35): FlyState {
  return {
    isFlying: false,
    progress: 0,
    duration,
    startPosition: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endPosition: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    tween: null,
    justCompleted: false,
  };
}

export function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function applyCameraRig(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  rig: CameraRig,
) {
  camera.position.copy(rig.position);
  controls.target.copy(rig.target);
  camera.lookAt(rig.target);
}

export function startFlyToTarget(params: {
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  rig: CameraRig;
  flyState: FlyState;
  destinationPosition: THREE.Vector3;
  destinationTarget: THREE.Vector3;
  duration?: number;
  ease?: string;
}) {
  const {
    camera,
    controls,
    flyState,
    destinationPosition,
    destinationTarget,
    duration,
    ease,
  } = params;

  if (flyState.tween) {
    flyState.tween.kill();
    flyState.tween = null;
  }

  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(controls.target);

  flyState.isFlying = true;
  flyState.justCompleted = false;
  flyState.progress = 0;

  flyState.startPosition.copy(camera.position);
  flyState.startTarget.copy(controls.target);

  flyState.endPosition.copy(destinationPosition);
  flyState.endTarget.copy(destinationTarget);

  const tweenState = {
    px: camera.position.x,
    py: camera.position.y,
    pz: camera.position.z,
    tx: controls.target.x,
    ty: controls.target.y,
    tz: controls.target.z,
  };

  flyState.tween = gsap.to(tweenState, {
    px: destinationPosition.x,
    py: destinationPosition.y,
    pz: destinationPosition.z,
    tx: destinationTarget.x,
    ty: destinationTarget.y,
    tz: destinationTarget.z,
    duration: duration ?? flyState.duration,
    ease: ease ?? "power3.inOut",
    overwrite: "auto",
    onUpdate: () => {
      camera.position.set(
        tweenState.px,
        tweenState.py,
        tweenState.pz,
      );

      controls.target.set(
        tweenState.tx,
        tweenState.ty,
        tweenState.tz,
      );

      camera.lookAt(controls.target);

      if (flyState.tween) {
        flyState.progress = flyState.tween.progress();
      }
    },
    onComplete: () => {
      camera.position.copy(destinationPosition);
      controls.target.copy(destinationTarget);
      camera.lookAt(destinationTarget);

      flyState.progress = 1;
      flyState.isFlying = false;
      flyState.justCompleted = true;
      flyState.tween = null;
    },
  });
}

export function updateFlyAnimation(params: {
  delta: number;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  rig: CameraRig;
  flyState: FlyState;
}) {
  const { camera, controls, flyState } = params;

  if (flyState.isFlying) {
    camera.lookAt(controls.target);
    return false;
  }

  if (flyState.justCompleted) {
    flyState.justCompleted = false;
    return true;
  }

  return false;
}
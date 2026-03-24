import * as THREE from "three";
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
};

export function createCameraRig(
  startPosition: THREE.Vector3,
  startTarget: THREE.Vector3,
): CameraRig {
  return {
    position: startPosition.clone(),
    target: startTarget.clone(),
  };
}

export function createFlyState(duration = 2): FlyState {
  return {
    isFlying: false,
    progress: 0,
    duration,
    startPosition: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endPosition: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
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
}) {
  const {
    camera,
    controls,
    rig,
    flyState,
    destinationPosition,
    destinationTarget,
  } = params;

  flyState.isFlying = true;
  flyState.progress = 0;

  flyState.startPosition.copy(camera.position);
  flyState.startTarget.copy(controls.target);

  flyState.endPosition.copy(destinationPosition);
  flyState.endTarget.copy(destinationTarget);

  rig.position.copy(flyState.startPosition);
  rig.target.copy(flyState.startTarget);
}

export function updateFlyAnimation(params: {
  delta: number;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  rig: CameraRig;
  flyState: FlyState;
}) {
  const { delta, camera, controls, rig, flyState } = params;

  if (!flyState.isFlying) return false;

  flyState.progress += delta / flyState.duration;

  const t = Math.min(flyState.progress, 1);
  const easedT = easeInOutSine(t);

  rig.position.lerpVectors(
    flyState.startPosition,
    flyState.endPosition,
    easedT,
  );

  rig.target.lerpVectors(
    flyState.startTarget,
    flyState.endTarget,
    easedT,
  );

  applyCameraRig(camera, controls, rig);

  if (t >= 0.999) {
    flyState.isFlying = false;
    rig.position.copy(flyState.endPosition);
    rig.target.copy(flyState.endTarget);
    applyCameraRig(camera, controls, rig);
    return true;
  }

  return false;
}
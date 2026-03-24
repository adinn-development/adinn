import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type IntroCameraState = {
  progress: number;
  duration: number;
  finished: boolean;
  startPosition: THREE.Vector3;
  endPosition: THREE.Vector3;
  startTarget: THREE.Vector3;
  endTarget: THREE.Vector3;
};

export type IntroCameraRig = {
  position: THREE.Vector3;
  target: THREE.Vector3;
};

export function createIntroRig(
  startCameraPosition: THREE.Vector3,
  startTarget: THREE.Vector3,
): IntroCameraRig {
  return {
    position: startCameraPosition.clone(),
    target: startTarget.clone(),
  };
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function createIntroState(params: {
  startCameraPosition: THREE.Vector3;
  endCameraPosition: THREE.Vector3;
  startTarget: THREE.Vector3;
  endTarget: THREE.Vector3;
  duration?: number;
}): IntroCameraState {
  const {
    startCameraPosition,
    endCameraPosition,
    startTarget,
    endTarget,
    duration = 6,
  } = params;

  return {
    progress: 0,
    duration,
    finished: false,
    startPosition: startCameraPosition.clone(),
    endPosition: endCameraPosition.clone(),
    startTarget: startTarget.clone(),
    endTarget: endTarget.clone(),
  };
}

export function applyIntroRig(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  rig: IntroCameraRig,
) {
  camera.position.copy(rig.position);
  controls.target.copy(rig.target);
  camera.lookAt(rig.target);
}

export function updateIntroAnimation(params: {
  delta: number;
  cameraSpeed: number;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  introState: IntroCameraState;
  introRig: IntroCameraRig;
}) {
  const { delta, cameraSpeed, camera, controls, introState, introRig } = params;

  if (introState.finished) return true;

  introState.progress += (delta * cameraSpeed) / introState.duration;

  const t = Math.min(introState.progress, 1);
  const easedT = easeInOutCubic(t);

  introRig.position.lerpVectors(
    introState.startPosition,
    introState.endPosition,
    easedT,
  );

  introRig.target.lerpVectors(
    introState.startTarget,
    introState.endTarget,
    easedT,
  );

  applyIntroRig(camera, controls, introRig);

  if (t >= 1) {
    introState.finished = true;

    introRig.position.copy(introState.endPosition);
    introRig.target.copy(introState.endTarget);
    applyIntroRig(camera, controls, introRig);

    return true;
  }

  return false;
}
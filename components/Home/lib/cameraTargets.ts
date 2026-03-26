import * as THREE from "three";

export type CameraTargetConfig = {
  position: THREE.Vector3;
  target: THREE.Vector3;
};

export const cameraTargets: Record<string, CameraTargetConfig> = {
  roadshow: {
    position: new THREE.Vector3(
      -16.651605760184015,
      6.8,
      16.2,
    ),
    target: new THREE.Vector3(-2.3, 1.0, -3),
  },

 wallPainting: {
    position: new THREE.Vector3(
      -11.841159988826876,
      2.96936501008872,
      14.932631746264693,
    ),
    target: new THREE.Vector3(
      -3.2358771168348617,
      2.691942038887839,
      3.4864535730775468,
    ),
  },
};
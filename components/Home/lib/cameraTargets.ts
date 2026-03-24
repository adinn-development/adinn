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

  // future services
  // hq: {
  //   position: new THREE.Vector3(...),
  //   target: new THREE.Vector3(...),
  // },
  // mediaAds: {
  //   position: new THREE.Vector3(...),
  //   target: new THREE.Vector3(...),
  // },
};
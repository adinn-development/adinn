import * as THREE from "three";

export type CameraTargetConfig = {
  position: THREE.Vector3;
  target: THREE.Vector3;
};

export const cameraTargets: Record<string, CameraTargetConfig> = {
  roadshow: {
    position: new THREE.Vector3(-16.651605760184015, 6.8, 16.2),
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

  digitalMarketing: {
    position: new THREE.Vector3(
      -7.3771064604067895,
      4.538773150841211,
      16.53152625774275,
    ),
    target: new THREE.Vector3(
      1.8173932258873564,
      -3.269266320232634e-17,
      3.1518557902791082,
    ),
  },

  fixtures: {
    position: new THREE.Vector3(
      -7.429264986539309,
      4.217257581676869,
      9.44234572930943,
    ),
    target: new THREE.Vector3(
      1.6995825782370575,
      3.0244508485889363e-19,
      -2.5660661861958483,
    ),
  },

  event: {
    position: new THREE.Vector3(
      6.964541968847004,
      1.3622833748347147,
      14.450129034010697,
    ),
    target: new THREE.Vector3(
      3.8341241764816263,
      -5.795819418764129e-19,
      -1.3231030714503371,
    ),
  },
};

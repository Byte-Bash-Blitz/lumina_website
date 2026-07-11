import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/** Target visual height (world units) every GLB is normalized to. */
export const TARGET_HEIGHT = 2.2;

const BONE_KEYWORD_MAP = {
  head: ["head"],
  tail: ["tail"],
  leftWing: ["wing_l", "wingleft", "wing.l", "leftwing", "wing_left"],
  rightWing: ["wing_r", "wingright", "wing.r", "rightwing", "wing_right"],
  wing: ["wing"],
  flowerCrown: ["flower", "crown", "flowercrown"],
  leftEye: ["eye_l", "eyeleft", "eye.l", "lefteye", "eye_left"],
  rightEye: ["eye_r", "eyeright", "eye.r", "righteye", "eye_right"],
  eye: ["eye"],
};

function matchesAny(name, keywords) {
  const lower = name.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

/**
 * Walk the loaded scene graph looking for bones/objects we can animate.
 * Anything not found is simply left `null` — every consumer must treat
 * these as optional and skip safely.
 */
function discoverRig(root) {
  const rig = {
    head: null,
    tail: null,
    leftWing: null,
    rightWing: null,
    wings: [],
    flowerCrown: null,
    leftEye: null,
    rightEye: null,
    eyes: [],
    morphMeshes: [],
  };

  root.traverse((node) => {
    if (!node.name) return;

    if (node.isBone || node.isObject3D) {
      if (!rig.head && matchesAny(node.name, BONE_KEYWORD_MAP.head)) {
        rig.head = node;
      }
      if (!rig.tail && matchesAny(node.name, BONE_KEYWORD_MAP.tail)) {
        rig.tail = node;
      }
      if (!rig.leftWing && matchesAny(node.name, BONE_KEYWORD_MAP.leftWing)) {
        rig.leftWing = node;
      }
      if (!rig.rightWing && matchesAny(node.name, BONE_KEYWORD_MAP.rightWing)) {
        rig.rightWing = node;
      }
      if (matchesAny(node.name, BONE_KEYWORD_MAP.wing)) {
        if (
          node !== rig.leftWing &&
          node !== rig.rightWing &&
          !rig.wings.includes(node)
        ) {
          rig.wings.push(node);
        }
      }
      if (!rig.flowerCrown && matchesAny(node.name, BONE_KEYWORD_MAP.flowerCrown)) {
        rig.flowerCrown = node;
      }
      if (!rig.leftEye && matchesAny(node.name, BONE_KEYWORD_MAP.leftEye)) {
        rig.leftEye = node;
      }
      if (!rig.rightEye && matchesAny(node.name, BONE_KEYWORD_MAP.rightEye)) {
        rig.rightEye = node;
      }
      if (matchesAny(node.name, BONE_KEYWORD_MAP.eye)) {
        if (
          node !== rig.leftEye &&
          node !== rig.rightEye &&
          !rig.eyes.includes(node)
        ) {
          rig.eyes.push(node);
        }
      }
    }

    if (node.isMesh) {
      // Soft shadows + light response tweaks.
      node.castShadow = true;
      node.receiveShadow = false;

      if (node.material) {
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        materials.forEach((mat) => {
          if ("envMapIntensity" in mat) mat.envMapIntensity = 1.0;
          // Prevent blown-out highlights from unlit/emissive exports.
          if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
        });
      }

      if (node.morphTargetDictionary) {
        rig.morphMeshes.push(node);
      }
    }
  });

  if (rig.leftWing) rig.wings.unshift(rig.leftWing);
  if (rig.rightWing) rig.wings.unshift(rig.rightWing);
  if (rig.leftEye) rig.eyes.unshift(rig.leftEye);
  if (rig.rightEye) rig.eyes.unshift(rig.rightEye);

  return rig;
}

/**
 * Center the model at the origin (feet on the floor plane) and uniformly
 * scale it so its height matches TARGET_HEIGHT. No manual scale values —
 * everything is derived from the model's own bounding box.
 */
function normalizeTransform(root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const height = size.y || 1;
  const scale = TARGET_HEIGHT / height;
  root.scale.setScalar(scale);

  // Recompute the box after scaling to place feet at y = 0 and center on X/Z.
  const scaledBox = new THREE.Box3().setFromObject(root);
  const scaledCenter = new THREE.Vector3();
  scaledBox.getCenter(scaledCenter);

  root.position.x -= scaledCenter.x;
  root.position.z -= scaledCenter.z;
  root.position.y -= scaledBox.min.y;

  return { scale, height };
}

let dracoLoader = null;
function getDracoLoader() {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
  }
  return dracoLoader;
}

/**
 * Attempt to load the mascot GLB from one of several candidate folders
 * ("Model" or "models"), resolving with a normalized root group + rig.
 *
 * @param {string[]} candidatePaths
 * @param {(progress: number) => void} [onProgress] 0..1
 * @returns {Promise<{ root: THREE.Group, rig: object, scale: number }>}
 */
export function loadMascotModel(candidatePaths, onProgress) {
  const loader = new GLTFLoader();
  loader.setDRACOLoader(getDracoLoader());

  const tryLoad = (paths, index) => {
    if (index >= paths.length) {
      return Promise.reject(new Error("LuminaMascot: no GLB found at any candidate path."));
    }

    const path = paths[index];

    return new Promise((resolve, reject) => {
      loader.load(
        path,
        (gltf) => resolve(gltf),
        (event) => {
          if (onProgress && event.total) {
            onProgress(Math.min(1, event.loaded / event.total));
          } else if (onProgress) {
            onProgress(0.5);
          }
        },
        (error) => reject(error)
      );
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(`LuminaMascot: failed to load "${path}", trying next candidate.`, err?.message || err);
      return tryLoad(paths, index + 1);
    });
  };

  return tryLoad(candidatePaths, 0).then((gltf) => {
    const root = new THREE.Group();
    root.name = "LuminaMascotRoot";
    gltf.scene.traverse((node) => {
    if (node.isMesh) {
        node.material.wireframe = true;
    }
    });

    root.add(gltf.scene);

    const { scale } = normalizeTransform(gltf.scene);

    // Rotate mascot to face the camera
    gltf.scene.rotation.y = -Math.PI / 2;

    const rig = discoverRig(gltf.scene);

    return { root, rig, scale, gltf };
  });
}

export const DEFAULT_MODEL_CANDIDATES = [
  "/Model/lumina-cat.glb",
  "/models/lumina-cat.glb",
];

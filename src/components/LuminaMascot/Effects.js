import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const BLOOM_STRENGTH = 0.25;
const BLOOM_THRESHOLD = 0.9;
const BLOOM_RADIUS = 0.15;

/**
 * Effects.js
 * Very subtle bloom so the rim light + eyes get a soft glow without ever
 * overexposing the mascot.
 */
export function createEffectComposer(renderer, scene, camera, width, height) {
  const composer = new EffectComposer(renderer);
  composer.setSize(width, height);
  composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    BLOOM_STRENGTH,
    BLOOM_RADIUS,
    BLOOM_THRESHOLD
  );
  composer.addPass(bloomPass);

  return { composer, bloomPass };
}

export function resizeComposer(composer, width, height) {
  if (!composer) return;
  composer.setSize(width, height);
}

/** Brief, gentle bloom pulse for click feedback. */
export function pulseBloom(bloomPass, strength = 1) {
  if (!bloomPass) return;
  bloomPass.strength = BLOOM_STRENGTH + 0.18 * strength;
}

export function settleBloom(bloomPass, dt) {
  if (!bloomPass) return;
  bloomPass.strength = THREE.MathUtils.damp(bloomPass.strength, BLOOM_STRENGTH, 5, dt);
}

export const BLOOM_DEFAULTS = { BLOOM_STRENGTH, BLOOM_THRESHOLD, BLOOM_RADIUS };

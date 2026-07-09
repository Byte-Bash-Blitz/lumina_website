import * as THREE from "three";

/**
 * Lighting.js
 * Professional, restrained studio lighting rig tuned to avoid overexposure.
 * Returns handles so AnimationController can nudge intensities slightly on
 * hover/click without touching scene setup elsewhere.
 */
export function setupLighting(scene) {
  const lights = {};

  // Soft overall fill so nothing is ever fully black.
  lights.ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(lights.ambient);

  // Sky/ground color bounce — cool blue sky, warm ground bounce.
  lights.hemisphere = new THREE.HemisphereLight(0xbfe0ff, 0xffdcb0, 0.55);
  scene.add(lights.hemisphere);

  // Key light — soft shadow caster.
  lights.key = new THREE.DirectionalLight(0xfff3e0, 1.1);
  lights.key.position.set(2.4, 3.6, 2.8);
  lights.key.castShadow = true;
  lights.key.shadow.mapSize.set(1024, 1024);
  lights.key.shadow.camera.near = 0.5;
  lights.key.shadow.camera.far = 12;
  lights.key.shadow.camera.left = -2;
  lights.key.shadow.camera.right = 2;
  lights.key.shadow.camera.top = 2;
  lights.key.shadow.camera.bottom = -2;
  lights.key.shadow.bias = -0.0015;
  lights.key.shadow.radius = 4;
  scene.add(lights.key);

  // Cool blue rim light from behind to separate mascot from background.
  lights.rim = new THREE.DirectionalLight(0x8ec9ff, 0.6);
  lights.rim.position.set(-2.2, 2.0, -3.0);
  scene.add(lights.rim);

  // Warm low fill from the front-bottom to soften shadows on the face.
  lights.fill = new THREE.PointLight(0xffcf9e, 0.4, 8, 2);
  lights.fill.position.set(-1.2, 0.6, 2.2);
  scene.add(lights.fill);

  return lights;
}

/** Subtle glow pulse used on click — briefly nudges rim + fill intensity. */
export function pulseLights(lights, strength = 1) {
  if (!lights) return;
  const baseRim = 0.6;
  const baseFill = 0.4;
  lights.rim.intensity = baseRim + 0.35 * strength;
  lights.fill.intensity = baseFill + 0.25 * strength;
}

export function settleLights(lights, dt) {
  if (!lights) return;
  const baseRim = 0.6;
  const baseFill = 0.4;
  lights.rim.intensity = THREE.MathUtils.damp(lights.rim.intensity, baseRim, 4, dt);
  lights.fill.intensity = THREE.MathUtils.damp(lights.fill.intensity, baseFill, 4, dt);
}

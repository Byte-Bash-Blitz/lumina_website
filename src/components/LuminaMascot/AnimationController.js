import * as THREE from "three";
import { floatOffset, breathingScale } from "./useFloat.js";

const HEAD_MAX = THREE.MathUtils.degToRad(15);
const EYE_MAX = THREE.MathUtils.degToRad(4);
const TAIL_MAX = THREE.MathUtils.degToRad(10);
const WING_MAX = THREE.MathUtils.degToRad(7);
const HOVER_SCALE = 1.03;

let sparkleTexture = null;
function getSparkleTexture() {
  if (sparkleTexture) return sparkleTexture;

  const size = 48;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.5, "rgba(255,240,200,0.7)");
  gradient.addColorStop(1, "rgba(255,240,200,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  sparkleTexture = new THREE.CanvasTexture(canvas);
  return sparkleTexture;
}

/** Small self-contained burst of sparkles spawned on click. */
class SparkleBurst {
  constructor(scene, origin, count = 8) {
    this.scene = scene;
    this.alive = true;
    this.age = 0;
    this.duration = 0.7;

    this.sprites = [];
    const colors = [0xffffff, 0x8ec9ff, 0xfbbf24];

    for (let i = 0; i < count; i += 1) {
      const material = new THREE.SpriteMaterial({
        map: getSparkleTexture(),
        color: colors[i % colors.length],
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 1,
      });
      const sprite = new THREE.Sprite(material);
      const scale = 0.05 + Math.random() * 0.04;
      sprite.scale.setScalar(scale);
      sprite.position.copy(origin);

      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 0.6 + Math.random() * 0.5;
      sprite.userData.velocity = new THREE.Vector3(
        Math.cos(angle) * speed,
        Math.random() * 0.8 + 0.3,
        Math.sin(angle) * speed
      );

      scene.add(sprite);
      this.sprites.push(sprite);
    }
  }

  update(dt) {
    this.age += dt;
    const t = Math.min(1, this.age / this.duration);

    this.sprites.forEach((sprite) => {
      const vel = sprite.userData.velocity;
      sprite.position.addScaledVector(vel, dt);
      vel.y -= dt * 1.2; // gentle gravity
      sprite.material.opacity = 1 - t;
    });

    if (this.age >= this.duration) {
      this.dispose();
    }
  }

  dispose() {
    this.alive = false;
    this.sprites.forEach((sprite) => {
      sprite.material.dispose();
      if (sprite.parent) sprite.parent.remove(sprite);
    });
    this.sprites = [];
  }
}

/**
 * AnimationController.js
 * Orchestrates every idle/interactive animation on the loaded rig.
 * Every bone reference is optional — missing bones are skipped silently.
 */
export class AnimationController {
  constructor(scene, { root, rig }) {
    this.scene = scene;
    this.root = root;
    this.rig = rig;

    this.hoverTarget = 0; // 0..1
    this.hoverScale = 1;
    this.clickBounce = 0; // decays after a click
    this.baseScale = root.scale.x || 1;

    this.floatY = 0;

    this.blinkTimer = this._nextBlinkDelay();
    this.blinkProgress = 0;
    this.isBlinking = false;

    this.mouseNormalized = { x: 0, y: 0 };
    this.bursts = [];
  }

  _nextBlinkDelay() {
    return 4 + Math.random() * 4; // 4-8 seconds
  }

  setHover(isHovering) {
    this.hoverTarget = isHovering ? 1 : 0;
  }

  setMouse(mouse) {
    if (mouse && mouse.inside) {
      this.mouseNormalized = { x: mouse.x, y: mouse.y };
    } else {
      this.mouseNormalized = { x: 0, y: 0 };
    }
  }

  triggerClick(worldOrigin) {
    this.clickBounce = 1;
    this.bursts.push(new SparkleBurst(this.scene, worldOrigin, 8));
  }

  update(elapsed, dt) {
    const { rig } = this;

    // --- Idle float + breathing -------------------------------------
    this.floatY = floatOffset(elapsed, 0.08, 1.1);
    const breathe = breathingScale(elapsed, 0.85);

    // --- Hover + click scale feedback ---------------------------------
    this.hoverScale = THREE.MathUtils.damp(this.hoverScale, this.hoverTarget, 6, dt);
    this.clickBounce = THREE.MathUtils.damp(this.clickBounce, 0, 5, dt);

    const clickPunch = 1 + Math.sin(Math.min(1, this.clickBounce) * Math.PI) * 0.06 * this.clickBounce;
    const hoverMultiplier = 1 + (HOVER_SCALE - 1) * this.hoverScale;

    const finalScale = this.baseScale * breathe * hoverMultiplier * clickPunch;
    this.root.scale.setScalar(finalScale);

    // Float + tiny body sway (independent of the mouse-driven yaw/pitch,
    // which MouseController owns on rotation.x / rotation.y).
    this.root.position.y = this.floatY + Math.sin(elapsed * 0.9) * 0.02 * 0 + this._bounceLift();
    this.root.rotation.z = Math.sin(elapsed * 0.7) * THREE.MathUtils.degToRad(1.5);

    // --- Head follow -----------------------------------------------
    if (rig.head) {
      const targetYaw = -this.mouseNormalized.x * HEAD_MAX;
      const targetPitch = this.mouseNormalized.y * HEAD_MAX * 0.6;
      rig.head.rotation.y = THREE.MathUtils.damp(rig.head.rotation.y || 0, targetYaw, 6, dt);
      rig.head.rotation.x = THREE.MathUtils.damp(rig.head.rotation.x || 0, targetPitch, 6, dt);
      // tiny idle head sway layered on top
      rig.head.rotation.z = Math.sin(elapsed * 1.3) * THREE.MathUtils.degToRad(1.2);
    }

    // --- Eyes look -----------------------------------------------------
    if (rig.eyes && rig.eyes.length) {
      const targetYaw = -this.mouseNormalized.x * EYE_MAX;
      const targetPitch = this.mouseNormalized.y * EYE_MAX;
      rig.eyes.forEach((eye) => {
        eye.rotation.y = THREE.MathUtils.damp(eye.rotation.y || 0, targetYaw, 8, dt);
        eye.rotation.x = THREE.MathUtils.damp(eye.rotation.x || 0, targetPitch, 8, dt);
      });
    }

    // --- Blinking (bone-based, falls back to morph target if present) --
    this._updateBlink(dt);

    // --- Tail swing ------------------------------------------------
    if (rig.tail) {
      rig.tail.rotation.z = Math.sin(elapsed * 1.1) * TAIL_MAX;
    }

    // --- Wing flap (slow, elegant) --------------------------------
    if (rig.wings && rig.wings.length) {
      rig.wings.forEach((wing, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        wing.rotation.z = dir * Math.sin(elapsed * 0.8 + i * 0.4) * WING_MAX;
      });
    }

    // --- Flower crown tiny bounce -----------------------------------
    if (rig.flowerCrown) {
      rig.flowerCrown.position.y =
        (rig.flowerCrown.userData._baseY ??
          (rig.flowerCrown.userData._baseY = rig.flowerCrown.position.y)) +
        Math.sin(elapsed * 1.6) * 0.01;
      rig.flowerCrown.rotation.z = Math.sin(elapsed * 1.2) * THREE.MathUtils.degToRad(2);
    }

    // --- Sparkle bursts ----------------------------------------------
    if (this.bursts.length) {
      this.bursts.forEach((burst) => burst.update(dt));
      this.bursts = this.bursts.filter((burst) => burst.alive);
    }
  }

  _bounceLift() {
    // Adds a quick upward lift on click, decaying with clickBounce.
    return Math.sin(Math.min(1, this.clickBounce) * Math.PI) * 0.05 * this.clickBounce;
  }

  _updateBlink(dt) {
    const { rig } = this;
    if (!rig.eyes || !rig.eyes.length) {
      if (!rig.morphMeshes || !rig.morphMeshes.length) return;
    }

    if (!this.isBlinking) {
      this.blinkTimer -= dt;
      if (this.blinkTimer <= 0) {
        this.isBlinking = true;
        this.blinkProgress = 0;
      }
      return;
    }

    this.blinkProgress += dt / 0.12; // ~120ms blink
    const t = Math.min(1, this.blinkProgress);
    const closeAmount = t < 0.5 ? t * 2 : (1 - t) * 2; // 0 -> 1 -> 0

    if (rig.morphMeshes && rig.morphMeshes.length) {
      rig.morphMeshes.forEach((mesh) => {
        const dict = mesh.morphTargetDictionary;
        const blinkKey = Object.keys(dict).find((key) => /blink|eyeclose/i.test(key));
        if (blinkKey !== undefined && mesh.morphTargetInfluences) {
          mesh.morphTargetInfluences[dict[blinkKey]] = closeAmount;
        }
      });
    } else if (rig.eyes && rig.eyes.length) {
      rig.eyes.forEach((eye) => {
        eye.scale.y = 1 - closeAmount * 0.85;
      });
    }

    if (t >= 1) {
      this.isBlinking = false;
      this.blinkTimer = this._nextBlinkDelay();
    }
  }

  dispose() {
    this.bursts.forEach((burst) => burst.dispose());
    this.bursts = [];
  }
}

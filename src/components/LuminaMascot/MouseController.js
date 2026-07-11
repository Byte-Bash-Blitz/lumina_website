import * as THREE from "three";

const MAX_YAW = THREE.MathUtils.degToRad(20);
const MAX_PITCH = THREE.MathUtils.degToRad(8);
const DAMPING = 4.5; // higher = snappier, lower = floatier

/**
 * MouseController.js
 * Converts normalized mouse position into a smoothly damped target
 * rotation for the mascot ROOT ONLY. The camera is never touched here.
 */
export class MouseController {
  constructor() {
    this.currentYaw = 0;
    this.currentPitch = 0;
    this.targetYaw = 0;
    this.targetPitch = 0;
  }

  setFromMouse(mouse) {
    if (!mouse || !mouse.inside) {
      this.targetYaw = 0;
      this.targetPitch = 0;
      return;
    }
    this.targetYaw = mouse.x * MAX_YAW;
    this.targetPitch = mouse.y * MAX_PITCH;
  }

  /**
   * @param {THREE.Object3D} modelRoot
   * @param {number} dt delta time in seconds
   */
  update(modelRoot, dt) {
    this.currentYaw = THREE.MathUtils.damp(this.currentYaw, this.targetYaw, DAMPING, dt);
    this.currentPitch = THREE.MathUtils.damp(this.currentPitch, this.targetPitch, DAMPING, dt);

    if (modelRoot) {
      modelRoot.rotation.y = this.currentYaw;
      modelRoot.rotation.x = this.currentPitch;
    }
  }
}

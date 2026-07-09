import * as THREE from "three";

let sharedShadowTexture = null;
function getShadowTexture() {
  if (sharedShadowTexture) return sharedShadowTexture;

  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  gradient.addColorStop(0.6, "rgba(0,0,0,0.5)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  sharedShadowTexture = new THREE.CanvasTexture(canvas);
  return sharedShadowTexture;
}

/**
 * Shadow.js
 * A soft, fake circular blob shadow (cheaper and more art-directable than a
 * real-time shadow map alone) placed at the mascot's feet. Its scale
 * breathes inversely with the float height, so it feels grounded.
 */
export class BlobShadow {
  constructor(scene, { radius = 0.62 } = {}) {
    this.baseRadius = radius;
    this.baseOpacity = 0.18;

    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.MeshBasicMaterial({
      map: getShadowTexture(),
      transparent: true,
      opacity: this.baseOpacity,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.set(0, 0.01, 0);
    scene.add(this.mesh);
  }

  /**
   * @param {number} floatOffset current vertical float offset of the mascot
   * @param {number} maxFloat the amplitude used for the float animation
   */
  update(floatOffset, maxFloat = 0.08) {
    const t = THREE.MathUtils.clamp((floatOffset + maxFloat) / (maxFloat * 2), 0, 1);
    // Higher in the air -> smaller, fainter shadow.
    const scale = THREE.MathUtils.lerp(1.08, 0.88, t);
    const opacity = THREE.MathUtils.lerp(this.baseOpacity * 1.1, this.baseOpacity * 0.7, t);

    this.mesh.scale.setScalar(scale);
    this.mesh.material.opacity = opacity;
  }

  dispose() {
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
      if (this.mesh.parent) this.mesh.parent.remove(this.mesh);
    }
  }
}

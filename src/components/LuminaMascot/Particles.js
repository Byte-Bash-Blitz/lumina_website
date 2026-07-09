import * as THREE from "three";

const PARTICLE_COUNT = 12;
const COLORS = [0xffffff, 0x8ec9ff, 0xfbbf24];

/** Generates a small soft radial-gradient dot texture, cached across calls. */
let sharedDotTexture = null;
function getDotTexture() {
  if (sharedDotTexture) return sharedDotTexture;

  const size = 64;
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
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  sharedDotTexture = new THREE.CanvasTexture(canvas);
  return sharedDotTexture;
}

/**
 * Particles.js
 * 12 lightweight orbiting sprites (single Points draw call — one GPU
 * dispatch for all particles, so it stays cheap regardless of count).
 */
export class ParticleSystem {
  constructor(scene, { center = new THREE.Vector3(0, 1.1, 0) } = {}) {
    this.center = center;
    this.orbits = [];

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const radius = 1.1 + Math.random() * 0.6;
      const speed = 0.12 + Math.random() * 0.14;
      const yOffset = (Math.random() - 0.5) * 1.1;
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const tilt = Math.random() * Math.PI * 0.4 - 0.2;

      this.orbits.push({ radius, speed, yOffset, angle, tilt });

      color.setHex(COLORS[i % COLORS.length]);
      color.toArray(colors, i * 3);

      sizes[i] = 0.045 + Math.random() * 0.035; // tiny particles
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.06,
      map: getDotTexture(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    this.points = new THREE.Points(geometry, material);
    this.points.frustumCulled = true;
    scene.add(this.points);

    this._tmp = new THREE.Vector3();
  }

  update(elapsed) {
    const positionAttr = this.points.geometry.getAttribute("position");

    for (let i = 0; i < this.orbits.length; i += 1) {
      const orbit = this.orbits[i];
      const angle = orbit.angle + elapsed * orbit.speed;

      const x = Math.cos(angle) * orbit.radius;
      const z = Math.sin(angle) * orbit.radius * Math.cos(orbit.tilt);
      const y = this.center.y + orbit.yOffset + Math.sin(elapsed * 0.6 + i) * 0.08;

      positionAttr.setXYZ(i, this.center.x + x, y, this.center.z + z);
    }

    positionAttr.needsUpdate = true;
  }

  dispose() {
    if (this.points) {
      this.points.geometry.dispose();
      this.points.material.dispose();
      if (this.points.parent) this.points.parent.remove(this.points);
    }
  }
}

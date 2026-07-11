import * as THREE from "three";

/**
 * Scene.js
 * Owns the THREE.Scene, fixed camera, and WebGLRenderer.
 * The camera NEVER moves, zooms, or follows the mouse — it is locked to a
 * single cinematic framing. Only the model rotates in response to input.
 */

export const CAMERA_CONFIG = {
  position: new THREE.Vector3(0, 1.35, 4.8),
  lookAt: new THREE.Vector3(0, 1, 0),
  fov: 32,
  near: 0.1,
  far: 100,
};

export class SceneManager {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.scene.background = null;

    const { clientWidth, clientHeight } = container;
    const width = clientWidth || 1;
    const height = clientHeight || 1;

    this.camera = new THREE.PerspectiveCamera(
      CAMERA_CONFIG.fov,
      width / height,
      CAMERA_CONFIG.near,
      CAMERA_CONFIG.far
    );
    this.camera.position.copy(CAMERA_CONFIG.position);
    this.camera.lookAt(CAMERA_CONFIG.lookAt);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
   });

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setClearAlpha(0);

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    this.renderer.setSize(width, height, false);
    this.renderer.shadowMap.enabled = false;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    this.container.appendChild(this.renderer.domElement);

    this._resizeObserver = null;
    this._onResizeCallbacks = [];
  }

  /** Keep camera aspect + renderer + composer in sync with container size. */
  observeResize(onResize) {
    if (onResize) this._onResizeCallbacks.push(onResize);

    this._resizeObserver = new ResizeObserver(() => this._handleResize());
    this._resizeObserver.observe(this.container);

    // Fire once immediately to establish correct initial size.
    this._handleResize();
  }

  _handleResize() {
    const width = this.container.clientWidth || 1;
    const height = this.container.clientHeight || 1;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);

    this._onResizeCallbacks.forEach((cb) => cb(width, height));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
    this._onResizeCallbacks = [];

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}

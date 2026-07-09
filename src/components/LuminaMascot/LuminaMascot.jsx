import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

import { SceneManager } from "./Scene.js";
import { loadMascotModel, DEFAULT_MODEL_CANDIDATES } from "./Model.js";
import { setupLighting, pulseLights, settleLights } from "./Lighting.js";
import { ParticleSystem } from "./Particles.js";
import { BlobShadow } from "./Shadow.js";
import { MouseController } from "./MouseController.js";
import { AnimationController } from "./AnimationController.js";
import { createEffectComposer, resizeComposer, pulseBloom, settleBloom } from "./Effects.js";
import { useMouse } from "./useMouse.js";
import { useVisibility } from "./useVisibility.js";
import Loader from "./Loader.jsx";
import ErrorFallback from "./ErrorFallback.jsx";

import "./luminaMascot.css";

/**
 * LuminaMascot.jsx
 * Production mascot renderer. Mounts a fixed-camera three.js scene inside a
 * responsive circular viewport, loads the GLB, wires up idle/interactive
 * animation, subtle bloom post-processing, and cleans up fully on unmount.
 *
 * Usage: <LuminaMascot /> — drop-in replacement, no props required.
 */
export default function LuminaMascot({ modelPaths = DEFAULT_MODEL_CANDIDATES }) {
  const containerRef = useRef(null);
  const canvasWrapRef = useRef(null);

  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [progress, setProgress] = useState(0);

  const mouseRef = useMouse(containerRef);
  const isVisible = useVisibility();
  const isVisibleRef = useRef(isVisible);
  isVisibleRef.current = isVisible;

  // Everything three.js-related lives in this single mutable ref bag so we
  // never trigger re-renders from the render loop, and so cleanup has one
  // clear place to reach into.
  const worldRef = useRef(null);

  const handleClick = useCallback((event) => {
    const world = worldRef.current;
    if (!world || status !== "ready") return;

    const { raycaster, pointer, camera, modelRoot, animationController, bloomPass, lights } = world;
    const rect = world.sceneManager.container.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(modelRoot, true);

    if (hits.length > 0) {
      const point = hits[0].point.clone();
      animationController.triggerClick(point);
      pulseBloom(bloomPass, 1);
      pulseLights(lights, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let disposed = false;
    const sceneManager = new SceneManager(canvasWrapRef.current);
    const lights = setupLighting(sceneManager.scene);
    const particles = new ParticleSystem(sceneManager.scene, {
      center: new THREE.Vector3(0, 1.15, 0),
    });
    const shadow = new BlobShadow(sceneManager.scene, { radius: 0.62 });

    const { clientWidth, clientHeight } = canvasWrapRef.current;
    const { composer, bloomPass } = createEffectComposer(
      sceneManager.renderer,
      sceneManager.scene,
      sceneManager.camera,
      clientWidth || 1,
      clientHeight || 1
    );

    const mouseController = new MouseController();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const clock = new THREE.Clock();

    let rafId = null;
    let modelRoot = null;
    let animationController = null;

    worldRef.current = {
      sceneManager,
      camera: sceneManager.camera,
      lights,
      particles,
      shadow,
      composer,
      bloomPass,
      mouseController,
      raycaster,
      pointer,
      modelRoot: null,
      animationController: null,
    };

    sceneManager.observeResize((width, height) => {
      resizeComposer(composer, width, height);
    });

    function renderLoop() {
      rafId = requestAnimationFrame(renderLoop);
      if (!isVisibleRef.current) return;

      const dt = Math.min(0.1, clock.getDelta());
      const elapsed = clock.getElapsedTime();

      if (modelRoot && animationController) {
        animationController.setMouse(mouseRef.current);
        animationController.update(elapsed, dt);
        mouseController.setFromMouse(mouseRef.current);
        mouseController.update(modelRoot, dt);
        shadow.update(animationController.floatY, 0.08);
      }

      particles.update(elapsed);
      settleBloom(bloomPass, dt);
      settleLights(lights, dt);

      sceneManager.render();
    }

    loadMascotModel(modelPaths, (p) => {
      if (!disposed) setProgress(p);
    })
      .then(({ root, rig }) => {
        if (disposed) return;

        sceneManager.scene.add(root);
        modelRoot = root;
        animationController = new AnimationController(sceneManager.scene, { root, rig });

        worldRef.current.modelRoot = root;
        worldRef.current.animationController = animationController;

        setStatus("ready");
        renderLoop();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn("LuminaMascot: model failed to load, showing fallback.", err?.message || err);
        if (!disposed) setStatus("error");
        // Still render the empty scene (particles/lighting) behind the fallback.
        renderLoop();
      });

    return () => {
      disposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);

      if (animationController) animationController.dispose();
      particles.dispose();
      shadow.dispose();

      if (modelRoot) {
        modelRoot.traverse((node) => {
          if (node.isMesh) {
            node.geometry?.dispose();
            const materials = Array.isArray(node.material) ? node.material : [node.material];
            materials.forEach((mat) => {
              if (!mat) return;
              Object.keys(mat).forEach((key) => {
                const value = mat[key];
                if (value && value.isTexture) value.dispose();
              });
              mat.dispose();
            });
          }
        });
      }

      composer.dispose?.();
      sceneManager.dispose();
      worldRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelPaths]);

  const handlePointerEnter = useCallback(() => {
    if (worldRef.current?.animationController) {
      worldRef.current.animationController.setHover(true);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (worldRef.current?.animationController) {
      worldRef.current.animationController.setHover(false);
    }
  }, []);

  return (
    <div ref={containerRef} className="lumina-mascot-root">
      <div
        ref={canvasWrapRef}
        className={`lumina-mascot-canvas-wrap${status === "ready" ? " is-interactive" : ""}`}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      />
      {false && <Loader progress={progress} />}
      {status === "error" && <ErrorFallback />}
    </div>
  );
}

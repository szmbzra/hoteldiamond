"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    pannellum: any;
  }
}

// ==========================================
// Types — matching actual API structure
// ==========================================

export interface HotSpotTarget {
  sceneId: number;
  yaw: number;
  pitch: number;
}

export interface HotSpot {
  id: number;
  text: string;
  pitch: number;
  yaw: number;
  type: string;
  target: HotSpotTarget;
}

export interface SceneView {
  yaw: number;
  pitch: number;
  hfov: number;
}

export interface Scene {
  id: number;
  title: string;
  panorama: string;
  thumb?: string;
  draggable?: boolean;
  status: string;
  view: SceneView;
  hotSpots: HotSpot[];
}

export interface TourSettings {
  fadeIn: number;
  defaultScene: number;
  hotspotIcon?: string;
  draggable?: boolean;
  imgWidth?: number;
  imgHeight?: number;
}

export interface TourMeta {
  id: number;
  title: string;
  settings: TourSettings;
}

export interface TourCategory {
  id: string;
  title: string;
  sceneIds: number[];
}

export interface VirtualTourData {
  tour: TourMeta;
  categories: TourCategory[];
  scenes: Record<string, Scene>;
}

// ==========================================
// Helpers
// ==========================================

function buildHotSpot(h: HotSpot) {
  const target = h.target;
  return {
    pitch: Number(h.pitch ?? 0),
    yaw: Number(h.yaw ?? 0),
    type: h.type || "scene",
    text: h.text || "Explore",
    sceneId: target?.sceneId != null ? String(target.sceneId) : undefined,
    targetYaw: target?.yaw != null ? Number(target.yaw) : undefined,
    targetPitch: target?.pitch != null ? Number(target.pitch) : undefined,
  };
}

function buildPannellumScenes(scenes: Record<string, Scene>) {
  const config: Record<string, any> = {};
  for (const [id, sc] of Object.entries(scenes)) {
    config[id] = {
      title: sc.title,
      type: "equirectangular",
      panorama: sc.panorama ? encodeURI(sc.panorama.trim()) : "",
      autoLoad: true,
      yaw: Number(sc.view?.yaw ?? 0),
      pitch: Number(sc.view?.pitch ?? 0),
      hfov: Number(sc.view?.hfov ?? 120),
      hotSpots: Array.isArray(sc.hotSpots) ? sc.hotSpots.map(buildHotSpot) : [],
    };
  }
  return config;
}

// ==========================================
// Custom Hook
// ==========================================

interface UseVirtualTourParams {
  data: VirtualTourData | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useVirtualTour({ data, containerRef }: UseVirtualTourParams) {
  const viewerRef = useRef<any>(null);
  const [pannellumLoaded, setPannellumLoaded] = useState(false);
  const [currentScene, setCurrentScene] = useState<string | null>(null);

  const scenes = data?.scenes ?? {};

  // Load Pannellum CDN once
  useEffect(() => {
    if (window.pannellum) {
      setPannellumLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.async = true;
    script.onload = () => setPannellumLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Initialize viewer — runs only when pannellum or the tour data changes.
  // currentScene is intentionally excluded: scene changes are handled by
  // viewerRef.current.loadScene() and must NOT trigger a viewer re-init,
  // otherwise the targetYaw/targetPitch from hotspot navigation gets discarded.
  useEffect(() => {
    if (!pannellumLoaded || !window.pannellum || !data || Object.keys(scenes).length === 0) return;
    if (!containerRef.current) return;

    const defaultId = data.tour?.settings?.defaultScene;
    const startScene =
      defaultId && scenes[String(defaultId)]
        ? String(defaultId)
        : Object.keys(scenes)[0];

    if (!startScene) return;

    if (viewerRef.current) {
      try { viewerRef.current.destroy(); } catch { /* noop */ }
      viewerRef.current = null;
    }
    containerRef.current.innerHTML = "";

    try {
      viewerRef.current = window.pannellum.viewer(containerRef.current, {
        default: {
          firstScene: startScene,
          sceneFadeDuration: data.tour?.settings?.fadeIn ?? 600,
          autorotate: -2,
          autoLoad: true,
        },
        scenes: buildPannellumScenes(scenes),
      });

      setCurrentScene(startScene);

      // scenechange keeps UI in sync without triggering a viewer re-init
      viewerRef.current.on("scenechange", (sceneId: string) => {
        setCurrentScene(sceneId);
      });
    } catch (err) {
      console.error("Pannellum init error:", err);
    }

    return () => {
      if (viewerRef.current) {
        try { viewerRef.current.destroy(); } catch { /* noop */ }
        viewerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pannellumLoaded, data]);

  const goToScene = (key: string) => {
    if (!viewerRef.current || currentScene === key) return;
    try {
      // loadScene triggers scenechange which updates currentScene state
      viewerRef.current.loadScene(key);
    } catch (e) {
      console.warn("Failed to change scene:", e);
    }
  };

  return {
    pannellumLoaded,
    currentScene,
    scenes,
    categories: data?.categories ?? [],
    goToScene,
    isViewerReady: !!viewerRef.current,
  };
}

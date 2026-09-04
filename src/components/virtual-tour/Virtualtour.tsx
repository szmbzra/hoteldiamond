"use client";

import React, { useRef } from "react";
import { Loader2, Compass, MapPin, ChevronRight } from "lucide-react";
import { useVirtualTour, VirtualTourData } from "./useVirtualTour";

interface Props {
  data: VirtualTourData | null;
}

const VirtualTourSection: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { pannellumLoaded, currentScene, scenes, categories, goToScene, isViewerReady } =
    useVirtualTour({ data, containerRef });

  const activeScene = currentScene ? scenes[currentScene] : null;

  return (
    <div className="w-full bg-[#fdfdfc] py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Viewer */}
          <div className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-black aspect-[16/10] md:h-[650px] md:aspect-auto">
            <div ref={containerRef} className="w-full h-full" />

            {/* Loader */}
            {(!pannellumLoaded || !isViewerReady) && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/95 text-white">
                <Loader2 className="w-10 h-10 animate-spin text-gold mb-4" />
                <p className="text-xs uppercase tracking-[0.2em] text-gold">
                  Loading Virtual Tour
                </p>
              </div>
            )}

            {/* Current Scene Badge */}
            {activeScene && (
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-sm text-white tracking-wide">
                  {activeScene.title}
                </span>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:h-[650px] overflow-hidden flex flex-col">
            <div className="pb-4 border-b border-gray-100 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium block mb-1">
                Navigation
              </span>
              <h3 className="text-xl font-light tracking-wide text-gray-900">
                Explore Tour
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-5 pr-1">
              {categories.map((category) => (
                <div key={category.id}>
                  {/* <h4 className="text-xs uppercase tracking-[0.15em] text-gray-400 mb-3 px-1">
                    {category.title}
                  </h4> */}

                  <div className="space-y-2">
                    {category.sceneIds.map((sceneId) => {
                      const key = String(sceneId);
                      const scene = scenes[key];
                      if (!scene) return null;

                      const isActive = currentScene === key;

                      return (
                        <button
                          key={sceneId}
                          onClick={() => goToScene(key)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 text-left ${
                            isActive
                              ? "bg-gold/15 border-gold/30 text-[#c8a878] shadow-sm"
                              : "bg-white border-transparent hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Compass
                              className={`w-4 h-4 shrink-0 transition-transform duration-500 ${
                                isActive ? "rotate-45 text-gold" : "opacity-40"
                              }`}
                            />
                            <span className="text-sm tracking-wide">
                              {scene.title}
                            </span>
                          </div>

                          <ChevronRight
                            className={`w-4 h-4 transition-all duration-300 ${
                              isActive ? "translate-x-0 opacity-100" : "opacity-0"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VirtualTourSection;

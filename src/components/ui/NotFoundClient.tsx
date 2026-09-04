"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NotFoundClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      o: Math.random(),
      speed: Math.random() * 0.008 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const opacity = 0.3 + 0.7 * Math.abs(Math.sin(frame * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });
      frame++;
      animId = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "radial-gradient(ellipse at 50% 60%, #1a2035 0%, #0a0d1a 60%, #000510 100%)" }}>

      {/* Star canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Floating clouds/nebula streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-5%] w-[40%] h-6 rounded-full opacity-10 blur-xl bg-slate-300" style={{ animation: "drift1 18s linear infinite" }} />
        <div className="absolute top-[30%] right-[-5%] w-[35%] h-4 rounded-full opacity-10 blur-xl bg-slate-400" style={{ animation: "drift2 22s linear infinite" }} />
        <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-5 rounded-full opacity-10 blur-xl bg-slate-300" style={{ animation: "drift1 26s linear infinite 3s" }} />
      </div>

      {/* Satellite top-right */}
      <div className="absolute top-8 right-10 text-4xl opacity-70" style={{ animation: "sat 14s linear infinite" }}>🛰️</div>
      
      {/* Small planet right */}
      <div className="absolute top-[40%] right-[6%] w-12 h-12 md:w-16 md:h-16 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle at 35% 35%, #c47a5a, #6b3a28)", animation: "bob 5s ease-in-out infinite" }} />

      {/* === Main content === */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* 4 0 4 - with moon as 0 */}
        <div className="relative flex items-center justify-center gap-4 md:gap-6 select-none" style={{ animation: "fadeUp 0.8s ease-out both" }}>
          <span className="font-black text-white leading-none"
            style={{ fontSize: "clamp(80px, 18vw, 160px)", textShadow: "0 0 40px rgba(255,255,255,0.2)" }}>
            4
          </span>

          {/* Moon */}
          <div className="relative flex items-center justify-center" style={{ width: "clamp(80px, 18vw, 160px)", height: "clamp(80px, 18vw, 160px)" }}>
            {/* Glow rings */}
            {[1.8, 1.55, 1.3].map((scale, i) => (
              <div key={i} className="absolute rounded-full border border-white/5"
                style={{ width: `${scale * 100}%`, height: `${scale * 100}%`, background: `radial-gradient(circle, rgba(255,255,220,${0.06 - i * 0.015}) 0%, transparent 70%)` }} />
            ))}
            {/* Moon surface */}
            <div className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 38% 38%, #f5e6c8, #d4b896 40%, #b08060 70%, #8a6040 100%)",
                boxShadow: "0 0 60px 20px rgba(255, 220, 150, 0.25), 0 0 120px 50px rgba(255, 200, 100, 0.1)",
              }}>
              {/* Craters */}
              <div className="absolute rounded-full bg-black/15" style={{ width: "22%", height: "22%", top: "22%", left: "28%" }} />
              <div className="absolute rounded-full bg-black/10" style={{ width: "14%", height: "14%", top: "55%", left: "52%" }} />
              <div className="absolute rounded-full bg-black/12" style={{ width: "10%", height: "10%", top: "35%", left: "62%" }} />
              <div className="absolute rounded-full bg-black/8" style={{ width: "8%", height: "8%", top: "65%", left: "25%" }} />
            </div>
          </div>

          <span className="font-black text-white leading-none"
            style={{ fontSize: "clamp(80px, 18vw, 160px)", textShadow: "0 0 40px rgba(255,255,255,0.2)" }}>
            4
          </span>
        </div>

        {/* Astronaut with tether — floating below the 0 */}
        <div className="relative mt-[-10px] mb-6" style={{ animation: "fadeUp 0.8s ease-out 0.2s both" }}>
          <svg viewBox="0 0 160 100" className="w-40 md:w-52 mx-auto overflow-visible">
            {/* Tether line */}
            <path d="M 80 10 Q 50 40 30 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
            {/* Astronaut body */}
            <g style={{ animation: "astronautFloat 4s ease-in-out infinite", transformOrigin: "30px 60px" }}>
              {/* helmet */}
              <circle cx="30" cy="54" r="9" fill="#e8eaf0" />
              <circle cx="30" cy="53" r="6" fill="#a8c8e8" opacity="0.7" />
              <circle cx="27" cy="51" r="2" fill="white" opacity="0.6" />
              {/* body */}
              <rect x="23" y="62" width="14" height="12" rx="4" fill="#d8dae8" />
              {/* backpack */}
              <rect x="35" y="63" width="5" height="8" rx="2" fill="#b0b2c0" />
              {/* arms */}
              <line x1="23" y1="65" x2="14" y2="71" stroke="#d8dae8" strokeWidth="4" strokeLinecap="round" />
              <line x1="37" y1="65" x2="44" y2="60" stroke="#d8dae8" strokeWidth="4" strokeLinecap="round" />
              {/* legs */}
              <line x1="26" y1="74" x2="22" y2="83" stroke="#d8dae8" strokeWidth="4" strokeLinecap="round" />
              <line x1="34" y1="74" x2="38" y2="83" stroke="#d8dae8" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Text */}
        <p className="text-white/50 text-base md:text-lg tracking-widest mb-2" style={{ animation: "fadeUp 0.8s ease-out 0.4s both", fontFamily: "sans-serif" }}>
          it looks like you&apos;re lost...
        </p>
        <p className="text-white/30 text-sm mb-10 tracking-wide" style={{ animation: "fadeUp 0.8s ease-out 0.5s both" }}>
          Let us navigate you back to safety.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4" style={{ animation: "fadeUp 0.8s ease-out 0.6s both" }}>
          <Link href="/"
            className="px-10 py-3 rounded-full bg-white text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-yellow-100 transition-all duration-300 shadow-lg hover:scale-105">
            Take Me Home
          </Link>
          <Link href="/contact"
            className="px-10 py-3 rounded-full border border-white/30 text-white/70 font-bold text-sm tracking-widest uppercase hover:border-white/70 hover:text-white transition-all duration-300">
            Contact Mission Control
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes sat {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-15px, 15px) rotate(20deg); }
        }
        @keyframes drift1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(110vw); }
        }
        @keyframes drift2 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-110vw); }
        }
        @keyframes astronautFloat {
          0%, 100% { transform: rotate(-8deg) translateY(0); }
          50%       { transform: rotate(8deg) translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

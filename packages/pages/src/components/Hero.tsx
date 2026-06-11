"use client";

import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import type { PlatformTarget } from "@pinn/types";
import { motion } from "framer-motion";
import { memo } from "react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import Glass from "./Glass";
import { type PinnRoute, navigationRoutes, primaryNavigationRoutes } from "../lib/routes";

interface ShaderBackgroundProps {
  children: React.ReactNode;
  platform: PlatformTarget;
}

interface RouteControlProps {
  activeRoute: PinnRoute;
  onRouteChange: (route: PinnRoute) => void;
}

interface HeroContentProps {
  activeRoute: PinnRoute;
  platform: PlatformTarget;
}

const primaryMeshColors = ["#020816", "#6f2c14", "#f4eee7", "#23120d", "#654335"];
const secondaryMeshColors = ["#020816", "#f5f0e9", "#99644c", "#090909"];

const ShaderVisuals = memo(function ShaderVisuals({ isActive }: { isActive: boolean }) {
  return (
    <>
      <svg className="absolute inset-0 h-0 w-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={primaryMeshColors}
        speed={isActive ? 0.36 : 0.24}
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-90"
        colors={secondaryMeshColors}
        speed={isActive ? 0.25 : 0.18}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_34%),linear-gradient(180deg,rgba(4,8,18,0.12),rgba(4,8,18,0.75))]" />
    </>
  );
});

export function ShaderBackground({ children, platform }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true);
    const handleMouseLeave = () => setIsActive(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${
        platform === "extension" ? "min-h-[640px] rounded-[28px]" : "min-h-screen"
      }`}
    >
      <ShaderVisuals isActive={isActive} />
      {children}
    </div>
  );
}

export function PulsingCircle({ activeRoute, onRouteChange }: RouteControlProps) {
  const isActive = activeRoute === "settings";

  return (
    <button
      type="button"
      aria-label="切换到设置"
      aria-pressed={isActive}
      onClick={() => onRouteChange("settings")}
      className="absolute bottom-6 right-4 z-30 rounded-full border-0 bg-transparent p-0 text-left transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:bottom-8 md:right-8"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <PulsingBorder
          colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"]}
          colorBack="#00000000"
          frame={9161408.251009725}
          intensity={5}
          pulse={isActive ? 0.15 : 0.1}
          rotation={0}
          roundness={1}
          scale={0.65}
          smoke={0.5}
          smokeSize={4}
          softness={0.2}
          speed={isActive ? 1.8 : 1.5}
          spotSize={0.1}
          style={{
            borderRadius: "50%",
            height: "60px",
            width: "60px",
          }}
          thickness={0.1}
        />

        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-white/80 text-sm tracking-[0.18em]">
            <textPath href="#circle" startOffset="0%">
              pinn设置  •  pinn设置  •  pinn设置  •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </button>
  );
}

export function HeroContent({ activeRoute, platform }: HeroContentProps) {
  return (
    <main className="absolute left-1/2 top-1/2 z-20 h-[70vh] w-[92vw] max-w-[1280px] -translate-x-1/2 -translate-y-1/2 md:h-[78vh] md:w-[88vw]">
      <Glass route={activeRoute} platform={platform} />
    </main>
  );
}

export function Header({ activeRoute, onRouteChange }: RouteControlProps) {
  const isLoginActive = activeRoute === "login";

  return (
    <header className="relative z-20 flex items-center justify-between gap-4 px-4 py-5 md:px-6">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="32" viewBox="0 0 55 32">
          <text
            x="27.5"
            y="21"
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="26"
            fontWeight="700"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="1"
          >
            Pinn
          </text>
        </svg>
      </div>

      <nav className="flex flex-1 items-center justify-center gap-1 rounded-full border border-white/10 bg-white/8 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-md md:max-w-fit">
        {navigationRoutes
          .filter((route) => primaryNavigationRoutes.some((item) => item.id === route.id))
          .map((route) => {
            const isActive = route.id === activeRoute;

            return (
              <button
                key={route.id}
                type="button"
                onClick={() => onRouteChange(route.id)}
                className={`relative rounded-full px-3 py-2 text-sm font-light transition-all duration-200 md:px-4 ${
                  isActive
                    ? "bg-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.24)]"
                    : "text-white/76 hover:bg-white/10 hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {route.label}
              </button>
            );
          })}
      </nav>

      <div id="gooey-btn" className="relative flex items-center">
        <button
          type="button"
          onClick={() => onRouteChange("login")}
          aria-current={isLoginActive ? "page" : undefined}
          className={`flex h-8 cursor-pointer items-center rounded-full px-4 py-2 text-xs font-normal transition-all duration-300 ${
            isLoginActive
              ? "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.24)]"
              : "bg-white/12 text-white hover:bg-white/18"
          }`}
        >
          Login
        </button>
      </div>
    </header>
  );
}

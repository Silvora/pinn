"use client";

import type { PlatformTarget } from "@pinn/types";
import { useEffect, useState } from "react";
import { Header, HeroContent, PulsingCircle, ShaderBackground } from "./components/Hero";
import { defaultRouteByPlatform, normalizeRoute, type PinnRoute } from "./lib/routes";


export interface PinnAppProps {
  platform?: PlatformTarget;
}

export function PinnApp({ platform = "web" }: PinnAppProps) {
  const fallbackRoute = defaultRouteByPlatform[platform];
  const [activeRoute, setActiveRoute] = useState<PinnRoute>(() => {
    if (typeof window === "undefined") {
      return fallbackRoute;
    }

    return normalizeRoute(window.location.hash, fallbackRoute);
  });

  useEffect(() => {
    const nextRoute = normalizeRoute(window.location.hash, fallbackRoute);
    setActiveRoute(nextRoute);

    if (!window.location.hash) {
      window.history.replaceState(null, "", `#${nextRoute}`);
    }

    const handleHashChange = () => {
      setActiveRoute(normalizeRoute(window.location.hash, fallbackRoute));
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [fallbackRoute]);

  const handleRouteChange = (route: PinnRoute) => {
    setActiveRoute(route);

    if (typeof window === "undefined") {
      return;
    }

    const nextHash = `#${route}`;

    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
  };

  return (
    <div
      className={`relative isolate w-full ${
        platform === "extension" ? "min-h-[640px] overflow-hidden rounded-[28px]" : "min-h-screen"
      }`}
    >
      <ShaderBackground platform={platform}>
        <Header activeRoute={activeRoute} onRouteChange={handleRouteChange} />
        <HeroContent activeRoute={activeRoute} platform={platform} />
        <PulsingCircle activeRoute={activeRoute} onRouteChange={handleRouteChange} />
      </ShaderBackground>
    </div>
  );
}

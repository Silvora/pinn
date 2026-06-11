import type { PlatformTarget } from "@pinn/types";

export const pinnRoutes = ["search", "collect", "history", "settings", "login"] as const;

export type PinnRoute = (typeof pinnRoutes)[number];

export const routeLabels: Record<PinnRoute, string> = {
  search: "检索",
  collect: "拾取",
  history: "记录",
  settings: "设置",
  login: "登录",
};

export const navigationRoutes = pinnRoutes.map((route) => ({
  hash: `#${route}` as const,
  id: route,
  label: routeLabels[route],
}));

export const primaryNavigationRoutes = navigationRoutes.filter(
  (route) => route.id === "search" || route.id === "collect" || route.id === "history",
);

export const defaultRouteByPlatform: Record<PlatformTarget, PinnRoute> = {
  desktop: "history",
  extension: "collect",
  web: "search",
};

export function normalizeRoute(
  hashOrRoute: string | null | undefined,
  fallback: PinnRoute,
): PinnRoute {
  const normalized = (hashOrRoute ?? "").replace(/^#/, "").trim().toLowerCase();

  if (pinnRoutes.includes(normalized as PinnRoute)) {
    return normalized as PinnRoute;
  }

  return fallback;
}

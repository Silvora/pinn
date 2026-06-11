import type { PlatformTarget } from "@pinn/types";
import { cn } from "@pinn/ui/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType } from "react";
import type { PinnRoute } from "../lib/routes";
import { CollectPage } from "../page/collect";
import { HistoryPage } from "../page/history";
import { LoginPage } from "../page/login";
import { SearchPage } from "../page/search";
import { SettingsPage } from "../page/settings";

interface GlassProps {
  platform: PlatformTarget;
  route: PinnRoute;
}

type RoutePageProps = {
  platform: PlatformTarget;
};

const routeTransition = {
  animate: {
    opacity: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    y: 0,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
    y: "-14%",
  },
  initial: {
    opacity: 0,
    y: "18%",
  },
} as const;

const routeComponents: Record<PinnRoute, ComponentType<RoutePageProps>> = {
  collect: CollectPage,
  history: HistoryPage,
  login: LoginPage,
  search: SearchPage,
  settings: SettingsPage,
};

export const Glass = ({ platform, route }: GlassProps) => {
  const RouteComponent = routeComponents[route];

  return (
    <section
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[28px] border border-white/14 p-4 text-white shadow-2xl md:p-5",
        "bg-black/18 backdrop-blur-2xl",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={route}
          variants={routeTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-4 md:inset-5"
        >
          <div className="relative h-full w-full">
            <RouteComponent platform={platform} />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Glass;

import type { PlatformTarget } from "@pinn/types";
import { cn } from "@pinn/ui/lib/utils";
import PushInput from "../components/PushInput";

const platformMeta: Record<
  PlatformTarget,
  {
    accent: string;
    label: string;
  }
> = {
  desktop: {
    accent: "rgba(244, 181, 120, 0.24)",
    label: "把任意片段折叠进同一条知识流水线",
  },
  extension: {
    accent: "rgba(122, 214, 255, 0.24)",
    label: "把任意片段折叠进同一条知识流水线",
  },
  web: {
    accent: "rgba(255, 255, 255, 0.18)",
    label: "把任意片段折叠进同一条知识流水线",
  },
};

interface CollectPageProps {
  platform: PlatformTarget;
}

export function CollectPage({ platform }: CollectPageProps) {
  const meta = platformMeta[platform];

  return (
    <>
      <div
        className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full blur-3xl"
        style={{ background: meta.accent }}
      />

      <div
        className={cn(
          "relative z-10 grid h-full gap-4 overflow-hidden",
        )}
      >
        <div className={cn("space-y-4")}>
           <div className="w-full h-full overflow-hidden">
            <PushInput/>
          </div>
        </div>

       
      </div>
    </>
  );
}

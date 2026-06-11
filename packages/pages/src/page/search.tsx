import type { PlatformTarget } from "@pinn/types";
import { cn } from "@pinn/ui/lib/utils";
import SearchInput from "../components/SearchInput"
const platformMeta: Record<
  PlatformTarget,
  {
    accent: string;
    label: string;
  }
> = {
  desktop: {
    accent: "rgba(244, 181, 120, 0.24)",
    label: "优先命中知识答案",
  },
  extension: {
    accent: "rgba(122, 214, 255, 0.24)",
    label: "优先命中知识答案",
  },
  web: {
    accent: "rgba(255, 255, 255, 0.18)",
    label: "优先命中知识答案",
  },
};

interface SearchPageProps {
  platform: PlatformTarget;
}

export function SearchPage({ platform }: SearchPageProps) {
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
            <SearchInput></SearchInput>
          </div>
        </div>

       
      </div>
    </>
  );
}

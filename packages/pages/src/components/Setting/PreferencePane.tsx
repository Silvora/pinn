import type { LucideIcon } from "lucide-react";
import { cn } from "@pinn/ui/lib/utils";
import type { ReactNode } from "react";

export function PreferencePage({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
      <header className="space-y-3">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/58">
          {eyebrow}
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        </div>
      </header>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function PreferenceGroup({
  children,
  description,
  icon: Icon,
  title,
}: {
  children: ReactNode;
  description: string;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <section className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-2 text-white/70">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-medium text-white">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-white/52">{description}</p>
        </div>
      </div>
      <div className="mt-5 divide-y divide-white/8">{children}</div>
    </section>
  );
}

export function PreferenceItem({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-white/44">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function PreferenceFootnote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-dashed border-white/10 bg-black/12 px-4 py-3 text-sm leading-6 text-white/48", className)}>
      {children}
    </div>
  );
}

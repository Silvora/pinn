import type { PlatformTarget } from "@pinn/types";
import { cn } from "@pinn/ui/lib/utils";

const platformMeta: Record<
  PlatformTarget,
  {
    accent: string;
    label: string;
  }
> = {
  desktop: {
    accent: "rgba(244, 181, 120, 0.24)",
    label: "让每次知识动作都有回放依据",
  },
  extension: {
    accent: "rgba(122, 214, 255, 0.24)",
    label: "让每次知识动作都有回放依据",
  },
  web: {
    accent: "rgba(255, 255, 255, 0.18)",
    label: "让每次知识动作都有回放依据",
  },
};

interface HistoryPageProps {
  platform: PlatformTarget;
}

export function HistoryPage({ platform }: HistoryPageProps) {
  const compact = platform === "extension";
  const meta = platformMeta[platform];
  const stats = [
    { label: "已入库", value: "246" },
    { label: "待处理", value: "18" },
    { label: "命中来源", value: "12" },
    { label: "今日事件", value: "64" },
    { label: "失败重试", value: "03" },
    { label: "最近同步", value: "2m" },
  ];
  const timeline = [
    {
      time: "09:42",
      title: "capture-flow.md 已完成切片",
      description: "来源文档更新为 ready，摘要和标签已经写回索引。",
    },
    {
      time: "10:15",
      title: "检索结果触发二次过滤",
      description: "用户用 traceability 标签继续收窄范围，生成新的答案摘要。",
    },
    {
      time: "11:03",
      title: "桌面端同步失败重试",
      description: "本地缓存恢复后已自动重试成功，事件标记从 error 回到 resolved。",
    },
  ];

  return (
    <>
      <div
        className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full blur-3xl"
        style={{ background: meta.accent }}
      />

      <div
        className={cn(
          "relative z-10 grid h-full gap-4",
          compact
            ? "grid-rows-[auto_auto_auto_1fr] overflow-y-auto"
            : "grid-cols-2 grid-rows-[auto_auto_1fr]",
        )}
      >
        <div className={cn("space-y-4", compact ? "" : "col-span-2")}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/72">
            <span>✨ 检索、拾取、设置变更统一归档</span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span>{meta.label}</span>
          </div>
        </div>

        <div
          className={cn(
            "flex gap-3 overflow-x-auto pb-1",
            compact ? "" : "col-span-2 row-start-2",
          )}
        >
          {stats.map((item) => (
            <article key={item.label} className="min-w-[132px] flex-1 rounded-2xl border border-white/10 bg-white/8 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold">{item.value}</p>
            </article>
          ))}
        </div>

        <section className={cn("rounded-[24px] border border-white/10 bg-black/14 p-4", compact ? "" : "col-start-1 row-start-3")}>
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">检索记录</p>
          <div className="mt-4 space-y-2">
            {[
              "最近一次检索、收集与设置变更都以时间轴方式保留，方便追溯路径。",
              "同一来源的多次更新会聚合显示，避免历史页被重复动作刷满。",
              "异常失败项会被单独标红，便于用户快速定位需要重试的同步任务。",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-white/6 px-3 py-3 text-sm leading-6 text-white/68">
                {item}
              </div>
            ))}
          </div>
        </section>

        <aside
          className={cn(
            "rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.18)]",
            compact ? "space-y-4" : "col-start-2 row-start-3 space-y-4",
          )}
        >
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">任务状态</p>
          <div className="mt-4 space-y-4">
            {timeline.map((item) => (
              <article key={item.time} className="relative rounded-2xl border border-white/8 bg-black/14 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/42">{item.time}</p>
                <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{item.description}</p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

import { Badge } from '@pinn/ui/components/badge';
import { Button } from '@pinn/ui/components/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@pinn/ui/components/card';
import { Kbd, KbdGroup } from '@pinn/ui/components/kbd';
import { Progress, ProgressLabel, ProgressValue } from '@pinn/ui/components/progress';
import { Spinner } from '@pinn/ui/components/spinner';

import type { WorkspaceHeaderProps } from '../lib/types';

export function WorkspaceHeader({
  captureQueueCount,
  isLoading,
  onSearch,
  onUseSuggestion,
  pipelineStages,
  platformConfig,
  platform,
  visibleResultCount,
}: WorkspaceHeaderProps) {
  const workspaceStats = [
    { label: '当前平台', value: platformConfig.label },
    { label: '默认聚焦', value: platformConfig.focusLabel },
    { label: '结果数量', value: `${visibleResultCount} 条` },
    { label: '使用入口', value: platform === 'extension' ? '插件弹窗' : platform === 'desktop' ? '桌面工作台' : 'Web 页面' },
  ];

  return (
    <header className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
      <Card className="overflow-hidden border-white/80 bg-white/86 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{platformConfig.label}</Badge>
            <Badge variant="secondary">{platformConfig.focusLabel}</Badge>
            <Badge variant="outline">RAG Workspace</Badge>
          </div>
          <div className="space-y-3">
            <CardTitle className="max-w-4xl text-3xl leading-tight sm:text-5xl">
              把平时散落的碎片知识收进一个 inbox，再通过统一检索入口把答案和来源一起拿回来。
            </CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {platformConfig.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {workspaceStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-slate-950 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              工作规则
            </p>
            <div className="mt-4 space-y-3">
              {platformConfig.guide.map((guide) => (
                <div key={guide} className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-100">
                  {guide}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-slate-300">
              <KbdGroup>
                <Kbd>Cmd</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
              <span className="text-xs">建议绑定为全局检索快捷入口</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-3">
          <Button onClick={onSearch} disabled={isLoading}>
            {isLoading ? <Spinner className="mr-1.5" /> : null}
            {isLoading ? '检索中' : '立即检索'}
          </Button>
          <Button variant="secondary" onClick={onUseSuggestion}>
            使用推荐问题
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-white/80 bg-white/84 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
        <CardHeader>
          <CardTitle className="text-xl">今天的工作台状态</CardTitle>
          <CardDescription>按“采集 {"->"} 清洗 {"->"} 检索 {"->"} 回溯”的节奏查看当前状态。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {pipelineStages.map((stage) => (
            <Progress key={stage.label} value={stage.value}>
              <ProgressLabel>{stage.label}</ProgressLabel>
              <ProgressValue></ProgressValue>
              <p className="w-full text-xs text-muted-foreground">{stage.description}</p>
            </Progress>
          ))}
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-slate-500">
          <span>Capture Queue</span>
          <span>{captureQueueCount} 条待处理</span>
        </CardFooter>
      </Card>
    </header>
  );
}

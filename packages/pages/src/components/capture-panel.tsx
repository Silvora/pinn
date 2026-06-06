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
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@pinn/ui/components/empty';
import { Input } from '@pinn/ui/components/input';
import { Textarea } from '@pinn/ui/components/textarea';

import { statusLabel } from '../lib/config';
import type { CapturePanelProps } from '../lib/types';

export function CapturePanel({
  captureDraft,
  captureQueue,
  captureSource,
  onCapture,
  onResetCapture,
  onSetCaptureDraft,
  onSetCaptureSource,
}: CapturePanelProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="border-white/80 bg-white/88">
          <CardHeader>
            <CardTitle className="text-xl">快速采集到 inbox</CardTitle>
            <CardDescription>前端只负责把碎片送进统一入口，真正的清洗和入库留给后端。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={captureSource}
              onChange={(event) => onSetCaptureSource(event.target.value)}
              placeholder="来源地址、文件路径或临时上下文"
              className="rounded-2xl bg-white"
            />
            <Textarea
              value={captureDraft}
              onChange={(event) => onSetCaptureDraft(event.target.value)}
              className="min-h-36 rounded-2xl bg-white"
              placeholder="记录当前网页、文档、讨论或灵感的要点"
            />
            <div className="flex flex-wrap gap-2">
              {['附带来源', '保留原文片段', '进入高优先级清洗'].map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center gap-3">
            <Button onClick={onCapture}>加入 inbox</Button>
            <Button variant="outline" onClick={onResetCapture}>
              恢复示例内容
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-white/80 bg-white/88">
          <CardHeader>
            <CardTitle className="text-xl">采集准则</CardTitle>
            <CardDescription>保证后续 RAG 检索时能回到原始语境。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              '必须记录来源地址或文件路径',
              '尽量保留完整上下文而不是只抄一句结论',
              '片段越碎，越要补充为什么值得保存',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/80 bg-white/88">
        <CardHeader>
          <CardTitle className="text-xl">最近进入 inbox 的内容</CardTitle>
          <CardDescription>这些内容接下来会进入清洗、切片、Embedding 和索引流程。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {captureQueue.length === 0 ? (
            <Empty className="border border-dashed border-slate-200 bg-slate-50/60">
              <EmptyHeader>
                <EmptyTitle>当前没有待处理内容</EmptyTitle>
                <EmptyDescription>保存一条新的碎片知识后，这里会立即出现。</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            captureQueue.map((item) => <CaptureQueueCard key={item.id} item={item} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CaptureQueueCard({
  item,
}: {
  item: CapturePanelProps['captureQueue'][number];
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{item.source}</p>
        </div>
        <Badge variant="outline">{statusLabel(item.status)}</Badge>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-700">{item.summary}</p>
    </div>
  );
}

import { Badge } from '@pinn/ui/components/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pinn/ui/components/card';

import { statusLabel } from '../lib/config';
import type { CaptureQueueItem } from '../lib/types';

export function SidebarPanels({ captureQueue }: { captureQueue: CaptureQueueItem[] }) {
  return (
    <aside className="space-y-6">
      <Card className="border-white/80 bg-white/88">
        <CardHeader>
          <CardTitle className="text-xl">检索协议</CardTitle>
          <CardDescription>当前前端约定统一请求后端的 `/rag/query`。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            请求体建议包含 `query`、`topK`、`tags`。
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            返回体至少包含 `answer`、`results`、`tookMs`。
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            结果项必须保留 `source`、`score` 与 `updatedAt`。
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/80 bg-white/88">
        <CardHeader>
          <CardTitle className="text-xl">当前队列摘要</CardTitle>
          <CardDescription>帮助你快速判断 inbox 压力和整理优先级。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {captureQueue.slice(0, 3).map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <Badge variant="outline">{statusLabel(item.status)}</Badge>
              </div>
              <p className="mt-2 text-xs leading-6 text-slate-600">{item.summary}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}

import { Alert, AlertDescription, AlertTitle } from '@pinn/ui/components/alert';
import { Badge } from '@pinn/ui/components/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pinn/ui/components/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pinn/ui/components/table';

import type { SourcesPanelProps } from '../lib/types';

export function SourcesPanel({ sourceHealth }: SourcesPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="border-white/80 bg-white/88">
        <CardHeader>
          <CardTitle className="text-xl">已接入知识源</CardTitle>
          <CardDescription>明确每个来源的状态、范围和同步时延，才能知道检索结果是否可信。</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>来源</TableHead>
                <TableHead>范围</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>延迟</TableHead>
                <TableHead>最近同步</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sourceHealth.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium text-slate-900">{item.name}</TableCell>
                  <TableCell>{item.scope}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'active' ? 'secondary' : 'outline'}>
                      {item.status === 'active'
                        ? '运行中'
                        : item.status === 'warming'
                          ? '预热中'
                          : '已暂停'}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.latency}</TableCell>
                  <TableCell>{item.lastSync}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/80 bg-white/88">
          <CardHeader>
            <CardTitle className="text-xl">接入策略</CardTitle>
            <CardDescription>三端只是入口不同，真正的数据都应该回到同一个知识核心。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              '插件负责轻量采集，不做重型知识处理。',
              '桌面端优先管理本地文件与离线能力。',
              'Web 端承担完整查询、筛选与回溯体验。',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/80 bg-white/88">
          <CardHeader>
            <CardTitle className="text-xl">索引提醒</CardTitle>
            <CardDescription>高质量的来源标记比堆叠更多片段更重要。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>保持来源透明</AlertTitle>
              <AlertDescription>
                每条回答都应该能回到原始来源，否则用户无法判断结果是否可靠。
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle>优先处理高频来源</AlertTitle>
              <AlertDescription>
                先保证浏览器剪藏、Markdown 和产品文档等高频知识源的稳定接入。
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

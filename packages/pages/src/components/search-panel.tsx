import type { KnowledgeRecord } from '@pinn/types';
import { Badge } from '@pinn/ui/components/badge';
import { Button } from '@pinn/ui/components/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@pinn/ui/components/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@pinn/ui/components/empty';
import { Separator } from '@pinn/ui/components/separator';
import { Spinner } from '@pinn/ui/components/spinner';
import { Textarea } from '@pinn/ui/components/textarea';

import { TAG_OPTIONS, TOP_K_OPTIONS } from '../lib/config';
import type { SearchPanelProps } from '../lib/types';

export function SearchPanel({
  isLoading,
  onClearTags,
  onSearch,
  onSelectSuggestion,
  onSetQuery,
  onSetTopK,
  onToggleTag,
  platformConfig,
  query,
  result,
  selectedTags,
  topK,
  visibleResultCount,
  visibleResults,
}: SearchPanelProps) {
  return (
    <div className="space-y-6">
      <Card className="border-white/80 bg-white/88">
        <CardHeader>
          <CardTitle className="text-xl">构建你的查询</CardTitle>
          <CardDescription>用自然语言提问，并明确结果数量和标签范围。</CardDescription>
          <CardAction>
            <Badge variant="outline">Top {topK}</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-5">
          <Textarea
            value={query}
            onChange={(event) => onSetQuery(event.target.value)}
            className="min-h-28 rounded-2xl bg-white"
            placeholder="例如：插件端采集的知识片段进入 inbox 之后，后端应该如何清洗、切片与入库？"
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                推荐问题
              </p>
              <div className="flex flex-wrap gap-2">
                {platformConfig.quickQueries.map((suggestion) => (
                  <Button
                    key={suggestion}
                    size="sm"
                    variant="secondary"
                    onClick={() => onSelectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                结果数量
              </p>
              <div className="flex flex-wrap gap-2">
                {TOP_K_OPTIONS.map((value) => (
                  <Button
                    key={value}
                    size="sm"
                    variant={topK === value ? 'default' : 'secondary'}
                    onClick={() => onSetTopK(value)}
                  >
                    Top {value}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                标签过滤
              </p>
              <Button size="sm" variant="ghost" onClick={onClearTags}>
                清空标签
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => {
                const active = selectedTags.includes(tag);

                return (
                  <Button
                    key={tag}
                    size="sm"
                    variant={active ? 'default' : 'secondary'}
                    onClick={() => onToggleTag(tag)}
                  >
                    #{tag}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-3">
          <Button onClick={onSearch} disabled={isLoading}>
            {isLoading ? <Spinner className="mr-1.5" /> : null}
            {isLoading ? '检索中' : '发送到 /rag/query'}
          </Button>
          <Button variant="outline" onClick={() => onSetQuery(platformConfig.searchPreset)}>
            恢复默认问题
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="border-white/80 bg-white/88">
          <CardHeader>
            <CardTitle className="text-xl">模型回答</CardTitle>
            <CardDescription>除了最终答案，还要保留命中的片段、来源和得分。</CardDescription>
            <CardAction>
              <Badge variant="outline">{result.tookMs}ms</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {result.answer}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Query: {result.query}</Badge>
              <Badge variant="outline">命中 {visibleResultCount} 条</Badge>
            </div>
            <Separator />
            {visibleResultCount === 0 ? (
              <Empty className="border border-dashed border-slate-200 bg-slate-50/60">
                <EmptyHeader>
                  <EmptyTitle>当前标签下没有结果</EmptyTitle>
                  <EmptyDescription>清空标签，或者换一个更宽泛的问题再试。</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="secondary" onClick={onClearTags}>
                    清空过滤条件
                  </Button>
                </EmptyContent>
              </Empty>
            ) : (
              <div className="space-y-3">
                {visibleResults.map((item) => (
                  <ResultCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-white/80 bg-white/88">
          <CardHeader>
            <CardTitle className="text-xl">命中概览</CardTitle>
            <CardDescription>把最重要的上下文压缩到侧边栏，方便快速判断值不值得继续追溯。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatRow label="最高分来源" value={visibleResults[0]?.source ?? '暂无'} />
            <StatRow
              label="主要标签"
              value={
                visibleResults.length > 0
                  ? Array.from(new Set(visibleResults.flatMap((item) => item.tags))).slice(0, 3).join(' / ')
                  : '暂无'
              }
            />
            <StatRow label="当前 Top K" value={`Top ${topK}`} />
            <StatRow label="检索模式" value="Answer + Traceback" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ResultCard({ item }: { item: KnowledgeRecord }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {item.source}
          </p>
          <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
        </div>
        <Badge variant="outline">Score {item.score.toFixed(2)}</Badge>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-700">{item.snippet}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {item.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            #{tag}
          </Badge>
        ))}
      </div>
      <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-slate-400">
        Updated {item.updatedAt}
      </p>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

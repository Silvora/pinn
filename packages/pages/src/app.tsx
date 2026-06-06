import { useState } from 'react';

import { apiClient } from '@pinn/api-client';
import {
    createDemoSearchResponse,
    type KnowledgeSearchResponse,
    type PlatformTarget,
} from '@pinn/types';
import { Alert, AlertDescription, AlertTitle } from '@pinn/ui/components/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@pinn/ui/components/tabs';

import { CapturePanel } from './components/capture-panel';
import { SearchPanel } from './components/search-panel';
import { SidebarPanels } from './components/sidebar-panels';
import { SourcesPanel } from './components/sources-panel';
import { WorkspaceHeader } from './components/workspace-header';
import {
    createCaptureQueue,
    createPipelineStages,
    createSourceHealth,
    PLATFORM_CONFIG,
} from './lib/config';
import type { CaptureQueueItem, NoticeState } from './lib/types';

export interface PinnAppProps {
  platform: PlatformTarget;
}

export function PinnApp({ platform }: PinnAppProps) {
  const platformConfig = PLATFORM_CONFIG[platform];
  const [query, setQuery] = useState(platformConfig.searchPreset);
  const [topK, setTopK] = useState<number>(platform === 'extension' ? 3 : 5);
  const [selectedTags, setSelectedTags] = useState<string[]>(platformConfig.defaultTags);
  const [captureDraft, setCaptureDraft] = useState(platformConfig.capturePreset);
  const [captureSource, setCaptureSource] = useState(platformConfig.captureSource);
  const [captureQueue, setCaptureQueue] = useState(() => createCaptureQueue(platform));
  const [result, setResult] = useState<KnowledgeSearchResponse>(() =>
    createDemoSearchResponse(platformConfig.searchPreset),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<NoticeState>(null);

  const visibleResults = result.results.filter((item) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return selectedTags.some((tag) => item.tags.includes(tag));
  });

  const sourceHealth = createSourceHealth(platform);
  const pipelineStages = createPipelineStages(platform, captureQueue.length, visibleResults.length);

  async function handleSearch() {
    const payload = {
      query,
      topK,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    };

    setIsLoading(true);
    setNotice(null);

    try {
      const response = await apiClient.post<KnowledgeSearchResponse>('/rag/query', payload);
      setResult(response);
    } catch (requestError) {
      console.warn('Fallback to local demo search response.', requestError);
      setNotice({
        title: '后端暂未接通',
        description: '当前展示的是本地模拟检索结果。等 `/rag/query` 接通后，这里会自动切换到真实返回。',
      });
      setResult(createDemoSearchResponse(query));
    } finally {
      setIsLoading(false);
    }
  }

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  }

  function handleCapture() {
    const normalizedDraft = captureDraft.trim();
    if (!normalizedDraft) {
      setNotice({
        title: '缺少采集内容',
        description: '先填写要保存的碎片知识，再加入 inbox。',
        variant: 'destructive',
      });
      return;
    }

    const nextItem: CaptureQueueItem = {
      id: `capture-${Date.now()}`,
      source: captureSource.trim() || 'manual/inbox',
      status: 'queued',
      summary: normalizedDraft,
      title: normalizedDraft.slice(0, 28),
    };

    setCaptureQueue((current) => [nextItem, ...current].slice(0, 6));
    setCaptureDraft('');
    setNotice({
      title: '已加入 inbox',
      description: '这条碎片内容会进入清洗、切片和向量化流程，然后出现在统一检索结果里。',
    });
  }

  function resetCaptureDraft() {
    setCaptureDraft(platformConfig.capturePreset);
    setCaptureSource(platformConfig.captureSource);
  }

  return (
    <div className="min-h-screen text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <WorkspaceHeader
          captureQueueCount={captureQueue.length}
          isLoading={isLoading}
          onSearch={handleSearch}
          onUseSuggestion={() => {
            setQuery(platformConfig.quickQueries[0]);
            setNotice(null);
          }}
          pipelineStages={pipelineStages}
          platformConfig={platformConfig}
          platform={platform}
          visibleResultCount={visibleResults.length}
        />

        {notice ? (
          <Alert variant={notice.variant}>
            <AlertTitle>{notice.title}</AlertTitle>
            <AlertDescription>{notice.description}</AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-6">
            <Tabs defaultValue={platformConfig.defaultTab}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Shared Workspace
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-950">知识采集与检索工作流</h2>
                </div>
                <TabsList variant="line" className="w-full justify-start sm:w-auto">
                  <TabsTrigger value="search">检索台</TabsTrigger>
                  <TabsTrigger value="capture">采集台</TabsTrigger>
                  <TabsTrigger value="sources">数据源</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="search">
                <SearchPanel
                  isLoading={isLoading}
                  onClearTags={() => setSelectedTags([])}
                  onSearch={handleSearch}
                  onSelectSuggestion={setQuery}
                  onSetQuery={setQuery}
                  onSetTopK={setTopK}
                  onToggleTag={toggleTag}
                  platformConfig={platformConfig}
                  query={query}
                  result={result}
                  selectedTags={selectedTags}
                  topK={topK}
                  visibleResultCount={visibleResults.length}
                  visibleResults={visibleResults}
                />
              </TabsContent>

              <TabsContent value="capture">
                <CapturePanel
                  captureDraft={captureDraft}
                  captureQueue={captureQueue}
                  captureSource={captureSource}
                  onCapture={handleCapture}
                  onResetCapture={resetCaptureDraft}
                  onSetCaptureDraft={setCaptureDraft}
                  onSetCaptureSource={setCaptureSource}
                />
              </TabsContent>

              <TabsContent value="sources">
                <SourcesPanel sourceHealth={sourceHealth} />
              </TabsContent>
            </Tabs>
          </section>

          <SidebarPanels captureQueue={captureQueue} />
        </div>
      </div>
    </div>
  );
}

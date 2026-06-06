import type { KnowledgeSearchResponse, PlatformTarget } from '@pinn/types';

export type NoticeState = {
  description: string;
  title: string;
  variant?: 'default' | 'destructive';
} | null;

export type CaptureQueueItem = {
  id: string;
  source: string;
  status: 'queued' | 'processing' | 'ready';
  summary: string;
  title: string;
};

export type SourceHealthItem = {
  lastSync: string;
  latency: string;
  name: string;
  scope: string;
  status: 'active' | 'warming' | 'paused';
};

export type PipelineStage = {
  description: string;
  label: string;
  value: number;
};

export type PlatformConfig = {
  capturePreset: string;
  captureSource: string;
  defaultTab: 'search' | 'capture' | 'sources';
  defaultTags: string[];
  description: string;
  focusLabel: string;
  guide: string[];
  label: string;
  quickQueries: string[];
  searchPreset: string;
};

export interface SearchPanelProps {
  isLoading: boolean;
  onClearTags: () => void;
  onSearch: () => void;
  onSelectSuggestion: (value: string) => void;
  onSetQuery: (value: string) => void;
  onSetTopK: (value: number) => void;
  onToggleTag: (value: string) => void;
  platformConfig: PlatformConfig;
  query: string;
  result: KnowledgeSearchResponse;
  selectedTags: string[];
  topK: number;
  visibleResultCount: number;
  visibleResults: KnowledgeSearchResponse['results'];
}

export interface CapturePanelProps {
  captureDraft: string;
  captureQueue: CaptureQueueItem[];
  captureSource: string;
  onCapture: () => void;
  onResetCapture: () => void;
  onSetCaptureDraft: (value: string) => void;
  onSetCaptureSource: (value: string) => void;
}

export interface SourcesPanelProps {
  sourceHealth: SourceHealthItem[];
}

export interface WorkspaceHeaderProps {
  captureQueueCount: number;
  isLoading: boolean;
  onSearch: () => void;
  onUseSuggestion: () => void;
  pipelineStages: PipelineStage[];
  platformConfig: PlatformConfig;
  platform: PlatformTarget;
  visibleResultCount: number;
}

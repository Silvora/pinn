import type { PlatformTarget } from '@pinn/types';

import type { CaptureQueueItem, PipelineStage, PlatformConfig, SourceHealthItem } from './types';

export const TAG_OPTIONS = [
  'capture',
  'rag',
  'ui',
  'desktop',
  'extension',
  'pipeline',
  'shared',
  'axios',
];

export const TOP_K_OPTIONS = [3, 5, 8];

export const PLATFORM_CONFIG: Record<PlatformTarget, PlatformConfig> = {
  web: {
    capturePreset: '整理今天关于三端共用页面、RAG 查询面板和来源追溯的讨论，放入 inbox 并补上架构标签。',
    captureSource: 'https://docs.pinn.local/frontend-architecture',
    defaultTab: 'search',
    defaultTags: ['rag', 'ui'],
    description: '适合全量检索、回溯来源与结构化整理，是主知识库的操作台。',
    focusLabel: '全量检索',
    guide: ['适合长时间查询与筛选', '优先展示知识来源和命中上下文', '作为三端统一体验的基准界面'],
    label: 'Web Workspace',
    quickQueries: [
      '三端共用一套页面时，RAG 查询入口应该怎么组织？',
      '插件采集的网页片段进入 inbox 后，后端处理链路是什么？',
      '知识搜索结果为什么必须保留 source 和 score？',
    ],
    searchPreset: '三端共用一套页面时，RAG 查询入口应该怎么组织？',
  },
  desktop: {
    capturePreset: '补充桌面端本地文件索引的设计要求，说明为什么前期只保留 renderer 入口。',
    captureSource: 'file:///Users/admin/Desktop/notes/desktop-plan.md',
    defaultTab: 'sources',
    defaultTags: ['desktop', 'tauri'],
    description: '面向本地文件、离线索引和系统能力扩展，适合作为知识整理工作台。',
    focusLabel: '本地索引',
    guide: ['为后续 Tauri 或 Electron 壳层留接口', '保留与 Web 一致的交互结构', '适合管理本地知识源与同步状态'],
    label: 'Desktop Console',
    quickQueries: [
      '桌面端为什么先保留 renderer，而不立即上 Tauri 壳层？',
      '本地 Markdown 知识库与云端知识库如何统一检索？',
      '桌面端需要补哪些系统级能力才能支持高频整理？',
    ],
    searchPreset: '桌面端为什么先保留 renderer，而不立即上 Tauri 壳层？',
  },
  extension: {
    capturePreset: '保存当前网页的要点、上下文和后续追问，进入 inbox 并标记为高优先级待清洗。',
    captureSource: 'https://current-tab.local/capture-context',
    defaultTab: 'capture',
    defaultTags: ['capture', 'extension'],
    description: '用于快速收集网页片段、链接和临时笔记，把碎片内容送进统一 inbox。',
    focusLabel: '采集入口',
    guide: ['尽量缩短单次录入路径', '只做采集，不在插件里承载复杂整理', '优先记录页面来源与上下文'],
    label: 'Extension Popup',
    quickQueries: [
      '插件端应该采集哪些字段，才能支持后续 RAG 检索？',
      '碎片知识进入 inbox 后，最先要做的是切片还是去重？',
      '插件采集为什么只做前端入口，不做复杂入库逻辑？',
    ],
    searchPreset: '插件端应该采集哪些字段，才能支持后续 RAG 检索？',
  },
};

export function createCaptureQueue(platform: PlatformTarget): CaptureQueueItem[] {
  const shared: CaptureQueueItem[] = [
    {
      id: 'capture-shared-1',
      source: 'docs/capture-flow.md',
      status: 'ready',
      summary: '统一说明插件采集、后端清洗和入库之间的边界，避免前端承担过多处理逻辑。',
      title: '采集流转边界',
    },
    {
      id: 'capture-shared-2',
      source: 'notes/search-experience.md',
      status: 'processing',
      summary: '记录为什么检索结果必须带 source、score 和更新时间，方便结果回溯。',
      title: '检索结果透明性',
    },
  ];

  if (platform === 'desktop') {
    return [
      {
        id: 'capture-desktop-1',
        source: 'docs/desktop-plan.md',
        status: 'queued',
        summary: '补充桌面端本地索引、离线访问和系统快捷键的能力清单。',
        title: '桌面端能力清单',
      },
      ...shared,
    ];
  }

  if (platform === 'extension') {
    return [
      {
        id: 'capture-extension-1',
        source: 'https://current-tab.local/article',
        status: 'queued',
        summary: '从当前页面提取摘要、标签和后续追问，等待统一 inbox 清洗。',
        title: '当前页面碎片记录',
      },
      ...shared,
    ];
  }

  return [
    {
      id: 'capture-web-1',
      source: 'docs/frontend-architecture.md',
      status: 'processing',
      summary: '整理三端如何共用页面层，并把平台差异留在各自入口壳子里。',
      title: '共享页面架构',
    },
    ...shared,
  ];
}

export function createSourceHealth(platform: PlatformTarget): SourceHealthItem[] {
  return [
    {
      lastSync: '2 分钟前',
      latency: '180ms',
      name: 'Browser Capture Inbox',
      scope: '网页片段 / 链接 / 临时笔记',
      status: platform === 'extension' ? 'active' : 'warming',
    },
    {
      lastSync: '8 分钟前',
      latency: '420ms',
      name: 'Markdown Vault',
      scope: '本地文档 / 技术笔记',
      status: platform === 'desktop' ? 'active' : 'warming',
    },
    {
      lastSync: '12 分钟前',
      latency: '260ms',
      name: 'Product Docs',
      scope: '规范 / API / 架构记录',
      status: 'active',
    },
    {
      lastSync: '1 小时前',
      latency: '暂停',
      name: 'Meeting Fragments',
      scope: '临时会议纪要 / 灵感片段',
      status: 'paused',
    },
  ];
}

export function createPipelineStages(
  platform: PlatformTarget,
  queueSize: number,
  resultSize: number,
): PipelineStage[] {
  return [
    {
      label: 'Capture Intake',
      description:
        platform === 'extension'
          ? '插件端优先保证采集速度和来源完整性。'
          : '把碎片内容稳定送入统一 inbox。',
      value: Math.min(96, 40 + queueSize * 8),
    },
    {
      label: 'Cleaning & Chunking',
      description: '后端负责清洗、切片、去重和结构补全。',
      value: Math.min(94, 48 + queueSize * 7),
    },
    {
      label: 'Retrieval Coverage',
      description: '结果数量越稳定，说明知识源与索引越可用。',
      value: Math.min(98, 52 + resultSize * 9),
    },
  ];
}

export function statusLabel(status: CaptureQueueItem['status']) {
  switch (status) {
    case 'queued':
      return '待清洗';
    case 'processing':
      return '处理中';
    case 'ready':
      return '可检索';
    default:
      return status;
  }
}

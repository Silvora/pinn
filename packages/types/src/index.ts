export type PlatformTarget = 'web' | 'desktop' | 'extension';

export interface KnowledgeSearchRequest {
  query: string;
  topK?: number;
  tags?: string[];
}

export interface KnowledgeRecord {
  id: string;
  title: string;
  snippet: string;
  source: string;
  score: number;
  tags: string[];
  updatedAt: string;
}

export interface KnowledgeSearchResponse {
  query: string;
  answer: string;
  tookMs: number;
  results: KnowledgeRecord[];
}

const demoCorpus: KnowledgeRecord[] = [
  {
    id: 'capture-001',
    title: '网页剪藏统一进入 inbox',
    snippet:
      '插件端只负责收集链接、选中文本和截图元数据，真正的清洗、切片和入库都交给后端异步任务处理。',
    source: 'docs/capture-flow.md',
    score: 0.97,
    tags: ['capture', 'extension', 'pipeline'],
    updatedAt: '2026-06-01',
  },
  {
    id: 'rag-002',
    title: 'RAG 查询接口约定',
    snippet:
      '前端统一调用 POST /rag/query，请求体包含 query、topK、tags，返回 answer、tookMs 和 results。',
    source: 'api/rag-query.yaml',
    score: 0.95,
    tags: ['api', 'rag', 'axios'],
    updatedAt: '2026-06-03',
  },
  {
    id: 'ui-003',
    title: '三端共用一套页面',
    snippet:
      '把页面、状态流和请求逻辑抽到 packages/app-shell，web、desktop、extension 只保留各自的入口和平台配置。',
    source: 'docs/frontend-architecture.md',
    score: 0.94,
    tags: ['turborepo', 'ui', 'shared'],
    updatedAt: '2026-06-04',
  },
  {
    id: 'desktop-004',
    title: '桌面端保留 renderer 壳层',
    snippet:
      '前期先把桌面端视为独立的 Vite renderer，等需要本地文件索引、快捷键和系统托盘时，再接 Tauri 或 Electron。',
    source: 'docs/desktop-plan.md',
    score: 0.91,
    tags: ['desktop', 'vite', 'tauri'],
    updatedAt: '2026-05-30',
  },
  {
    id: 'search-005',
    title: '搜索结果需要显式来源',
    snippet:
      'RAG 的答案之外，列表中要保留命中的知识片段、分数、标签和原始来源路径，方便用户回溯。',
    source: 'notes/search-experience.md',
    score: 0.89,
    tags: ['rag', 'ux', 'traceability'],
    updatedAt: '2026-05-28',
  },
];

export function createDemoSearchResponse(query: string): KnowledgeSearchResponse {
  const normalized = query.trim().toLowerCase();
  const matches = demoCorpus.filter((record) => {
    if (!normalized) {
      return true;
    }

    return [record.title, record.snippet, record.source, ...record.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalized);
  });

  const results = (matches.length > 0 ? matches : demoCorpus.slice(0, 3)).slice(0, 5);
  const topicSummary = Array.from(new Set(results.flatMap((item) => item.tags))).slice(0, 4).join('、');

  return {
    query,
    answer: `检索到 ${results.length} 条知识片段，主要涉及 ${topicSummary || '知识入库'}。建议先查看 ${results[0]?.title ?? '最近更新'}，再回到来源文档确认上下文。`,
    tookMs: 132,
    results,
  };
}

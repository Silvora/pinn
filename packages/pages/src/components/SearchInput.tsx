"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  SearchConversation,
  SearchPromptDock,
  type SearchChatMessage,
  type SearchChatSource,
} from "./Chat";

const suggestions = [
  "总结最近关于 RAG 的设计决策",
  "检索插件剪藏流程的实现说明",
  "查找三端共享页面的架构约定",
  "定位同步失败后的重试策略",
  "回顾最近的知识入库记录",
];

const assistantReasoning =
  "先根据用户问题抽取关键词，再结合知识库里的标题、来源路径和标签做候选召回，最后把答案和证据链压缩成一轮可继续追问的对话。";

const sources: SearchChatSource[] = [
  { href: "#", title: "docs/frontend-architecture.md" },
  { href: "#", title: "docs/capture-flow.md" },
  { href: "#", title: "notes/search-experience.md" },
];

const createAssistantReply = (prompt: string) =>
  `检索到与“${prompt}”相关的知识片段。建议先查看三端共享页面的结构约定，再回到具体来源文档确认实现细节。`;

const createMessageId = (role: SearchChatMessage["role"]) =>
  `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const CONVERSATION_GAP = 16;

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<SearchChatMessage[]>([]);
  const [isDocking, setIsDocking] = useState(false);
  const [showConversation, setShowConversation] = useState(false);
  const [clearAfterDock, setClearAfterDock] = useState(false);
  const [conversationHeight, setConversationHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const appendTurn = (prompt: string) => {
    setMessages((current) => [
      ...current,
      {
        id: createMessageId("user"),
        role: "user",
        text: prompt,
      },
      {
        id: createMessageId("assistant"),
        role: "assistant",
        text: createAssistantReply(prompt),
      },
    ]);
  };

  const updateConversationHeight = useCallback(() => {
    const container = containerRef.current;
    const dock = dockRef.current;

    if (!container || !dock) {
      return;
    }

    const nextHeight = Math.max(
      0,
      container.clientHeight - dock.clientHeight - CONVERSATION_GAP +16,
    );

    setConversationHeight(nextHeight);
  }, []);

  useLayoutEffect(() => {
    if (!isDocking) {
      setConversationHeight(null);
      return;
    }

    updateConversationHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateConversationHeight();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (dockRef.current) {
      resizeObserver.observe(dockRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [isDocking, updateConversationHeight]);

  const handleSubmit = () => {
    const normalized = query.trim();
    if (!normalized) {
      return;
    }

    appendTurn(normalized);

    if (!isDocking) {
      setShowConversation(false);
      setClearAfterDock(true);
      setIsDocking(true);
      return;
    }

    setQuery("");
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden text-white">
      <div className="flex flex-1 flex-col">
        <div ref={containerRef} className="flex h-full w-full flex-1 flex-col">
          <AnimatePresence initial={false}>
            {showConversation ? (
              <motion.div
                key="search-conversation"
                initial={{ opacity: 0, y: 56 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-0 overflow-hidden"
                style={conversationHeight ? { height: `${conversationHeight}px` } : undefined}
              >
                <SearchConversation
                  assistantReasoning={assistantReasoning}
                  messages={messages}
                  sources={sources}
                />
              </motion.div>
            ) : isDocking ? (
              <div className="min-h-0 flex-1" />
            ) : null}
          </AnimatePresence>

          <div
            ref={dockRef}
            className={`flex w-full flex-col items-center ${
              isDocking ? "pb-4 pt-3" : "flex-1 justify-center text-center"
            }`}
          >
            <div className={`mx-auto w-full space-y-6 ${isDocking ? "hidden" : ""}`}>
              <div className="flex justify-center">
                <div className="mx-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2">
                  <span className="flex items-center gap-2 text-xs text-white/72">
                    <span className="rounded-full bg-black/30 p-1">✨</span>
                    支持知识检索、来源回溯与标签聚合
                  </span>
                </div>
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                先找到答案，再回到证据链
              </h1>

              <p className="text-md text-white/70">
                Pinn 帮你在知识库中检索答案、定位来源片段，并继续沿着上下文做追溯。
              </p>
            </div>

            <motion.div
              layout
              onLayoutAnimationComplete={() => {
                if (isDocking && clearAfterDock) {
                  setQuery("");
                  setClearAfterDock(false);
                }
                if (isDocking) {
                  updateConversationHeight();
                }
                if (isDocking && !showConversation && messages.length > 0) {
                  setShowConversation(true);
                }
              }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full ${isDocking ? "max-w-3xl" : "mt-6 max-w-3xl"}`}
            >
              <SearchPromptDock value={query} onChange={setQuery} onSubmit={handleSubmit} />
            </motion.div>

            <div className={`mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2 ${isDocking ? "hidden" : ""}`}>
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    appendTurn(item);
                    if (!isDocking) {
                      setShowConversation(false);
                      setClearAfterDock(true);
                      setIsDocking(true);
                    } else {
                      setQuery("");
                    }
                  }}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/76 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

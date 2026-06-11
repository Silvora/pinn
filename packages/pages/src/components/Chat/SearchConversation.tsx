"use client";

import {
  Conversation,
  ConversationContent,
} from "@pinn/ui/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@pinn/ui/components/ai-elements/message";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@pinn/ui/components/ai-elements/reasoning";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@pinn/ui/components/ai-elements/sources";
import { Sparkles } from "lucide-react";
import type { SearchChatMessage, SearchChatSource } from "./types";

interface SearchConversationProps {
  assistantReasoning: string;
  messages: SearchChatMessage[];
  sources: SearchChatSource[];
}

export function SearchConversation({
  assistantReasoning,
  messages,
  sources,
}: SearchConversationProps) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 overflow-hidden pb-4">
      <Conversation className="flex h-full min-h-0 flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-black/14">
        <ConversationContent className="gap-6 p-6">
          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent className="text-white/88">
                {message.role === "assistant" ? (
                  <>
                    <div className="mb-3 flex items-center gap-2 text-sm text-white/54">
                      <Sparkles className="h-4 w-4 text-white/62" />
                      <span>Pinn 检索助手</span>
                    </div>

                    <Reasoning defaultOpen>
                      <ReasoningTrigger className="text-white/48 hover:text-white/72">
                        正在组织检索路径
                      </ReasoningTrigger>
                      <ReasoningContent className="text-white/54">
                        {assistantReasoning}
                      </ReasoningContent>
                    </Reasoning>

                    <MessageResponse>{message.text}</MessageResponse>

                    <Sources className="mt-4 text-white/56">
                      <SourcesTrigger count={sources.length}>
                        已使用 {sources.length} 条来源
                      </SourcesTrigger>
                      <SourcesContent>
                        {sources.map((source) => (
                          <Source key={source.href} href={source.href} title={source.title}>
                            <span className="text-sm text-white/72">{source.title}</span>
                          </Source>
                        ))}
                      </SourcesContent>
                    </Sources>
                  </>
                ) : (
                  <p>{message.text}</p>
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>
    </div>
  );
}

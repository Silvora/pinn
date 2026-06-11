'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Plus, Lightbulb, Paperclip, Image, FileCode,
  ChevronDown, Check, Sparkles, Zap, Brain, Bolt,
  SendHorizontal
} from 'lucide-react'

// TYPES
interface Model {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  badge?: string
}


// CHAT INPUT
function ChatInput({ onSend, placeholder = "What do you want to build?" }: {
  onSend?: (message: string) => void
  placeholder?: string
}) {
  const [message, setMessage] = useState('')
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }, [message])

  const handleSubmit = () => {
    if (message.trim()) {
      onSend?.(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
      <div className="relative rounded-2xl bg-white/8 ring-1 ring-white/[0.10] backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_10px_30px_rgba(0,0,0,0.30)]">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full resize-none bg-transparent text-[15px] text-white/86 placeholder:text-white/36 px-5 pt-5 pb-3 focus:outline-none min-h-[80px] max-h-[200px]"
            style={{ height: '80px' }}
          />
        </div>

        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="flex items-center justify-center size-8 rounded-full bg-white/8 hover:bg-white/10 text-white/52 hover:text-white transition-all duration-200 active:scale-95"
              >
                <Plus className={`size-4 transition-transform duration-200 ${showAttachMenu ? 'rotate-45' : ''}`} />
              </button>

              {showAttachMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowAttachMenu(false)} />
                  <div className="absolute bottom-full left-0 mb-2 z-50 bg-[#1a1a1e]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="p-1.5 min-w-[180px]">
                      {[
                        { icon: <Paperclip className="size-4" />, label: 'Upload file' },
                        { icon: <Image className="size-4" />, label: 'Add image' },
                        { icon: <FileCode className="size-4" />, label: 'Import code' }
                      ].map((item, i) => (
                        <button key={i} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/64 hover:bg-white/5 hover:text-white transition-all duration-150">
                          {item.icon}
                          <span className="text-sm">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>


          <div className="flex items-center gap-2">
            <button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white text-slate-950 hover:bg-white/90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              <span className="hidden sm:inline">拾取</span>
              <SendHorizontal className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


// ANNOUNCEMENT BADGE COMPONENT
function AnnouncementBadge({ text, href = "#" }: { text: string; href?: string }) {
  const content = (
    <>
      <span className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none opacity-70 mix-blend-overlay" style={{ background: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.15) 0%, transparent 70%)' }} />
      <span className="absolute -top-px left-1/2 -translate-x-1/2 h-[2px] w-[100px] opacity-60" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.6) 80%, transparent 100%)', filter: 'blur(0.5px)' }} />
      <Bolt className="size-4 relative z-10 text-white" />
      <span className="relative z-10 text-white font-medium">{text}</span>
    </>
  )

  const className = "relative inline-flex items-center gap-2 px-5 py-2 min-h-[40px] rounded-full text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
  const style = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))',
    backdropFilter: 'blur(20px) saturate(140%)',
    boxShadow: 'inset 0 1px rgba(255,255,255,0.2), inset 0 -1px rgba(0,0,0,0.1), 0 8px 32px -8px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.08)'
  }

  return href !== '#' ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>{content}</a>
  ) : (
    <button className={className} style={style}>{content}</button>
  )
}


// MAIN BOLT CHAT COMPONENT
interface BoltChatProps {
  title?: string
  subtitle?: string
  announcementText?: string
  announcementHref?: string
  placeholder?: string
  onSend?: (message: string) => void
  onImport?: (source: string) => void
}

export function PushInput({
  title = "今天要收集什么",
  subtitle = "把网页、文档、代码片段和想法统一送进 Pinn 的知识流水线。",
  announcementText = "统一收集入口已就绪",
  announcementHref = "#",
  placeholder = "输入要收集的内容、链接",
  onSend,
  onImport
}: BoltChatProps) {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="flex w-full max-w-5xl flex-col items-center gap-8">
        <AnnouncementBadge text={announcementText} href={announcementHref} />

        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-1">
            {title}{' '}
            <span className="bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-transparent italic">
              push
            </span>
            {' '}进知识库
          </h1>
          <p className="text-base font-semibold sm:text-lg text-white/70">{subtitle}</p>
        </div>

        <div className="w-full max-w-[700px]">
          <ChatInput placeholder={placeholder} onSend={onSend} />
        </div>
      </div>
    </div>
  )
}


export default PushInput;

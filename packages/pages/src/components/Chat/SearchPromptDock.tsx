"use client";

import { Sparkles } from "lucide-react";

interface SearchPromptDockProps {
  onChange: (value: string) => void;
  onSubmit: () => void;
  value: string;
}

export function SearchPromptDock({
  onChange,
  onSubmit,
  value,
}: SearchPromptDockProps) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex items-center rounded-full border border-white/10 bg-white/8 p-3 backdrop-blur-sm">
        <button className="rounded-full p-2 transition-all hover:bg-white/10">
          <Sparkles className="h-5 w-5 text-white/72" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSubmit();
            }
          }}
          placeholder="输入问题、文档标题、标签或来源路径"
          className="flex-1 bg-transparent pl-4 text-white/86 outline-none placeholder:text-white/36"
        />
      </div>
    </div>
  );
}

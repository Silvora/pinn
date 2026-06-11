"use client";

import { Keyboard } from "lucide-react";
import { Input } from "@pinn/ui/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pinn/ui/components/ui/select";
import { PreferenceFootnote, PreferenceGroup, PreferenceItem, PreferencePage } from "./PreferencePane";
import type { SettingSectionProps } from "./types";

export function ShortcutSettingSection({}: SettingSectionProps) {
  return (
    <PreferencePage eyebrow="Shortcuts" title="快捷操作">
      <PreferenceGroup
        icon={Keyboard}
        title="默认快捷行为"
        description="为不同端设置快捷键、快速动作和默认打开行为。"
      >
        <PreferenceItem title="扩展端默认打开页" description="决定弹窗首次打开时进入的功能页。">
          <Select defaultValue="collect">
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="选择默认页" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="collect">收集</SelectItem>
              <SelectItem value="search">检索</SelectItem>
              <SelectItem value="history">历史</SelectItem>
            </SelectContent>
          </Select>
        </PreferenceItem>

        <PreferenceItem title="桌面端唤起快捷键" description="快速调出主窗口或收集面板。">
          <Input defaultValue="Ctrl + Shift + P" className="w-[180px]" />
        </PreferenceItem>

        <PreferenceItem title="发送消息快捷键" description="输入区使用的默认发送行为。">
          <Select defaultValue="enter">
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="选择快捷键" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="enter">Enter 发送</SelectItem>
              <SelectItem value="ctrl-enter">Ctrl + Enter 发送</SelectItem>
            </SelectContent>
          </Select>
        </PreferenceItem>
      </PreferenceGroup>

      <PreferenceFootnote>快捷操作应该稳定，不建议在不同端使用完全不一样的主行为。</PreferenceFootnote>
    </PreferencePage>
  );
}

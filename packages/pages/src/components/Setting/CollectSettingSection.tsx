"use client";

import { SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pinn/ui/components/ui/select";
import { Switch } from "@pinn/ui/components/ui/switch";
import { PreferenceFootnote, PreferenceGroup, PreferenceItem, PreferencePage } from "./PreferencePane";
import type { SettingSectionProps } from "./types";

export function CollectSettingSection({}: SettingSectionProps) {
  return (
    <PreferencePage eyebrow="Capture Rules" title="采集策略">
      <PreferenceGroup
        icon={SlidersHorizontal}
        title="默认采集行为"
        description="配置内容进入系统后的默认入口、自动处理方式和来源标记规则。"
      >
        <PreferenceItem title="默认进入 inbox" description="新采集内容优先进入统一待处理队列。">
          <Switch defaultChecked />
        </PreferenceItem>

        <PreferenceItem title="自动生成摘要" description="采集后自动生成摘要和初始标签。">
          <Switch defaultChecked />
        </PreferenceItem>

        <PreferenceItem title="来源聚合方式" description="控制相同来源是否自动合并到同一组。">
          <Select defaultValue="auto">
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="选择聚合方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">自动聚合</SelectItem>
              <SelectItem value="manual">仅手动聚合</SelectItem>
              <SelectItem value="none">不聚合</SelectItem>
            </SelectContent>
          </Select>
        </PreferenceItem>

        <PreferenceItem title="截图保留原始域名" description="便于后续回溯来源和筛选高频站点。">
          <Switch defaultChecked />
        </PreferenceItem>
      </PreferenceGroup>

      <PreferenceFootnote>采集页更像输入层，重点是减少动作数，而不是堆叠状态说明。</PreferenceFootnote>
    </PreferencePage>
  );
}

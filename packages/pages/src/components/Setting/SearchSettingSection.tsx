"use client";

import { Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pinn/ui/components/ui/select";
import { Switch } from "@pinn/ui/components/ui/switch";
import { PreferenceFootnote, PreferenceGroup, PreferenceItem, PreferencePage } from "./PreferencePane";
import type { SettingSectionProps } from "./types";

export function SearchSettingSection({}: SettingSectionProps) {
  return (
    <PreferencePage eyebrow="Search Preferences" title="检索偏好">
      <PreferenceGroup
        icon={Sparkles}
        title="默认检索行为"
        description="定义进入检索页后的默认空间、返回数量和信息呈现方式。"
      >
        <PreferenceItem title="默认检索范围" description="决定首次进入检索页时默认使用的知识空间。">
          <Select defaultValue="all">
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="选择范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部知识库</SelectItem>
              <SelectItem value="team">团队空间</SelectItem>
              <SelectItem value="private">仅个人知识</SelectItem>
            </SelectContent>
          </Select>
        </PreferenceItem>

        <PreferenceItem title="结果数量 Top K" description="控制默认返回的候选知识条数。">
          <Select defaultValue="5">
            <SelectTrigger className="min-w-[120px]">
              <SelectValue placeholder="选择数量" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
        </PreferenceItem>

        <PreferenceItem title="附带来源片段" description="在回答下方显示命中的原文片段和来源信息。">
          <Switch defaultChecked />
        </PreferenceItem>

        <PreferenceItem title="优先展示高相关标签" description="根据命中情况优先展示可继续筛选的标签。">
          <Switch defaultChecked />
        </PreferenceItem>
      </PreferenceGroup>

      <PreferenceFootnote>检索页更适合做轻决策：先给结论，再给来源，再给下一步筛选入口。</PreferenceFootnote>
    </PreferencePage>
  );
}

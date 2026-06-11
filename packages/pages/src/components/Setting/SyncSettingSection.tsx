"use client";

import { Bell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pinn/ui/components/ui/select";
import { Switch } from "@pinn/ui/components/ui/switch";
import { PreferenceFootnote, PreferenceGroup, PreferenceItem, PreferencePage } from "./PreferencePane";
import type { SettingSectionProps } from "./types";

export function SyncSettingSection({}: SettingSectionProps) {
  return (
    <PreferencePage eyebrow="Sync Policies" title="通知与同步">
      <PreferenceGroup
        icon={Bell}
        title="同步与通知规则"
        description="定义提醒频率、同步行为和异常失败后的处理方式。"
      >
        <PreferenceItem title="桌面端后台同步" description="应用保持运行时持续拉取和上传最新状态。">
          <Switch defaultChecked />
        </PreferenceItem>

        <PreferenceItem title="失败任务自动重试" description="同步异常后自动尝试恢复，减少人工干预。">
          <Switch defaultChecked />
        </PreferenceItem>

        <PreferenceItem title="通知频率" description="控制入库完成和异常事件的通知密度。">
          <Select defaultValue="low">
            <SelectTrigger className="min-w-[160px]">
              <SelectValue placeholder="选择频率" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="off">关闭</SelectItem>
              <SelectItem value="low">低频</SelectItem>
              <SelectItem value="normal">标准</SelectItem>
              <SelectItem value="high">高频</SelectItem>
            </SelectContent>
          </Select>
        </PreferenceItem>

        <PreferenceItem title="同步失败提醒" description="失败后立即提醒，而不是等到用户主动查看。">
          <Switch defaultChecked />
        </PreferenceItem>
      </PreferenceGroup>

      <PreferenceFootnote>同步设置应该偏保守，尤其是在扩展端和桌面端共用会话时。</PreferenceFootnote>
    </PreferencePage>
  );
}

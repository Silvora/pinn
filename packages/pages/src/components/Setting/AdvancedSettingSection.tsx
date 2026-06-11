"use client";

import { Settings } from "lucide-react";
import { Button } from "@pinn/ui/components/ui/button";
import { PreferenceFootnote, PreferenceGroup, PreferenceItem, PreferencePage } from "./PreferencePane";
import type { SettingSectionProps } from "./types";

export function AdvancedSettingSection({}: SettingSectionProps) {
  return (
    <PreferencePage eyebrow="Advanced" title="高级设置">
      <PreferenceGroup
        icon={Settings}
        title="配置维护"
        description="处理会话、同步覆盖和偏好重置等进阶配置。"
      >
        <PreferenceItem title="重新同步配置" description="手动触发三端配置拉取，覆盖本地缓存。">
          <Button variant="outline">
            立即同步
          </Button>
        </PreferenceItem>

        <PreferenceItem title="导出当前配置" description="导出当前偏好，便于迁移或回滚。">
          <Button variant="outline">
            导出 JSON
          </Button>
        </PreferenceItem>

        <PreferenceItem title="重置设置项" description="恢复为默认配置，不影响已入库内容。">
          <Button variant="destructive" className="border-transparent">
            恢复默认
          </Button>
        </PreferenceItem>
      </PreferenceGroup>

      <PreferenceFootnote>高级配置建议在 web 或 desktop 端完成，避免在小窗里误操作。</PreferenceFootnote>
    </PreferencePage>
  );
}

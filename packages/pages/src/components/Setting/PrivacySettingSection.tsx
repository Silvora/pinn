"use client";

import { Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pinn/ui/components/ui/select";
import { Switch } from "@pinn/ui/components/ui/switch";
import { PreferenceFootnote, PreferenceGroup, PreferenceItem, PreferencePage } from "./PreferencePane";
import type { SettingSectionProps } from "./types";

export function PrivacySettingSection({}: SettingSectionProps) {
  return (
    <PreferencePage eyebrow="Privacy" title="隐私与权限">
      <PreferenceGroup
        icon={Lock}
        title="账户与权限边界"
        description="管理账户会话、安全规则和不同空间的可见性边界。"
      >
        <PreferenceItem title="敏感操作二次校验" description="删除、导出和权限变更时重新校验身份。">
          <Switch defaultChecked />
        </PreferenceItem>

        <PreferenceItem title="长期登录设备" description="控制不同端是否允许保留长期会话。">
          <Select defaultValue="desktop-only">
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="选择设备策略" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部允许</SelectItem>
              <SelectItem value="desktop-only">仅桌面端</SelectItem>
              <SelectItem value="none">全部关闭</SelectItem>
            </SelectContent>
          </Select>
        </PreferenceItem>

        <PreferenceItem title="来源默认可见性" description="控制新入库内容的默认访问范围。">
          <Select defaultValue="private">
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="选择可见性" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">仅本人可见</SelectItem>
              <SelectItem value="team">团队可见</SelectItem>
            </SelectContent>
          </Select>
        </PreferenceItem>
      </PreferenceGroup>

      <PreferenceFootnote>扩展端和桌面端共享同一会话策略，但可以对长期登录做更严格限制。</PreferenceFootnote>
    </PreferencePage>
  );
}

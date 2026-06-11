"use client";

import type { PlatformTarget } from "@pinn/types";
import { Bell, Keyboard, Lock, Settings, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@pinn/ui/components/ui/sidebar";
import {
  AdvancedSettingSection,
  CollectSettingSection,
  PrivacySettingSection,
  SearchSettingSection,
  ShortcutSettingSection,
  SyncSettingSection,
  type SettingNavItem,
  type SettingSectionKey,
} from "../components/Setting";

const platformMeta: Record<
  PlatformTarget,
  {
    accent: string;
    label: string;
  }
> = {
  desktop: {
    accent: "rgba(244, 181, 120, 0.24)",
    label: "Desktop Settings",
  },
  extension: {
    accent: "rgba(122, 214, 255, 0.24)",
    label: "Popup Settings",
  },
  web: {
    accent: "rgba(255, 255, 255, 0.18)",
    label: "Web Settings",
  },
};

const navItems: SettingNavItem[] = [
  { icon: Sparkles, key: "search", label: "检索偏好" },
  { icon: SlidersHorizontal, key: "collect", label: "采集策略" },
  { icon: Bell, key: "sync", label: "通知与同步" },
  { icon: Keyboard, key: "shortcuts", label: "快捷操作" },
  { icon: Lock, key: "privacy", label: "隐私与权限" },
  { icon: Settings, key: "advanced", label: "高级设置" },
];

interface SettingsPageProps {
  platform: PlatformTarget;
}

export function SettingsPage({ platform }: SettingsPageProps) {
  const meta = platformMeta[platform];
  const [activeSection, setActiveSection] = useState<SettingSectionKey>("search");
  const activeNavItem = useMemo(
    () => navItems.find((item) => item.key === activeSection) ?? navItems[0],
    [activeSection],
  );

  const renderSection = () => {
    switch (activeSection) {
      case "search":
        return <SearchSettingSection />;
      case "collect":
        return <CollectSettingSection />;
      case "sync":
        return <SyncSettingSection />;
      case "shortcuts":
        return <ShortcutSettingSection />;
      case "privacy":
        return <PrivacySettingSection />;
      case "advanced":
        return <AdvancedSettingSection />;
      default:
        return <SearchSettingSection />;
    }
  };

  return (
    <>
      <SidebarProvider className="relative z-10 min-h-full h-full items-start overflow-hidden rounded-[24px] border border-white/10 bg-black/14 backdrop-blur-xl">
        <Sidebar collapsible="none" className="hidden border-r border-white/8 bg-black/18 md:flex">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-white/45">设置导航</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        isActive={item.key === activeSection}
                        className="text-white/74 data-[active=true]:bg-white/10 data-[active=true]:text-white hover:bg-white/8 hover:text-white"
                        render={
                          <button type="button" onClick={() => setActiveSection(item.key)}>
                            <item.icon />
                            <span>{item.label}</span>
                          </button>
                        }
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <div className="mt-4">{renderSection()}</div>
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}

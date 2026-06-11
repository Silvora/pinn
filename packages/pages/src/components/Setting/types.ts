import type { LucideIcon } from "lucide-react";

export type SettingSectionKey =
  | "search"
  | "collect"
  | "sync"
  | "shortcuts"
  | "privacy"
  | "advanced";

export interface SettingNavItem {
  icon: LucideIcon;
  key: SettingSectionKey;
  label: string;
}

export interface SettingSectionProps {}

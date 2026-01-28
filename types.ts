import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
}

export type ViewState = 'HOME' | 'HADIS' | 'KITAB' | 'SAMAIL' | 'QUOTE' | 'PRAYER' | 'QIBLAT' | 'VIDEO' | 'WALLPAPER';

export interface DailyContent {
  title: string;
  content: string;
  source?: string;
  arabic?: string;
}

export interface PrayerTime {
  name: string;
  time: string;
}

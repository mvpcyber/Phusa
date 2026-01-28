import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
}

export type ViewState = 'HOME' | 'HADIS' | 'QURAN' | 'KITAB' | 'SAMAIL' | 'QUOTE' | 'PRAYER' | 'QIBLAT' | 'VIDEO' | 'WALLPAPER';

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

export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  jumlahAyat: number;
  audioFull: any;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    "01"?: string;
    "02"?: string;
    "03"?: string;
    "04"?: string;
    "05"?: string; 
  };
}
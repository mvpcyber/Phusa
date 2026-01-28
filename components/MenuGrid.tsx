import React from 'react';
import { 
  BookOpen, 
  Library, 
  User, 
  MessageCircle, 
  Clock, 
  Compass, 
  PlayCircle, 
  Image as ImageIcon 
} from 'lucide-react';
import { ViewState } from '../types';

interface MenuGridProps {
  onNavigate: (view: ViewState) => void;
}

// Mendefinisikan item menu dengan warna spesifik untuk Button dan Icon
const MENU_ITEMS = [
  { 
    id: 'HADIS', 
    title: 'Hadis', 
    icon: BookOpen, 
    // Emerald / Green Theme
    bgClass: 'bg-emerald-400/20 border-emerald-400/30 hover:bg-emerald-400/30',
    iconClass: 'text-emerald-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]',
    shadowClass: 'shadow-[0_4px_14px_0_rgba(16,185,129,0.3)]'
  },
  { 
    id: 'KITAB', 
    title: 'Kitab', 
    icon: Library, 
    // Blue Theme
    bgClass: 'bg-blue-400/20 border-blue-400/30 hover:bg-blue-400/30',
    iconClass: 'text-blue-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]',
    shadowClass: 'shadow-[0_4px_14px_0_rgba(59,130,246,0.3)]'
  },
  { 
    id: 'SAMAIL', 
    title: 'Syamail Nabi', 
    icon: User, 
    // Violet / Purple Theme
    bgClass: 'bg-violet-400/20 border-violet-400/30 hover:bg-violet-400/30',
    iconClass: 'text-violet-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]',
    shadowClass: 'shadow-[0_4px_14px_0_rgba(139,92,246,0.3)]'
  },
  { 
    id: 'QUOTE', 
    title: 'Quote Nabawi', 
    icon: MessageCircle, 
    // Amber / Orange Theme
    bgClass: 'bg-amber-400/20 border-amber-400/30 hover:bg-amber-400/30',
    iconClass: 'text-amber-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]',
    shadowClass: 'shadow-[0_4px_14px_0_rgba(245,158,11,0.3)]'
  },
  { 
    id: 'PRAYER', 
    title: 'Waktu Sholat', 
    icon: Clock, 
    // Cyan / Teal Theme
    bgClass: 'bg-cyan-400/20 border-cyan-400/30 hover:bg-cyan-400/30',
    iconClass: 'text-cyan-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]',
    shadowClass: 'shadow-[0_4px_14px_0_rgba(6,182,212,0.3)]'
  },
  { 
    id: 'QIBLAT', 
    title: 'Qiblat', 
    icon: Compass, 
    // Indigo Theme
    bgClass: 'bg-indigo-400/20 border-indigo-400/30 hover:bg-indigo-400/30',
    iconClass: 'text-indigo-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]',
    shadowClass: 'shadow-[0_4px_14px_0_rgba(99,102,241,0.3)]'
  },
  { 
    id: 'VIDEO', 
    title: 'Video Islami', 
    icon: PlayCircle, 
    // Red / Rose Theme
    bgClass: 'bg-rose-400/20 border-rose-400/30 hover:bg-rose-400/30',
    iconClass: 'text-rose-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]',
    shadowClass: 'shadow-[0_4px_14px_0_rgba(244,63,94,0.3)]'
  },
  { 
    id: 'WALLPAPER', 
    title: 'Wallpaper', 
    icon: ImageIcon, 
    // Pink / Fuchsia Theme
    bgClass: 'bg-fuchsia-400/20 border-fuchsia-400/30 hover:bg-fuchsia-400/30',
    iconClass: 'text-fuchsia-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]',
    shadowClass: 'shadow-[0_4px_14px_0_rgba(217,70,239,0.3)]'
  },
];

export const MenuGrid: React.FC<MenuGridProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {MENU_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id as ViewState)}
          className="flex flex-col items-center gap-2 group"
        >
          {/* Tinted Glass Button Effect */}
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center 
            transform transition-all duration-300 
            group-hover:scale-110 group-active:scale-95 
            backdrop-blur-md border 
            ${item.bgClass} 
            ${item.shadowClass}
          `}>
            <item.icon className={`w-7 h-7 ${item.iconClass}`} />
          </div>
          <span className="text-[10px] font-semibold text-white text-center leading-tight drop-shadow-md tracking-wide">
            {item.title}
          </span>
        </button>
      ))}
    </div>
  );
};
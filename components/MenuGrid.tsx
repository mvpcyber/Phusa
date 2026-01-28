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

// Mendefinisikan item menu dengan warna spesifik
const MENU_ITEMS = [
  { 
    id: 'HADIS', 
    title: 'Hadis', 
    icon: BookOpen, 
    // Emerald / Green Theme
    bgClass: 'bg-emerald-50 border-emerald-100',
    iconClass: 'text-emerald-600',
    shadowClass: 'shadow-sm'
  },
  { 
    id: 'KITAB', 
    title: 'Kitab', 
    icon: Library, 
    // Blue Theme
    bgClass: 'bg-blue-50 border-blue-100',
    iconClass: 'text-blue-600',
    shadowClass: 'shadow-sm'
  },
  { 
    id: 'SAMAIL', 
    title: 'Syamail Nabi', 
    icon: User, 
    // Violet / Purple Theme
    bgClass: 'bg-violet-50 border-violet-100',
    iconClass: 'text-violet-600',
    shadowClass: 'shadow-sm'
  },
  { 
    id: 'QUOTE', 
    title: 'Quote Nabawi', 
    icon: MessageCircle, 
    // Amber / Orange Theme
    bgClass: 'bg-amber-50 border-amber-100',
    iconClass: 'text-amber-600',
    shadowClass: 'shadow-sm'
  },
  { 
    id: 'PRAYER', 
    title: 'Waktu Sholat', 
    icon: Clock, 
    // Cyan / Teal Theme
    bgClass: 'bg-cyan-50 border-cyan-100',
    iconClass: 'text-cyan-600',
    shadowClass: 'shadow-sm'
  },
  { 
    id: 'QIBLAT', 
    title: 'Qiblat', 
    icon: Compass, 
    // Indigo Theme
    bgClass: 'bg-indigo-50 border-indigo-100',
    iconClass: 'text-indigo-600',
    shadowClass: 'shadow-sm'
  },
  { 
    id: 'VIDEO', 
    title: 'Video Islami', 
    icon: PlayCircle, 
    // Red / Rose Theme
    bgClass: 'bg-rose-50 border-rose-100',
    iconClass: 'text-rose-600',
    shadowClass: 'shadow-sm'
  },
  { 
    id: 'WALLPAPER', 
    title: 'Wallpaper', 
    icon: ImageIcon, 
    // Pink / Fuchsia Theme
    bgClass: 'bg-fuchsia-50 border-fuchsia-100',
    iconClass: 'text-fuchsia-600',
    shadowClass: 'shadow-sm'
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
          {/* Light Theme Button */}
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center 
            transform transition-all duration-300 
            group-hover:scale-110 group-active:scale-95 
            border 
            ${item.bgClass} 
            ${item.shadowClass}
          `}>
            <item.icon className={`w-7 h-7 ${item.iconClass}`} />
          </div>
          <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight tracking-wide group-hover:text-primary transition-colors">
            {item.title}
          </span>
        </button>
      ))}
    </div>
  );
};
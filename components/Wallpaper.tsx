import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

const WALLPAPERS = [
  'https://picsum.photos/400/800?random=10',
  'https://picsum.photos/400/800?random=11',
  'https://picsum.photos/400/800?random=12',
  'https://picsum.photos/400/800?random=13',
  'https://picsum.photos/400/800?random=14',
  'https://picsum.photos/400/800?random=15',
];

const HEADER_BG = "https://m.muijakarta.or.id/img/header.jpg";

export const Wallpaper: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full relative">
      <div className="relative m-4 rounded-3xl overflow-hidden shadow-lg z-20 border border-white/30 shrink-0">
         <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${HEADER_BG})` }} />
         <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]"></div>
         <div className="relative z-10 p-4 pt-12 pb-6 flex items-center gap-4 text-white">
            <button onClick={onBack} className="hover:bg-white/20 p-2 rounded-full glass-btn transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold drop-shadow-md">Islamic Wallpaper</h1>
         </div>
      </div>

      <div className="px-4 grid grid-cols-2 gap-4 overflow-y-auto pb-32">
        {WALLPAPERS.map((src, idx) => (
          <div key={idx} className="relative rounded-xl overflow-hidden aspect-[9/16] group shadow-lg liquid-glass border-0">
            <img src={src} alt="Wallpaper" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <button className="w-full py-2 bg-white text-slate-900 rounded-lg font-medium text-xs flex items-center justify-center gap-2">
                    <Download className="w-3 h-3" /> Unduh
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
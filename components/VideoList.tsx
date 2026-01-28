import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';

const VIDEOS = [
  { id: 1, title: 'Kajian Tauhid Bersama Ustadz Abdul Somad', thumbnail: 'https://picsum.photos/400/225?random=1', duration: '15:20' },
  { id: 2, title: 'Sejarah Nabi Muhammad SAW - Bagian 1', thumbnail: 'https://picsum.photos/400/225?random=2', duration: '24:05' },
  { id: 3, title: 'Adab Sebelum Tidur Sesuai Sunnah', thumbnail: 'https://picsum.photos/400/225?random=3', duration: '08:45' },
  { id: 4, title: 'Keutamaan Sholat Dhuha', thumbnail: 'https://picsum.photos/400/225?random=4', duration: '12:30' },
  { id: 5, title: 'Tafsir Al-Fatihah', thumbnail: 'https://picsum.photos/400/225?random=5', duration: '45:00' },
];

const HEADER_BG = "https://m.muijakarta.or.id/img/header.jpg";

export const VideoList: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full relative">
      <div className="relative m-4 rounded-3xl overflow-hidden shadow-lg z-10 border border-white/30 shrink-0">
        <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: `url(${HEADER_BG})` }} 
        />
        <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 p-4 pt-12 pb-6 flex items-center gap-4 text-white">
            <button onClick={onBack} className="hover:bg-white/20 p-2 rounded-full transition-colors glass-btn">
            <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold drop-shadow-md">Video Islami</h1>
        </div>
      </div>

      <div className="px-4 space-y-4 overflow-y-auto pb-32">
        {VIDEOS.map((video) => (
          <div key={video.id} className="liquid-glass rounded-2xl overflow-hidden shadow-lg border border-white/30 group transition-transform hover:scale-[1.02]">
            <div className="relative">
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center border border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                   <Play className="w-5 h-5 text-white fill-white ml-1" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 liquid-glass text-white text-[10px] px-2 py-1 rounded border border-white/20">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white line-clamp-2 leading-tight drop-shadow-sm">{video.title}</h3>
              <p className="text-xs text-white/70 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span> MUI TV Official
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
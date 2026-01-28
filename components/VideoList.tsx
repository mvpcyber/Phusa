import React, { useState } from 'react';
import { ArrowLeft, Play, ExternalLink, X, Youtube } from 'lucide-react';

// Data Video Ceramah KH Zainuddin MZ (Official)
const VIDEOS = [
  { 
    id: 'tP2XjXk9q_k', 
    title: '10 Golongan Musuh Syaitan - KH Zainuddin MZ', 
    thumbnail: 'https://img.youtube.com/vi/tP2XjXk9q_k/hqdefault.jpg', 
    duration: '58:20',
    views: '1.2M x ditonton'
  },
  { 
    id: 'x-MGLgN9Q54', 
    title: 'Kisah Nabi Yusuf AS & Siti Zulaikha - Full', 
    thumbnail: 'https://img.youtube.com/vi/x-MGLgN9Q54/hqdefault.jpg', 
    duration: '1:02:15',
    views: '850rb x ditonton'
  },
  { 
    id: '6yD8yD-w3c4', 
    title: 'Cara Mendidik Anak Dalam Islam', 
    thumbnail: 'https://img.youtube.com/vi/6yD8yD-w3c4/hqdefault.jpg', 
    duration: '45:30',
    views: '500rb x ditonton'
  },
  { 
    id: 'M7uC4k8k7zU', 
    title: 'Bahaya Arak dan Judi (Khamar)', 
    thumbnail: 'https://img.youtube.com/vi/M7uC4k8k7zU/hqdefault.jpg', 
    duration: '52:10',
    views: '2.1M x ditonton'
  },
  { 
    id: 'X8q9w7z5y2E', 
    title: 'Berbakti Kepada Kedua Orang Tua', 
    thumbnail: 'https://img.youtube.com/vi/X8q9w7z5y2E/hqdefault.jpg', 
    duration: '48:00',
    views: '1.5M x ditonton'
  },
];

const HEADER_BG = "https://pusha.muijakarta.or.id/img/header2.jpg";

export const VideoList: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="relative m-4 rounded-3xl overflow-hidden shadow-lg z-10 border border-white/20 shrink-0">
        <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: `url(${HEADER_BG})` }} 
        />
        <div className="absolute inset-0 bg-primary/40 z-0 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 p-4 pt-12 pb-6 flex items-center gap-4 text-white">
            <button onClick={onBack} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors backdrop-blur-sm">
            <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-xl font-bold drop-shadow-md">Video Islami</h1>
                <p className="text-xs text-white/90">Kajian KH Zainuddin MZ</p>
            </div>
        </div>
      </div>

      {/* Video List */}
      <div className="px-4 space-y-4 overflow-y-auto pb-32">
        {VIDEOS.map((video) => (
          <button 
            key={video.id} 
            onClick={() => setPlayingVideo(video.id)}
            className="w-full text-left liquid-glass rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group active:scale-[0.98]"
          >
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                   <Play className="w-5 h-5 text-white fill-white ml-1" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-medium">
                {video.duration}
              </span>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight mb-2 text-sm">
                {video.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-500 flex items-center gap-1.5 font-semibold">
                    <img 
                        src="https://yt3.googleusercontent.com/ytc/AIdro_m8a1Yj0q0q43q4q4q4q4q4q4q4q4q4=s176-c-k-c0x00ffffff-no-rj" 
                        alt="Channel"
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Z+M&background=red&color=fff"
                        }}
                    />
                    Official Zainuddin MZ
                </p>
                <div className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Youtube size={10} />
                    Putar
                </div>
              </div>
            </div>
          </button>
        ))}
        
        <div className="text-center pt-4 pb-8">
            <button 
                onClick={() => window.open('https://www.youtube.com/@officialzainuddinmz', '_blank')}
                className="text-xs text-primary font-bold hover:underline"
            >
                Lihat Semua Video di YouTube
            </button>
        </div>
      </div>

      {/* Video Player Modal (Theater Mode) */}
      {playingVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
             {/* Close Button Area */}
             <div className="absolute top-0 left-0 right-0 p-4 flex justify-end z-20">
                <button 
                    onClick={() => setPlayingVideo(null)}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
                >
                    <X size={24} />
                </button>
             </div>

             {/* Player Container */}
             <div className="w-full max-w-lg aspect-video bg-black shadow-2xl relative z-10">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0&modestbranding=1`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
             </div>

             {/* Title Info (Optional) */}
             <div className="mt-4 px-6 text-center">
                 <p className="text-white/60 text-xs">Sedang memutar video...</p>
             </div>
        </div>
      )}

    </div>
  );
};
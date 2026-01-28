import React, { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, Share2 } from 'lucide-react';
import { generateIslamicContent } from '../services/gemini';
import { DailyContent, ViewState } from '../types';

interface ContentDetailProps {
  type: 'HADIS' | 'KITAB' | 'SAMAIL' | 'QUOTE';
  onBack: () => void;
}

const HEADER_BG = "https://m.muijakarta.or.id/img/header.jpg";

export const ContentDetail: React.FC<ContentDetailProps> = ({ type, onBack }) => {
  const [data, setData] = useState<DailyContent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const result = await generateIslamicContent(type);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const getTitle = () => {
    switch (type) {
      case 'HADIS': return 'Hadis Harian';
      case 'KITAB': return 'Rekomendasi Kitab';
      case 'SAMAIL': return 'Syamail Nabi';
      case 'QUOTE': return 'Quote Nabawi';
      default: return 'Detail';
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Header Glass with Image Background */}
      <div className="relative m-4 rounded-3xl overflow-hidden shadow-lg z-10 border border-white/30 shrink-0">
        <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: `url(${HEADER_BG})` }} 
        />
        <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 p-4 pt-12 pb-6 flex items-center justify-between text-white">
            <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors glass-btn">
            <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold drop-shadow-md">{getTitle()}</h1>
            <button onClick={fetchData} className="p-2 hover:bg-white/20 rounded-full transition-colors glass-btn">
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {loading ? (
          <div className="space-y-4 animate-pulse liquid-glass p-6 rounded-3xl">
            <div className="h-8 bg-white/20 rounded w-3/4 mx-auto"></div>
            <div className="h-32 bg-white/20 rounded"></div>
            <div className="h-4 bg-white/20 rounded w-1/2 mx-auto"></div>
          </div>
        ) : data ? (
          <div className="space-y-6">
            <div className="liquid-glass p-8 rounded-3xl text-center relative overflow-hidden border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
               
              {data.arabic && (
                <p className="font-serif text-2xl mb-6 leading-loose text-white dir-rtl drop-shadow-md">
                  {data.arabic}
                </p>
              )}
              
              <h2 className="text-lg font-bold text-amber-300 mb-2 drop-shadow-md">{data.title}</h2>
              <p className="text-white leading-relaxed mb-6 font-medium text-sm/6 drop-shadow-sm">{data.content}</p>
              
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                {data.source || 'Sumber Terpercaya'}
              </div>
            </div>

            <button className="w-full py-4 liquid-glass text-white font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-white/10">
               <Share2 className="w-5 h-5" />
               Bagikan Kebaikan
            </button>
          </div>
        ) : (
          <div className="text-center text-white/70 mt-10 liquid-glass p-4 rounded-xl">
            Gagal memuat data. Periksa koneksi internet Anda.
          </div>
        )}
      </div>
    </div>
  );
};
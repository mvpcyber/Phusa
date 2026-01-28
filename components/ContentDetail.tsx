import React, { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, Share2 } from 'lucide-react';
import { generateIslamicContent } from '../services/gemini';
import { DailyContent, ViewState } from '../types';

interface ContentDetailProps {
  type: 'HADIS' | 'KITAB' | 'SAMAIL' | 'QUOTE';
  onBack: () => void;
}

const HEADER_BG = "https://pusha.muijakarta.or.id/img/header2.jpg";

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
      {/* Header with Image */}
      <div className="relative m-4 rounded-3xl overflow-hidden shadow-lg z-10 border border-white/20 shrink-0">
        <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: `url(${HEADER_BG})` }} 
        />
        <div className="absolute inset-0 bg-primary/40 z-0 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 p-4 pt-12 pb-6 flex items-center justify-between text-white">
            <button onClick={onBack} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm">
            <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold drop-shadow-md">{getTitle()}</h1>
            <button onClick={fetchData} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm">
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {loading ? (
          <div className="space-y-4 liquid-glass p-6 rounded-3xl animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto"></div>
            <div className="h-32 bg-slate-100 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
          </div>
        ) : data ? (
          <div className="space-y-6">
            <div className="liquid-glass p-8 rounded-3xl text-center relative overflow-hidden">
               
              {data.arabic && (
                <p className="font-serif text-3xl mb-6 leading-loose text-slate-900 dir-rtl">
                  {data.arabic}
                </p>
              )}
              
              <h2 className="text-lg font-bold text-amber-600 mb-2">{data.title}</h2>
              <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm/7">{data.content}</p>
              
              <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                {data.source || 'Sumber Terpercaya'}
              </div>
            </div>

            <button className="w-full py-4 bg-primary text-white font-semibold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary/90 shadow-lg shadow-primary/30">
               <Share2 className="w-5 h-5" />
               Bagikan Kebaikan
            </button>
          </div>
        ) : (
          <div className="text-center text-slate-500 mt-10 liquid-glass p-4 rounded-xl">
            Gagal memuat data. Periksa koneksi internet Anda.
          </div>
        )}
      </div>
    </div>
  );
};
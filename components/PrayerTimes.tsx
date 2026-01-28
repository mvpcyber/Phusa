import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { getPrayerTimesAI } from '../services/gemini';

interface PrayerTimesProps {
  onBack: () => void;
}

const HEADER_BG = "https://m.muijakarta.or.id/img/header.jpg";

export const PrayerTimes: React.FC<PrayerTimesProps> = ({ onBack }) => {
  const [times, setTimes] = useState<any>(null);
  const [city, setCity] = useState("Jakarta");

  useEffect(() => {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(async (position) => {
         const data = await getPrayerTimesAI(city);
         setTimes(data);
       }, async () => {
         const data = await getPrayerTimesAI(city);
         setTimes(data);
       });
    } else {
        getPrayerTimesAI(city).then(setTimes);
    }
  }, [city]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Header Glass with Image */}
      <div className="relative m-4 mb-2 rounded-[30px] shadow-lg overflow-hidden border border-white/30 shrink-0">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${HEADER_BG})` }} />
        <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 p-6 pt-10 pb-10 text-white">
          <button onClick={onBack} className="mb-4 hover:bg-white/20 p-2 rounded-full w-fit transition-colors glass-btn">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 mb-2 text-white/90">
            <MapPin className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-medium">{city}, Indonesia</span>
          </div>
          <h1 className="text-3xl font-bold mb-1 drop-shadow-md">Waktu Sholat</h1>
          <p className="text-white/80 text-sm">Mari tegakkan tiang agama</p>
        </div>
      </div>

      <div className="flex-1 px-4 pb-32 overflow-y-auto">
        <div className="liquid-glass rounded-3xl p-6 space-y-4 border border-white/30 mt-2">
            {!times ? (
                <div className="text-center py-10 text-white/70">Memuat Jadwal...</div>
            ) : (
                Object.entries(times).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                        <span className="capitalize font-semibold text-white text-lg drop-shadow-sm">{key}</span>
                        <div className="bg-white/20 text-amber-300 px-4 py-1.5 rounded-lg font-bold font-mono border border-white/10 shadow-inner">
                            {value as string}
                        </div>
                    </div>
                ))
            )}
        </div>
        
        <div className="mt-6 text-center text-xs text-white/60 bg-black/20 p-2 rounded-xl backdrop-blur-sm">
            Jadwal waktu sholat bersifat estimasi. Silakan tambahkan ihtiyat ± 2 menit.
        </div>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { getPrayerTimesAI } from '../services/gemini';

interface PrayerTimesProps {
  onBack: () => void;
}

const HEADER_BG = "https://pusha.muijakarta.or.id/img/header2.jpg";

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
      <div className="relative m-4 mb-2 rounded-[30px] shadow-lg overflow-hidden border border-white/20 shrink-0">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${HEADER_BG})` }} />
        <div className="absolute inset-0 bg-primary/40 z-0 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 p-6 pt-10 pb-10 text-white">
          <button onClick={onBack} className="mb-4 bg-white/20 hover:bg-white/30 p-2 rounded-full w-fit transition-colors backdrop-blur-sm">
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
        <div className="liquid-glass rounded-3xl p-6 space-y-4 mt-2">
            {!times ? (
                <div className="text-center py-10 text-slate-500">Memuat Jadwal...</div>
            ) : (
                Object.entries(times).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                        <span className="capitalize font-semibold text-slate-700 text-lg">{key}</span>
                        <div className="bg-slate-100 text-primary px-4 py-1.5 rounded-lg font-bold font-mono border border-slate-200">
                            {value as string}
                        </div>
                    </div>
                ))
            )}
        </div>
        
        <div className="mt-6 text-center text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
            Jadwal waktu sholat bersifat estimasi. Silakan tambahkan ihtiyat ± 2 menit.
        </div>
      </div>
    </div>
  );
};
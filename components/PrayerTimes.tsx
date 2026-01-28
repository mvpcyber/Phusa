import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, Sunrise, Sun, Moon } from 'lucide-react';
import { getKemenagPrayerTimes, getNextPrayer, KemenagJadwal } from '../services/prayer';

interface PrayerTimesProps {
  onBack: () => void;
}

const HEADER_BG = "https://pusha.muijakarta.or.id/img/header2.jpg";

export const PrayerTimes: React.FC<PrayerTimesProps> = ({ onBack }) => {
  const [schedule, setSchedule] = useState<KemenagJadwal | null>(null);
  const [city, setCity] = useState("Jakarta");
  const [nextPrayer, setNextPrayer] = useState("");

  useEffect(() => {
    // Mencari lokasi user terlebih dahulu
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(async (position) => {
         // Idealnya reverse geocoding koordinat ke nama kota. 
         // Di sini kita default ke Jakarta atau logic sederhana jika ada API geocoding.
         // Untuk demo kita pakai Jakarta atau kota statis agar stabil dengan Kemenag API.
         fetchData("Jakarta");
       }, async () => {
         fetchData("Jakarta");
       });
    } else {
        fetchData("Jakarta");
    }
  }, []);

  const fetchData = async (cityName: string) => {
      setCity(cityName);
      const res = await getKemenagPrayerTimes(cityName);
      if (res) {
          setSchedule(res.data);
          setCity(res.location); // Update nama kota resmi dari API
          setNextPrayer(getNextPrayer(res.data));
      }
  }

  const getIcon = (key: string) => {
      switch(key) {
          case 'subuh': return <Sunrise className="w-6 h-6 text-orange-400" />;
          case 'dzuhur': return <Sun className="w-6 h-6 text-yellow-500" />;
          case 'ashar': return <Sun className="w-6 h-6 text-amber-500" />;
          case 'maghrib': return <Moon className="w-6 h-6 text-indigo-400" />;
          case 'isya': return <Moon className="w-6 h-6 text-slate-700" />;
          default: return <Clock className="w-6 h-6 text-primary" />;
      }
  };

  const cards = [
    { key: 'imsak', label: 'Imsak', time: schedule?.imsak },
    { key: 'subuh', label: 'Subuh', time: schedule?.subuh },
    { key: 'terbit', label: 'Terbit', time: schedule?.terbit },
    { key: 'dhuha', label: 'Dhuha', time: schedule?.dhuha },
    { key: 'dzuhur', label: 'Dzuhur', time: schedule?.dzuhur },
    { key: 'ashar', label: 'Ashar', time: schedule?.ashar },
    { key: 'maghrib', label: 'Maghrib', time: schedule?.maghrib },
    { key: 'isya', label: 'Isya', time: schedule?.isya },
  ];

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
            <span className="text-sm font-medium uppercase tracking-wide">{city}</span>
          </div>
          <h1 className="text-3xl font-bold mb-1 drop-shadow-md">Waktu Sholat</h1>
          <p className="text-white/80 text-sm flex items-center gap-2">
             <Calendar className="w-3 h-3" /> {schedule?.tanggal || 'Hari ini'}
          </p>
        </div>
      </div>

      <div className="flex-1 px-4 pb-32 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 mt-2">
            {!schedule ? (
                <div className="col-span-2 text-center py-10 text-slate-500 animate-pulse bg-white rounded-3xl p-6">Memuat Jadwal dari Kemenag...</div>
            ) : (
                cards.map((item) => {
                    const isNext = nextPrayer === item.key;
                    // Highlight item khusus sholat 5 waktu jika nextPrayer cocok
                    const isPrayerTime = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'].includes(item.key);
                    const highlight = isPrayerTime && isNext;

                    return (
                        <div 
                            key={item.key} 
                            className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-28 relative overflow-hidden group
                                ${highlight 
                                    ? 'bg-gradient-to-br from-primary to-slate-800 text-white shadow-xl scale-[1.02] border-transparent' 
                                    : 'bg-white border-slate-100 hover:border-primary/30 shadow-sm'}
                            `}
                        >
                            <div className="flex justify-between items-start z-10">
                                <span className={`text-xs font-bold uppercase tracking-wider ${highlight ? 'text-amber-300' : 'text-slate-500'}`}>
                                    {item.label}
                                </span>
                                <div className={`p-1.5 rounded-full ${highlight ? 'bg-white/20' : 'bg-slate-50'}`}>
                                    {getIcon(item.key)}
                                </div>
                            </div>
                            
                            <div className="z-10 mt-auto">
                                <span className={`text-2xl font-bold font-mono ${highlight ? 'text-white' : 'text-slate-800'}`}>
                                    {item.time}
                                </span>
                                {highlight && (
                                    <span className="absolute bottom-4 right-4 text-[10px] bg-amber-400 text-slate-900 px-2 py-0.5 rounded font-bold animate-pulse">
                                        SEGERA
                                    </span>
                                )}
                            </div>

                            {/* Background decoration */}
                            {highlight && <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>}
                        </div>
                    );
                })
            )}
        </div>
        
        <div className="mt-6 text-center text-[10px] text-slate-400 p-4">
            Sumber Data: Kementerian Agama Republik Indonesia <br/>
            (via api.myquran.com)
        </div>
      </div>
    </div>
  );
};
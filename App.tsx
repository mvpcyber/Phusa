import React, { useState, useEffect } from 'react';
import { MenuGrid } from './components/MenuGrid';
import { ContentDetail } from './components/ContentDetail';
import { HadithView } from './components/HadithView';
import { QuranView } from './components/QuranView';
import { PrayerTimes } from './components/PrayerTimes';
import { Qiblat } from './components/Qiblat';
import { VideoList } from './components/VideoList';
import { Wallpaper } from './components/Wallpaper';
import { InstallPrompt } from './components/InstallPrompt';
import { getPrayerTimesAI } from './services/gemini';
import { ViewState } from './types';
import { Menu, BookOpen, FileText, Home, Clock, User, MapPin } from 'lucide-react';

const HEADER_IMAGE = "https://m.muijakarta.or.id/img/header.jpg";

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [prayerTimes, setPrayerTimes] = useState<any>(null);

  useEffect(() => {
    // Load jadwal sholat untuk widget home (default Jakarta agar cepat)
    getPrayerTimesAI("Jakarta").then(data => setPrayerTimes(data));
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'HADIS':
        return <HadithView onBack={() => setView('HOME')} />;
      case 'QURAN':
        return <QuranView onBack={() => setView('HOME')} />;
      case 'KITAB':
      case 'SAMAIL':
      case 'QUOTE':
        return <ContentDetail type={view} onBack={() => setView('HOME')} />;
      case 'PRAYER':
        return <PrayerTimes onBack={() => setView('HOME')} />;
      case 'QIBLAT':
        return <Qiblat onBack={() => setView('HOME')} />;
      case 'VIDEO':
        return <VideoList onBack={() => setView('HOME')} />;
      case 'WALLPAPER':
        return <Wallpaper onBack={() => setView('HOME')} />;
      default:
        return (
          <>
            {/* Custom Header with Image */}
            <div className="absolute top-0 left-0 w-full h-64 z-0 rounded-b-[40px] overflow-hidden shadow-2xl">
                <img src={HEADER_IMAGE} alt="Header" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/20 to-primary"></div>
            </div>

            {/* Header / Top Nav */}
            <header className="p-4 pt-12 flex justify-between items-center text-white z-10 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-white overflow-hidden">
                   <img src="https://pusha.muijakarta.or.id/img/logo.png" alt="PUSHA Logo" className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-none drop-shadow-md text-white">PUSHA</h1>
                  <p className="text-xs text-secondary/90 drop-shadow-sm">Pusat Studi Hadis</p>
                </div>
              </div>
              <button className="p-2 liquid-glass rounded-full hover:bg-white/20 transition-colors">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </header>

            {/* Hero Section / Greeting */}
            <div className="px-6 py-4 text-white text-center z-10 relative mb-2">
              <p className="text-sm font-medium text-secondary mb-2 uppercase tracking-widest drop-shadow-md">Assalamu'alaikum</p>
              
              {/* Prayer Times Widget */}
              <div className="mt-2 mb-6">
                  {!prayerTimes ? (
                      <div className="flex justify-center gap-2 animate-pulse">
                          {[1,2,3,4,5].map(i => <div key={i} className="w-14 h-14 bg-white/20 rounded-xl"></div>)}
                      </div>
                  ) : (
                     <div className="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {[
                          { key: 'fajr', label: 'Subuh' },
                          { key: 'dhuhr', label: 'Dzuhur' },
                          { key: 'asr', label: 'Ashar' },
                          { key: 'maghrib', label: 'Maghrib' },
                          { key: 'isha', label: 'Isya' }
                        ].map((item) => (
                           <div key={item.key} className="flex flex-col items-center liquid-glass rounded-xl p-2 min-w-[62px] border border-white/20 shadow-lg backdrop-blur-md hover:bg-white/10 transition-colors">
                              <span className="text-[10px] uppercase text-secondary font-bold tracking-wider mb-1">{item.label}</span>
                              <span className="text-sm font-bold text-white font-mono">{prayerTimes[item.key]}</span>
                           </div>
                        ))}
                     </div>
                  )}
                   <div className="text-[10px] text-white/70 mt-3 flex items-center justify-center gap-1 drop-shadow-sm">
                      <MapPin size={10} /> Jakarta, Indonesia
                   </div>
               </div>

              <div className="liquid-glass rounded-xl p-4 inline-block mt-1 border border-white/20">
                 <p className="text-xs text-white italic drop-shadow">"Barangsiapa yang menempuh jalan untuk menuntut ilmu, Allah akan mudahkan baginya jalan menuju surga."</p>
                 <p className="text-[10px] text-secondary mt-2 font-bold">- HR. Muslim</p>
              </div>
            </div>

            {/* Main Menu - Liquid Glass Container */}
            <div className="flex-1 z-10 relative overflow-y-auto pb-32">
               {/* Frame Liquid Glass untuk Menu */}
               <div className="mx-4 liquid-glass rounded-3xl overflow-hidden p-2">
                   <div className="mt-2">
                        <MenuGrid onNavigate={setView} />
                   </div>
               </div>

               {/* Banner / Info */}
               <div className="m-4 mt-6 liquid-glass rounded-2xl p-4 flex items-center gap-4 border-l-4 border-l-secondary">
                  <div className="bg-secondary/20 w-12 h-12 rounded-full flex items-center justify-center text-secondary font-bold border border-secondary/30">
                     Info
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm drop-shadow-sm">Jadwal Kajian Rutin</h4>
                    <p className="text-xs text-white/80">Simak kajian terbaru setiap hari Ahad.</p>
                  </div>
               </div>
            </div>
          </>
        );
    }
  };

  return (
    <div 
      className="w-full h-[100dvh] flex flex-col relative font-sans overflow-hidden bg-primary"
    >
      {/* Subtle Gradient Overlay using the theme colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-[#1a2b45] z-0"></div>
      
      {/* Decorative Circle for visual depth */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl z-0 pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col shadow-2xl">
         {renderContent()}
         
         {/* Install Prompt (PWA) - Only shows on mobile/tablet */}
         <InstallPrompt />

         {/* Bottom Navigation Bar - Liquid Glass Floating */}
         <div className="absolute bottom-6 w-full z-50 px-4">
             <div className="liquid-glass rounded-2xl h-20 px-6 flex justify-between items-center relative shadow-2xl backdrop-blur-xl">
                 
                 {/* Left Items */}
                 <div className="flex gap-8">
                     <button onClick={() => setView('QURAN')} className={`flex flex-col items-center gap-1 transition-all ${view === 'QURAN' ? 'text-secondary scale-110' : 'text-white/70 hover:text-white'}`}>
                         <BookOpen size={22} strokeWidth={2} className="drop-shadow-sm" />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Al-Quran</span>
                     </button>
                     <button onClick={() => setView('KITAB')} className={`flex flex-col items-center gap-1 transition-all ${view === 'KITAB' ? 'text-secondary scale-110' : 'text-white/70 hover:text-white'}`}>
                         <FileText size={22} strokeWidth={2} className="drop-shadow-sm" />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Fatwa</span>
                     </button>
                 </div>

                 {/* Center Floating Home Button */}
                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                      <button 
                          onClick={() => setView('HOME')}
                          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(47,72,109,0.6)] border border-white/40 transition-transform active:scale-95 liquid-glass ${view === 'HOME' ? 'bg-white/20 text-secondary' : 'bg-white/10 text-white'}`}
                      >
                          <Home size={28} strokeWidth={2.5} fill={view === 'HOME' ? "currentColor" : "none"} />
                      </button>
                      <span className="text-[10px] font-bold text-white mt-2 uppercase tracking-tight liquid-glass px-3 py-0.5 rounded-full shadow-sm">Beranda</span>
                 </div>

                 {/* Right Items */}
                 <div className="flex gap-8">
                     <button onClick={() => setView('PRAYER')} className={`flex flex-col items-center gap-1 transition-all ${view === 'PRAYER' ? 'text-secondary scale-110' : 'text-white/70 hover:text-white'}`}>
                         <Clock size={22} strokeWidth={2} className="drop-shadow-sm" />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Jadwal</span>
                     </button>
                     <button onClick={() => alert('Fitur Profil Segera Hadir')} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-all">
                         <User size={22} strokeWidth={2} className="drop-shadow-sm" />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Profil</span>
                     </button>
                 </div>

             </div>
         </div>

      </div>
    </div>
  );
}

export default App;
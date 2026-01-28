import React, { useState } from 'react';
import { MenuGrid } from './components/MenuGrid';
import { ContentDetail } from './components/ContentDetail';
import { HadithView } from './components/HadithView';
import { QuranView } from './components/QuranView';
import { PrayerTimes } from './components/PrayerTimes';
import { Qiblat } from './components/Qiblat';
import { VideoList } from './components/VideoList';
import { Wallpaper } from './components/Wallpaper';
import { InstallPrompt } from './components/InstallPrompt';
import { ViewState } from './types';
import { Menu, BookOpen, FileText, Home, Clock, User } from 'lucide-react';

const BACKGROUND_IMAGE = "https://m.muijakarta.or.id/img/bg.jpg";
const HEADER_IMAGE = "https://m.muijakarta.or.id/img/header.jpg";

function App() {
  const [view, setView] = useState<ViewState>('HOME');

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
                <img src={HEADER_IMAGE} alt="Header" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent"></div>
            </div>

            {/* Header / Top Nav */}
            <header className="p-4 pt-12 flex justify-between items-center text-white z-10 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                   {/* Logo Placeholder - P for PUSHA */}
                   <span className="text-white font-bold text-lg drop-shadow-md">P</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-none drop-shadow-md text-white">PUSHA</h1>
                  <p className="text-xs text-white/90 drop-shadow-sm">Pusat Studi Hadis</p>
                </div>
              </div>
              <button className="p-2 liquid-glass rounded-full hover:bg-white/20 transition-colors">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </header>

            {/* Hero Section / Greeting */}
            <div className="px-6 py-4 text-white text-center z-10 relative mb-2">
              <p className="text-sm font-medium text-amber-300 mb-1 uppercase tracking-widest drop-shadow-md">Assalamu'alaikum</p>
              <h2 className="text-3xl font-bold mb-4 drop-shadow-lg text-white">Mari Tingkatkan Iman & Taqwa</h2>
              <div className="liquid-glass rounded-xl p-4 inline-block">
                 <p className="text-xs text-white italic drop-shadow">"Barangsiapa yang menempuh jalan untuk menuntut ilmu, Allah akan mudahkan baginya jalan menuju surga."</p>
                 <p className="text-[10px] text-amber-300 mt-2 font-bold">- HR. Muslim</p>
              </div>
            </div>

            {/* Main Menu - Liquid Glass Container */}
            <div className="flex-1 z-10 relative overflow-y-auto pb-32">
               {/* Frame Liquid Glass untuk Menu */}
               <div className="mx-4 liquid-glass rounded-3xl overflow-hidden p-2">
                   {/* Removed 'Layanan Utama' text header as requested */}
                   <div className="mt-2">
                        <MenuGrid onNavigate={setView} />
                   </div>
               </div>

               {/* Banner / Info */}
               <div className="m-4 mt-6 liquid-glass rounded-2xl p-4 flex items-center gap-4 border-l-4 border-l-amber-400">
                  <div className="bg-amber-400/20 w-12 h-12 rounded-full flex items-center justify-center text-amber-300 font-bold border border-amber-400/30">
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
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better contrast across the app */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
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
                     <button onClick={() => setView('QURAN')} className={`flex flex-col items-center gap-1 transition-all ${view === 'QURAN' ? 'text-amber-300 scale-110' : 'text-white/70 hover:text-white'}`}>
                         <BookOpen size={22} strokeWidth={2} className="drop-shadow-sm" />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Al-Quran</span>
                     </button>
                     <button onClick={() => setView('KITAB')} className={`flex flex-col items-center gap-1 transition-all ${view === 'KITAB' ? 'text-amber-300 scale-110' : 'text-white/70 hover:text-white'}`}>
                         <FileText size={22} strokeWidth={2} className="drop-shadow-sm" />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Fatwa</span>
                     </button>
                 </div>

                 {/* Center Floating Home Button */}
                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                      <button 
                          onClick={() => setView('HOME')}
                          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-white/40 transition-transform active:scale-95 liquid-glass ${view === 'HOME' ? 'bg-white/20 text-amber-300' : 'bg-white/10 text-white'}`}
                      >
                          <Home size={28} strokeWidth={2.5} fill={view === 'HOME' ? "currentColor" : "none"} />
                      </button>
                      <span className="text-[10px] font-bold text-white mt-2 uppercase tracking-tight liquid-glass px-3 py-0.5 rounded-full shadow-sm">Beranda</span>
                 </div>

                 {/* Right Items */}
                 <div className="flex gap-8">
                     <button onClick={() => setView('PRAYER')} className={`flex flex-col items-center gap-1 transition-all ${view === 'PRAYER' ? 'text-amber-300 scale-110' : 'text-white/70 hover:text-white'}`}>
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
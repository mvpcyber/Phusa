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
import { getKemenagPrayerTimes, getNextPrayer, KemenagJadwal } from './services/prayer';
import { ViewState } from './types';
import { 
  Menu, 
  BookOpen, 
  FileText, 
  Home, 
  MapPin, 
  MessageCircleQuestion, 
  MessageCircle,
  Instagram, 
  X, 
  ExternalLink,
  Send
} from 'lucide-react';

const HEADER_IMAGE = "https://pusha.muijakarta.or.id/img/header2.jpg";
const APP_BG = "https://pusha.muijakarta.or.id/img/bg2.png";

// Kumpulan Quote Hadis untuk Randomizer
const RANDOM_QUOTES = [
  { text: "Barangsiapa yang menempuh jalan untuk menuntut ilmu, Allah akan mudahkan baginya jalan menuju surga.", source: "HR. Muslim" },
  { text: "Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya.", source: "HR. Bukhari" },
  { text: "Senyummu di hadapan saudaramu adalah sedekah.", source: "HR. Tirmidzi" },
  { text: "Sesungguhnya amal itu tergantung niatnya.", source: "HR. Bukhari & Muslim" },
  { text: "Janganlah engkau marah, maka bagimu surga.", source: "HR. Thabrani" },
  { text: "Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.", source: "HR. Bukhari & Muslim" },
  { text: "Tidaklah berkurang harta karena sedekah.", source: "HR. Muslim" },
  { text: "Orang yang kuat bukanlah orang yang jago gulat, tetapi orang yang mampu menahan diri ketika marah.", source: "HR. Bukhari & Muslim" },
  { text: "Amal yang paling dicintai Allah adalah yang terus-menerus (istiqomah) meskipun sedikit.", source: "HR. Bukhari & Muslim" },
  { text: "Bertaqwalah kepada Allah di mana saja engkau berada.", source: "HR. Tirmidzi" },
  { text: "Malu itu tidak mendatangkan sesuatu melainkan kebaikan semata-mata.", source: "HR. Bukhari & Muslim" },
  { text: "Dunia ini adalah perhiasan, dan sebaik-baik perhiasan dunia adalah wanita shalihah.", source: "HR. Muslim" }
];

function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [prayerData, setPrayerData] = useState<KemenagJadwal | null>(null);
  const [locationName, setLocationName] = useState("Jakarta");
  const [nextPrayerKey, setNextPrayerKey] = useState<string>('');
  
  // State untuk Quote Random
  const [quote, setQuote] = useState(RANDOM_QUOTES[0]);

  // State untuk Modal Sosmed & WhatsApp
  const [showSosmedModal, setShowSosmedModal] = useState(false);
  const [showWaModal, setShowWaModal] = useState(false);

  useEffect(() => {
    // 1. Randomize Quote saat Load
    const randomIndex = Math.floor(Math.random() * RANDOM_QUOTES.length);
    setQuote(RANDOM_QUOTES[randomIndex]);

    // 2. Menggunakan API Kemenag
    getKemenagPrayerTimes("Jakarta").then(res => {
        if (res) {
            setPrayerData(res.data);
            setLocationName(res.location);
            setNextPrayerKey(getNextPrayer(res.data));
        }
    });
  }, []);

  // Handler untuk menampilkan Modal WA
  const handleWhatsAppClick = () => {
    setShowWaModal(true);
  };

  // Handler untuk eksekusi redirect ke WA
  const proceedToWhatsApp = () => {
    const phone = "6281280055241";
    const message = encodeURIComponent("Assalammualaikum PUSHA saya member dari aplikasi PUSHA , ada yang ingin saya tayakan.?");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    setShowWaModal(false);
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/pusatstudihadis/", '_blank');
    setShowSosmedModal(false);
  };

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
            <div className="absolute top-0 left-0 w-full h-64 z-0 rounded-b-[40px] overflow-hidden shadow-lg border-b border-white/20">
                <img src={HEADER_IMAGE} alt="Header" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/80"></div>
            </div>

            {/* Header / Top Nav */}
            <header className="p-4 pt-12 flex justify-between items-center text-white z-10 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-white/20">
                   <img src="https://pusha.muijakarta.or.id/img/logo.png" alt="PUSHA Logo" className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-none drop-shadow-md text-white">PUSHA</h1>
                  <p className="text-xs text-white/90 drop-shadow-sm font-medium">Pusat Studi Hadis</p>
                </div>
              </div>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </header>

            {/* Hero Section / Greeting */}
            <div className="px-6 py-4 text-center z-10 relative mb-2">
              <p className="text-sm font-bold text-white mb-2 uppercase tracking-widest text-shadow opacity-90">Assalamu'alaikum</p>
              
              {/* Prayer Times Widget */}
              <div className="mt-2 mb-6">
                  {!prayerData ? (
                      <div className="flex justify-center gap-2 animate-pulse">
                          {[1,2,3,4,5].map(i => <div key={i} className="w-14 h-14 bg-white/50 rounded-xl"></div>)}
                      </div>
                  ) : (
                     <div className="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
                        {[
                          { key: 'subuh', label: 'Subuh' },
                          { key: 'dzuhur', label: 'Dzuhur' },
                          { key: 'ashar', label: 'Ashar' },
                          { key: 'maghrib', label: 'Maghrib' },
                          { key: 'isya', label: 'Isya' }
                        ].map((item) => {
                           // Logic highlight jika key sama dengan nextPrayerKey
                           const isActive = nextPrayerKey === item.key;
                           return (
                             <div 
                                key={item.key} 
                                className={`flex flex-col items-center rounded-xl p-2 min-w-[62px] border shadow-lg transition-all duration-300
                                  ${isActive 
                                    ? 'bg-amber-400 text-primary border-amber-300 scale-110 z-10 ring-2 ring-white/30' 
                                    : 'bg-white/10 backdrop-blur-md text-white border-white/20'}
                                `}
                             >
                                <span className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isActive ? 'text-primary' : 'text-white/80'}`}>{item.label}</span>
                                {/* @ts-ignore */}
                                <span className="text-sm font-bold font-mono">{prayerData[item.key]}</span>
                             </div>
                           )
                        })}
                     </div>
                  )}
                   <div className="text-[10px] text-white/90 mt-3 flex items-center justify-center gap-1 drop-shadow-sm font-medium">
                      <MapPin size={10} /> {locationName}
                   </div>
               </div>

              {/* Random Quote Section */}
              <div className="bg-white rounded-xl p-4 inline-block mt-1 shadow-md border border-slate-100 max-w-xs transition-all duration-500">
                 <p className="text-xs text-slate-600 italic">"{quote.text}"</p>
                 <p className="text-[10px] text-primary mt-2 font-bold">- {quote.source}</p>
              </div>
            </div>

            {/* Main Menu - White Card Container */}
            <div className="flex-1 z-10 relative overflow-y-auto pb-32">
               {/* Menu Grid */}
               <div className="mx-4 bg-white rounded-3xl overflow-hidden p-2 shadow-sm border border-slate-100">
                   <div className="mt-2">
                        <MenuGrid onNavigate={setView} />
                   </div>
               </div>

               {/* Banner / Info */}
               <div className="m-4 mt-6 bg-white rounded-2xl p-4 flex items-center gap-4 border-l-4 border-l-primary shadow-sm">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary font-bold">
                     Info
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Jadwal Kajian Rutin</h4>
                    <p className="text-xs text-slate-500">Simak kajian terbaru setiap hari Ahad.</p>
                  </div>
               </div>
            </div>
          </>
        );
    }
  };

  return (
    <div 
      className="w-full h-[100dvh] flex flex-col relative font-sans overflow-hidden bg-slate-50"
    >
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0 z-0">
          <img 
            src={APP_BG} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          {/* Light/White Overlay for readability */}
          <div className="absolute inset-0 bg-white/90"></div>
      </div>
      
      {/* Decorative Blur Circles (Lighter for Light Theme) */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-60 h-60 bg-amber-100/50 rounded-full blur-3xl z-0 pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col shadow-2xl bg-transparent">
         {renderContent()}
         
         {/* Install Prompt (PWA) */}
         <InstallPrompt />

         {/* Modal Sosmed */}
         {showSosmedModal && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative border border-slate-100 transform transition-all scale-100">
                    <button 
                        onClick={() => setShowSosmedModal(false)} 
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 bg-slate-50 rounded-full"
                    >
                        <X size={20} />
                    </button>
                    
                    <div className="flex flex-col items-center text-center mt-2">
                        <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-white">
                            <Instagram size={36} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Media Sosial</h3>
                        <p className="text-sm text-slate-500 mt-2 mb-6 px-2">
                            Kunjungi Instagram resmi <strong>Pusat Studi Hadis</strong> untuk update kajian dan informasi terbaru.
                        </p>
                        <button 
                            onClick={handleInstagram}
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                            Buka Instagram <ExternalLink size={16} />
                        </button>
                    </div>
                </div>
            </div>
         )}

         {/* Modal Tanya (WhatsApp) */}
         {showWaModal && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative border border-slate-100 transform transition-all scale-100">
                    <button 
                        onClick={() => setShowWaModal(false)} 
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 bg-slate-50 rounded-full"
                    >
                        <X size={20} />
                    </button>
                    
                    <div className="flex flex-col items-center text-center mt-2">
                        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 via-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-white">
                            <MessageCircle size={36} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Tanya Ustadz</h3>
                        <p className="text-sm text-slate-500 mt-2 mb-6 px-2">
                            Anda akan diarahkan ke WhatsApp untuk berkonsultasi langsung dengan Ustadz.
                        </p>
                        <button 
                            onClick={proceedToWhatsApp}
                            className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
                        >
                            Lanjut ke WhatsApp <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
         )}

         {/* Bottom Navigation Bar - Light Floating */}
         <div className="absolute bottom-6 w-full z-50 px-4">
             <div className="bg-white rounded-2xl h-20 px-6 flex justify-between items-center relative shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100">
                 
                 {/* Left Items */}
                 <div className="flex gap-8">
                     <button onClick={() => setView('QURAN')} className={`flex flex-col items-center gap-1 transition-all ${view === 'QURAN' ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
                         <BookOpen size={22} strokeWidth={2} />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Al-Quran</span>
                     </button>
                     <button onClick={() => setView('KITAB')} className={`flex flex-col items-center gap-1 transition-all ${view === 'KITAB' ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}>
                         <FileText size={22} strokeWidth={2} />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Fatwa</span>
                     </button>
                 </div>

                 {/* Center Floating Home Button */}
                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                      <button 
                          onClick={() => setView('HOME')}
                          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-transform active:scale-95 ${view === 'HOME' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}
                      >
                          <Home size={28} strokeWidth={2.5} fill={view === 'HOME' ? "currentColor" : "none"} />
                      </button>
                      <span className="text-[10px] font-bold text-slate-600 mt-2 uppercase tracking-tight bg-white px-3 py-0.5 rounded-full shadow-sm border border-slate-100">Beranda</span>
                 </div>

                 {/* Right Items */}
                 <div className="flex gap-8">
                     {/* Menu Tanya (WhatsApp Modal) */}
                     <button onClick={handleWhatsAppClick} className="flex flex-col items-center gap-1 text-slate-400 hover:text-green-600 transition-all">
                         <MessageCircleQuestion size={22} strokeWidth={2} />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Tanya?</span>
                     </button>
                     
                     {/* Menu Sosmed (Instagram Modal) */}
                     <button onClick={() => setShowSosmedModal(true)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-pink-600 transition-all">
                         <Instagram size={22} strokeWidth={2} />
                         <span className="text-[10px] font-bold uppercase tracking-tight">Sosmed</span>
                     </button>
                 </div>

             </div>
         </div>

      </div>
    </div>
  );
}

export default App;
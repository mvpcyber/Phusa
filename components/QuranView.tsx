import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Eye, EyeOff, Search } from 'lucide-react';
import { Surah, Ayat } from '../types';

const HEADER_BG = "https://m.muijakarta.or.id/img/header.jpg";

interface QuranViewProps {
  onBack: () => void;
}

export const QuranView: React.FC<QuranViewProps> = ({ onBack }) => {
  const [view, setView] = useState<'LIST' | 'DETAIL'>('LIST');
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Ayat[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggles
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  // Audio State
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://equran.id/api/v2/surat');
      const json = await res.json();
      if (json.code === 200) {
        setSurahs(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openSurah = async (surah: Surah) => {
    setSelectedSurah(surah);
    setView('DETAIL');
    setLoading(true);
    try {
      const res = await fetch(`https://equran.id/api/v2/surat/${surah.nomor}`);
      const json = await res.json();
      if (json.code === 200) {
        setVerses(json.data.ayat);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = (url: string) => {
    if (audioRef.current) {
        audioRef.current.pause();
        if (playingAudio === url) {
            setPlayingAudio(null);
            return;
        }
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingAudio(url);
    audio.play();
    audio.onended = () => setPlayingAudio(null);
  };

  const filteredSurahs = surahs.filter(s => 
    s.namaLatin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full relative">
       {/* Header */}
       <div className="relative m-4 rounded-3xl overflow-hidden shadow-lg z-10 border border-white/30 shrink-0">
        <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: `url(${HEADER_BG})` }} 
        />
        <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 p-4 pt-12 pb-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => view === 'DETAIL' ? setView('LIST') : onBack()} 
                    className="hover:bg-white/20 p-2 rounded-full transition-colors glass-btn"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-xl font-bold drop-shadow-md">
                        {view === 'LIST' ? 'Al-Quran' : selectedSurah?.namaLatin}
                    </h1>
                    {view === 'DETAIL' && (
                        <p className="text-xs text-white/80">{selectedSurah?.arti} • {selectedSurah?.jumlahAyat} Ayat</p>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {view === 'LIST' ? (
            <>
                {/* Search */}
                <div className="mb-4 relative">
                    <input 
                        type="text" 
                        placeholder="Cari Surah..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full liquid-glass rounded-xl py-3 px-10 text-white placeholder-white/60 outline-none focus:bg-white/10"
                    />
                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
                </div>

                <div className="space-y-3">
                    {loading ? <p className="text-center text-white">Memuat...</p> : filteredSurahs.map((surah) => (
                        <button 
                            key={surah.nomor} 
                            onClick={() => openSurah(surah)}
                            className="w-full liquid-glass p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 border border-white/30 text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white relative">
                                    <span className="text-xs">{surah.nomor}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{surah.namaLatin}</h3>
                                    <p className="text-xs text-white/70">{surah.arti} • {surah.jumlahAyat} Ayat</p>
                                </div>
                            </div>
                            <span className="font-serif text-xl text-amber-300">{surah.nama}</span>
                        </button>
                    ))}
                </div>
            </>
        ) : (
            <div className="space-y-6">
                {/* Controls */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button 
                        onClick={() => setShowLatin(!showLatin)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 border transition-colors ${showLatin ? 'bg-amber-400 text-slate-900 border-amber-400' : 'bg-transparent text-white border-white/40'}`}
                    >
                        {showLatin ? <Eye size={14} /> : <EyeOff size={14} />} Latin
                    </button>
                    <button 
                        onClick={() => setShowTranslation(!showTranslation)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 border transition-colors ${showTranslation ? 'bg-amber-400 text-slate-900 border-amber-400' : 'bg-transparent text-white border-white/40'}`}
                    >
                        {showTranslation ? <Eye size={14} /> : <EyeOff size={14} />} Terjemahan
                    </button>
                </div>

                {loading ? <p className="text-center text-white">Memuat Ayat...</p> : verses.map((ayat) => (
                    <div key={ayat.nomorAyat} className="liquid-glass p-5 rounded-3xl border border-white/20 relative">
                        {/* Header Ayat */}
                        <div className="flex justify-between items-center mb-6 bg-white/5 p-2 rounded-xl">
                            <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                {ayat.nomorAyat}
                            </span>
                            <button 
                                onClick={() => handlePlayAudio(ayat.audio['05'] || '')}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${playingAudio === ayat.audio['05'] ? 'bg-amber-400 text-slate-900 animate-pulse' : 'bg-white/20 text-white hover:bg-white/30'}`}
                            >
                                {playingAudio === ayat.audio['05'] ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                            </button>
                        </div>

                        {/* Arabic */}
                        <p className="font-serif text-3xl text-right leading-[2.5] text-white mb-6 dir-rtl drop-shadow-md">
                            {ayat.teksArab}
                        </p>

                        {/* Latin */}
                        {showLatin && (
                            <p className="text-amber-200/90 text-sm mb-3 font-medium leading-relaxed">
                                {ayat.teksLatin}
                            </p>
                        )}

                        {/* Translation */}
                        {showTranslation && (
                            <p className="text-white/80 text-sm leading-relaxed border-t border-white/10 pt-3">
                                {ayat.teksIndonesia}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { Download, X, Share, PlusSquare, Smartphone } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Cek apakah user menggunakan iOS (iPhone/iPad)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    // Cek apakah sudah berjalan dalam mode standalone (sudah diinstall)
    // @ts-ignore
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isStandalone) {
        return; // Jangan tampilkan jika sudah diinstall
    }

    if (isIosDevice) {
        setIsIOS(true);
        // Tampilkan prompt setelah 1.5 detik agar user sempat melihat app loading
        setTimeout(() => setShowPrompt(true), 1500);
    } else {
        // 2. Logic untuk Android / Desktop (Chrome/Edge)
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI to notify the user they can add to home screen
            // Tampilkan modal setelah event tertangkap
            setTimeout(() => setShowPrompt(true), 1500);
        });
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setDeferredPrompt(null);
            setShowPrompt(false);
        });
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in bg-black/60 backdrop-blur-sm">
        {/* Container Modal Centered */}
        <div className="w-full max-w-sm relative">
            <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                
                {/* Close Button */}
                <button 
                    onClick={() => setShowPrompt(false)} 
                    className="absolute top-4 right-4 bg-slate-100 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Logo & Icon */}
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-lg mb-4 p-2 relative">
                    <img src="https://pusha.muijakarta.or.id/img/logo.png" alt="PUSHA Logo" className="w-full h-full object-contain" />
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full shadow-md border-2 border-white">
                        <Smartphone size={14} />
                    </div>
                </div>
                
                <h3 className="text-slate-800 font-bold text-lg mb-2">
                    Assalammualaikum<br/>Sahabat PUSHA
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 px-2">
                    Silahkan Add To Home Screen Aplikasi PUSHA ini
                </p>

                {isIOS ? (
                    <div className="w-full bg-slate-50 rounded-xl p-4 text-xs text-slate-600 border border-slate-100 text-left">
                        <p className="font-semibold mb-2 text-center text-slate-800">Cara Install di iOS:</p>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-white p-1 rounded shadow-sm border"><Share size={14} className="text-blue-500" /></span>
                            <span>1. Tekan tombol <b>Share</b> di bawah</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-white p-1 rounded shadow-sm border"><PlusSquare size={14} className="text-slate-700" /></span>
                            <span>2. Pilih <b>"Add to Home Screen"</b></span>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={handleInstallClick}
                        className="w-full py-3.5 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 active:scale-95"
                    >
                        <Download size={18} />
                        Install Aplikasi
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};
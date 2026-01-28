import React, { useEffect, useState } from 'react';
import { Download, X, Share, PlusSquare } from 'lucide-react';

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
        // Tampilkan prompt setelah 2 detik agar tidak kaget
        setTimeout(() => setShowPrompt(true), 2000);
    } else {
        // 2. Logic untuk Android / Desktop (Chrome/Edge)
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI to notify the user they can add to home screen
            setShowPrompt(true);
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none pb-24 px-4">
        {/* Container */}
        <div className="w-full max-w-md pointer-events-auto animate-bounce-in">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xl relative overflow-hidden">
                <button 
                    onClick={() => setShowPrompt(false)} 
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
                >
                    <X size={18} />
                </button>

                <div className="flex items-start gap-4 pr-6">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100 shrink-0 overflow-hidden shadow-sm">
                        <img src="https://pusha.muijakarta.or.id/img/logo.png" alt="PUSHA Logo" className="w-full h-full object-contain p-1" />
                    </div>
                    
                    <div className="flex-1">
                        <h3 className="text-slate-800 font-bold text-sm">Install Aplikasi PUSHA</h3>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                            {isIOS 
                                ? "Untuk pengalaman terbaik, tambahkan ke Layar Utama." 
                                : "Akses Hadis, Quran, dan Jadwal Sholat lebih cepat tanpa buka browser."}
                        </p>

                        {isIOS ? (
                            <div className="mt-3 bg-slate-50 rounded-lg p-2 text-xs text-slate-600 border border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                    1. Tekan tombol Share <Share size={14} className="text-blue-500" />
                                </div>
                                <div className="flex items-center gap-2">
                                    2. Pilih "Add to Home Screen" <PlusSquare size={14} />
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={handleInstallClick}
                                className="mt-3 w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                            >
                                <Download size={14} />
                                Install Sekarang
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
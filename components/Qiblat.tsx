import React, { useState } from 'react';
import { ArrowLeft, Compass } from 'lucide-react';

const HEADER_BG = "https://m.muijakarta.or.id/img/header.jpg";

export const Qiblat: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestAccess = () => {
    // DeviceOrientationEvent is not strictly typed in all TS envs yet for permissions
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            setPermissionGranted(true);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS 13+ devices
      setPermissionGranted(true);
    }
  };

  return (
    <div className="h-full text-white flex flex-col relative overflow-hidden">
      {/* Background Compass Rose - Made subtler */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
        <Compass className="w-96 h-96 animate-[spin_10s_linear_infinite]" />
      </div>

      <div className="relative m-4 rounded-3xl overflow-hidden shadow-lg z-20 border border-white/30 shrink-0">
         <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${HEADER_BG})` }} />
         <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-[2px]"></div>
         <div className="relative z-10 p-4 pt-12 pb-6 flex items-center gap-4 text-white">
            <button onClick={onBack} className="hover:bg-white/20 p-2 rounded-full glass-btn transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold drop-shadow-md">Arah Kiblat</h1>
         </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 p-6 text-center pb-32">
        <div className="w-64 h-64 rounded-full border-4 border-accent/50 relative flex items-center justify-center bg-slate-800/80 backdrop-blur-md shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <div className="absolute -top-8 text-accent font-bold tracking-widest drop-shadow-md">QIBLA</div>
            
            {/* Kaaba Icon */}
            <div className="w-16 h-16 bg-black border border-accent rounded shadow-lg z-20 relative">
               <div className="absolute top-2 w-full h-1 bg-accent"></div>
            </div>

            {/* Needle */}
            <div className={`absolute w-1 h-32 bg-red-500 origin-bottom bottom-1/2 rounded-full transition-transform duration-500 ${permissionGranted ? 'rotate-[295deg]' : 'rotate-0'}`} style={{ transformOrigin: 'bottom center', bottom: '50%'}}></div>
            <div className="absolute w-4 h-4 bg-white rounded-full border-2 border-slate-800 z-30"></div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-2 drop-shadow-md">Arah Kiblat</h2>
        <p className="text-white/70 mb-6 max-w-xs drop-shadow-sm">
           Arahkan panah merah ke ikon Ka'bah. (Simulasi: Arah Kiblat dari Indonesia sekitar 295° NW).
        </p>
        
        {!permissionGranted && (
            <button 
                onClick={requestAccess}
                className="px-6 py-3 bg-accent text-slate-900 font-bold rounded-full hover:bg-accent/90 transition-colors shadow-lg"
            >
                Izinkan Kompas
            </button>
        )}
      </div>
    </div>
  );
};
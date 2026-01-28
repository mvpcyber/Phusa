import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const HEADER_BG = "https://m.muijakarta.or.id/img/header.jpg";

export const Qiblat: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [heading, setHeading] = useState(0); // Arah HP user
  const [qiblaAngle, setQiblaAngle] = useState(0); // Arah Kiblat dari Lokasi user
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Koordinat Ka'bah
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;

  useEffect(() => {
    // 1. Get GPS Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const angle = calculateQibla(latitude, longitude);
            setQiblaAngle(angle);
        }, (err) => {
            setError("Gagal mendapatkan lokasi GPS. Pastikan GPS aktif.");
            console.error(err);
        });
    } else {
        setError("Browser tidak mendukung GPS.");
    }
  }, []);

  const calculateQibla = (lat: number, lng: number) => {
    const PI = Math.PI;
    const latRad = lat * (PI / 180);
    const lngRad = lng * (PI / 180);
    const kaabaLatRad = KAABA_LAT * (PI / 180);
    const kaabaLngRad = KAABA_LNG * (PI / 180);

    const y = Math.sin(kaabaLngRad - lngRad);
    const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad);
    
    let qibla = Math.atan2(y, x) * (180 / PI);
    return (qibla + 360) % 360;
  };

  const startCompass = () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            setPermissionGranted(true);
            window.addEventListener('deviceorientationabsolute', handleOrientation, true);
            window.addEventListener('deviceorientation', handleOrientation, true); // Fallback
          }
        })
        .catch(console.error);
    } else {
      setPermissionGranted(true);
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      // Fallback for standard Android
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  };

  const handleOrientation = (e: DeviceOrientationEvent) => {
    let compass = 0;
    // @ts-ignore
    if (e.webkitCompassHeading) {
      // iOS
      // @ts-ignore
      compass = e.webkitCompassHeading;
    } else if (e.alpha) {
      // Android "absolute" if available, else standard alpha
      // Note: This is simplified; true absolute North on Android web is tricky without specific absolute event
      compass = Math.abs(e.alpha - 360);
    }
    setHeading(compass);
  };

  return (
    <div className="h-full text-white flex flex-col relative overflow-hidden">
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
        
        {/* Compass Circle */}
        <div 
            className="w-72 h-72 rounded-full border-4 border-white/20 relative flex items-center justify-center bg-slate-900/40 backdrop-blur-md shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${-heading}deg)` }}
        >
            {/* North Marker */}
            <div className="absolute top-2 font-bold text-red-500 text-lg">N</div>
            <div className="absolute bottom-2 font-bold text-white/50 text-sm">S</div>
            <div className="absolute right-4 font-bold text-white/50 text-sm">E</div>
            <div className="absolute left-4 font-bold text-white/50 text-sm">W</div>

            {/* Kaaba Indicator Container - Rotated to Qibla Angle */}
            <div 
                className="absolute w-full h-full flex justify-center"
                style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
                {/* The Kaaba Icon */}
                <div className="absolute -top-6 flex flex-col items-center">
                    <div className="w-12 h-12 bg-black border-2 border-amber-400 rounded-md shadow-[0_0_20px_rgba(245,158,11,0.6)] relative overflow-hidden z-20">
                        <div className="absolute top-3 w-full h-2 bg-amber-400"></div>
                    </div>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-amber-400 mt-1"></div>
                </div>
            </div>

            {/* Center Dot */}
            <div className="w-4 h-4 bg-white rounded-full border-2 border-slate-800 z-30 shadow-lg"></div>
        </div>

        <div className="mt-10 bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl font-bold text-amber-300 drop-shadow-md">{Math.round(qiblaAngle)}°</h2>
            <p className="text-white/70 text-xs uppercase tracking-widest mt-1">Arah Kiblat dari Lokasi Anda</p>
        </div>
        
        {error && (
            <p className="text-red-300 text-sm mt-4 bg-red-900/50 px-4 py-2 rounded-lg">{error}</p>
        )}

        {!permissionGranted && (
            <button 
                onClick={startCompass}
                className="mt-6 px-8 py-3 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
            >
                Kalibrasi Kompas
            </button>
        )}
        
        <p className="text-white/50 text-xs mt-6 max-w-xs mx-auto">
           Pastikan GPS aktif. Putar HP Anda membentuk angka 8 untuk kalibrasi.
        </p>
      </div>
    </div>
  );
};
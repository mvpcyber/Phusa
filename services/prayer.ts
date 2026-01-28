// Service untuk mengambil data dari API Kemenag (via MyQuran API)
// Dokumentasi: https://documenter.getpostman.com/view/841292/Tz5p7yHS

export interface KemenagJadwal {
    subuh: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
    date: string;
    tanggal: string;
    imsak: string;
    terbit: string;
    dhuha: string;
}

// Default Jakarta ID = 1301
const DEFAULT_CITY_ID = '1301'; 

export const getKemenagPrayerTimes = async (cityName: string = 'jakarta'): Promise<{ data: KemenagJadwal, location: string } | null> => {
    try {
        // 1. Cari ID Kota
        const searchRes = await fetch(`https://api.myquran.com/v2/sholat/kota/cari/${cityName}`);
        const searchJson = await searchRes.json();
        
        let cityId = DEFAULT_CITY_ID;
        let locationName = "Jakarta";

        if (searchJson.status && searchJson.data.length > 0) {
            cityId = searchJson.data[0].id;
            locationName = searchJson.data[0].lokasi;
        }

        // 2. Ambil Jadwal Hari Ini
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        
        const scheduleRes = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${cityId}/${y}/${m}/${d}`);
        const scheduleJson = await scheduleRes.json();

        if (scheduleJson.status) {
            return {
                data: scheduleJson.data.jadwal,
                location: locationName
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        return null;
    }
};

export const getNextPrayer = (jadwal: KemenagJadwal): string => {
    if (!jadwal) return '';

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const timeToMinutes = (timeStr: string) => {
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    const prayers = [
        { key: 'subuh', time: timeToMinutes(jadwal.subuh) },
        { key: 'dzuhur', time: timeToMinutes(jadwal.dzuhur) },
        { key: 'ashar', time: timeToMinutes(jadwal.ashar) },
        { key: 'maghrib', time: timeToMinutes(jadwal.maghrib) },
        { key: 'isya', time: timeToMinutes(jadwal.isya) }
    ];

    // Cari waktu sholat pertama yang menitnya lebih besar dari sekarang
    const next = prayers.find(p => p.time > currentMinutes);
    
    // Jika tidak ada (sudah lewat Isya), maka next adalah Subuh (besok)
    return next ? next.key : 'subuh';
};
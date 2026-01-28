import React, { useState, useEffect } from 'react';
import { ArrowLeft, Book, ChevronRight, Share2 } from 'lucide-react';

interface HadithViewProps {
  onBack: () => void;
}

const HEADER_BG = "https://pusha.muijakarta.or.id/img/header2.jpg";

const HADITH_BOOKS = [
  { id: 'bukhari', name: 'Sahih Bukhari', total: 7008 },
  { id: 'muslim', name: 'Sahih Muslim', total: 5362 },
  { id: 'nasai', name: 'Sunan Nasai', total: 5758 },
  { id: 'abu-daud', name: 'Sunan Abu Daud', total: 4590 },
  { id: 'tirmidzi', name: 'Jami At-Tirmidzi', total: 3891 },
  { id: 'ibnu-majah', name: 'Sunan Ibnu Majah', total: 4341 },
  { id: 'malik', name: 'Muwatta Malik', total: 1594 },
  { id: 'ahmad', name: 'Musnad Ahmad', total: 26363 },
];

export const HadithView: React.FC<HadithViewProps> = ({ onBack }) => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Mengambil hadis random (range 1-20) untuk demo, agar tidak terlalu berat
  const fetchHadiths = async (bookId: string) => {
    setLoading(true);
    setSelectedBook(bookId);
    try {
      const response = await fetch(`https://api.hadith.gading.dev/books/${bookId}?range=1-20`);
      const data = await response.json();
      setHadiths(data.data.hadiths);
    } catch (error) {
      console.error("Failed to fetch hadith", error);
    } finally {
      setLoading(false);
    }
  };

  const getBookName = (id: string) => HADITH_BOOKS.find(b => b.id === id)?.name;

  return (
    <div className="flex flex-col h-full relative">
       {/* Header */}
       <div className="relative m-4 rounded-3xl overflow-hidden shadow-lg z-10 border border-white/20 shrink-0">
        <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: `url(${HEADER_BG})` }} 
        />
        <div className="absolute inset-0 bg-primary/40 z-0 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 p-4 pt-12 pb-6 flex items-center gap-4 text-white">
            <button onClick={() => selectedBook ? setSelectedBook(null) : onBack()} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors backdrop-blur-sm">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-xl font-bold drop-shadow-md">{selectedBook ? getBookName(selectedBook) : 'Kumpulan Hadis'}</h1>
                <p className="text-xs text-white/90">{selectedBook ? 'Hadis Pilihan' : 'Pilih Kitab Perawi'}</p>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {!selectedBook ? (
            // List of Books
            <div className="grid grid-cols-1 gap-3">
                {HADITH_BOOKS.map((book) => (
                    <button 
                        key={book.id}
                        onClick={() => fetchHadiths(book.id)}
                        className="liquid-glass p-4 rounded-2xl flex items-center justify-between group hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                                <Book size={20} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-slate-800">{book.name}</h3>
                                <p className="text-xs text-slate-500">{book.total.toLocaleString()} Hadis</p>
                            </div>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </button>
                ))}
            </div>
        ) : (
            // List of Hadiths
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center text-slate-500 py-10 animate-pulse">Memuat Hadis...</div>
                ) : (
                    hadiths.map((hadith, idx) => (
                        <div key={idx} className="liquid-glass p-6 rounded-3xl">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 border border-emerald-100">
                                    No. {hadith.number}
                                </span>
                                <button className="text-slate-400 hover:text-slate-600">
                                    <Share2 size={18} />
                                </button>
                            </div>
                            <p className="font-serif text-2xl text-right leading-loose text-slate-900 mb-4 dir-rtl" style={{direction: 'rtl'}}>
                                {hadith.arab}
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {hadith.id}
                            </p>
                        </div>
                    ))
                )}
            </div>
        )}
      </div>
    </div>
  );
};
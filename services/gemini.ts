import { GoogleGenAI, Type } from "@google/genai";

// Jangan inisialisasi langsung di sini untuk mencegah App Crash saat load jika Key kosong
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelName = 'gemini-3-flash-preview';

// Helper untuk mendapatkan instance AI secara aman
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey.length === 0) {
    console.error("API Key belum diset atau kosong.");
    return null;
  }
  return new GoogleGenAI({ apiKey: apiKey });
};

export const generateIslamicContent = async (type: 'HADIS' | 'QUOTE' | 'SAMAIL' | 'KITAB'): Promise<any> => {
  const ai = getAIClient();
  
  if (!ai) {
    return {
      title: "Konfigurasi Diperlukan",
      content: "API Key belum terpasang. Mohon konfigurasi API Key pada proses build.",
      source: "Sistem"
    };
  }

  let prompt = "";
  let systemInstruction = "You are a knowledgeable Islamic scholar assistant. Provide authentic, respectful, and inspiring content.";

  switch (type) {
    case 'HADIS':
      prompt = "Generate a random authentic Hadith (Sahih Bukhari or Muslim) about good character or daily life. Include the Arabic text, translation in Indonesian, and the source.";
      break;
    case 'QUOTE':
      prompt = "Generate an inspiring Islamic quote (Quote Nabawi) or wisdom from the Companions. Include Arabic if applicable and Indonesian translation.";
      break;
    case 'SAMAIL':
      prompt = "Describe one physical characteristic or habit (Shamail) of Prophet Muhammad SAW based on Shamail Muhammadiyah. In Indonesian.";
      break;
    case 'KITAB':
      prompt = "Recommend a classic Islamic book (Kitab Kuning or modern) for a beginner to study. Give the title, author, and a brief summary of what it teaches in Indonesian.";
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            arabic: { type: Type.STRING },
            content: { type: Type.STRING },
            source: { type: Type.STRING }
          },
          required: ["title", "content"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      title: "Mohon Maaf",
      content: "Gagal memuat konten. Silakan coba lagi nanti.",
      source: "System"
    };
  }
};

export const getPrayerTimesAI = async (city: string): Promise<any> => {
    const ai = getAIClient();
    if (!ai) {
        // Fallback static data jika API Key mati, agar App tidak crash
        return {
            fajr: "04:30", dhuhr: "12:00", asr: "15:15", maghrib: "18:00", isha: "19:15"
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: `What are the approximate prayer times for today in ${city}? Return JSON only.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        fajr: {type: Type.STRING},
                        dhuhr: {type: Type.STRING},
                        asr: {type: Type.STRING},
                        maghrib: {type: Type.STRING},
                        isha: {type: Type.STRING},
                    }
                }
            }
        });
        return JSON.parse(response.text || "{}");
    } catch (e) {
        return {
            fajr: "04:30", dhuhr: "12:00", asr: "15:15", maghrib: "18:00", isha: "19:15"
        }
    }
}
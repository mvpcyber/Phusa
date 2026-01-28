import { GoogleGenAI, Type } from "@google/genai";

// Use process.env.API_KEY as per Google GenAI SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = 'gemini-3-flash-preview';

export const generateIslamicContent = async (type: 'HADIS' | 'QUOTE' | 'SAMAIL' | 'KITAB'): Promise<any> => {
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
      content: "Gagal memuat konten. Silakan coba lagi nanti atau periksa API Key.",
      source: "System"
    };
  }
};

export const getPrayerTimesAI = async (city: string): Promise<any> => {
    // Fallback/AI based prayer times if local calc fails or for simplicity in this demo
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
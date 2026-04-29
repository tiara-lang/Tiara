import { GoogleGenAI } from "@google/genai";
import { DailyRecord, Student } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateStudentConclusion(student: Student, records: DailyRecord[]) {
  if (records.length === 0) return null;

  const recordsSummary = records.map(r => ({
    date: r.date,
    scores: r.scores,
    activity: r.activityLog
  })).slice(0, 10); // Analyze last 10 entries

  const prompt = `
    Analyze the following IEP monitoring records for ${student.name} (${student.class}) and provide a concise, professional "Catatan Penting" (Important Notes) in Bahasa Indonesia.
    
    Data:
    ${JSON.stringify(recordsSummary)}
    
    Guidelines:
    1. Focus on trends (improvement or decline).
    2. Mention specific areas like Literacy, Numeracy, or Emotional Regulation if significant.
    3. Be encouraging but objective.
    4. Keep it under 100 words.
    5. Ensure the tone matches a professional school report.
    
    Output should start directly with the narrative.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}


import { GoogleGenAI, Type } from "@google/genai";
import { BookDeconstruction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const BOOK_DECONSTRUCTION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "书籍名称" },
    author: { type: Type.STRING, description: "作者姓名" },
    genre: { type: Type.STRING, description: "书籍类别（如：心理学、创业、文学等）" },
    rating: { type: Type.NUMBER, description: "推荐指数 (1-10)" },
    oneSentenceSummary: { type: Type.STRING, description: "一句话精华总结" },
    targetAudience: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "推荐阅读人群"
    },
    mainThemes: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "核心主题或关键词"
    },
    keyChapters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "章节或模块标题" },
          summary: { type: Type.STRING, description: "核心内容摘要" }
        },
        required: ["title", "summary"]
      },
      description: "重点章节拆解（选取最具价值的3-5个部分）"
    },
    practicalTakeaways: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "对读者的实际应用建议或行动指南"
    },
    criticalReview: { type: Type.STRING, description: "书籍的优缺点评价或深度洞察" }
  },
  required: [
    "title", "author", "genre", "rating", "oneSentenceSummary", 
    "targetAudience", "mainThemes", "keyChapters", "practicalTakeaways", "criticalReview"
  ]
};

export async function deconstructBook(bookName: string): Promise<BookDeconstruction> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `请深度拆解这本经典书籍：${bookName}。如果是系列丛书，请拆解其最核心的一本。请务必使用中文回复，并严格遵守JSON格式。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: BOOK_DECONSTRUCTION_SCHEMA,
      temperature: 0.7,
      topP: 0.95,
      topK: 40
    },
  });

  const result = JSON.parse(response.text);
  return result as BookDeconstruction;
}

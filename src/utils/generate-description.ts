import { GoogleGenerativeAI } from '@google/generative-ai';
import { Logger } from '@nestjs/common';
import { GEMINI_API_KEY } from 'src/config/enviroment.config';

export default async function generateEnhancedDescription(
  name: string,
  description: string,
  nameOfCategory: string,
): Promise<string> {
  try {
    const genAi = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert in medical sales. Your specialty is medical consumables used by hospitals on a daily basis. Your task is to enhance the description of a product based on the information provided.
        Product name: ${name}
        Product description: ${description}
        Category: ${nameOfCategory}
    
        New Description:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    Logger.error(error);
  }
}

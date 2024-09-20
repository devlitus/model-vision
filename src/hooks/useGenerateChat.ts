import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions.mjs';

export function useGenerateChat() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const client = new Groq({ apiKey, dangerouslyAllowBrowser: true });
  async function generateChat(messages: ChatCompletionMessageParam[]) {
    const chatCompletion = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
    }) 
    return chatCompletion.choices[0].message
  }
  return { generateChat };
}
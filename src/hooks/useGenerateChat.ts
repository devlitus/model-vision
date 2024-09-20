import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions.mjs';

export function useGenerateChat() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const client = new Groq({ apiKey, dangerouslyAllowBrowser: true });
  const model = "llama3-70b-8192";
  const modelVisio = "llava-v1.5-7b-4096-preview";
  async function generateChat(messages: ChatCompletionMessageParam[]) {
    const chatCompletion = await client.chat.completions.create({
      model,
      messages,
    }) 
    return chatCompletion.choices[0].message
  }
  async function generateChatVisio(message: string, image: any){
    const chatCompletion = await client.chat.completions.create({
      model: model,
      messages:[{
        role: "user",
        content: [
          {
            type: "text",
            text: message
          },
          {
            type: "image_url",
            image_url: {url: image}
          }
        ]
      }]
    });
    console.log("generateChatVisio", chatCompletion.choices[0].message);
  }
  return { generateChat, generateChatVisio };
}
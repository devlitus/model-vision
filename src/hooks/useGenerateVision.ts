export const useGenerateVision = () => {
  async function generateChatVision(message: string, image: any) {
    const chatCompletion = await client.chat.completions.create({
      model: modelVisio,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `${message}, respon siempre en español`,
            },
            {
              type: "image_url",
              image_url: { url: image },
            },
          ],
        },
      ],
    });
    return chatCompletion.choices[0].message;
  }
  return { generateChatVision };
};

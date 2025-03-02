const modelVisio = "llama-3.2-90b-vision-preview";

export const useGenerateVision = () => {
  async function generateChatVision(message: string, imageUrl: string) {
    console.log('imageUrl received in generateChatVision :>> ', imageUrl);
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
              image_url: {
                url: imageUrl
              },
            },
          ],
        },
      ],
    });
    return chatCompletion.choices[0].message;
  }
  return { generateChatVision };
};

import { useChatStore } from "./store";
import { useGenerateChat } from "@/hooks/useGenerateChat";
import { useGenerateVision } from "@/hooks/useGenerateVision";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

// Hook que encapsula la lógica de operaciones del chat
export function useChatOperations() {
  const { 
    messages, 
    input, 
    setInput, 
    addMessage, 
    resetInput,
    imageUrl,
    setImageUrl,
    uploadedFile,
    setUploadedFile,
    resetImage
  } = useChatStore();
  
  const { generateChat } = useGenerateChat();
  const { generateChatVision } = useGenerateVision();

  const sendMessage = async () => {
    if (input.trim()) {
      let newMessage: ChatCompletionMessageParam;
      
      // Si hay una imagen, creamos un mensaje con contenido de tipo array
      if (imageUrl) {
        newMessage = {
          role: "user",
          content: [
            {
              type: "text",
              text: input
            },
            {
              type: "image_url",
              image_url: { url: imageUrl }
            }
          ]
        };
      } else {
        // Mensaje normal sin imagen
        newMessage = { 
          role: "user", 
          content: input 
        };
      }
      
      // Agregar mensaje del usuario
      addMessage(newMessage);
      
      // Limpiar el input
      resetInput();
      
      try {
        let assistantMessage;
        
        // Usar el generador de visión si hay una imagen, o el chat normal si no
        if (imageUrl && uploadedFile) {
          assistantMessage = await generateChatVision(input, imageUrl);
        } else {
          assistantMessage = await generateChat([...messages, newMessage]);
        }
        
        // Agregar la respuesta del asistente
        addMessage(assistantMessage);
        
        // Limpiar la imagen después de enviar el mensaje
        resetImage();
      } catch (error) {
        console.error("Error al generar respuesta:", error);
        
        // Mensaje de error al chat
        addMessage({ 
          role: "assistant", 
          content: "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo." 
        });
        
        // Limpiar la imagen en caso de error
        resetImage();
      }
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    imageUrl,
    setImageUrl,
    uploadedFile,
    setUploadedFile
  };
}
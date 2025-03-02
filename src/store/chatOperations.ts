import { useChatStore } from "./store";
import { useGenerateChat } from "@/hooks/useGenerateChat";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";

// Hook que encapsula la lógica de operaciones del chat
export function useChatOperations() {
  const { 
    messages, 
    input, 
    setInput, 
    addMessage, 
    resetInput 
  } = useChatStore();
  
  const { generateChat } = useGenerateChat();

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage: ChatCompletionMessageParam = { 
        role: "user", 
        content: input 
      };
      
      // Agregar mensaje del usuario
      addMessage(newMessage);
      
      // Limpiar el input
      resetInput();
      
      try {
        // Obtener la respuesta del asistente
        const assistantMessage = await generateChat([...messages, newMessage]);
        
        // Agregar la respuesta del asistente
        addMessage(assistantMessage);
      } catch (error) {
        console.error("Error al generar respuesta:", error);
        
        // Podríamos agregar un mensaje de error al chat
        addMessage({ 
          role: "assistant", 
          content: "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo." 
        });
      }
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage
  };
}
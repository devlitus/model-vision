import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X } from "lucide-react";
import { SideBar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { useUIStore } from "@/store/store";
import { useChatOperations } from "@/store/chatOperations";
import { ButtonUploadFile } from "@/components/ui/buttonUploadFile";

export function ChatGpt() {
  // Usar Zustand para la UI
  const { darkMode, sidebarOpen, setSidebarOpen } = useUIStore();
  
  // Usar el hook personalizado para las operaciones de chat
  const { 
    messages, 
    input, 
    setInput, 
    sendMessage, 
    imageUrl, 
    setImageUrl, 
    uploadedFile, 
    setUploadedFile 
  } = useChatOperations();

  // Efecto para aplicar el tema oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Función para validar si es una imagen válida
  const isValidImageFile = (file: File): boolean => {
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    const fileName = file.name.toLowerCase();
    return validExtensions.some(ext => fileName.endsWith(ext));
  };

  // Handler para cuando se selecciona un archivo
  const handleFileUpload = (file: File) => {
    if (isValidImageFile(file)) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImageUrl(url);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Solo se permiten imágenes con extensión .jpg, .jpeg o .png");
    }
  };

  // Función para limpiar la imagen
  const clearImage = () => {
    setImageUrl("");
    setUploadedFile(null);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-800 transition-colors duration-200">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        <Header />
        <ScrollArea className="flex-grow p-4 max-w-[800px] mx-auto w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                }`}
              >
                {/* Manejo de mensaje con imagen */}
                {Array.isArray(message.content) 
                  ? message.content
                      .filter(item => item.type === "text")
                      .map((item, i) => (
                        <span key={i}>{(item as any).text}</span>
                      ))
                  : message.content}
              </span>
              
              {/* Si el mensaje del usuario tiene una imagen, mostrarla */}
              {message.role === "user" && Array.isArray(message.content) && 
                message.content.some(item => item.type === "image_url") && (
                <div className="mt-2 flex justify-end">
                  <img 
                    src={(message.content.find(item => item.type === "image_url") as any)?.image_url?.url}
                    alt="Imagen adjunta" 
                    className="max-w-xs h-auto rounded-lg" 
                  />
                </div>
              )}
            </div>
          ))}
        </ScrollArea>

        {/* Mostrar la imagen previa si hay una */}
        {imageUrl && (
          <div className="p-4 flex justify-center relative max-w-[800px] mx-auto w-full">
            <div className="relative inline-block">
              <img
                src={imageUrl}
                alt="Imagen para subir"
                className="max-h-32 max-w-full h-auto rounded-lg shadow-md"
              />
              <button
                onClick={clearImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                aria-label="Eliminar imagen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <div className="p-4 dark:border-gray-700 max-w-[800px] mx-auto w-full">
          <div className="flex space-x-2">
            <ButtonUploadFile 
              setUploadedFile={handleFileUpload} 
              setImageURL={setImageUrl}
            />
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              className="flex-grow"
            />
            <Button onClick={sendMessage} aria-label="Enviar mensaje">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
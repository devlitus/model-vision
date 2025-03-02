import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { SideBar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { useUIStore } from "@/store/store";
import { useChatOperations } from "@/store/chatOperations";

export function ChatGpt() {
  // Usar Zustand para la UI
  const { darkMode, sidebarOpen, setSidebarOpen } = useUIStore();
  
  // Usar el hook personalizado para las operaciones de chat
  const { messages, input, setInput, sendMessage } = useChatOperations();

  // Efecto para aplicar el tema oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
              className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"
                }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
              >
                {Array.isArray(message.content) ? message.content.join(' ') : message.content}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 dark:border-gray-700 max-w-[800px] mx-auto w-full" >
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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
import { useState, useEffect, ChangeEvent } from "react";
import {
  Send, Paperclip
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";
import { useGenerateChat } from "@/hooks/useGenerateChat";
import { Header } from "@/components/ui/Header";
import { SideBar } from "@/components/ui/SideBar";



export function ChatGpt() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([
    { role: "system", content: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const { generateChat, generateChatVisio } = useGenerateChat();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: ChatCompletionMessageParam = { role: "user", content: input };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInput("");

      if (uploadedFile && imageURL) {
        const assistantMessage = await generateChatVisio(input, imageURL);
        console.log("Mensaje enviado:", assistantMessage);
        setMessages([...updatedMessages, assistantMessage]);
        setImageURL(null);
      } else {
        const assistantMessage = await generateChat(updatedMessages);
        setMessages([...updatedMessages, assistantMessage]);
      }
    }
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setUploadedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImageURL(url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-800 transition-colors duration-200">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        <Header sidebarOpen={sidebarOpen} darkMode={darkMode} setSidebarOpen={setSidebarOpen} setDarkMode={setDarkMode} />
        <ScrollArea className="flex-grow p-4">
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
        <div className="p-4 border-t dark:border-gray-700">
          {uploadedFile && (
            <div className="mb-4 text-left ml-14">
              <span className="inline-block  text-white">
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Archivo adjunto"
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                )}
              </span>
            </div>
          )}
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Paperclip className="h-4 w-4" />
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        aria-label="Subir archivo"
                      />
                    </label>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Subir archivo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow"
            />
            <Button onClick={handleSend} aria-label="Enviar mensaje">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, ChangeEvent } from "react"
import { Moon, Sun, Send, Plus, MessageSquare, ChevronLeft, ChevronRight, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ChatGPTUI() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ])
  const [input, setInput] = useState("")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      setInput("")
      // Aquí simularíamos una respuesta del asistente
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "Esta es una respuesta simulada del asistente." },
        ])
      }, 1000)
    }
  }



  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      // Aquí iría la lógica para manejar el archivo subido
      console.log("Archivo seleccionado:", file.name)
    }
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-800 transition-colors duration-200">
      {/* Sidebar */}
      <aside
        className={`bg-gray-100 dark:bg-gray-900 p-4 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"
          } md:relative fixed h-full z-10`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Chats</h2>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="outline" className="w-full mb-4">
          <Plus className="h-4 w-4 mr-2" /> Nuevo chat
        </Button>
        <div className="space-y-2">
          {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start">
              <MessageSquare className="h-4 w-4 mr-2" /> {chat}
            </Button>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-2"
              aria-label={sidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">ChatGPT UI</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>
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
                {message.content}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t dark:border-gray-700">
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
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow"
            />
            <Button onClick={handleSend} aria-label="Enviar mensaje">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
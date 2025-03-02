import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useUIStore } from "@/store/store";

export function Header() {
  const { sidebarOpen, darkMode, toggleSidebar, toggleDarkMode } = useUIStore();

  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2"
          aria-label={sidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </Button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          ChatGPT UI
        </h1>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
      >
        {darkMode ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </header>
  )
}
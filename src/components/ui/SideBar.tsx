import { ChevronLeft, MessageSquare, Plus } from "lucide-react";
import { Button } from "./button";

interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function SideBar({ sidebarOpen, setSidebarOpen }: SideBarProps) {

  return (
    <aside
      className={`bg-gray-100 dark:bg-gray-900 p-4 transition-all duration-300 ${sidebarOpen ? "w-64 min-w-64" : "w-0 min-w-0 overflow-hidden px-0"
        } md:relative fixed h-full z-100`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Chats
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(false)}
          className="md:hidden sm:hidden lg:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <Button variant="outline" className="w-full mb-4">
        <Plus className="h-4 w-4 mr-2" /> Nuevo chat
      </Button>
      <div className="space-y-2">
        {["Chat 1", "Chat 2", "Chat 3"].map((chat, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start"
          >
            <MessageSquare className="h-4 w-4 mr-2" /> {chat}
          </Button>
        ))}
      </div>
    </aside>
  )
}
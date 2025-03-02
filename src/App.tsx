import { ChatGpt } from "./pages/ChatGpt";
import { useUIStore } from "./store/store";

export default function App() {
  const { darkMode } = useUIStore();
  
  return (
    <div className={`max-w-[1920px] ${darkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
      <ChatGpt />
    </div>
  )
}
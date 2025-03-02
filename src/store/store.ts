import { create } from 'zustand';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions.mjs';

// Interfaz para el estado UI
interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  setDarkMode: (dark: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

// Interfaz para el estado del chat
interface ChatState {
  messages: ChatCompletionMessageParam[];
  input: string;
  // Nuevos campos para gestionar imágenes
  imageUrl: string;
  uploadedFile: File | null;
  // Métodos
  setInput: (input: string) => void;
  addMessage: (message: ChatCompletionMessageParam) => void;
  resetInput: () => void;
  setImageUrl: (url: string) => void;
  setUploadedFile: (file: File | null) => void;
  resetImage: () => void;
}

// Store para la UI
export const useUIStore = create<UIState>((set) => ({
  darkMode: true,
  sidebarOpen: true,
  setDarkMode: (dark) => set({ darkMode: dark }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// Store para el chat
export const useChatStore = create<ChatState>((set) => ({
  messages: [
    { role: "system", content: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ],
  input: "",
  // Inicializamos los nuevos campos
  imageUrl: "",
  uploadedFile: null,
  // Métodos existentes
  setInput: (input) => set({ input }),
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  resetInput: () => set({ input: "" }),
  // Nuevos métodos para gestionar imágenes
  setImageUrl: (url) => set({ imageUrl: url }),
  setUploadedFile: (file) => set({ uploadedFile: file }),
  resetImage: () => set({ imageUrl: "", uploadedFile: null })
}));
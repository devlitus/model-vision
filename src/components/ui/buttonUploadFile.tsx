import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChangeEvent } from "react";
import { Button } from "./button";
import { Paperclip } from "lucide-react";

interface ButtonUploadFileProps {
  setUploadedFile: (file: File) => void;
  setImageURL: (url: string) => void;
}

export function ButtonUploadFile({ setUploadedFile, setImageURL }: ButtonUploadFileProps) {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      
      // Comprobar si el archivo es una imagen válida
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      if (!isValidType) {
        alert("Solo se permiten imágenes con formato JPG, JPEG o PNG");
        // Resetear el input
        event.target.value = '';
        return;
      }
      
      setUploadedFile(file);
      
      // Leer y mostrar la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setImageURL(url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Paperclip className="h-4 w-4" />
              <input
                id="file-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileUpload}
                aria-label="Subir imagen"
              />
            </label>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Subir imagen (JPG, JPEG, PNG)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
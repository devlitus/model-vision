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
  );
}

import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface PdfUploadStepProps {
  file: File | null;
  isProcessing: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const PdfUploadStep = ({
  file,
  isProcessing,
  onFileUpload,
}: PdfUploadStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Carica il tuo documento PDF</h3>
      </div>
      <div
        className="border-2 border-dashed border-oralmind-300 rounded-lg p-8 text-center cursor-pointer hover:border-oralmind-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
        <p className="text-oralmind-700 mb-2">
          Clicca qui o trascina il tuo PDF
        </p>
        <p className="text-sm text-muted-foreground">
          Articoli accademici, dispense, manuali universitari
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={onFileUpload}
          className="hidden"
        />
      </div>
      {file && (
        <div className="bg-oralmind-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-oralmind-600" />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {isProcessing ? "Elaborazione in corso..." : "File pronto per l'analisi"}
              </p>
            </div>
          </div>
          {isProcessing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Estrazione testo PDF...</span>
                <span>⏳</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Chunking semantico...</span>
                <span>🧩</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Creazione embedding...</span>
                <span>🧠</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfUploadStep;

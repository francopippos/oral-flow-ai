
import { Upload, FileText, Loader2, BookOpen, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface PdfUploadStepProps {
  file: File | null;
  isProcessing: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  processingStep?: string;
}

const PdfUploadStep = ({
  file,
  isProcessing,
  onFileUpload,
  processingStep
}: PdfUploadStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      {/* Header accademico */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-3">
          <BookOpen className="h-8 w-8 text-oralmind-600" />
          <h3 className="text-2xl font-bold text-oralmind-800">Carica il tuo documento accademico</h3>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Il sistema RAG avanzato analizzerà il tuo PDF, estrarrà contenuti complessi e preparerà 
          un'esperienza di studio interattiva con un professore universitario virtuale
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-oralmind-600">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Estrazione ML</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Chunking semantico</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Embedding vettoriali</span>
          </div>
        </div>
      </div>

      {/* Area di upload migliorata */}
      <div
        className="border-2 border-dashed border-oralmind-300 rounded-xl p-12 text-center cursor-pointer hover:border-oralmind-500 hover:bg-oralmind-25 transition-all duration-300 bg-gradient-to-br from-oralmind-50 to-blue-50"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-4">
          <Upload className="h-16 w-16 text-oralmind-500 mx-auto" />
          <div>
            <p className="text-xl font-semibold text-oralmind-700 mb-2">
              Trascina qui il tuo PDF accademico
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              oppure clicca per selezionarlo dal computer
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm font-medium text-gray-800 mb-2">✅ Supporto completo per:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>• Dispense universitarie</div>
              <div>• Articoli scientifici</div>
              <div>• Manuali tecnici</div>
              <div>• Tesi e paper</div>
              <div>• PDF con formule</div>
              <div>• Documenti con grafici</div>
            </div>
            <p className="text-xs text-oralmind-600 mt-3 font-medium">
              📄 Fino a 100 pagine • 📊 Gestione contenuto misto testo/immagini
            </p>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={onFileUpload}
          className="hidden"
        />
      </div>

      {/* Status elaborazione avanzato */}
      {file && (
        <div className="bg-gradient-to-r from-oralmind-50 to-blue-50 border border-oralmind-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <FileText className="h-8 w-8 text-oralmind-600 flex-shrink-0 mt-1" />
            <div className="flex-1 space-y-3">
              <div>
                <p className="font-semibold text-oralmind-800 text-lg">{file.name}</p>
                <p className="text-sm text-oralmind-600">
                  {(file.size / 1024 / 1024).toFixed(1)} MB • {file.type}
                </p>
              </div>
              
              {isProcessing ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="h-5 w-5 animate-spin text-oralmind-600" />
                    <span className="text-sm font-medium text-oralmind-700">
                      {processingStep || "Elaborazione avanzata in corso..."}
                    </span>
                  </div>
                  
                  {/* Pipeline di processing */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700 mb-2">Pipeline RAG Universitario:</p>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="flex items-center space-x-2">
                          <FileText className="h-3 w-3" />
                          <span>Estrazione testo PDF.js</span>
                        </span>
                        <span className="text-oralmind-600 animate-pulse">🔄</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <span className="flex items-center space-x-2">
                          <Brain className="h-3 w-3" />
                          <span>Chunking semantico accademico</span>
                        </span>
                        <span className="text-gray-400">⏳</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <span className="flex items-center space-x-2">
                          <BookOpen className="h-3 w-3" />
                          <span>Embedding ML (HuggingFace)</span>
                        </span>
                        <span className="text-gray-400">🤖</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      💡 <strong>Cosa sta succedendo:</strong> Il sistema sta analizzando ogni pagina del tuo PDF, 
                      estraendo il contenuto testuale e preparando un database semantico per interrogazioni intelligenti.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-success-700">
                      ✅ Documento elaborato e sistema RAG attivato
                    </span>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      🎓 <strong>Pronto per l'interrogazione!</strong> Il professore virtuale ha analizzato 
                      il documento e può rispondere a domande specifiche sui contenuti.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfUploadStep;

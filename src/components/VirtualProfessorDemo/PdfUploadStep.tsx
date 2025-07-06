
import { Upload, FileText, Loader2, BookOpen, Brain, Zap, CheckCircle } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header accademico migliorato */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <BookOpen className="h-10 w-10 text-oralmind-600" />
          <h3 className="text-3xl font-bold text-oralmind-800">Carica il tuo documento accademico</h3>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Il <strong>Professore Universitario Virtuale</strong> analizzerà il tuo PDF con tecnologie AI avanzate, 
          creando un sistema di comprensione intelligente per rispondere alle tue domande accademiche
        </p>
        
        {/* Caratteristiche tecniche */}
        <div className="flex items-center justify-center space-x-8 text-sm text-oralmind-600 bg-oralmind-25 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span><strong>PDF.js</strong> Estrazione</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span><strong>Chunking</strong> Semantico</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span><strong>Embedding</strong> ML</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span><strong>ChatGPT</strong> RAG</span>
          </div>
        </div>
      </div>

      {/* Area di upload professionale */}
      <div
        className="border-2 border-dashed border-oralmind-300 rounded-2xl p-16 text-center cursor-pointer hover:border-oralmind-500 hover:bg-oralmind-25 transition-all duration-300 bg-gradient-to-br from-oralmind-50 via-blue-50 to-purple-50"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-6">
          <div className="relative">
            <Upload className="h-20 w-20 text-oralmind-500 mx-auto" />
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-oralmind-700 mb-3">
              Trascina qui il tuo PDF accademico
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              oppure clicca per selezionarlo dal computer
            </p>
          </div>
          
          {/* Supporto documenti */}
          <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm">
            <p className="text-lg font-semibold text-gray-800 mb-4">✅ Supporto completo per documenti accademici:</p>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <div className="font-medium text-oralmind-700">📚 Didattici</div>
                <div>• Dispense universitarie</div>
                <div>• Manuali tecnici</div>
                <div>• Slides di lezione</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-oralmind-700">🔬 Scientifici</div>
                <div>• Articoli di ricerca</div>
                <div>• Paper accademici</div>
                <div>• Tesi di laurea</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-oralmind-700">📊 Complessi</div>
                <div>• Con formule matematiche</div>
                <div>• Grafici e tabelle</div>
                <div>• Contenuti multilingue</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-oralmind-600 font-medium">
                📄 <strong>Capacità:</strong> Fino a 100 pagine • 📊 <strong>Gestione:</strong> Testo + Immagini • 🧠 <strong>AI:</strong> Comprensione semantica avanzata
              </p>
            </div>
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
        <div className="bg-gradient-to-r from-oralmind-50 to-blue-50 border-2 border-oralmind-200 rounded-2xl p-8">
          <div className="flex items-start space-x-6">
            <FileText className="h-12 w-12 text-oralmind-600 flex-shrink-0 mt-2" />
            <div className="flex-1 space-y-4">
              <div>
                <p className="font-bold text-oralmind-800 text-xl mb-1">{file.name}</p>
                <p className="text-oralmind-600">
                  📄 {(file.size / 1024 / 1024).toFixed(1)} MB • 🕐 {new Date(file.lastModified).toLocaleDateString()}
                </p>
              </div>
              
              {isProcessing ? (
                <div className="space-y-5">
                  <div className="flex items-center space-x-4">
                    <Loader2 className="h-6 w-6 animate-spin text-oralmind-600" />
                    <span className="text-lg font-semibold text-oralmind-700">
                      {processingStep || "Elaborazione AI in corso..."}
                    </span>
                  </div>
                  
                  {/* Pipeline avanzata */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-800 mb-3">🤖 Pipeline Professore Universitario:</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                        <span className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Estrazione PDF.js avanzata</span>
                        </span>
                        <span className="text-blue-600 animate-pulse font-bold">🔄 ATTIVO</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <span className="flex items-center space-x-3">
                          <Brain className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium">Chunking semantico intelligente</span>
                        </span>
                        <span className="text-yellow-600">⏳ IN CODA</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                        <span className="flex items-center space-x-3">
                          <Zap className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Embedding ML (HuggingFace)</span>
                        </span>
                        <span className="text-purple-600">🤖 STANDBY</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <span className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Attivazione Professore RAG</span>
                        </span>
                        <span className="text-green-600">🎓 PRONTO</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <strong>🧠 Elaborazione in corso:</strong> Il sistema sta analizzando ogni pagina del PDF, 
                      estraendo contenuti testuali, creando chunk semantici e generando embedding vettoriali per 
                      permettere al Professore Virtuale di comprendere e rispondere alle tue domande con precisione accademica.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span className="text-lg font-bold text-success-700">
                      ✅ Documento processato - Sistema RAG attivato
                    </span>
                  </div>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                    <p className="text-green-800 text-lg">
                      🎓 <strong>Professore Universitario Virtuale pronto!</strong> 
                      Il documento è stato completamente analizzato e il sistema RAG è operativo. 
                      Puoi ora porre domande specifiche sui contenuti e ricevere risposte accademiche precise.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="font-bold text-oralmind-600">📊 Testo</div>
                      <div className="text-gray-600">Estratto</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="font-bold text-oralmind-600">🧩 Chunk</div>
                      <div className="text-gray-600">Semantici</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="font-bold text-oralmind-600">🤖 Embedding</div>
                      <div className="text-gray-600">Vettoriali</div>
                    </div>
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

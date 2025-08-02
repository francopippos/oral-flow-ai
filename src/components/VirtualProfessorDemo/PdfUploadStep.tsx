
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
          <Brain className="h-10 w-10 text-primary" />
          <h3 className="text-3xl font-bold text-primary">Upload your academic document</h3>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          <strong>Bistro AI</strong> will analyze your PDF with advanced AI technologies from the OralFlow stack, 
          creating an intelligent understanding system to answer your academic questions
        </p>
        
        {/* Technical features */}
        <div className="flex items-center justify-center space-x-8 text-sm text-primary bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span><strong>PDF.js</strong> Extraction</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span><strong>Semantic</strong> Chunking</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span><strong>AI</strong> Embeddings</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span><strong>Bistro AI</strong> RAG</span>
          </div>
        </div>
      </div>

      {/* Professional upload area */}
      <div
        className="border-2 border-dashed border-primary/30 rounded-2xl p-16 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-6">
          <div className="relative">
            <Upload className="h-20 w-20 text-primary mx-auto" />
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-primary mb-3">
              Drag your academic PDF here
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              or click to select it from your computer
            </p>
          </div>
          
          {/* Document support */}
          <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto shadow-sm">
            <p className="text-lg font-semibold text-gray-800 mb-4">✅ Complete support for academic documents:</p>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <div className="font-medium text-primary">📚 Educational</div>
                <div>• University materials</div>
                <div>• Technical manuals</div>
                <div>• Lecture slides</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-primary">🔬 Scientific</div>
                <div>• Research articles</div>
                <div>• Academic papers</div>
                <div>• Dissertations</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-primary">📊 Complex</div>
                <div>• Mathematical formulas</div>
                <div>• Charts and tables</div>
                <div>• Multilingual content</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-primary font-medium">
                📄 <strong>Capacity:</strong> Up to 100 pages • 📊 <strong>Processing:</strong> Text + Images • 🧠 <strong>AI:</strong> Advanced semantic understanding
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

      {/* Advanced processing status */}
      {file && (
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-2xl p-8">
          <div className="flex items-start space-x-6">
            <FileText className="h-12 w-12 text-primary flex-shrink-0 mt-2" />
            <div className="flex-1 space-y-4">
              <div>
                <p className="font-bold text-primary text-xl mb-1">{file.name}</p>
                <p className="text-muted-foreground">
                  📄 {(file.size / 1024 / 1024).toFixed(1)} MB • 🕐 {new Date(file.lastModified).toLocaleDateString()}
                </p>
              </div>
              
              {isProcessing ? (
                <div className="space-y-5">
                  <div className="flex items-center space-x-4">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="text-lg font-semibold text-primary">
                      {processingStep || "Bistro AI processing in progress..."}
                    </span>
                  </div>
                  
                  {/* Advanced pipeline */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-800 mb-3">🤖 Bistro AI Pipeline:</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                        <span className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Advanced PDF.js extraction</span>
                        </span>
                        <span className="text-blue-600 animate-pulse font-bold">🔄 ACTIVE</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                        <span className="flex items-center space-x-3">
                          <Brain className="h-4 w-4 text-yellow-600" />
                          <span className="font-medium">Intelligent semantic chunking</span>
                        </span>
                        <span className="text-yellow-600">⏳ QUEUED</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                        <span className="flex items-center space-x-3">
                          <Zap className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">AI embeddings (Bistro)</span>
                        </span>
                        <span className="text-purple-600">🤖 STANDBY</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <span className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Bistro AI activation</span>
                        </span>
                        <span className="text-green-600">🤖 READY</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <strong>🧠 Processing in progress:</strong> The system is analyzing every page of the PDF, 
                      extracting textual content, creating semantic chunks and generating vector embeddings to 
                      enable Bistro AI to understand and respond to your questions with academic precision.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span className="text-lg font-bold text-green-700">
                      ✅ Document processed - Bistro AI system activated
                    </span>
                  </div>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                    <p className="text-green-800 text-lg">
                      🤖 <strong>Bistro AI Virtual Professor ready!</strong> 
                      Your document has been completely analyzed and the RAG system is operational. 
                      You can now ask specific questions about the content and receive precise academic answers.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="font-bold text-primary">📊 Text</div>
                      <div className="text-gray-600">Extracted</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="font-bold text-primary">🧩 Chunks</div>
                      <div className="text-gray-600">Semantic</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="font-bold text-primary">🤖 Embeddings</div>
                      <div className="text-gray-600">Vector</div>
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


import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, MessageCircle, Mic, MicOff, FileText, Download, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface FunctionalDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FunctionalDemoModal = ({ isOpen, onClose }: FunctionalDemoModalProps) => {
  const [step, setStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: 'ai' | 'user', message: string}>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState('');
  const [apiKey, setApiKey] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsAnalyzing(true);

    try {
      const text = await file.text();
      setFileContent(text);
      
      // Simula analisi AI del documento
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(1);
        setConversation([{
          role: 'ai',
          message: `Ho analizzato il documento "${file.name}". Sono pronto a farti domande sul contenuto. Dimmi quando vuoi iniziare l'interrogazione!`
        }]);
      }, 2000);
    } catch (error) {
      console.error('Errore nella lettura del file:', error);
      setIsAnalyzing(false);
    }
  };

  const analyzeWithAI = async (userMessage: string) => {
    if (!apiKey) {
      return "Per favore inserisci la tua API key di OpenAI nella sezione configurazione per utilizzare l'AI reale.";
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `Sei un professore che sta interrogando uno studente. Hai a disposizione questo documento di studio: "${fileContent}". 
              Basa le tue domande e valutazioni ESCLUSIVAMENTE su questo contenuto. 
              Fai domande specifiche sul materiale e fornisci feedback costruttivo.
              Rispondi sempre in italiano in modo chiaro e pedagogico.`
            },
            ...conversation.map(msg => ({
              role: msg.role === 'ai' ? 'assistant' : 'user',
              content: msg.message
            })),
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Errore API: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Errore nell\'analisi AI:', error);
      return "Mi dispiace, c'è stato un errore nell'analisi. Assicurati che la tua API key sia valida.";
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput;
    setUserInput('');
    setIsProcessing(true);

    // Aggiungi messaggio utente
    setConversation(prev => [...prev, { role: 'user', message: userMessage }]);

    // Simula o usa AI reale
    let aiResponse;
    if (apiKey) {
      aiResponse = await analyzeWithAI(userMessage);
    } else {
      // Risposta simulata basata sul contenuto del file
      aiResponse = `Interessante risposta! Basandomi sul documento caricato, potresti approfondire meglio il concetto che hai menzionato. Hai altri dettagli da aggiungere?`;
    }

    setConversation(prev => [...prev, { role: 'ai', message: aiResponse }]);
    setIsProcessing(false);
  };

  const generateReport = async () => {
    setIsProcessing(true);
    
    if (apiKey) {
      const response = await analyzeWithAI(`Genera un report di valutazione completo basato su questa conversazione: ${JSON.stringify(conversation)}. Include: punti di forza, aree di miglioramento, voto e consigli specifici.`);
      setReport(response);
    } else {
      // Report simulato
      setReport(`📋 Report di Valutazione

🎯 Prestazione Generale: 8/10

✅ Punti di Forza:
• Buona comprensione dei concetti principali
• Esposizione chiara e organizzata
• Capacità di collegamento tra argomenti

🔄 Aree di Miglioramento:
• Approfondire la terminologia specifica
• Maggiore precisione nei dettagli cronologici
• Ampliare gli esempi pratici

💡 Consigli per il Prossimo Studio:
• Ripassare le definizioni chiave
• Creare mappe concettuali
• Esercitarsi con esempi aggiuntivi

📚 Materiali Consigliati:
• Capitoli 3-5 del testo di riferimento
• Documentari sul tema trattato`);
    }
    
    setIsProcessing(false);
    setStep(2);
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_orale_${new Date().toLocaleDateString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetDemo = () => {
    setStep(0);
    setUploadedFile(null);
    setFileContent('');
    setConversation([]);
    setUserInput('');
    setReport('');
    setIsAnalyzing(false);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetDemo();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Demo Funzionale OralMind
          </DialogTitle>
        </DialogHeader>

        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Carica il tuo materiale di studio</h3>
              <p className="text-muted-foreground mb-6">
                Carica un file di testo (.txt, .md) per iniziare l'interrogazione personalizzata
              </p>
            </div>

            {!apiKey && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-orange-800 mb-2">🔑 Configurazione AI (Opzionale)</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Per un'esperienza completa, inserisci la tua API key OpenAI:
                </p>
                <input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-2 border border-orange-300 rounded text-sm"
                />
                <p className="text-xs text-orange-600 mt-1">
                  Senza API key, la demo userà risposte simulate
                </p>
              </div>
            )}

            <div 
              className="border-2 border-dashed border-oralmind-300 rounded-lg p-12 text-center cursor-pointer hover:border-oralmind-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
              <p className="text-oralmind-700 font-medium">Clicca per caricare il file</p>
              <p className="text-sm text-muted-foreground mt-2">Formati supportati: .txt, .md</p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {uploadedFile && (
              <div className="bg-oralmind-50 border border-oralmind-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-oralmind-600" />
                  <div className="flex-1">
                    <div className="font-medium text-oralmind-800">{uploadedFile.name}</div>
                    <div className="text-sm text-oralmind-600">
                      {isAnalyzing ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Analizzando il contenuto...</span>
                        </div>
                      ) : (
                        "✓ Caricato e analizzato"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Interrogazione in Corso</h3>
              <p className="text-muted-foreground">
                File analizzato: <strong>{uploadedFile?.name}</strong>
              </p>
            </div>

            <div className="border rounded-lg p-4 h-80 overflow-y-auto space-y-4">
              {conversation.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-success-100 text-success-800' 
                      : 'bg-oralmind-100 text-oralmind-800'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-oralmind-100 px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-oralmind-800">Sto elaborando...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Scrivi la tua risposta..."
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isProcessing}
                className="px-6"
              >
                Invia
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={resetDemo}>
                Ricomincia
              </Button>
              <Button 
                onClick={generateReport}
                disabled={conversation.length < 4}
                className="bg-oralmind-500 hover:bg-oralmind-600"
              >
                Genera Report
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">📋 Report di Valutazione</h3>
              <p className="text-muted-foreground">
                Analisi completa della tua performance
              </p>
            </div>

            <div className="bg-gray-50 border rounded-lg p-6">
              <pre className="whitespace-pre-wrap text-sm">{report}</pre>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={resetDemo}>
                Nuova Interrogazione
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={downloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Scarica Report
                </Button>
                <Button onClick={handleClose} className="bg-oralmind-500 hover:bg-oralmind-600">
                  Completa Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FunctionalDemoModal;

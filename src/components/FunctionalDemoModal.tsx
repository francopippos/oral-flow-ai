
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, MessageCircle, FileText, Download, Loader2 } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API key integrata nel sistema
  const OPENAI_API_KEY = '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';

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsAnalyzing(true);

    try {
      const text = await file.text();
      setFileContent(text);
      
      // Analisi iniziale del documento con OralMind AI
      setTimeout(async () => {
        const initialAnalysis = await analyzeWithOralMindAI(`Analizza questo documento per preparare un'interrogazione: "${text}". Presenta brevemente il contenuto e dimmi quando lo studente è pronto per iniziare.`);
        
        setIsAnalyzing(false);
        setStep(1);
        setConversation([{
          role: 'ai',
          message: initialAnalysis
        }]);
      }, 2000);
    } catch (error) {
      console.error('Errore nella lettura del file:', error);
      setIsAnalyzing(false);
    }
  };

  const analyzeWithOralMindAI = async (userMessage: string) => {
    try {
      console.log('🤖 OralMind AI sta elaborando...', { userMessage: userMessage.substring(0, 100) });
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `Sei il Professor OralMind, un assistente AI specializzato nell'interrogazione orale degli studenti.

REGOLE FONDAMENTALI:
1. Conosci SOLO il contenuto del documento fornito: "${fileContent}"
2. NON puoi accedere ad altre informazioni oltre a questo documento
3. Se lo studente chiede qualcosa NON presente nel documento, rispondi: "Mi dispiace, posso interrogarti solo sul materiale che hai caricato"
4. Comportati come un professore esperto e paziente
5. Fai domande progressive: dalle basi ai concetti più complessi
6. Fornisci feedback costruttivo e incoraggiante
7. Usa un linguaggio pedagogico chiaro e professionale
8. Non rivelare mai di essere ChatGPT o un AI generico - sei il Professor OralMind

STILE DI INTERROGAZIONE:
- Inizia con domande generali sul documento
- Approfondisci i dettagli importanti
- Chiedi collegamenti tra concetti
- Valuta la comprensione con esempi
- Fornisci suggerimenti se lo studente è in difficoltà

Ricorda: Sei un professore specializzato che conosce ESCLUSIVAMENTE il contenuto caricato dallo studente.`
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
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Errore API OpenAI: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      
      console.log('✅ Risposta OralMind AI ricevuta');
      return aiResponse;
    } catch (error) {
      console.error('❌ Errore OralMind AI:', error);
      return "Mi dispiace, c'è stato un problema tecnico. Riprova tra un momento.";
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput;
    setUserInput('');
    setIsProcessing(true);

    console.log('📤 Messaggio studente:', userMessage);

    // Aggiungi messaggio utente
    setConversation(prev => [...prev, { role: 'user', message: userMessage }]);

    // Elabora con OralMind AI
    const aiResponse = await analyzeWithOralMindAI(userMessage);
    setConversation(prev => [...prev, { role: 'ai', message: aiResponse }]);
    setIsProcessing(false);
  };

  const generateOralMindReport = async () => {
    setIsProcessing(true);
    
    console.log('📊 Generazione report OralMind...');
    
    const conversationSummary = conversation
      .map(msg => `${msg.role === 'user' ? 'Studente' : 'Professor OralMind'}: ${msg.message}`)
      .join('\n\n');
    
    const reportPrompt = `Genera un report di valutazione dettagliato basato su questa interrogazione orale condotta dal Professor OralMind.

DOCUMENTO STUDIATO: "${uploadedFile?.name}"

CONVERSAZIONE:
${conversationSummary}

FORMATO DEL REPORT:
📋 REPORT DI VALUTAZIONE ORALMIND
📚 Documento: [nome file]
📅 Data: [data odierna]

🎯 VALUTAZIONE GENERALE: [voto/10 con motivazione]

✅ PUNTI DI FORZA:
[Elenca 3-4 aspetti positivi dell'esposizione]

🔄 AREE DI MIGLIORAMENTO:
[Elenca 2-3 aspetti da migliorare]

💡 CONSIGLI PERSONALIZZATI:
[Suggerimenti specifici per lo studio]

📈 PROSSIMI PASSI:
[Raccomandazioni per il proseguimento dello studio]

🏆 COMMENTO FINALE:
[Commento motivazionale del Professor OralMind]

---
Generato da OralMind - Il tuo assistente AI per l'interrogazione orale`;

    const report = await analyzeWithOralMindAI(reportPrompt);
    setReport(report);
    setIsProcessing(false);
    setStep(2);
  };

  const downloadReport = () => {
    const reportContent = `${report}\n\n---\nGenerato da OralMind\nData: ${new Date().toLocaleDateString('it-IT')}\nDocumento analizzato: ${uploadedFile?.name}`;
    
    const blob = new Blob([reportContent], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OralMind_Report_${new Date().toLocaleDateString('it-IT').replace(/\//g, '_')}.txt`;
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
            🧠 OralMind - Demo Funzionale
          </DialogTitle>
        </DialogHeader>

        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">📚 Carica il tuo materiale di studio</h3>
              <p className="text-muted-foreground mb-6">
                Il Professor OralMind analizzerà il contenuto e ti farà un'interrogazione personalizzata
              </p>
            </div>

            <div 
              className="border-2 border-dashed border-oralmind-300 rounded-lg p-12 text-center cursor-pointer hover:border-oralmind-500 transition-colors bg-gradient-to-br from-oralmind-50 to-success-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
              <p className="text-oralmind-700 font-medium">📁 Clicca per caricare il file</p>
              <p className="text-sm text-muted-foreground mt-2">Formati supportati: .txt, .md</p>
              <p className="text-xs text-oralmind-600 mt-1">Il Professor OralMind studierà solo questo contenuto</p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {uploadedFile && (
              <div className="bg-gradient-to-r from-oralmind-50 to-success-50 border border-oralmind-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-oralmind-600" />
                  <div className="flex-1">
                    <div className="font-medium text-oralmind-800">📖 {uploadedFile.name}</div>
                    <div className="text-sm text-oralmind-600">
                      {isAnalyzing ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>🧠 Il Professor OralMind sta studiando il contenuto...</span>
                        </div>
                      ) : (
                        "✅ Analizzato dal Professor OralMind"
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
            <div className="text-center bg-gradient-to-r from-oralmind-50 to-success-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">🎓 Interrogazione in Corso con Professor OralMind</h3>
              <p className="text-muted-foreground">
                📚 Documento: <strong>{uploadedFile?.name}</strong>
              </p>
            </div>

            <div className="border rounded-lg p-4 h-80 overflow-y-auto space-y-4 bg-gray-50">
              {conversation.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-success-100 text-success-800 border border-success-200' 
                      : 'bg-white text-oralmind-800 border border-oralmind-200'
                  }`}>
                    {msg.role === 'ai' && <div className="text-xs text-oralmind-600 mb-1">🧠 Professor OralMind</div>}
                    <div className="text-sm">{msg.message}</div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-lg border border-oralmind-200 flex items-center space-x-2 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-oralmind-600" />
                    <span className="text-oralmind-800 text-sm">🧠 Professor OralMind sta elaborando...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="💬 Scrivi la tua risposta al Professor OralMind..."
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
                className="px-6 bg-oralmind-500 hover:bg-oralmind-600"
              >
                📤 Invia
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={resetDemo}>
                🔄 Ricomincia
              </Button>
              <Button 
                onClick={generateOralMindReport}
                disabled={conversation.length < 4}
                className="bg-success-500 hover:bg-success-600"
              >
                📊 Genera Report
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center bg-gradient-to-r from-oralmind-50 to-success-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">📋 Report di Valutazione OralMind</h3>
              <p className="text-muted-foreground">
                Analisi completa della tua performance con il Professor OralMind
              </p>
            </div>

            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <pre className="whitespace-pre-wrap text-sm font-mono">{report}</pre>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={resetDemo}>
                🔄 Nuova Interrogazione
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={downloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  📥 Scarica Report
                </Button>
                <Button onClick={handleClose} className="bg-oralmind-500 hover:bg-oralmind-600">
                  ✅ Completa Demo
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

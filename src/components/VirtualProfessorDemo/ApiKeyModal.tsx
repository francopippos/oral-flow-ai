
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ApiKeyModalProps {
  isOpen: boolean;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const ApiKeyModal = ({
  isOpen,
  apiKey,
  onApiKeyChange,
  onSave,
  onClose,
}: ApiKeyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 min-w-[340px] flex flex-col gap-3">
        <h2 className="font-bold text-lg mb-2">Inserisci la tua OpenAI API Key</h2>
        <input
          type="password"
          value={apiKey}
          onChange={e => onApiKeyChange(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="sk-..."
          autoFocus
        />
        <div className="flex gap-3 mt-2">
          <Button onClick={onSave} className="bg-oralmind-500">Salva</Button>
          <Button onClick={onClose} variant="secondary">Annulla</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          La key resta solo sul tuo browser e non viene inviata altrove.
        </p>
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank" rel="noopener noreferrer"
          className="text-xs text-blue-700 underline"
        >
          Ottieni una API Key
        </a>
      </div>
    </div>
  );
};

export default ApiKeyModal;

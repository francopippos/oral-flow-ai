
import { Upload, FileText, Loader2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface FileUploadStepProps {
  uploadedFile: File | null;
  isAnalyzing: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const FileUploadStep = ({ uploadedFile, isAnalyzing, onFileUpload, fileInputRef }: FileUploadStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">{t('upload.title')}</h3>
        <p className="text-muted-foreground mb-6">
          {t('upload.description')}
        </p>
      </div>

      <div 
        className="border-2 border-dashed border-oralmind-300 rounded-lg p-12 text-center cursor-pointer hover:border-oralmind-500 transition-colors bg-gradient-to-br from-oralmind-50 to-success-50"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-12 w-12 text-oralmind-500 mx-auto mb-4" />
        <p className="text-oralmind-700 font-medium">{t('upload.clickToUpload')}</p>
        <p className="text-sm text-muted-foreground mt-2">{t('upload.onlyPdf')}</p>
        <p className="text-xs text-oralmind-600 mt-1">{t('upload.professorStudy')}</p>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={onFileUpload}
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
                    <span>{t('upload.analyzing')}</span>
                  </div>
                ) : (
                  t('upload.analyzed')
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadStep;


import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ReportStepProps {
  report: string;
  uploadedFile: File | null;
  onReset: () => void;
  onDownloadReport: () => void;
  onClose: () => void;
}

const ReportStep = ({ report, uploadedFile, onReset, onDownloadReport, onClose }: ReportStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-r from-oralmind-50 to-success-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">{t('report.title')}</h3>
        <p className="text-muted-foreground">
          {t('report.description')}
        </p>
      </div>

      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <pre className="whitespace-pre-wrap text-sm font-mono">{report}</pre>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          {t('report.newInterrogation')}
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={onDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            {t('report.downloadReport')}
          </Button>
          <Button onClick={onClose} className="bg-oralmind-500 hover:bg-oralmind-600">
            {t('report.completeDemo')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportStep;


export type Language = 'it' | 'en';

export interface TranslationKeys {
  // Header
  'nav.features': string;
  'nav.howItWorks': string;
  'nav.benefits': string;
  'nav.testimonials': string;
  'header.login': string;
  'header.tryFree': string;

  // Hero Section
  'hero.title': string;
  'hero.subtitle': string;
  'hero.description': string;
  'hero.tryDemo': string;
  'hero.watchVideo': string;
  'hero.trustedBy': string;

  // Features
  'features.title': string;
  'features.subtitle': string;
  'features.description': string;
  'features.smartAnalysis': string;
  'features.smartAnalysisDesc': string;
  'features.oralPractice': string;
  'features.oralPracticeDesc': string;
  'features.detailedFeedback': string;
  'features.detailedFeedbackDesc': string;
  'features.progressTracking': string;
  'features.progressTrackingDesc': string;
  'features.contentLibrary': string;
  'features.contentLibraryDesc': string;
  'features.voiceRecognition': string;
  'features.voiceRecognitionDesc': string;

  // How It Works
  'howItWorks.title': string;
  'howItWorks.subtitle': string;
  'howItWorks.step1': string;
  'howItWorks.step1Desc': string;
  'howItWorks.step2': string;
  'howItWorks.step2Desc': string;
  'howItWorks.step3': string;
  'howItWorks.step3Desc': string;

  // Benefits
  'benefits.title': string;
  'benefits.subtitle': string;
  'benefits.confidence': string;
  'benefits.confidenceDesc': string;
  'benefits.timeEfficient': string;
  'benefits.timeEfficientDesc': string;
  'benefits.personalized': string;
  'benefits.personalizedDesc': string;

  // Testimonials
  'testimonials.title': string;
  'testimonials.subtitle': string;

  // Footer
  'footer.product': string;
  'footer.support': string;
  'footer.company': string;
  'footer.legal': string;
  'footer.helpCenter': string;
  'footer.guides': string;
  'footer.faq': string;
  'footer.contact': string;
  'footer.about': string;
  'footer.blog': string;
  'footer.careers': string;
  'footer.press': string;
  'footer.privacy': string;
  'footer.terms': string;
  'footer.cookies': string;
  'footer.gdpr': string;
  'footer.newsletter': string;
  'footer.newsletterDesc': string;
  'footer.emailPlaceholder': string;
  'footer.subscribe': string;
  'footer.copyright': string;
  'footer.description': string;

  // Common
  'common.loading': string;
  'common.error': string;
  'common.success': string;
  'common.cancel': string;
  'common.save': string;
  'common.close': string;
  'common.back': string;
  'common.next': string;
  'common.previous': string;
  'common.continue': string;
  'common.finish': string;

  // Demo Modal
  'demo.title': string;
  'demo.description': string;
  'demo.uploadStep': string;
  'demo.conversationStep': string;
  'demo.reportStep': string;

  // Upload Step
  'upload.title': string;
  'upload.description': string;
  'upload.clickToUpload': string;
  'upload.onlyPdf': string;
  'upload.professorStudy': string;
  'upload.analyzing': string;
  'upload.analyzed': string;

  // Conversation Step
  'conversation.title': string;
  'conversation.document': string;
  'conversation.recordVoice': string;
  'conversation.professor': string;
  'conversation.student': string;
  'conversation.processing': string;
  'conversation.startRecording': string;
  'conversation.stopRecording': string;
  'conversation.playback': string;
  'conversation.recordingInProgress': string;
  'conversation.stopWhenDone': string;
  'conversation.restart': string;
  'conversation.generateReport': string;

  // Report Step
  'report.title': string;
  'report.description': string;
  'report.newInterrogation': string;
  'report.downloadReport': string;
  'report.completeDemo': string;
}

// Italian translations (default)
export const italianTranslations: TranslationKeys = {
  // Header
  'nav.features': 'Funzionalità',
  'nav.howItWorks': 'Come Funziona',
  'nav.benefits': 'Benefici',
  'nav.testimonials': 'Testimonianze',
  'header.login': 'Accedi',
  'header.tryFree': 'Prova Gratis',

  // Hero Section
  'hero.title': 'Trasforma le tue interrogazioni orali con',
  'hero.subtitle': 'Il primo AI tutor che ti prepara alle interrogazioni con feedback personalizzato',
  'hero.description': 'Carica i tuoi materiali, esercitati con l\'AI e ricevi valutazioni dettagliate. Migliora la tua esposizione orale e supera ogni interrogazione con sicurezza.',
  'hero.tryDemo': 'Prova la Demo',
  'hero.watchVideo': 'Guarda il Video',
  'hero.trustedBy': 'Scelto da oltre 10.000 studenti',

  // Features
  'features.title': 'Tutto quello che ti serve per eccellere',
  'features.subtitle': 'nelle interrogazioni orali',
  'features.description': 'OralMind combina intelligenza artificiale avanzata con metodologie didattiche comprovate per offrirti un\'esperienza di apprendimento personalizzata e efficace.',
  'features.smartAnalysis': 'Analisi Intelligente',
  'features.smartAnalysisDesc': 'Il nostro AI analizza i tuoi materiali e crea domande personalizzate',
  'features.oralPractice': 'Pratica Orale',
  'features.oralPracticeDesc': 'Esercitati con simulazioni realistiche delle interrogazioni',
  'features.detailedFeedback': 'Feedback Dettagliato',
  'features.detailedFeedbackDesc': 'Ricevi valutazioni precise su contenuto, fluidità e sicurezza',
  'features.progressTracking': 'Monitoraggio Progressi',
  'features.progressTrackingDesc': 'Traccia i tuoi miglioramenti nel tempo con statistiche dettagliate',
  'features.contentLibrary': 'Biblioteca Contenuti',
  'features.contentLibraryDesc': 'Accedi a una vasta raccolta di materiali di studio organizzati',
  'features.voiceRecognition': 'Riconoscimento Vocale',
  'features.voiceRecognitionDesc': 'Tecnologia avanzata per analizzare pronuncia e fluidità',

  // How It Works
  'howItWorks.title': 'Come Funziona',
  'howItWorks.subtitle': 'Tre semplici passaggi per migliorare le tue interrogazioni',
  'howItWorks.step1': 'Carica i Materiali',
  'howItWorks.step1Desc': 'Carica PDF, documenti o inserisci il testo da studiare',
  'howItWorks.step2': 'Pratica con l\'AI',
  'howItWorks.step2Desc': 'L\'AI ti farà domande personalizzate sul contenuto',
  'howItWorks.step3': 'Ricevi Feedback',
  'howItWorks.step3Desc': 'Ottieni valutazioni dettagliate e suggerimenti per migliorare',

  // Benefits
  'benefits.title': 'Perché Scegliere OralMind',
  'benefits.subtitle': 'I vantaggi che fanno la differenza',
  'benefits.confidence': 'Maggiore Sicurezza',
  'benefits.confidenceDesc': 'Supera l\'ansia da interrogazione con pratica costante',
  'benefits.timeEfficient': 'Risparmio di Tempo',
  'benefits.timeEfficientDesc': 'Studia in modo più efficace con feedback immediato',
  'benefits.personalized': 'Apprendimento Personalizzato',
  'benefits.personalizedDesc': 'Contenuti adattati al tuo livello e stile di apprendimento',

  // Testimonials
  'testimonials.title': 'Cosa Dicono i Nostri Studenti',
  'testimonials.subtitle': 'Storie di successo reali',

  // Footer
  'footer.product': 'Prodotto',
  'footer.support': 'Supporto',
  'footer.company': 'Azienda',
  'footer.legal': 'Legale',
  'footer.helpCenter': 'Centro Assistenza',
  'footer.guides': 'Guide e Tutorial',
  'footer.faq': 'FAQ',
  'footer.contact': 'Contattaci',
  'footer.about': 'Chi Siamo',
  'footer.blog': 'Blog',
  'footer.careers': 'Carriere',
  'footer.press': 'Stampa',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Termini di Servizio',
  'footer.cookies': 'Cookie Policy',
  'footer.gdpr': 'GDPR',
  'footer.newsletter': 'Resta Aggiornato',
  'footer.newsletterDesc': 'Iscriviti alla nostra newsletter per ricevere aggiornamenti sulle nuove funzionalità e consigli per migliorare il tuo apprendimento.',
  'footer.emailPlaceholder': 'La tua email',
  'footer.subscribe': 'Iscriviti',
  'footer.copyright': '© 2024 OralMind. Tutti i diritti riservati.',
  'footer.description': 'L\'intelligenza artificiale che rivoluziona l\'apprendimento orale. Preparati alle interrogazioni con sicurezza e migliora le tue capacità espositive.',

  // Common
  'common.loading': 'Caricamento...',
  'common.error': 'Errore',
  'common.success': 'Successo',
  'common.cancel': 'Annulla',
  'common.save': 'Salva',
  'common.close': 'Chiudi',
  'common.back': 'Indietro',
  'common.next': 'Avanti',
  'common.previous': 'Precedente',
  'common.continue': 'Continua',
  'common.finish': 'Termina',

  // Demo Modal
  'demo.title': 'Prova OralMind Gratis',
  'demo.description': 'Scopri come funziona con una demo interattiva',
  'demo.uploadStep': 'Carica Documento',
  'demo.conversationStep': 'Conversazione AI',
  'demo.reportStep': 'Report Valutazione',

  // Upload Step
  'upload.title': 'Carica il tuo documento',
  'upload.description': 'Il professore virtuale studierà il contenuto per interrogarti',
  'upload.clickToUpload': 'Clicca per caricare o trascina qui',
  'upload.onlyPdf': 'Solo file PDF (max 10MB)',
  'upload.professorStudy': 'Il professore sta studiando il tuo documento...',
  'upload.analyzing': 'Analizzando...',
  'upload.analyzed': 'Documento analizzato! Procedi alla conversazione.',

  // Conversation Step
  'conversation.title': 'Conversazione con il Professore',
  'conversation.document': 'Documento',
  'conversation.recordVoice': 'Registra la tua voce per rispondere',
  'conversation.professor': 'Professore',
  'conversation.student': 'Tu',
  'conversation.processing': 'Elaborando la tua risposta...',
  'conversation.startRecording': 'Inizia Registrazione',
  'conversation.stopRecording': 'Ferma Registrazione',
  'conversation.playback': 'Riascolta',
  'conversation.recordingInProgress': 'Registrazione in corso...',
  'conversation.stopWhenDone': 'Premi quando hai finito',
  'conversation.restart': 'Ricomincia Demo',
  'conversation.generateReport': 'Genera Report',

  // Report Step
  'report.title': 'Report di Valutazione',
  'report.description': 'Ecco il tuo feedback personalizzato',
  'report.newInterrogation': 'Nuova Interrogazione',
  'report.downloadReport': 'Scarica Report',
  'report.completeDemo': 'Completa Demo',
};

// English translations
export const englishTranslations: TranslationKeys = {
  // Header
  'nav.features': 'Features',
  'nav.howItWorks': 'How It Works',
  'nav.benefits': 'Benefits',
  'nav.testimonials': 'Testimonials',
  'header.login': 'Login',
  'header.tryFree': 'Try Free',

  // Hero Section
  'hero.title': 'Transform your oral exams with',
  'hero.subtitle': 'The first AI tutor that prepares you for oral exams with personalized feedback',
  'hero.description': 'Upload your materials, practice with AI and receive detailed evaluations. Improve your oral presentation and pass every exam with confidence.',
  'hero.tryDemo': 'Try Demo',
  'hero.watchVideo': 'Watch Video',
  'hero.trustedBy': 'Trusted by over 10,000 students',

  // Features
  'features.title': 'Everything you need to excel',
  'features.subtitle': 'in oral examinations',
  'features.description': 'OralMind combines advanced artificial intelligence with proven teaching methodologies to offer you a personalized and effective learning experience.',
  'features.smartAnalysis': 'Smart Analysis',
  'features.smartAnalysisDesc': 'Our AI analyzes your materials and creates personalized questions',
  'features.oralPractice': 'Oral Practice',
  'features.oralPracticeDesc': 'Practice with realistic exam simulations',
  'features.detailedFeedback': 'Detailed Feedback',
  'features.detailedFeedbackDesc': 'Receive precise evaluations on content, fluency and confidence',
  'features.progressTracking': 'Progress Tracking',
  'features.progressTrackingDesc': 'Track your improvements over time with detailed statistics',
  'features.contentLibrary': 'Content Library',
  'features.contentLibraryDesc': 'Access a vast collection of organized study materials',
  'features.voiceRecognition': 'Voice Recognition',
  'features.voiceRecognitionDesc': 'Advanced technology to analyze pronunciation and fluency',

  // How It Works
  'howItWorks.title': 'How It Works',
  'howItWorks.subtitle': 'Three simple steps to improve your oral exams',
  'howItWorks.step1': 'Upload Materials',
  'howItWorks.step1Desc': 'Upload PDFs, documents or enter text to study',
  'howItWorks.step2': 'Practice with AI',
  'howItWorks.step2Desc': 'AI will ask you personalized questions about the content',
  'howItWorks.step3': 'Receive Feedback',
  'howItWorks.step3Desc': 'Get detailed evaluations and suggestions for improvement',

  // Benefits
  'benefits.title': 'Why Choose OralMind',
  'benefits.subtitle': 'The advantages that make the difference',
  'benefits.confidence': 'Greater Confidence',
  'benefits.confidenceDesc': 'Overcome exam anxiety with constant practice',
  'benefits.timeEfficient': 'Time Saving',
  'benefits.timeEfficientDesc': 'Study more effectively with immediate feedback',
  'benefits.personalized': 'Personalized Learning',
  'benefits.personalizedDesc': 'Content adapted to your level and learning style',

  // Testimonials
  'testimonials.title': 'What Our Students Say',
  'testimonials.subtitle': 'Real success stories',

  // Footer
  'footer.product': 'Product',
  'footer.support': 'Support',
  'footer.company': 'Company',
  'footer.legal': 'Legal',
  'footer.helpCenter': 'Help Center',
  'footer.guides': 'Guides & Tutorials',
  'footer.faq': 'FAQ',
  'footer.contact': 'Contact Us',
  'footer.about': 'About Us',
  'footer.blog': 'Blog',
  'footer.careers': 'Careers',
  'footer.press': 'Press',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.cookies': 'Cookie Policy',
  'footer.gdpr': 'GDPR',
  'footer.newsletter': 'Stay Updated',
  'footer.newsletterDesc': 'Subscribe to our newsletter to receive updates on new features and tips to improve your learning.',
  'footer.emailPlaceholder': 'Your email',
  'footer.subscribe': 'Subscribe',
  'footer.copyright': '© 2024 OralMind. All rights reserved.',
  'footer.description': 'The artificial intelligence that revolutionizes oral learning. Prepare for exams with confidence and improve your presentation skills.',

  // Common
  'common.loading': 'Loading...',
  'common.error': 'Error',
  'common.success': 'Success',
  'common.cancel': 'Cancel',
  'common.save': 'Save',
  'common.close': 'Close',
  'common.back': 'Back',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.continue': 'Continue',
  'common.finish': 'Finish',

  // Demo Modal
  'demo.title': 'Try OralMind Free',
  'demo.description': 'Discover how it works with an interactive demo',
  'demo.uploadStep': 'Upload Document',
  'demo.conversationStep': 'AI Conversation',
  'demo.reportStep': 'Evaluation Report',

  // Upload Step
  'upload.title': 'Upload your document',
  'upload.description': 'The virtual professor will study the content to examine you',
  'upload.clickToUpload': 'Click to upload or drag here',
  'upload.onlyPdf': 'Only PDF files (max 10MB)',
  'upload.professorStudy': 'The professor is studying your document...',
  'upload.analyzing': 'Analyzing...',
  'upload.analyzed': 'Document analyzed! Proceed to conversation.',

  // Conversation Step
  'conversation.title': 'Conversation with the Professor',
  'conversation.document': 'Document',
  'conversation.recordVoice': 'Record your voice to respond',
  'conversation.professor': 'Professor',
  'conversation.student': 'You',
  'conversation.processing': 'Processing your response...',
  'conversation.startRecording': 'Start Recording',
  'conversation.stopRecording': 'Stop Recording',
  'conversation.playback': 'Playback',
  'conversation.recordingInProgress': 'Recording in progress...',
  'conversation.stopWhenDone': 'Press when done',
  'conversation.restart': 'Restart Demo',
  'conversation.generateReport': 'Generate Report',

  // Report Step
  'report.title': 'Evaluation Report',
  'report.description': 'Here is your personalized feedback',
  'report.newInterrogation': 'New Interrogation',
  'report.downloadReport': 'Download Report',
  'report.completeDemo': 'Complete Demo',
};

export const translations: Record<Language, TranslationKeys> = {
  it: italianTranslations,
  en: englishTranslations,
};


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
  'hero.badge': string;
  'hero.title': string;
  'hero.subtitle': string;
  'hero.description': string;
  'hero.tryDemo': string;
  'hero.watchVideo': string;
  'hero.trustedBy': string;
  'hero.professorDemo': string;
  'hero.professorDemoDesc': string;
  'hero.stat1': string;
  'hero.stat2': string;
  'hero.stat3': string;

  // Features
  'features.title': string;
  'features.subtitle': string;
  'features.description': string;
  'features.badge': string;
  'features.cta': string;
  'features.uploadTitle': string;
  'features.uploadDesc': string;
  'features.simulationTitle': string;
  'features.simulationDesc': string;
  'features.aiTitle': string;
  'features.aiDesc': string;
  'features.feedbackTitle': string;
  'features.feedbackDesc': string;
  'features.personalizedTitle': string;
  'features.personalizedDesc': string;
  'features.voiceTitle': string;
  'features.voiceDesc': string;

  // How It Works
  'howItWorks.title': string;
  'howItWorks.subtitle': string;
  'howItWorks.step1Title': string;
  'howItWorks.step1Desc': string;
  'howItWorks.step2Title': string;
  'howItWorks.step2Desc': string;
  'howItWorks.step3Title': string;
  'howItWorks.step3Desc': string;
  'howItWorks.step4Title': string;
  'howItWorks.step4Desc': string;
  'howItWorks.analyzing': string;
  'howItWorks.question': string;
  'howItWorks.responding': string;
  'howItWorks.excellent': string;
  'howItWorks.clarity': string;
  'howItWorks.suggestion': string;

  // Benefits
  'benefits.title': string;
  'benefits.subtitle': string;
  'benefits.studentsTitle': string;
  'benefits.studentsItem1': string;
  'benefits.studentsItem2': string;
  'benefits.studentsItem3': string;
  'benefits.studentsItem4': string;
  'benefits.teachersTitle': string;
  'benefits.teachersItem1': string;
  'benefits.teachersItem2': string;
  'benefits.teachersItem3': string;
  'benefits.teachersItem4': string;
  'benefits.efficiencyTitle': string;
  'benefits.efficiencyItem1': string;
  'benefits.efficiencyItem2': string;
  'benefits.efficiencyItem3': string;
  'benefits.efficiencyItem4': string;
  'benefits.precisionTitle': string;
  'benefits.precisionItem1': string;
  'benefits.precisionItem2': string;
  'benefits.precisionItem3': string;
  'benefits.precisionItem4': string;
  'benefits.achievementsTitle': string;
  'benefits.achievementsSubtitle': string;
  'benefits.achievement1': string;
  'benefits.achievement2': string;
  'benefits.achievement3': string;
  'benefits.achievement4': string;

  // Testimonials
  'testimonials.title': string;
  'testimonials.subtitle': string;
  'testimonials.student1Name': string;
  'testimonials.student1Role': string;
  'testimonials.student1Content': string;
  'testimonials.student1Subject': string;
  'testimonials.teacher1Name': string;
  'testimonials.teacher1Role': string;
  'testimonials.teacher1Content': string;
  'testimonials.teacher1Subject': string;
  'testimonials.student2Name': string;
  'testimonials.student2Role': string;
  'testimonials.student2Content': string;
  'testimonials.student2Subject': string;
  'testimonials.student3Name': string;
  'testimonials.student3Role': string;
  'testimonials.student3Content': string;
  'testimonials.student3Subject': string;

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

  // Demo Modal Full
  'demoModal.step1Title': string;
  'demoModal.step1Subtitle': string;
  'demoModal.step2Title': string;
  'demoModal.step2Subtitle': string;
  'demoModal.step3Title': string;
  'demoModal.step3Subtitle': string;
  'demoModal.step4Title': string;
  'demoModal.step4Subtitle': string;
  'demoModal.dragDrop': string;
  'demoModal.fileAnalyzed': string;
  'demoModal.conceptsIdentified': string;
  'demoModal.professorModes': string;
  'demoModal.professorSevere': string;
  'demoModal.professorSevereDesc': string;
  'demoModal.professorUnderstanding': string;
  'demoModal.professorUnderstandingDesc': string;
  'demoModal.professorTechnical': string;
  'demoModal.professorTechnicalDesc': string;
  'demoModal.advancedPersonalization': string;
  'demoModal.levelAdaptation': string;
  'demoModal.progressiveQuestions': string;
  'demoModal.personalizedFeedback': string;
  'demoModal.conversationSimulation': string;
  'demoModal.pause': string;
  'demoModal.play': string;
  'demoModal.aiPrepared': string;
  'demoModal.voiceTranscription': string;
  'demoModal.recording': string;
  'demoModal.clickToRespond': string;
  'demoModal.supports30Languages': string;
  'demoModal.evaluationTitle': string;
  'demoModal.clarity': string;
  'demoModal.precision': string;
  'demoModal.completeness': string;
  'demoModal.fluency': string;
  'demoModal.personalizedSuggestions': string;
  'demoModal.excellentExamples': string;
  'demoModal.betterConnections': string;
  'demoModal.deepenEconomic': string;
  'demoModal.advancedFeatures': string;
  'demoModal.groupExams': string;
  'demoModal.aiDebates': string;
  'demoModal.progressTracking': string;
  'demoModal.exportableReports': string;
  'demoModal.multiPlatform': string;
  'demoModal.studyAnywhere': string;
  'demoModal.webApp': string;
  'demoModal.mobileApps': string;
  'demoModal.cloudSync': string;
  'demoModal.autoBackup': string;

  // Virtual Professor Demo
  'virtualProfessor.title': string;
  'virtualProfessor.poweredBy': string;
  'virtualProfessor.coachTitle': string;
  'virtualProfessor.evaluatingExplanations': string;
  'virtualProfessor.referenceSections': string;
  'virtualProfessor.switchDocument': string;
  'virtualProfessor.coachActive': string;
  'virtualProfessor.evaluationReady': string;
  'virtualProfessor.accuracyCheck': string;
  'virtualProfessor.presentationSkills': string;
  'virtualProfessor.constructiveFeedback': string;
  'virtualProfessor.coachReady': string;
  'virtualProfessor.switchDocumentsAnytime': string;
  'virtualProfessor.coachEvaluating': string;
  'virtualProfessor.practiceOralExplanation': string;
  'virtualProfessor.speakInAnyLanguage': string;
  'virtualProfessor.voiceNotSupported': string;
  'virtualProfessor.multiLanguageSupport': string;
  'virtualProfessor.currentLanguage': string;
  'virtualProfessor.autoDetect': string;
  'virtualProfessor.aiWillRespond': string;
  'virtualProfessor.supportedLanguages': string;
  'virtualProfessor.browserSpeech': string;
  'virtualProfessor.audioRecording': string;
  'virtualProfessor.serverTranscription': string;
  'virtualProfessor.device': string;
  'virtualProfessor.mobile': string;
  'virtualProfessor.desktop': string;
  'virtualProfessor.activeMode': string;
  'virtualProfessor.realtimeRecognition': string;
  'virtualProfessor.serverBasedTranscription': string;
  'virtualProfessor.unavailable': string;
  'virtualProfessor.startOralPractice': string;
  'virtualProfessor.stopExplanation': string;
  'virtualProfessor.recordingExplanation': string;
  'virtualProfessor.speakNaturally': string;
  'virtualProfessor.yourOralExplanation': string;
  'virtualProfessor.gettingFeedback': string;
  'virtualProfessor.submitForAnalysis': string;
  'virtualProfessor.typeExplanation': string;
  'virtualProfessor.typeAlternatively': string;
  'virtualProfessor.typeAsIfSpeaking': string;
  'virtualProfessor.getCoachingFeedback': string;
  'virtualProfessor.analyzing': string;
  'virtualProfessor.practiceExplanations': string;
  'virtualProfessor.explainElectricCharge': string;
  'virtualProfessor.describeCoulombsLaw': string;
  'virtualProfessor.presentElectricFields': string;
  'virtualProfessor.explainElectromagneticInduction': string;
  'virtualProfessor.oralPresentationCoach': string;
  'virtualProfessor.noSpecificInfo': string;
  'virtualProfessor.possibleReasons': string;
  'virtualProfessor.topicNotCovered': string;
  'virtualProfessor.terminologyDiffers': string;
  'virtualProfessor.questionTooGeneral': string;
  'virtualProfessor.suggestions': string;
  'virtualProfessor.trySpecificKeywords': string;
  'virtualProfessor.useDocumentTerminology': string;
  'virtualProfessor.askDetailedQuestion': string;
  'virtualProfessor.canHelpExplore': string;
  'virtualProfessor.responseSource': string;
  'virtualProfessor.newDocumentContext': string;
  'virtualProfessor.document': string;
  'virtualProfessor.switchedToNewDocument': string;
  'virtualProfessor.askAnything': string;
  'virtualProfessor.comprehensiveAnalysis': string;
  'virtualProfessor.documentReferences': string;
  'virtualProfessor.relatedConcepts': string;
  'virtualProfessor.followUpSuggestions': string;
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
  'hero.badge': 'Rivoluziona il tuo metodo di studio',
  'hero.title': 'Trasforma le tue interrogazioni orali con',
  'hero.subtitle': 'Il primo AI tutor che ti prepara alle interrogazioni con feedback personalizzato',
  'hero.description': 'Carica i tuoi materiali, esercitati con l\'AI e ricevi valutazioni dettagliate. Migliora la tua esposizione orale e supera ogni interrogazione con sicurezza.',
  'hero.tryDemo': 'Prova la Demo',
  'hero.watchVideo': 'Guarda il Video',
  'hero.trustedBy': 'Scelto da oltre 10.000 studenti',
  'hero.professorDemo': 'Metti alla prova il Professore',
  'hero.professorDemoDesc': '🎓 Carica un PDF e interroga il Professore Virtuale con tecnologia RAG',
  'hero.stat1': 'Studenti Soddisfatti',
  'hero.stat2': 'Miglioramento Orale',
  'hero.stat3': 'Sempre Disponibile',

  // Features
  'features.title': 'Funzionalità',
  'features.subtitle': 'Rivoluzionarie',
  'features.description': 'OralFlow combina intelligenza artificiale avanzata e metodologie didattiche innovative per offrirti un\'esperienza di apprendimento unica e personalizzata.',
  'features.badge': 'Tecnologia all\'avanguardia',
  'features.cta': 'Scopri Tutte le Funzionalità',
  'features.uploadTitle': 'Carica i Tuoi Materiali',
  'features.uploadDesc': 'Carica PDF, slide e appunti. OralFlow impara solo dai tuoi documenti, garantendo risposte personalizzate e attinenti al programma.',
  'features.simulationTitle': 'Interrogazioni Simulate',
  'features.simulationDesc': 'Parla con l\'AI come se fossi in classe. Ricevi domande mirate e feedback immediato sulla tua esposizione orale.',
  'features.aiTitle': 'AI Educativa Avanzata',
  'features.aiDesc': 'Tecnologia all\'avanguardia che simula l\'approccio di un professore esperto, con tono incoraggiante e formativo.',
  'features.feedbackTitle': 'Feedback Dettagliato',
  'features.feedbackDesc': 'Analisi di fluidità, correttezza terminologica e chiarezza espositiva con consigli personalizzati per migliorare.',
  'features.personalizedTitle': 'Base Dati Personalizzata',
  'features.personalizedDesc': 'Nessuna informazione da internet: solo i tuoi materiali come fonte di conoscenza per una preparazione mirata.',
  'features.voiceTitle': 'Riconoscimento Vocale',
  'features.voiceDesc': 'Tecnologia speech-to-text avanzata per comprendere al meglio la tua esposizione e fornire correzioni precise.',

  // How It Works
  'howItWorks.title': 'Come Funziona',
  'howItWorks.subtitle': 'Quattro semplici passaggi per trasformare il tuo metodo di studio e migliorare notevolmente le tue performance nelle interrogazioni orali.',
  'howItWorks.step1Title': '1. Carica i Materiali',
  'howItWorks.step1Desc': 'Carica i tuoi PDF, slide o appunti. OralFlow analizza i contenuti e crea la tua base di conoscenza personalizzata.',
  'howItWorks.step2Title': '2. L\'AI Impara',
  'howItWorks.step2Desc': 'Il sistema elabora i tuoi materiali e si prepara a condurti attraverso interrogazioni mirate sui contenuti studiati.',
  'howItWorks.step3Title': '3. Pratica Orale',
  'howItWorks.step3Desc': 'Inizia la conversazione! Rispondi alle domande dell\'AI come se fossi in un\'interrogazione reale con il tuo professore.',
  'howItWorks.step4Title': '4. Migliora Costantemente',
  'howItWorks.step4Desc': 'Ricevi feedback dettagliato e suggerimenti personalizzati per perfezionare la tua tecnica espositiva e la padronanza dei contenuti.',
  'howItWorks.analyzing': 'Analizzando contenuti...',
  'howItWorks.question': 'Spiegami le cause della Prima Guerra Mondiale',
  'howItWorks.responding': 'Risposta in corso...',
  'howItWorks.excellent': 'Eccellente esposizione!',
  'howItWorks.clarity': 'Chiarezza: 9/10 • Completezza: 8/10',
  'howItWorks.suggestion': 'Suggerimento: Approfondisci il ruolo dell\'Austria-Ungheria',

  // Benefits
   'benefits.title': 'I Benefici di OralFlow',
   'benefits.subtitle': 'Scopri come OralFlow può trasformare l\'esperienza di apprendimento per studenti e insegnanti, creando un ambiente educativo più efficace e coinvolgente.',
  'benefits.studentsTitle': 'Per gli Studenti',
  'benefits.studentsItem1': 'Miglioramento della sicurezza nell\'esposizione orale',
  'benefits.studentsItem2': 'Preparazione mirata basata sui propri materiali',
  'benefits.studentsItem3': 'Feedback immediato e costruttivo',
  'benefits.studentsItem4': 'Disponibilità 24/7 per sessioni di studio',
  'benefits.teachersTitle': 'Per gli Insegnanti',
  'benefits.teachersItem1': 'Supporto nell\'individuazione delle difficoltà degli studenti',
  'benefits.teachersItem2': 'Strumento complementare alla didattica tradizionale',
  'benefits.teachersItem3': 'Monitoraggio dei progressi nel tempo',
  'benefits.teachersItem4': 'Riduzione del carico di lavoro per le verifiche orali',
  'benefits.efficiencyTitle': 'Efficienza Temporale',
  'benefits.efficiencyItem1': 'Studio più efficace e mirato',
  'benefits.efficiencyItem2': 'Sessioni personalizzate di durata variabile',
  'benefits.efficiencyItem3': 'Riduzione del tempo necessario per la preparazione',
  'benefits.efficiencyItem4': 'Ottimizzazione delle sessioni di ripasso',
  'benefits.precisionTitle': 'Precisione e Personalizzazione',
  'benefits.precisionItem1': 'Utilizzo esclusivo dei propri materiali di studio',
  'benefits.precisionItem2': 'Adattamento al livello e al ritmo individuale',
  'benefits.precisionItem3': 'Focus su aree specifiche di miglioramento',
  'benefits.precisionItem4': 'Approccio pedagogico scientificamente validato',
  'benefits.achievementsTitle': 'Risultati Straordinari',
  'benefits.achievementsSubtitle': 'I dati parlano chiaro: OralFlow sta rivoluzionando il modo in cui gli studenti si preparano alle interrogazioni orali.',
  'benefits.achievement1': 'Più Efficace dello Studio Tradizionale',
  'benefits.achievement2': 'Miglioramento nelle Valutazioni',
  'benefits.achievement3': 'Risparmio Medio di Studio Settimanale',
  'benefits.achievement4': 'Studenti Già Soddisfatti',

  // Testimonials
   'testimonials.title': 'Cosa dicono di OralFlow',
   'testimonials.subtitle': 'Scopri come studenti e professori stanno trasformando il loro approccio alle interrogazioni orali con l\'aiuto dell\'intelligenza artificiale di OralFlow',
  'testimonials.student1Name': 'Marco Rossi',
  'testimonials.student1Role': 'Studente di Liceo Scientifico',
  'testimonials.student1Content': 'OralFlow ha completamente trasformato il mio approccio alle interrogazioni. Prima ero sempre nervoso, ora mi sento sicuro e preparato. I feedback dell\'AI sono incredibilmente utili!',
  'testimonials.student1Subject': 'Matematica e Fisica',
  'testimonials.teacher1Name': 'Prof.ssa Elena Bianchi',
  'testimonials.teacher1Role': 'Insegnante di Storia',
  'testimonials.teacher1Content': 'Uno strumento rivoluzionario per i miei studenti. Ho notato un miglioramento significativo nella loro capacità espositiva e nella sicurezza durante le interrogazioni orali.',
  'testimonials.teacher1Subject': 'Storia e Filosofia',
  'testimonials.student2Name': 'Giulia Verdi',
  'testimonials.student2Role': 'Studentessa Universitaria',
  'testimonials.student2Content': 'Uso OralFlow per prepararmi agli esami orali universitari. La capacità dell\'AI di adattarsi ai miei materiali specifici è impressionante. Non potrei più farne a meno!',
  'testimonials.student2Subject': 'Giurisprudenza',
  'testimonials.student3Name': 'Alessandro Neri',
  'testimonials.student3Role': 'Studente di Liceo Classico',
  'testimonials.student3Content': 'Finalmente uno strumento che mi aiuta davvero a migliorare nell\'esposizione orale. L\'AI è paziente e i suoi consigli sono sempre pertinenti. Voto aumentato del 30%!',
  'testimonials.student3Subject': 'Latino e Greco',

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
  'footer.copyright': '© 2024 OralFlow. Tutti i diritti riservati.',
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
  'demo.title': 'Prova OralFlow Gratis',
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

  // Demo Modal Full
  'demoModal.step1Title': 'Carica i tuoi materiali',
  'demoModal.step1Subtitle': 'L\'AI analizzerà automaticamente i contenuti per personalizzare l\'esperienza',
  'demoModal.step2Title': 'Configurazione AI Personalizzata',
  'demoModal.step2Subtitle': 'Scegli lo stile di insegnamento più adatto al tuo livello e obiettivi',
  'demoModal.step3Title': 'Simulazione Conversazione',
  'demoModal.step3Subtitle': 'Conversazione interattiva con il Professore',
  'demoModal.step4Title': 'Feedback e Valutazione',
  'demoModal.step4Subtitle': 'Report completo di valutazione dal Professore',
  'demoModal.dragDrop': 'Trascina qui i tuoi PDF o clicca per caricare',
  'demoModal.fileAnalyzed': '✅ File analizzato con successo!',
  'demoModal.conceptsIdentified': 'L\'AI ha identificato 15 concetti chiave del Rinascimento',
  'demoModal.professorModes': 'Modalità Professore AI',
  'demoModal.professorSevere': 'Professore Severo',
  'demoModal.professorSevereDesc': 'Valutazione rigorosa con domande precise e feedback diretto',
  'demoModal.professorUnderstanding': 'Professore Comprensivo',
  'demoModal.professorUnderstandingDesc': 'Approccio paziente con feedback costruttivo e incoraggiante',
  'demoModal.professorTechnical': 'Professore Tecnico',
  'demoModal.professorTechnicalDesc': 'Focus su terminologia specialistica e approccio analitico avanzato',
  'demoModal.advancedPersonalization': '🎯 Personalizzazione AI Avanzata:',
  'demoModal.levelAdaptation': 'Adattamento al livello di studio',
  'demoModal.progressiveQuestions': 'Domande progressive e intelligenti',
  'demoModal.personalizedFeedback': 'Feedback personalizzato dettagliato',
  'demoModal.conversationSimulation': 'Simulazione Conversazione AI',
  'demoModal.pause': 'Pausa',
  'demoModal.play': 'Play',
  'demoModal.aiPrepared': '💡 L\'AI ha preparato questa domanda basandosi sui contenuti del tuo PDF',
  'demoModal.voiceTranscription': 'Trascrizione vocale completata',
  'demoModal.recording': '🔴 Registrazione in corso... L\'AI sta ascoltando',
  'demoModal.clickToRespond': '🎤 Clicca per rispondere vocalmente alla domanda',
  'demoModal.supports30Languages': 'Supporta oltre 30 lingue • Trascrizione in tempo reale • Analisi automatica',
  'demoModal.evaluationTitle': 'Valutazione Dettagliata AI',
  'demoModal.clarity': 'Chiarezza espositiva:',
  'demoModal.precision': 'Correttezza terminologica:',
  'demoModal.completeness': 'Completezza della risposta:',
  'demoModal.fluency': 'Fluidità comunicativa:',
  'demoModal.personalizedSuggestions': '💡 Suggerimenti AI personalizzati:',
  'demoModal.excellentExamples': '• Eccellente uso di esempi concreti',
  'demoModal.betterConnections': '• Potresti collegare meglio i concetti tra loro',
  'demoModal.deepenEconomic': '• Prova ad approfondire le cause economiche',
  'demoModal.advancedFeatures': '👥 Funzionalità Avanzate',
  'demoModal.groupExams': 'Interrogazioni di gruppo',
  'demoModal.aiDebates': 'Dibattiti guidati dall\'AI',
  'demoModal.progressTracking': 'Tracciamento progressi',
  'demoModal.exportableReports': 'Report esportabili',
  'demoModal.multiPlatform': '📱 Accesso Multi-Piattaforma',
  'demoModal.studyAnywhere': 'Studia ovunque con l\'app mobile ottimizzata per sessioni di allenamento vocale anche offline.',
  'demoModal.webApp': '💻 Web App',
  'demoModal.mobileApps': '📱 iOS & Android',
  'demoModal.cloudSync': '☁️ Sync Cloud',
  'demoModal.autoBackup': '🔄 Backup automatico',

  // Virtual Professor Demo
  'virtualProfessor.title': 'Professore AI - Analisi Documenti Avanzata',
  'virtualProfessor.poweredBy': 'Powered by OralFlow AI',
  'virtualProfessor.coachTitle': 'Coach di Presentazione Orale - Feedback Accademico',
  'virtualProfessor.evaluatingExplanations': 'Valutando Spiegazioni',
  'virtualProfessor.referenceSections': 'sezioni di riferimento',
  'virtualProfessor.switchDocument': 'Cambia Documento',
  'virtualProfessor.coachActive': 'Coach Attivo',
  'virtualProfessor.evaluationReady': 'Valutazione pronta',
  'virtualProfessor.accuracyCheck': 'Controllo Accuratezza: Confronta con il contenuto del documento',
  'virtualProfessor.presentationSkills': 'Competenze di Presentazione: Valuta chiarezza e terminologia',
  'virtualProfessor.constructiveFeedback': 'Feedback Costruttivo: Migliora le tue spiegazioni',
  'virtualProfessor.coachReady': 'Il Coach di Presentazione Orale è pronto a valutare le tue spiegazioni e fornire feedback!',
  'virtualProfessor.switchDocumentsAnytime': 'Cambia documenti in qualsiasi momento • Spiega concetti per la valutazione • Ricevi feedback strutturato di coaching',
  'virtualProfessor.coachEvaluating': 'Il coach sta valutando la tua spiegazione...',
  'virtualProfessor.practiceOralExplanation': 'Pratica Spiegazione Orale',
  'virtualProfessor.speakInAnyLanguage': 'Parla in qualsiasi lingua (Italiano, Inglese, Francese, Spagnolo, ecc.). L\'AI rileverà automaticamente la tua lingua e risponderà di conseguenza.',
  'virtualProfessor.voiceNotSupported': 'Riconoscimento vocale non supportato in questo browser',
  'virtualProfessor.multiLanguageSupport': 'Supporto Multi-Lingua Vocale:',
  'virtualProfessor.currentLanguage': 'Lingua Attuale',
  'virtualProfessor.autoDetect': 'Rilevamento automatico',
  'virtualProfessor.aiWillRespond': 'L\'AI risponderà in',
  'virtualProfessor.supportedLanguages': 'Italiano • Inglese • Francese • Spagnolo • Tedesco • Portoghese • Russo • Cinese • Giapponese • Coreano',
  'virtualProfessor.browserSpeech': 'Speech Browser',
  'virtualProfessor.audioRecording': 'Registrazione Audio',
  'virtualProfessor.serverTranscription': 'Trascrizione Server',
  'virtualProfessor.device': 'Dispositivo',
  'virtualProfessor.mobile': 'Mobile',
  'virtualProfessor.desktop': 'Desktop',
  'virtualProfessor.activeMode': 'Modalità Attiva',
  'virtualProfessor.realtimeRecognition': 'Riconoscimento in Tempo Reale',
  'virtualProfessor.serverBasedTranscription': 'Trascrizione Basata su Server',
  'virtualProfessor.unavailable': 'Non Disponibile',
  'virtualProfessor.startOralPractice': 'Inizia Pratica Orale',
  'virtualProfessor.stopExplanation': 'Ferma Spiegazione',
  'virtualProfessor.recordingExplanation': 'Registrando la tua spiegazione...',
  'virtualProfessor.speakNaturally': 'Parla naturalmente nella tua lingua preferita. Il sistema rileverà e processerà automaticamente il tuo discorso, che tu stia parlando in italiano, inglese o qualsiasi altra lingua supportata.',
  'virtualProfessor.yourOralExplanation': 'La Tua Spiegazione Orale:',
  'virtualProfessor.gettingFeedback': 'Ricevendo Feedback...',
  'virtualProfessor.submitForAnalysis': 'Invia per Analisi',
  'virtualProfessor.typeExplanation': 'Scrivi la tua spiegazione',
  'virtualProfessor.typeAlternatively': 'In alternativa, scrivi la tua spiegazione come se la stessi dicendo ad alta voce',
  'virtualProfessor.typeAsIfSpeaking': 'Scrivi la tua spiegazione come se stessi parlando a un pubblico...',
  'virtualProfessor.getCoachingFeedback': 'Ricevi Feedback di Coaching',
  'virtualProfessor.analyzing': 'Analizzando...',
  'virtualProfessor.practiceExplanations': 'Spiegazioni di pratica da provare:',
  'virtualProfessor.explainElectricCharge': 'Spiega la carica elettrica e il movimento degli elettroni come se stessi insegnando a un gruppo di studio',
  'virtualProfessor.describeCoulombsLaw': 'Descrivi la Legge di Coulomb e le sue applicazioni come se stessi presentando a un professore',
  'virtualProfessor.presentElectricFields': 'Presenta il concetto di campi elettrici come se stessi dando una risposta d\'esame orale',
  'virtualProfessor.explainElectromagneticInduction': 'Spiega l\'induzione elettromagnetica come se stessi insegnando una sessione di laboratorio',
  'virtualProfessor.oralPresentationCoach': 'Coach di Presentazione Orale: Valuta le tue spiegazioni contro il contenuto del documento e gli standard accademici. Fornisce feedback strutturato per migliorare le tue competenze di comunicazione accademica.',
  'virtualProfessor.noSpecificInfo': 'Non sono riuscito a trovare informazioni specifiche nel documento per rispondere a questa domanda.',
  'virtualProfessor.possibleReasons': 'Possibili motivi:',
  'virtualProfessor.topicNotCovered': 'L\'argomento non è coperto nel PDF caricato',
  'virtualProfessor.terminologyDiffers': 'La terminologia utilizzata differisce da quella presente nel documento',
  'virtualProfessor.questionTooGeneral': 'La domanda è troppo generale',
  'virtualProfessor.suggestions': 'Suggerimenti:',
  'virtualProfessor.trySpecificKeywords': 'Prova con parole chiave più specifiche',
  'virtualProfessor.useDocumentTerminology': 'Usa la terminologia presente nel documento',
  'virtualProfessor.askDetailedQuestion': 'Fai una domanda più dettagliata',
  'virtualProfessor.canHelpExplore': 'Posso aiutarti a esplorare i contenuti del documento se mi dai indicazioni più precise!',
  'virtualProfessor.responseSource': 'Fonte della Risposta:',
  'virtualProfessor.newDocumentContext': 'Nuovo Contesto Documento Caricato',
  'virtualProfessor.document': 'Documento:',
  'virtualProfessor.switchedToNewDocument': 'Sono passato all\'analisi di questo nuovo documento. Tutto il contesto precedente è stato cancellato, e ora sono pronto a esplorare questo nuovo materiale accademico con te.',
  'virtualProfessor.askAnything': 'Chiedimi qualsiasi cosa sul contenuto, e fornirò risposte accademiche strutturate con:',
  'virtualProfessor.comprehensiveAnalysis': 'Analisi completa',
  'virtualProfessor.documentReferences': 'Riferimenti al documento',
  'virtualProfessor.relatedConcepts': 'Concetti correlati',
  'virtualProfessor.followUpSuggestions': 'Suggerimenti di approfondimento'
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
  'hero.badge': 'Revolutionize your study method',
  'hero.title': 'Transform your oral exams with',
  'hero.subtitle': 'The first AI tutor that prepares you for oral exams with personalized feedback',
  'hero.description': 'Upload your materials, practice with AI and receive detailed evaluations. Improve your oral presentation and pass every exam with confidence.',
  'hero.tryDemo': 'Try Demo',
  'hero.watchVideo': 'Watch Video',
  'hero.trustedBy': 'Trusted by over 10,000 students',
  'hero.professorDemo': 'Challenge the Professor',
  'hero.professorDemoDesc': '🎓 Upload a PDF and examine the Virtual Professor with RAG technology',
  'hero.stat1': 'Satisfied Students',
  'hero.stat2': 'Oral Improvement',
  'hero.stat3': 'Always Available',

  // Features
  'features.title': 'Features',
  'features.subtitle': 'Revolutionary',
  'features.description': 'OralFlow combines advanced artificial intelligence and innovative teaching methodologies to offer you a unique and personalized learning experience.',
  'features.badge': 'Cutting-edge technology',
  'features.cta': 'Discover All Features',
  'features.uploadTitle': 'Upload Your Materials',
  'features.uploadDesc': 'Upload PDFs, slides and notes. OralFlow learns only from your documents, ensuring personalized and relevant responses to the program.',
  'features.simulationTitle': 'Simulated Examinations',
  'features.simulationDesc': 'Talk to AI as if you were in class. Receive targeted questions and immediate feedback on your oral presentation.',
  'features.aiTitle': 'Advanced Educational AI',
  'features.aiDesc': 'Cutting-edge technology that simulates the approach of an expert professor, with an encouraging and formative tone.',
  'features.feedbackTitle': 'Detailed Feedback',
  'features.feedbackDesc': 'Analysis of fluency, terminological correctness and expository clarity with personalized advice for improvement.',
  'features.personalizedTitle': 'Personalized Database',
  'features.personalizedDesc': 'No information from the internet: only your materials as a source of knowledge for targeted preparation.',
  'features.voiceTitle': 'Voice Recognition',
  'features.voiceDesc': 'Advanced speech-to-text technology to better understand your presentation and provide precise corrections.',

  // How It Works
  'howItWorks.title': 'How It Works',
  'howItWorks.subtitle': 'Four simple steps to transform your study method and dramatically improve your performance in oral examinations.',
  'howItWorks.step1Title': '1. Upload Materials',
  'howItWorks.step1Desc': 'Upload your PDFs, slides or notes. OralFlow analyzes the content and creates your personalized knowledge base.',
  'howItWorks.step2Title': '2. AI Learns',
  'howItWorks.step2Desc': 'The system processes your materials and prepares to guide you through targeted examinations on the studied content.',
  'howItWorks.step3Title': '3. Oral Practice',
  'howItWorks.step3Desc': 'Start the conversation! Answer the AI\'s questions as if you were in a real examination with your professor.',
  'howItWorks.step4Title': '4. Improve Constantly',
  'howItWorks.step4Desc': 'Receive detailed feedback and personalized suggestions to perfect your presentation technique and content mastery.',
  'howItWorks.analyzing': 'Analyzing content...',
  'howItWorks.question': 'Explain the causes of World War I',
  'howItWorks.responding': 'Response in progress...',
  'howItWorks.excellent': 'Excellent presentation!',
  'howItWorks.clarity': 'Clarity: 9/10 • Completeness: 8/10',
  'howItWorks.suggestion': 'Suggestion: Deepen the role of Austria-Hungary',

  // Benefits
   'benefits.title': 'Benefits of OralFlow',
   'benefits.subtitle': 'Discover how OralFlow can transform the learning experience for students and teachers, creating a more effective and engaging educational environment.',
  'benefits.studentsTitle': 'For Students',
  'benefits.studentsItem1': 'Improvement in oral presentation confidence',
  'benefits.studentsItem2': 'Targeted preparation based on own materials',
  'benefits.studentsItem3': 'Immediate and constructive feedback',
  'benefits.studentsItem4': '24/7 availability for study sessions',
  'benefits.teachersTitle': 'For Teachers',
  'benefits.teachersItem1': 'Support in identifying student difficulties',
  'benefits.teachersItem2': 'Complementary tool to traditional teaching',
  'benefits.teachersItem3': 'Progress monitoring over time',
  'benefits.teachersItem4': 'Reduced workload for oral assessments',
  'benefits.efficiencyTitle': 'Time Efficiency',
  'benefits.efficiencyItem1': 'More effective and targeted study',
  'benefits.efficiencyItem2': 'Personalized sessions of variable duration',
  'benefits.efficiencyItem3': 'Reduced preparation time needed',
  'benefits.efficiencyItem4': 'Optimization of review sessions',
  'benefits.precisionTitle': 'Precision and Personalization',
  'benefits.precisionItem1': 'Exclusive use of own study materials',
  'benefits.precisionItem2': 'Adaptation to individual level and pace',
  'benefits.precisionItem3': 'Focus on specific areas for improvement',
  'benefits.precisionItem4': 'Scientifically validated pedagogical approach',
  'benefits.achievementsTitle': 'Extraordinary Results',
  'benefits.achievementsSubtitle': 'The data speaks clearly: OralFlow is revolutionizing the way students prepare for oral examinations.',
  'benefits.achievement1': 'More Effective than Traditional Study',
  'benefits.achievement2': 'Improvement in Evaluations',
  'benefits.achievement3': 'Average Weekly Study Savings',
  'benefits.achievement4': 'Already Satisfied Students',

  // Testimonials
   'testimonials.title': 'What they say about OralFlow',
   'testimonials.subtitle': 'Discover how students and professors are transforming their approach to oral examinations with the help of OralFlow\'s artificial intelligence',
  'testimonials.student1Name': 'Marco Rossi',
  'testimonials.student1Role': 'High School Science Student',
  'testimonials.student1Content': 'OralFlow has completely transformed my approach to examinations. I used to be always nervous, now I feel confident and prepared. The AI feedback is incredibly helpful!',
  'testimonials.student1Subject': 'Mathematics and Physics',
  'testimonials.teacher1Name': 'Prof. Elena Bianchi',
  'testimonials.teacher1Role': 'History Teacher',
  'testimonials.teacher1Content': 'A revolutionary tool for my students. I have noticed a significant improvement in their presentation skills and confidence during oral examinations.',
  'testimonials.teacher1Subject': 'History and Philosophy',
  'testimonials.student2Name': 'Giulia Verdi',
  'testimonials.student2Role': 'University Student',
  'testimonials.student2Content': 'I use OralFlow to prepare for university oral exams. The AI\'s ability to adapt to my specific materials is impressive. I couldn\'t do without it anymore!',
  'testimonials.student2Subject': 'Law',
  'testimonials.student3Name': 'Alessandro Neri',
  'testimonials.student3Role': 'Classical High School Student',
  'testimonials.student3Content': 'Finally a tool that really helps me improve in oral presentation. The AI is patient and its advice is always relevant. Grade increased by 30%!',
  'testimonials.student3Subject': 'Latin and Greek',

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
  'footer.copyright': '© 2024 OralFlow. All rights reserved.',
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
  'demo.title': 'Try OralFlow Free',
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

  // Demo Modal Full
  'demoModal.step1Title': 'Upload your materials',
  'demoModal.step1Subtitle': 'AI will automatically analyze the content to personalize the experience',
  'demoModal.step2Title': 'Personalized AI Configuration',
  'demoModal.step2Subtitle': 'Choose the teaching style best suited to your level and goals',
  'demoModal.step3Title': 'Conversation Simulation',
  'demoModal.step3Subtitle': 'Interactive conversation with the Professor',
  'demoModal.step4Title': 'Feedback and Evaluation',
  'demoModal.step4Subtitle': 'Complete evaluation report from the Professor',
  'demoModal.dragDrop': 'Drag your PDFs here or click to upload',
  'demoModal.fileAnalyzed': '✅ File analyzed successfully!',
  'demoModal.conceptsIdentified': 'AI has identified 15 key concepts of the Renaissance',
  'demoModal.professorModes': 'AI Professor Modes',
  'demoModal.professorSevere': 'Strict Professor',
  'demoModal.professorSevereDesc': 'Rigorous evaluation with precise questions and direct feedback',
  'demoModal.professorUnderstanding': 'Understanding Professor',
  'demoModal.professorUnderstandingDesc': 'Patient approach with constructive and encouraging feedback',
  'demoModal.professorTechnical': 'Technical Professor',
  'demoModal.professorTechnicalDesc': 'Focus on specialized terminology and advanced analytical approach',
  'demoModal.advancedPersonalization': '🎯 Advanced AI Personalization:',
  'demoModal.levelAdaptation': 'Study level adaptation',
  'demoModal.progressiveQuestions': 'Progressive and intelligent questions',
  'demoModal.personalizedFeedback': 'Detailed personalized feedback',
  'demoModal.conversationSimulation': 'AI Conversation Simulation',
  'demoModal.pause': 'Pause',
  'demoModal.play': 'Play',
  'demoModal.aiPrepared': '💡 AI prepared this question based on your PDF content',
  'demoModal.voiceTranscription': 'Voice transcription completed',
  'demoModal.recording': '🔴 Recording in progress... AI is listening',
  'demoModal.clickToRespond': '🎤 Click to respond vocally to the question',
  'demoModal.supports30Languages': 'Supports over 30 languages • Real-time transcription • Automatic analysis',
  'demoModal.evaluationTitle': 'Detailed AI Evaluation',
  'demoModal.clarity': 'Expository clarity:',
  'demoModal.precision': 'Terminological correctness:',
  'demoModal.completeness': 'Response completeness:',
  'demoModal.fluency': 'Communicative fluency:',
  'demoModal.personalizedSuggestions': '💡 Personalized AI suggestions:',
  'demoModal.excellentExamples': '• Excellent use of concrete examples',
  'demoModal.betterConnections': '• You could better connect concepts together',
  'demoModal.deepenEconomic': '• Try to deepen the economic causes',
  'demoModal.advancedFeatures': '👥 Advanced Features',
  'demoModal.groupExams': 'Group examinations',
  'demoModal.aiDebates': 'AI-guided debates',
  'demoModal.progressTracking': 'Progress tracking',
  'demoModal.exportableReports': 'Exportable reports',
  'demoModal.multiPlatform': '📱 Multi-Platform Access',
  'demoModal.studyAnywhere': 'Study anywhere with the mobile app optimized for voice training sessions even offline.',
  'demoModal.webApp': '💻 Web App',
  'demoModal.mobileApps': '📱 iOS & Android',
  'demoModal.cloudSync': '☁️ Cloud Sync',
  'demoModal.autoBackup': '🔄 Automatic backup',

  // Virtual Professor Demo
  'virtualProfessor.title': 'AI Professor - Enhanced Document Analysis',
  'virtualProfessor.poweredBy': 'Powered by OralFlow AI',
  'virtualProfessor.coachTitle': 'Oral Presentation Coach - Academic Feedback',
  'virtualProfessor.evaluatingExplanations': 'Evaluating Explanations',
  'virtualProfessor.referenceSections': 'reference sections',
  'virtualProfessor.switchDocument': 'Switch Document',
  'virtualProfessor.coachActive': 'Coach Active',
  'virtualProfessor.evaluationReady': 'Evaluation ready',
  'virtualProfessor.accuracyCheck': 'Accuracy Check: Compare against document content',
  'virtualProfessor.presentationSkills': 'Presentation Skills: Evaluate clarity and terminology',
  'virtualProfessor.constructiveFeedback': 'Constructive Feedback: Improve your explanations',
  'virtualProfessor.coachReady': 'Oral Presentation Coach is ready to evaluate your explanations and provide feedback!',
  'virtualProfessor.switchDocumentsAnytime': 'Switch documents anytime • Explain concepts for evaluation • Get structured coaching feedback',
  'virtualProfessor.coachEvaluating': 'Coach is evaluating your explanation...',
  'virtualProfessor.practiceOralExplanation': 'Practice Oral Explanation',
  'virtualProfessor.speakInAnyLanguage': 'Speak in any language (Italian, English, French, Spanish, etc.). The AI will automatically detect your language and respond appropriately.',
  'virtualProfessor.voiceNotSupported': 'Voice recognition not supported in this browser',
  'virtualProfessor.multiLanguageSupport': 'Multi-Language Voice Support:',
  'virtualProfessor.currentLanguage': 'Current Language',
  'virtualProfessor.autoDetect': 'Auto-detect',
  'virtualProfessor.aiWillRespond': 'AI will respond in',
  'virtualProfessor.supportedLanguages': 'Italian • English • French • Spanish • German • Portuguese • Russian • Chinese • Japanese • Korean',
  'virtualProfessor.browserSpeech': 'Browser Speech',
  'virtualProfessor.audioRecording': 'Audio Recording',
  'virtualProfessor.serverTranscription': 'Server Transcription',
  'virtualProfessor.device': 'Device',
  'virtualProfessor.mobile': 'Mobile',
  'virtualProfessor.desktop': 'Desktop',
  'virtualProfessor.activeMode': 'Active Mode',
  'virtualProfessor.realtimeRecognition': 'Real-time Recognition',
  'virtualProfessor.serverBasedTranscription': 'Server-based Transcription',
  'virtualProfessor.unavailable': 'Unavailable',
  'virtualProfessor.startOralPractice': 'Start Oral Practice',
  'virtualProfessor.stopExplanation': 'Stop Explanation',
  'virtualProfessor.recordingExplanation': 'Recording your explanation...',
  'virtualProfessor.speakNaturally': 'Speak naturally in your preferred language. The system will automatically detect and process your speech, whether you\'re speaking Italian, English, or any other supported language.',
  'virtualProfessor.yourOralExplanation': 'Your Oral Explanation:',
  'virtualProfessor.gettingFeedback': 'Getting Feedback...',
  'virtualProfessor.submitForAnalysis': 'Submit for Analysis',
  'virtualProfessor.typeExplanation': 'Type your explanation',
  'virtualProfessor.typeAlternatively': 'Alternatively, write out your explanation as if you were speaking it aloud',
  'virtualProfessor.typeAsIfSpeaking': 'Type your explanation as if speaking to an audience...',
  'virtualProfessor.getCoachingFeedback': 'Get Coaching Feedback',
  'virtualProfessor.analyzing': 'Analyzing...',
  'virtualProfessor.practiceExplanations': 'Practice explanations to try:',
  'virtualProfessor.explainElectricCharge': 'Explain electric charge and electron movement as if teaching it to a study group',
  'virtualProfessor.describeCoulombsLaw': 'Describe Coulomb\'s Law and its applications like you\'re presenting to a professor',
  'virtualProfessor.presentElectricFields': 'Present the concept of electric fields as if giving an oral exam answer',
  'virtualProfessor.explainElectromagneticInduction': 'Explain electromagnetic induction as if you\'re teaching a lab session',
  'virtualProfessor.oralPresentationCoach': 'Oral Presentation Coach: Evaluates your explanations against document content and academic standards. Provides structured feedback to improve your academic communication skills.',
  'virtualProfessor.noSpecificInfo': 'I couldn\'t find specific information in the document to answer this question.',
  'virtualProfessor.possibleReasons': 'Possible reasons:',
  'virtualProfessor.topicNotCovered': 'The topic is not covered in the uploaded PDF',
  'virtualProfessor.terminologyDiffers': 'The terminology used differs from what\'s in the document',
  'virtualProfessor.questionTooGeneral': 'The question is too general',
  'virtualProfessor.suggestions': 'Suggestions:',
  'virtualProfessor.trySpecificKeywords': 'Try with more specific keywords',
  'virtualProfessor.useDocumentTerminology': 'Use terminology present in the document',
  'virtualProfessor.askDetailedQuestion': 'Ask a more detailed question',
  'virtualProfessor.canHelpExplore': 'I can help you explore the document contents if you give me more precise guidance!',
  'virtualProfessor.responseSource': 'Response Source:',
  'virtualProfessor.newDocumentContext': 'New Document Context Loaded',
  'virtualProfessor.document': 'Document:',
  'virtualProfessor.switchedToNewDocument': 'I\'ve switched to analyzing this new document. All previous context has been cleared, and I\'m now ready to explore this new academic material with you.',
  'virtualProfessor.askAnything': 'Ask me anything about the content, and I\'ll provide structured academic responses with:',
  'virtualProfessor.comprehensiveAnalysis': 'Comprehensive analysis',
  'virtualProfessor.documentReferences': 'Document references',
  'virtualProfessor.relatedConcepts': 'Related concepts',
  'virtualProfessor.followUpSuggestions': 'Follow-up suggestions'
};

export const translations: Record<Language, TranslationKeys> = {
  it: italianTranslations,
  en: englishTranslations,
};

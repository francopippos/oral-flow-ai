
export type Language = 'it' | 'en';

export interface TranslationKeys {
  // Header
  'nav.features': string;
  'nav.howItWorks': string;
  'nav.benefits': string;
  'nav.testimonials': string;
  'header.login': string;
  'header.requestAccess': string;

  // Scarcity Counter
  'scarcity.urgentNotice': string;
  'scarcity.spotsLeft': string;
  'scarcity.reservedSpots': string;
  'scarcity.warningMessage': string;

  // Beta CTA
  'betaCTA.exclusiveBadge': string;
  'betaCTA.title': string;
  'betaCTA.description': string;
  'betaCTA.benefit1Title': string;
  'betaCTA.benefit1Desc': string;
  'betaCTA.benefit2Title': string;
  'betaCTA.benefit2Desc': string;
  'betaCTA.benefit3Title': string;
  'betaCTA.benefit3Desc': string;
  'betaCTA.requestAccess': string;
  'betaCTA.watchDemo': string;
  'betaCTA.smallPrint': string;

  // Hero Section
  'hero.exclusiveBadge': string;
  'hero.privateBeta': string;
  'hero.title': string;
  'hero.subtitle': string;
  'hero.description': string;
  'hero.requestAccess': string;
  'hero.watchDemo': string;
  'hero.spotsRemaining': string;
  'hero.inviteOnly': string;
  'hero.earlyAccess': string;
  'hero.firstMover': string;
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
  'demo.unsupportedFormat': string;
  'demo.extractingText': string;
  'demo.pdfError': string;
  'demo.transcriptionError': string;
  'demo.generating': string;
  'demo.generated': string;
  'demo.reportGenerated': string;

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
  'demoModal.googleDrive': string;
  'demoModal.classroom': string;
  'demoModal.documentName': string;
  'demoModal.professorSevereInvitation': string;
  'demoModal.professorSevereFeedback': string;
  'demoModal.professorUnderstandingInvitation': string;
  'demoModal.professorUnderstandingFeedback': string;
  'demoModal.professorTechnicalInvitation': string;
  'demoModal.professorTechnicalFeedback': string;
  'demoModal.studentResponse': string;
  
  // Error messages and alerts
  'error.selectValidPdf': string;
  'error.pdfProcessing': string;
  'error.voiceNotSupported': string;
  'error.noTranscription': string;
  
  // PDF Upload Step
  'pdfUpload.title': string;
  'pdfUpload.subtitle': string;
  'pdfUpload.dragDrop': string;
  'pdfUpload.analyzing': string;
  'pdfUpload.processingStep': string;
  'pdfUpload.completeSupportTitle': string;
  'pdfUpload.educational': string;
  'pdfUpload.scientific': string;
  'pdfUpload.complex': string;
  'pdfUpload.universityMaterials': string;
  'pdfUpload.technicalManuals': string; 
  'pdfUpload.lectureSlides': string;
  'pdfUpload.researchArticles': string;
  'pdfUpload.academicPapers': string;
  'pdfUpload.dissertations': string;
  'pdfUpload.mathematicalFormulas': string;
  'pdfUpload.chartsAndTables': string;
  'pdfUpload.multilingualContent': string;
  'pdfUpload.capacity': string;
  'pdfUpload.upTo100MB': string;
  'pdfUpload.processing': string;
  'pdfUpload.textAndImages': string;
  'pdfUpload.ai': string;
  'pdfUpload.advancedSemantic': string;
  'pdfUpload.pdfExtraction': string;
  'pdfUpload.semanticChunking': string;
  'pdfUpload.aiEmbeddings': string;
  'pdfUpload.bistroRag': string;
  
  // Virtual Professor Modal
  'virtualProfessor.modalTitle': string;
  'virtualProfessor.newDocumentLoaded': string;
  'virtualProfessor.document': string;
  'virtualProfessor.switchedContext': string;
  'virtualProfessor.askQuestions': string;
  'virtualProfessor.comprehensiveAnalysisItem': string;
  'virtualProfessor.documentReferencesItem': string;
  'virtualProfessor.relatedConceptsItem': string;
  'virtualProfessor.followUpSuggestionsItem': string;
  'virtualProfessor.noInfoFound': string;
  'virtualProfessor.possibleReasonsTitle': string;
  'virtualProfessor.topicNotCoveredReason': string;
  'virtualProfessor.terminologyDiffersReason': string;
  'virtualProfessor.questionTooGeneralReason': string;
  'virtualProfessor.suggestionsTitle': string;
  'virtualProfessor.trySpecificKeywordsItem': string;
  'virtualProfessor.useDocumentTerminologyItem': string;
  'virtualProfessor.askDetailedQuestionItem': string;
  'virtualProfessor.canHelpExploreText': string;

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
  'virtualProfessor.switchedToNewDocument': string;
  'virtualProfessor.askAnything': string;
  'virtualProfessor.comprehensiveAnalysis': string;
  'virtualProfessor.documentReferences': string;
  'virtualProfessor.relatedConcepts': string;
  'virtualProfessor.followUpSuggestions': string;

  // Professor Chat Step
  'professorChat.title': string;
  'professorChat.evaluatingExplanations': string;
  'professorChat.referenceSection': string;
  'professorChat.switchDocument': string;
  'professorChat.coachActive': string;
  'professorChat.evaluationReady': string;
  'professorChat.accuracyCheck': string;
  'professorChat.compareAgainstDocument': string;
  'professorChat.presentationSkills': string;
  'professorChat.evaluateClarity': string;
  'professorChat.constructiveFeedback': string;
  'professorChat.improveExplanations': string;
  'professorChat.coachReadyToEvaluate': string;
  'professorChat.switchDocumentsInfo': string;
  'professorChat.coachEvaluatingExplanation': string;
  'professorChat.practiceOralExplanation': string;
  'professorChat.speakAnyLanguage': string;
  'professorChat.voiceNotSupported': string;
  'professorChat.multiLanguageSupport': string;
  'professorChat.activeLanguage': string;
  'professorChat.startOralPractice': string;
  'professorChat.stopExplanation': string;
  'professorChat.recordingExplanation': string;
  'professorChat.speakNaturally': string;
  'professorChat.yourOralExplanation': string;
  'professorChat.gettingFeedback': string;
  'professorChat.submitForAnalysis': string;
  'professorChat.typeExplanation': string;
  'professorChat.typeAlternatively': string;
  'professorChat.typeAsIfSpeaking': string;
  'professorChat.getCoachingFeedback': string;
  'professorChat.analyzing': string;
  'professorChat.practiceExplanationsToTry': string;
  'professorChat.oralPresentationCoachInfo': string;
}

// Italian translations (default)
export const italianTranslations: TranslationKeys = {
  // Header
  'nav.features': 'Funzionalità',
  'nav.howItWorks': 'Come Funziona',
  'nav.benefits': 'Benefici',
  'nav.testimonials': 'Testimonianze',
  'header.login': 'Accedi',
  'header.requestAccess': 'Richiedi Accesso',

  // Scarcity Counter
  'scarcity.urgentNotice': 'Beta Privata - Posti Limitati',
  'scarcity.spotsLeft': 'posti rimanenti',
  'scarcity.reservedSpots': 'Posti riservati nella beta',
  'scarcity.warningMessage': 'I posti si stanno esaurendo rapidamente. Richiedi l\'accesso ora per non perdere questa opportunità esclusiva.',

  // Beta CTA
  'betaCTA.exclusiveBadge': 'Accesso Esclusivo - Solo Su Invito',
  'betaCTA.title': 'Pronto a Rivoluzionare il Tuo Sviluppo Web?',
  'betaCTA.description': 'Unisciti ai pionieri che stanno già trasformando le loro idee in applicazioni web complete con l\'AI più avanzata del settore.',
  'betaCTA.benefit1Title': 'Accesso Prioritario',
  'betaCTA.benefit1Desc': 'Sii tra i primi a utilizzare tutte le funzionalità avanzate',
  'betaCTA.benefit2Title': 'Supporto Diretto',
  'betaCTA.benefit2Desc': 'Assistenza personale del team di sviluppo',
  'betaCTA.benefit3Title': 'Nessun Costo',
  'betaCTA.benefit3Desc': 'Accesso gratuito per tutta la durata della beta',
  'betaCTA.requestAccess': 'Richiedi Accesso Beta',
  'betaCTA.watchDemo': 'Guarda Demo Prima',
  'betaCTA.smallPrint': '⚡ Risposta entro 24 ore • 🔒 Nessun impegno • ✨ Cancellazione libera in qualsiasi momento',

  // Hero Section
  'hero.exclusiveBadge': 'Beta Privata - Solo 30 Posti Disponibili',
  'hero.privateBeta': 'BETA PRIVATA',
  'hero.title': 'L\'AI che trasforma idee in applicazioni web complete',
  'hero.subtitle': 'Lovable è l\'unica piattaforma che ti permette di creare app web professionali parlando semplicemente con l\'AI',
  'hero.description': 'Accesso esclusivo alla tecnologia più avanzata per sviluppatori, designer e imprenditori che vogliono essere i primi a rivoluzionare il modo di creare software.',
  'hero.requestAccess': 'Richiedi Accesso Esclusivo',
  'hero.watchDemo': 'Guarda la Demo',
  'hero.spotsRemaining': 'Solo 7 posti rimasti',
  'hero.inviteOnly': 'Solo su Invito',
  'hero.earlyAccess': 'Accesso Anticipato',
  'hero.firstMover': 'Vantaggio Pioniere',
  'hero.stat1': 'Tempo di Sviluppo Ridotto',
  'hero.stat2': 'Soddisfazione Sviluppatori',
  'hero.stat3': 'App Completate',

  // Features
  'features.title': 'Funzionalità',
  'features.subtitle': 'Rivoluzionarie',
  'features.description': 'OralFlow combina intelligenza artificiale avanzata e metodologie didattiche innovative per offrirti un\'esperienza di apprendimento unica e personalizzata.',
  'features.badge': 'Tecnologia all\'avanguardia',
  'features.cta': 'Scopri Tutte le Funzionalità',
  'features.uploadTitle': 'Carica i Tuoi Materiali',
  'features.uploadDesc': 'Carica PDF, slide e appunti. OralFlow studia i contenuti per prepararsi a valutare le tue spiegazioni sui concetti presenti.',
  'features.simulationTitle': 'Tu Spieghi, l\'AI Valuta',
  'features.simulationDesc': 'Spiega un argomento del documento al professore virtuale. Ricevi correzioni immediate su linguaggio tecnico e contenuto.',
  'features.aiTitle': 'AI Educativa Avanzata',
  'features.aiDesc': 'Professore virtuale che valuta le tue spiegazioni basandosi esclusivamente sul contenuto dei documenti caricati.',
  'features.feedbackTitle': 'Correzione Dettagliata',
  'features.feedbackDesc': 'Analisi di fluidità, correttezza terminologica e chiarezza espositiva con consigli personalizzati per migliorare.',
  'features.personalizedTitle': 'Base Dati Personalizzata',
  'features.personalizedDesc': 'Nessuna informazione da internet: solo i tuoi materiali come fonte di conoscenza per una preparazione mirata.',
  'features.voiceTitle': 'Riconoscimento Vocale',
  'features.voiceDesc': 'Tecnologia speech-to-text avanzata per comprendere al meglio la tua esposizione e fornire correzioni precise.',

  // How It Works
  'howItWorks.title': 'Come Funziona',
  'howItWorks.subtitle': 'Quattro semplici passaggi per trasformare il tuo metodo di studio e migliorare notevolmente le tue performance nelle interrogazioni orali.',
  'howItWorks.step1Title': '1. Carica i Materiali',
  'howItWorks.step1Desc': 'Carica i tuoi PDF, slide o appunti. OralFlow analizza i contenuti per prepararsi a valutare le tue spiegazioni.',
  'howItWorks.step2Title': '2. L\'AI Studia il Documento',
  'howItWorks.step2Desc': 'Il professore virtuale memorizza tutti i concetti e le informazioni per valutare accuratamente le tue spiegazioni.',
  'howItWorks.step3Title': '3. Tu Spieghi, l\'AI Ascolta',
  'howItWorks.step3Desc': 'Spiega un argomento presente nel documento. Il professore AI ti ascolta e valuta la tua comprensione e esposizione.',
  'howItWorks.step4Title': '4. Ricevi Correzioni',
  'howItWorks.step4Desc': 'Ottieni correzioni dettagliate su linguaggio tecnico e contenuto, basate esclusivamente sul documento caricato.',
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
  'demo.title': '🧠 OralFlow - Demo Funzionale',
  'demo.description': 'Scopri come funziona con una demo interattiva',
  'demo.uploadStep': 'Carica Documento',
  'demo.conversationStep': 'Conversazione AI',
  'demo.reportStep': 'Report Valutazione',
  'demo.unsupportedFormat': 'Formato non supportato. Carica solo file PDF.',
  'demo.extractingText': 'Estrazione testo dal PDF...',
  'demo.pdfError': 'Errore nell\'elaborazione del PDF. Riprova con un altro file.',
  'demo.transcriptionError': 'Errore nella trascrizione audio. Riprova.',
  'demo.generating': 'Generazione report OralFlow...',
  'demo.generated': 'Generato da OralFlow',
  'demo.reportGenerated': 'Report generato con successo',

  // Upload Step
  'upload.title': 'Carica il tuo documento',
  'upload.description': 'Il professore virtuale studierà il contenuto per valutare le tue spiegazioni',
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
  'demoModal.step3Title': 'Spiega l\'Argomento',
  'demoModal.step3Subtitle': 'Esponi il tema e ricevi correzioni dal Professore',
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
  'demoModal.conversationSimulation': 'Simulazione Esposizione AI',
  'demoModal.pause': 'Pausa',
  'demoModal.play': 'Play',
  'demoModal.aiPrepared': '💡 L\'AI è pronto ad ascoltare la tua spiegazione basandosi sui contenuti del tuo PDF',
  'demoModal.voiceTranscription': 'Trascrizione vocale completata',
  'demoModal.recording': '🔴 Registrazione in corso... L\'AI sta ascoltando',
  'demoModal.clickToRespond': '🎤 Clicca per spiegare l\'argomento vocalmente',
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
  'demoModal.googleDrive': 'Google Drive',
  'demoModal.classroom': 'Classroom',
  'demoModal.documentName': 'Storia_Rinascimento.pdf',
  'demoModal.professorSevereInvitation': 'Sono pronto ad ascoltare la tua spiegazione sul Rinascimento. Procedi quando vuoi.',
  'demoModal.professorSevereFeedback': 'La tua spiegazione contiene alcune imprecisioni. Il Rinascimento non ha una data di inizio univoca. Devi essere più specifico sui fattori scatenanti.',
  'demoModal.professorUnderstandingInvitation': 'Ti ascolto, racconta quello che sai sul Rinascimento. Prenditi il tempo che ti serve.',
  'demoModal.professorUnderstandingFeedback': 'Molto bene! Hai colto i punti principali. Potresti approfondire il ruolo dell\'umanesimo? Hai usato terminologia appropriata e la tua esposizione è stata chiara e ben strutturata.',
  'demoModal.professorTechnicalInvitation': 'Procedi con la spiegazione dell\'umanesimo quattrocentesco e delle trasformazioni socio-economiche. Ti ascolto.',
  'demoModal.professorTechnicalFeedback': 'Interessante approccio metodologico. Considera anche l\'impatto delle innovazioni tecniche sulla diffusione culturale.',
  'demoModal.studentResponse': 'Il Rinascimento è un movimento culturale che nasce in Italia nel XIV secolo, caratterizzato dalla rinascita dell\'interesse per l\'arte classica, l\'umanesimo e le scienze...',
  
  // Error messages and alerts
  'error.selectValidPdf': 'Per favore seleziona un file PDF valido.',
  'error.pdfProcessing': 'Errore nell\'elaborazione del PDF',
  'error.voiceNotSupported': 'Il riconoscimento vocale non è supportato nel tuo browser. Usa Chrome, Edge o Safari.',
  'error.noTranscription': 'Nessuna trascrizione disponibile. Prova a registrare di nuovo.',
  
  // PDF Upload Step
  'pdfUpload.title': 'Carica il tuo documento accademico',
  'pdfUpload.subtitle': 'Il Professore AI analizzerà in profondità il contenuto per valutare e correggere le tue spiegazioni sui concetti presenti nel documento.',
  'pdfUpload.dragDrop': 'Trascina e rilascia il tuo PDF qui o clicca per selezionare',
  'pdfUpload.analyzing': 'Analizzando il documento...',
  'pdfUpload.processingStep': 'Bistro AI elaborazione in corso...',
  'pdfUpload.completeSupportTitle': '✅ Supporto completo per documenti accademici:',
  'pdfUpload.educational': 'Educativi',
  'pdfUpload.scientific': 'Scientifici',
  'pdfUpload.complex': 'Complessi',
  'pdfUpload.universityMaterials': '• Materiali universitari',
  'pdfUpload.technicalManuals': '• Manuali tecnici', 
  'pdfUpload.lectureSlides': '• Slide delle lezioni',
  'pdfUpload.researchArticles': '• Articoli di ricerca',
  'pdfUpload.academicPapers': '• Paper accademici',
  'pdfUpload.dissertations': '• Tesi di laurea',
  'pdfUpload.mathematicalFormulas': '• Formule matematiche',
  'pdfUpload.chartsAndTables': '• Grafici e tabelle',
  'pdfUpload.multilingualContent': '• Contenuti multilingue',
  'pdfUpload.capacity': 'Capacità',
  'pdfUpload.upTo100MB': 'Fino a 100MB',
  'pdfUpload.processing': 'Elaborazione',
  'pdfUpload.textAndImages': 'Testo + Immagini',
  'pdfUpload.ai': 'AI',
  'pdfUpload.advancedSemantic': 'Comprensione semantica avanzata',
  'pdfUpload.pdfExtraction': 'Estrazione PDF.js',
  'pdfUpload.semanticChunking': 'Segmentazione Semantica',
  'pdfUpload.aiEmbeddings': 'Embedding AI',
  'pdfUpload.bistroRag': 'Bistro AI RAG',
  
  // Virtual Professor Modal
  'virtualProfessor.modalTitle': 'Professore AI - Analisi Documenti Avanzata',
  'virtualProfessor.newDocumentLoaded': 'Nuovo Contesto Documento Caricato',
  'virtualProfessor.document': 'Documento',
  'virtualProfessor.switchedContext': 'Sono passato all\'analisi di questo nuovo documento. Tutto il contesto precedente è stato cancellato, e ora sono pronto a esplorare questo nuovo materiale accademico con te.',
  'virtualProfessor.askQuestions': 'Chiedimi qualsiasi cosa sul contenuto, e fornirò risposte accademiche strutturate con:',
  'virtualProfessor.comprehensiveAnalysisItem': '• Analisi completa',
  'virtualProfessor.documentReferencesItem': '• Riferimenti al documento', 
  'virtualProfessor.relatedConceptsItem': '• Concetti correlati',
  'virtualProfessor.followUpSuggestionsItem': '• Suggerimenti di approfondimento',
  'virtualProfessor.noInfoFound': 'Non sono riuscito a trovare informazioni specifiche nel documento per rispondere a questa domanda.',
  'virtualProfessor.possibleReasonsTitle': 'Possibili motivi:',
  'virtualProfessor.topicNotCoveredReason': '• L\'argomento non è trattato nel PDF caricato',
  'virtualProfessor.terminologyDiffersReason': '• La terminologia usata differisce da quella nel documento',
  'virtualProfessor.questionTooGeneralReason': '• La domanda è troppo generica',
  'virtualProfessor.suggestionsTitle': 'Suggerimenti:',
  'virtualProfessor.trySpecificKeywordsItem': '• Prova con parole chiave più specifiche',
  'virtualProfessor.useDocumentTerminologyItem': '• Usa terminologia presente nel documento',
  'virtualProfessor.askDetailedQuestionItem': '• Fai una domanda più dettagliata',
  'virtualProfessor.canHelpExploreText': 'Posso aiutarti ad esplorare i contenuti del documento se mi dai indicazioni più precise! 📖',

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
  
  'virtualProfessor.switchedToNewDocument': 'Sono passato all\'analisi di questo nuovo documento. Tutto il contesto precedente è stato cancellato, e ora sono pronto a esplorare questo nuovo materiale accademico con te.',
  'virtualProfessor.askAnything': 'Chiedimi qualsiasi cosa sul contenuto, e fornirò risposte accademiche strutturate con:',
  'virtualProfessor.comprehensiveAnalysis': 'Analisi completa',
  'virtualProfessor.documentReferences': 'Riferimenti al documento',
  'virtualProfessor.relatedConcepts': 'Concetti correlati',
  'virtualProfessor.followUpSuggestions': 'Suggerimenti di approfondimento',

  // Professor Chat Step
  'professorChat.title': 'Coach di Presentazione Orale - Feedback Accademico',
  'professorChat.evaluatingExplanations': 'Valutando Spiegazioni',
  'professorChat.referenceSection': 'sezioni di riferimento',
  'professorChat.switchDocument': 'Cambia Documento',
  'professorChat.coachActive': 'Coach Attivo',
  'professorChat.evaluationReady': 'Valutazione pronta',
  'professorChat.accuracyCheck': 'Controllo Accuratezza',
  'professorChat.compareAgainstDocument': 'Confronta con il contenuto del documento',
  'professorChat.presentationSkills': 'Competenze di Presentazione',
  'professorChat.evaluateClarity': 'Valuta chiarezza e terminologia',
  'professorChat.constructiveFeedback': 'Feedback Costruttivo',
  'professorChat.improveExplanations': 'Migliora le tue spiegazioni',
  'professorChat.coachReadyToEvaluate': 'Il Coach di Presentazione Orale è pronto a valutare le tue spiegazioni e fornire feedback!',
  'professorChat.switchDocumentsInfo': 'Cambia documenti in qualsiasi momento • Spiega concetti per la valutazione • Ricevi feedback strutturato di coaching',
  'professorChat.coachEvaluatingExplanation': 'Il coach sta valutando la tua spiegazione...',
  'professorChat.practiceOralExplanation': 'Pratica Spiegazione Orale',
  'professorChat.speakAnyLanguage': 'Parla in qualsiasi lingua - l\'AI rileva automaticamente e risponde appropriatamente',
  'professorChat.voiceNotSupported': 'Riconoscimento vocale non supportato',
  'professorChat.multiLanguageSupport': 'Multi-lingua: 🇮🇹 🇺🇸 🇫🇷 🇪🇸 🇩🇪 🇧🇷 🇷🇺 🇨🇳 🇯🇵 🇰🇷',
  'professorChat.activeLanguage': 'Attivo',
  'professorChat.startOralPractice': 'Inizia Pratica Orale',
  'professorChat.stopExplanation': 'Ferma Spiegazione',
  'professorChat.recordingExplanation': 'Registrando la tua spiegazione...',
  'professorChat.speakNaturally': 'Parla naturalmente nella tua lingua preferita. Il sistema rileverà e processerà automaticamente il tuo discorso, che tu stia parlando in italiano, inglese o qualsiasi altra lingua supportata.',
  'professorChat.yourOralExplanation': 'La Tua Spiegazione Orale:',
  'professorChat.gettingFeedback': 'Ricevendo Feedback...',
  'professorChat.submitForAnalysis': 'Invia per Analisi',
  'professorChat.typeExplanation': 'Scrivi la tua spiegazione',
  'professorChat.typeAlternatively': 'In alternativa, scrivi la tua spiegazione come se la stessi dicendo ad alta voce',
  'professorChat.typeAsIfSpeaking': 'Scrivi la tua spiegazione come se stessi parlando a un pubblico...',
  'professorChat.getCoachingFeedback': 'Ricevi Feedback di Coaching',
  'professorChat.analyzing': 'Analizzando...',
  'professorChat.practiceExplanationsToTry': 'Spiegazioni di pratica da provare:',
  'professorChat.oralPresentationCoachInfo': 'Coach di Presentazione Orale: Valuta le tue spiegazioni contro il contenuto del documento e gli standard accademici. Fornisce feedback strutturato per migliorare le tue competenze di comunicazione accademica.'
};

// English translations
export const englishTranslations: TranslationKeys = {
  // Header
  'nav.features': 'Features',
  'nav.howItWorks': 'How It Works',
  'nav.benefits': 'Benefits',
  'nav.testimonials': 'Testimonials',
  'header.login': 'Login',
  'header.requestAccess': 'Request Access',

  // Scarcity Counter
  'scarcity.urgentNotice': 'Private Beta - Limited Spots',
  'scarcity.spotsLeft': 'spots remaining',
  'scarcity.reservedSpots': 'Beta spots reserved',
  'scarcity.warningMessage': 'Spots are filling up quickly. Request access now to not miss this exclusive opportunity.',

  // Beta CTA
  'betaCTA.exclusiveBadge': 'Exclusive Access - Invite Only',
  'betaCTA.title': 'Ready to Revolutionize Your Web Development?',
  'betaCTA.description': 'Join the pioneers who are already transforming their ideas into complete web applications with the most advanced AI in the industry.',
  'betaCTA.benefit1Title': 'Priority Access',
  'betaCTA.benefit1Desc': 'Be among the first to use all advanced features',
  'betaCTA.benefit2Title': 'Direct Support',
  'betaCTA.benefit2Desc': 'Personal assistance from the development team',
  'betaCTA.benefit3Title': 'No Cost',
  'betaCTA.benefit3Desc': 'Free access for the entire beta duration',
  'betaCTA.requestAccess': 'Request Beta Access',
  'betaCTA.watchDemo': 'Watch Demo First',
  'betaCTA.smallPrint': '⚡ Response within 24 hours • 🔒 No commitment • ✨ Cancel anytime',

  // Hero Section
  'hero.exclusiveBadge': 'Private Beta - Only 30 Spots Available',
  'hero.privateBeta': 'PRIVATE BETA',
  'hero.title': 'The AI that transforms ideas into complete web applications',
  'hero.subtitle': 'Lovable is the only platform that lets you create professional web apps by simply talking to AI',
  'hero.description': 'Exclusive access to the most advanced technology for developers, designers and entrepreneurs who want to be the first to revolutionize how software is created.',
  'hero.requestAccess': 'Request Exclusive Access',
  'hero.watchDemo': 'Watch Demo',
  'hero.spotsRemaining': 'Only 7 spots left',
  'hero.inviteOnly': 'Invite Only',
  'hero.earlyAccess': 'Early Access',
  'hero.firstMover': 'Pioneer Advantage',
  'hero.stat1': 'Development Time Reduced',
  'hero.stat2': 'Developer Satisfaction',
  'hero.stat3': 'Apps Completed',

  // Features
  'features.title': 'Features',
  'features.subtitle': 'Revolutionary',
  'features.description': 'OralFlow combines advanced artificial intelligence and innovative teaching methodologies to offer you a unique and personalized learning experience.',
  'features.badge': 'Cutting-edge technology',
  'features.cta': 'Discover All Features',
  'features.uploadTitle': 'Upload Your Materials',
  'features.uploadDesc': 'Upload PDFs, slides and notes. OralFlow studies the content to prepare for evaluating your explanations of the concepts.',
  'features.simulationTitle': 'You Explain, AI Evaluates',
  'features.simulationDesc': 'Explain a topic from the document to the virtual professor. Receive immediate corrections on technical language and content.',
  'features.aiTitle': 'Advanced Educational AI',
  'features.aiDesc': 'Virtual professor that evaluates your explanations based exclusively on the content of uploaded documents.',
  'features.feedbackTitle': 'Detailed Correction',
  'features.feedbackDesc': 'Analysis of fluency, terminological correctness and expository clarity with personalized advice for improvement.',
  'features.personalizedTitle': 'Personalized Database',
  'features.personalizedDesc': 'No information from the internet: only your materials as a source of knowledge for targeted preparation.',
  'features.voiceTitle': 'Voice Recognition',
  'features.voiceDesc': 'Advanced speech-to-text technology to better understand your presentation and provide precise corrections.',

  // How It Works
  'howItWorks.title': 'How It Works',
  'howItWorks.subtitle': 'Four simple steps to transform your study method and dramatically improve your performance in oral examinations.',
  'howItWorks.step1Title': '1. Upload Materials',
  'howItWorks.step1Desc': 'Upload your PDFs, slides or notes. OralFlow analyzes the content to prepare for evaluating your explanations.',
  'howItWorks.step2Title': '2. AI Studies the Document',
  'howItWorks.step2Desc': 'The virtual professor memorizes all concepts and information to accurately evaluate your explanations.',
  'howItWorks.step3Title': '3. You Explain, AI Listens',
  'howItWorks.step3Desc': 'Explain a topic from the document. The AI professor listens and evaluates your understanding and presentation.',
  'howItWorks.step4Title': '4. Receive Corrections',
  'howItWorks.step4Desc': 'Get detailed corrections on technical language and content, based exclusively on the uploaded document.',
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
  'demo.title': '🧠 OralFlow - Functional Demo',
  'demo.description': 'Discover how it works with an interactive demo',
  'demo.uploadStep': 'Upload Document',
  'demo.conversationStep': 'AI Conversation',
  'demo.reportStep': 'Evaluation Report',
  'demo.unsupportedFormat': 'Unsupported format. Please upload PDF files only.',
  'demo.extractingText': 'Extracting text from PDF...',
  'demo.pdfError': 'Error processing PDF. Please try with another file.',
  'demo.transcriptionError': 'Audio transcription error. Please try again.',
  'demo.generating': 'Generating OralFlow report...',
  'demo.generated': 'Generated by OralFlow',
  'demo.reportGenerated': 'Report generated successfully',

  // Upload Step
  'upload.title': 'Upload your document',
  'upload.description': 'The virtual professor will study the content to evaluate your explanations',
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
  'demoModal.step3Title': 'Explain the Topic',
  'demoModal.step3Subtitle': 'Present the subject and receive corrections from the Professor',
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
  'demoModal.conversationSimulation': 'AI Presentation Simulation',
  'demoModal.pause': 'Pause',
  'demoModal.play': 'Play',
  'demoModal.aiPrepared': '💡 AI is ready to listen to your explanation based on your PDF content',
  'demoModal.voiceTranscription': 'Voice transcription completed',
  'demoModal.recording': '🔴 Recording in progress... AI is listening',
  'demoModal.clickToRespond': '🎤 Click to explain the topic vocally',
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
  'demoModal.googleDrive': 'Google Drive',
  'demoModal.classroom': 'Classroom',
  'demoModal.documentName': 'Renaissance_History_Notes.pdf',
  'demoModal.professorSevereInvitation': 'I\'m ready to listen to your explanation about the Renaissance. Proceed when you\'re ready.',
  'demoModal.professorSevereFeedback': 'Your explanation contains some inaccuracies. The Renaissance doesn\'t have a single starting date. You need to be more specific about the triggering factors.',
  'demoModal.professorUnderstandingInvitation': 'I\'m listening, tell me what you know about the Renaissance. Take the time you need.',
  'demoModal.professorUnderstandingFeedback': 'Very good! You\'ve grasped the main points. Could you elaborate on the role of humanism? You used appropriate terminology and your presentation was clear and well-structured.',
  'demoModal.professorTechnicalInvitation': 'Proceed with the explanation of 15th-century humanism and socio-economic transformations. I\'m listening.',
  'demoModal.professorTechnicalFeedback': 'Interesting methodological approach. Also consider the impact of technical innovations on cultural diffusion.',
  'demoModal.studentResponse': 'The Renaissance is a cultural movement that originated in Italy in the 14th century, characterized by the revival of interest in classical art, humanism and sciences...',

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
  
  'virtualProfessor.switchedToNewDocument': 'I\'ve switched to analyzing this new document. All previous context has been cleared, and I\'m now ready to explore this new academic material with you.',
  'virtualProfessor.askAnything': 'Ask me anything about the content, and I\'ll provide structured academic responses with:',
  'virtualProfessor.comprehensiveAnalysis': 'Comprehensive analysis',
  'virtualProfessor.documentReferences': 'Document references',
  'virtualProfessor.relatedConcepts': 'Related concepts',
  'virtualProfessor.followUpSuggestions': 'Follow-up suggestions',
  
  // Error messages and alerts
  'error.selectValidPdf': 'Please select a valid PDF file.',
  'error.pdfProcessing': 'Error processing PDF',
  'error.voiceNotSupported': 'Voice recognition not supported in your browser. Please use Chrome, Edge, or Safari.',
  'error.noTranscription': 'No transcription available. Try recording again.',
  
  // PDF Upload Step
  'pdfUpload.title': 'Upload your academic document',
  'pdfUpload.subtitle': 'The AI Professor will deeply analyze the content to evaluate and correct your explanations of the concepts present in the document.',
  'pdfUpload.dragDrop': 'Drag and drop your PDF here or click to select',
  'pdfUpload.analyzing': 'Analyzing document...',
  'pdfUpload.processingStep': 'Bistro AI processing in progress...',
  'pdfUpload.completeSupportTitle': '✅ Complete support for academic documents:',
  'pdfUpload.educational': 'Educational',
  'pdfUpload.scientific': 'Scientific',
  'pdfUpload.complex': 'Complex',
  'pdfUpload.universityMaterials': '• University materials',
  'pdfUpload.technicalManuals': '• Technical manuals', 
  'pdfUpload.lectureSlides': '• Lecture slides',
  'pdfUpload.researchArticles': '• Research articles',
  'pdfUpload.academicPapers': '• Academic papers',
  'pdfUpload.dissertations': '• Dissertations',
  'pdfUpload.mathematicalFormulas': '• Mathematical formulas',
  'pdfUpload.chartsAndTables': '• Charts and tables',
  'pdfUpload.multilingualContent': '• Multilingual content',
  'pdfUpload.capacity': 'Capacity',
  'pdfUpload.upTo100MB': 'Up to 100MB',
  'pdfUpload.processing': 'Processing',
  'pdfUpload.textAndImages': 'Text + Images',
  'pdfUpload.ai': 'AI',
  'pdfUpload.advancedSemantic': 'Advanced semantic understanding',
  'pdfUpload.pdfExtraction': 'PDF.js Extraction',
  'pdfUpload.semanticChunking': 'Semantic Chunking',
  'pdfUpload.aiEmbeddings': 'AI Embeddings',
  'pdfUpload.bistroRag': 'Bistro AI RAG',
  
  // Virtual Professor Modal  
  'virtualProfessor.modalTitle': 'AI Professor - Enhanced Document Analysis',
  'virtualProfessor.newDocumentLoaded': 'New Document Context Loaded',
  'virtualProfessor.document': 'Document',
  
  'virtualProfessor.switchedContext': 'I\'ve switched to analyzing this new document. All previous context has been cleared, and I\'m now ready to explore this new academic material with you.',
  'virtualProfessor.askQuestions': 'Ask me anything about the content, and I\'ll provide structured academic responses with:',
  'virtualProfessor.comprehensiveAnalysisItem': '• Comprehensive analysis',
  'virtualProfessor.documentReferencesItem': '• Document references',
  'virtualProfessor.relatedConceptsItem': '• Related concepts',
  'virtualProfessor.followUpSuggestionsItem': '• Follow-up suggestions',
  'virtualProfessor.noInfoFound': 'I couldn\'t find specific information in the document to answer this question.',
  'virtualProfessor.possibleReasonsTitle': 'Possible reasons:',
  'virtualProfessor.topicNotCoveredReason': '• The topic is not covered in the uploaded PDF',
  'virtualProfessor.terminologyDiffersReason': '• The terminology used differs from what\'s in the document',
  'virtualProfessor.questionTooGeneralReason': '• The question is too general',
  'virtualProfessor.suggestionsTitle': 'Suggestions:',
  'virtualProfessor.trySpecificKeywordsItem': '• Try with more specific keywords',
  'virtualProfessor.useDocumentTerminologyItem': '• Use terminology present in the document',
  'virtualProfessor.askDetailedQuestionItem': '• Ask a more detailed question',
  'virtualProfessor.canHelpExploreText': 'I can help you explore the document contents if you give me more precise guidance! 📖',

  // Professor Chat Step
  'professorChat.title': 'Oral Presentation Coach - Academic Feedback',
  'professorChat.evaluatingExplanations': 'Evaluating Explanations',
  'professorChat.referenceSection': 'reference sections',
  'professorChat.switchDocument': 'Switch Document',
  'professorChat.coachActive': 'Coach Active',
  'professorChat.evaluationReady': 'Evaluation ready',
  'professorChat.accuracyCheck': 'Accuracy Check',
  'professorChat.compareAgainstDocument': 'Compare against document content',
  'professorChat.presentationSkills': 'Presentation Skills',
  'professorChat.evaluateClarity': 'Evaluate clarity and terminology',
  'professorChat.constructiveFeedback': 'Constructive Feedback',
  'professorChat.improveExplanations': 'Improve your explanations',
  'professorChat.coachReadyToEvaluate': 'Oral Presentation Coach is ready to evaluate your explanations and provide feedback!',
  'professorChat.switchDocumentsInfo': 'Switch documents anytime • Explain concepts for evaluation • Get structured coaching feedback',
  'professorChat.coachEvaluatingExplanation': 'Coach is evaluating your explanation...',
  'professorChat.practiceOralExplanation': 'Practice Oral Explanation',
  'professorChat.speakAnyLanguage': 'Speak in any language - AI auto-detects and responds appropriately',
  'professorChat.voiceNotSupported': 'Voice recognition not supported',
  'professorChat.multiLanguageSupport': 'Multi-lang: 🇮🇹 🇺🇸 🇫🇷 🇪🇸 🇩🇪 🇧🇷 🇷🇺 🇨🇳 🇯🇵 🇰🇷',
  'professorChat.activeLanguage': 'Active',
  'professorChat.startOralPractice': 'Start Oral Practice',
  'professorChat.stopExplanation': 'Stop Explanation',
  'professorChat.recordingExplanation': 'Recording your explanation...',
  'professorChat.speakNaturally': 'Speak naturally in your preferred language. The system will automatically detect and process your speech, whether you\'re speaking Italian, English, or any other supported language.',
  'professorChat.yourOralExplanation': 'Your Oral Explanation:',
  'professorChat.gettingFeedback': 'Getting Feedback...',
  'professorChat.submitForAnalysis': 'Submit for Analysis',
  'professorChat.typeExplanation': 'Type your explanation',
  'professorChat.typeAlternatively': 'Alternatively, write out your explanation as if you were speaking it aloud',
  'professorChat.typeAsIfSpeaking': 'Type your explanation as if speaking to an audience...',
  'professorChat.getCoachingFeedback': 'Get Coaching Feedback',
  'professorChat.analyzing': 'Analyzing...',
  'professorChat.practiceExplanationsToTry': 'Practice explanations to try:',
  'professorChat.oralPresentationCoachInfo': 'Oral Presentation Coach: Evaluates your explanations against document content and academic standards. Provides structured feedback to improve your academic communication skills.'
};

export const translations: Record<Language, TranslationKeys> = {
  it: italianTranslations,
  en: englishTranslations,
};

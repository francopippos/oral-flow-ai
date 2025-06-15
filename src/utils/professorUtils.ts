export const askProfessor = async (
  question: string,
  relevantChunks: string[]
): Promise<string> => {
  try {
    console.log('👨‍🏫 Il Professore Virtuale sta elaborando la risposta...');
    const context = relevantChunks.join('\n\n---\n\n');

    // Simulazione di risposta intelligente del professore
    const professorResponse = generateProfessorResponse(question, context);

    // Simula il tempo di elaborazione
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    console.log('✅ Risposta del Professore Virtuale completata');
    return professorResponse;
  } catch (error) {
    console.error('❌ Errore nella risposta del professore:', error);
    return "Mi dispiace, c'è stato un problema tecnico nell'elaborazione della tua domanda. Come professore, preferisco non fornire risposte imprecise. Potresti ripetere la domanda?";
  }
};

function generateProfessorResponse(question: string, context: string): string {
  const questionLower = question.toLowerCase();

  // RISPOSTA SU BRANCH AND BOUND DIVISA IN BOX
  if (questionLower.includes('branch') && questionLower.includes('bound')) {
    return `
<div class="border-l-4 border-oralmind-500 bg-oralmind-50 p-4 mb-4">
  <span class="text-oralmind-600 font-semibold">"Definizione Accademica"</span>
  <br />
  <span>
    Il Branch and Bound è un algoritmo di ottimizzazione combinatoria che utilizza una strategia di ricerca sistematica per esplorare lo spazio delle soluzioni. È particolarmente efficace per problemi di programmazione lineare intera e problemi di ottimizzazione discreta.
  </span>
</div>
<div class="border-l-4 border-success-400 bg-success-50 p-4 mb-4">
  <span class="text-success-600 font-semibold">"Meccanismo di Funzionamento"</span>
  <br />
  <ol class="list-decimal ml-4 mt-2">
    <li>
      <span class="font-semibold">Branching:</span> il problema viene suddiviso ricorsivamente in sottoproblemi più piccoli, creando un albero di ricerca.
    </li>
    <li>
      <span class="font-semibold">Bounding:</span> per ogni nodo dell'albero, si calcolano limiti superiori e/o inferiori della funzione obiettivo.
    </li>
    <li>
      <span class="font-semibold">Pruning:</span> si eliminano i rami che non possono contenere la soluzione ottimale.
    </li>
  </ol>
</div>
<div class="border-l-4 border-yellow-400 bg-yellow-50 p-4 mb-4">
  <span class="text-yellow-700 font-semibold">"Vantaggi"</span>
  <ul class="list-disc ml-4 mt-2">
    <li>Garantisce di trovare la soluzione ottima globale</li>
    <li>Riduce significativamente lo spazio di ricerca rispetto all'enumerazione completa</li>
    <li>Applicabile a molti problemi NP-hard</li>
  </ul>
</div>
<div class="border-l-4 border-oralmind-400 bg-oralmind-100 p-4">
  <span class="text-oralmind-700 font-semibold">"Domande di Approfondimento"</span>
  <ul class="list-disc ml-4 mt-2">
    <li>Come si determina una buona strategia di branching?</li>
    <li>Quali tecniche di bounding conosce?</li>
    <li>Può fare un esempio pratico di applicazione?</li>
  </ul>
</div>
    `;
  }
  
  if (questionLower.includes('complessità') || questionLower.includes('np')) {
    return `Eccellente argomento sulla teoria della complessità computazionale!

Le Classi Fondamentali:
- P: Problemi risolvibili in tempo polinomiale da una macchina di Turing deterministica
- NP: Problemi per cui una soluzione può essere verificata in tempo polinomiale
- NP-completi: I problemi più difficili in NP, ai quali tutti i problemi NP si riducono

Il Problema P vs NP:
Questa è una delle domande più importanti dell'informatica teorica. Se P = NP, significherebbe che ogni problema la cui soluzione può essere verificata rapidamente, può anche essere risolto rapidamente.

Implicazioni Pratiche:
La distinzione è cruciale per comprendere quali problemi possono essere risolti efficientemente e quali richiedono approssimazioni o euristiche.

Approfondimento: Può spiegarmi la differenza tra riducibilità polinomiale e completezza NP?`;
  }
  
  if (questionLower.includes('ottimizzazione') || questionLower.includes('algoritm')) {
    return `Perfetto! Gli algoritmi di ottimizzazione sono il cuore dell'informatica applicata.

Classificazione Principale:
1. Ottimizzazione Continua: Programmazione lineare, non lineare
2. Ottimizzazione Discreta: Problemi combinatori, grafi
3. Ottimizzazione Stocastica: Algoritmi genetici, simulated annealing

Criteri di Valutazione:
- Correttezza: L'algoritmo trova la soluzione ottima?
- Efficienza: Qual è la complessità temporale e spaziale?
- Robustezza: Come si comporta su istanze diverse del problema?

Applicazioni Reali:
Logistica, pianificazione, machine learning, bioinformatica, finanza quantitativa.

Domanda Critica: Quando è preferibile un algoritmo approssimato rispetto a uno esatto?`;
  }
  
  // Risposta generica ma professionale
  return `Come professore universitario, apprezzo la sua domanda. 

Analisi del Quesito:
La sua richiesta tocca concetti fondamentali che richiedono una trattazione rigorosa basata sul materiale di studio.

Approccio Metodologico:
Per fornire una risposta completa e accurata, dovrei analizzare più approfonditamente il contesto specifico del documento che ha caricato. 

Invito all'Approfondimento:
Le consiglio di formulare la domanda in modo più specifico, citando eventuali definizioni o teoremi del materiale di studio. Questo mi permetterà di fornire una spiegazione più mirata e pedagogicamente efficace.

Riflessione Critica:
Quali aspetti specifici dell'argomento trova più difficili da comprendere? Su cosa vorrebbe che ci concentrassimo maggiormente?

Come professore, il mio obiettivo è guidarla verso una comprensione profonda e duratura della materia.`;
}

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { createClient } from '@supabase/supabase-js';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface VisionAnalysis {
  hasVisualContent: boolean;
  mathFormulas: Array<{latex: string; description: string}>;
  charts: Array<{type: string; description: string; data_insights: string}>;
  diagrams: Array<{type: string; description: string}>;
  tables: Array<{description: string; key_data: string}>;
  summary: string;
}

interface EnhancedChunk {
  content: string;
  type: 'text' | 'vision';
  pageNumber?: number;
  source: string;
}

export const extractTextAndVisionFromPdf = async (
  file: File, 
  options: {
    includeVisionAnalysis?: boolean;
    maxPages?: number;
    onProgress?: (progress: number, status: string) => void;
  } = {}
): Promise<{
  textChunks: EnhancedChunk[];
  totalPages: number;
  processingStats: {
    textPages: number;
    visualPages: number;
    totalTokensUsed: number;
  };
}> => {
  const { includeVisionAnalysis = false, maxPages = 50, onProgress } = options;
  
  console.log('🔄 Starting enhanced PDF processing...');
  onProgress?.(0, 'Loading PDF...');

  try {
    // Load PDF
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const totalPages = Math.min(pdf.numPages, maxPages);
    
    console.log(`📄 PDF loaded: ${totalPages} pages to process`);
    onProgress?.(10, `Processing ${totalPages} pages...`);

    const allChunks: EnhancedChunk[] = [];
    let textPages = 0;
    let visualPages = 0;
    let totalTokensUsed = 0;

    // Process each page
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const progress = 10 + (pageNum / totalPages) * 80;
      onProgress?.(progress, `Processing page ${pageNum}/${totalPages}...`);

      try {
        const page = await pdf.getPage(pageNum);
        
        // Extract text content
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .filter((item): item is any => 'str' in item)
          .map((item: any) => item.str)
          .join(' ')
          .trim();

        if (pageText.length > 50) {
          allChunks.push({
            content: pageText,
            type: 'text',
            pageNumber: pageNum,
            source: `Page ${pageNum} (text)`
          });
          textPages++;
        }

        // Vision analysis if enabled and page has substantial content
        if (includeVisionAnalysis && (pageText.length > 100 || hasLikelyVisualContent(pageText))) {
          try {
            console.log(`👁️ Analyzing page ${pageNum} for visual content...`);
            
            // Render page to canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d')!;
            const viewport = page.getViewport({ scale: 1.5 });
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            
            // Convert to base64
            const imageBase64 = canvas.toDataURL('image/png').split(',')[1];
            
            // Analyze with vision API
            const visionResult = await analyzePageWithVision(imageBase64, pageNum);
            
            if (visionResult.success && visionResult.analysis.hasVisualContent) {
              const visionChunk = createVisionChunk(visionResult.analysis, pageNum);
              if (visionChunk.content.length > 100) {
                allChunks.push(visionChunk);
                visualPages++;
                totalTokensUsed += visionResult.usage?.total_tokens || 0;
                
                console.log(`✅ Page ${pageNum}: Found visual content`);
              }
            }
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
            
          } catch (visionError) {
            console.warn(`⚠️ Vision analysis failed for page ${pageNum}:`, visionError);
          }
        }

      } catch (pageError) {
        console.warn(`⚠️ Error processing page ${pageNum}:`, pageError);
      }
    }

    console.log(`✅ Enhanced PDF processing complete:`);
    console.log(`   📝 Text pages: ${textPages}`);
    console.log(`   👁️ Visual pages: ${visualPages}`);
    console.log(`   🎯 Total chunks: ${allChunks.length}`);
    console.log(`   💰 Vision tokens used: ${totalTokensUsed}`);

    onProgress?.(100, 'Processing complete!');

    return {
      textChunks: allChunks,
      totalPages,
      processingStats: {
        textPages,
        visualPages,
        totalTokensUsed
      }
    };

  } catch (error) {
    console.error('❌ Enhanced PDF processing failed:', error);
    throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Check if page likely contains visual content worth analyzing
function hasLikelyVisualContent(text: string): boolean {
  const visualIndicators = [
    'figure', 'chart', 'graph', 'diagram', 'table', 'equation',
    'formula', 'plot', 'image', 'fig.', 'tab.', '=', '+', '-',
    'σ', 'α', 'β', 'γ', 'δ', 'λ', 'μ', 'π', '∑', '∫', '√',
    '±', '≤', '≥', '≠', '∞', '∂', '∇'
  ];
  
  const lowerText = text.toLowerCase();
  return visualIndicators.some(indicator => lowerText.includes(indicator));
}

// Analyze page with vision API
async function analyzePageWithVision(imageBase64: string, pageNumber: number): Promise<{
  success: boolean;
  analysis: VisionAnalysis;
  usage?: any;
}> {
  try {
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase.functions.invoke('pdf-vision-analysis', {
      body: { imageBase64, pageNumber }
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Vision analysis API error:', error);
    return {
      success: false,
      analysis: {
        hasVisualContent: false,
        mathFormulas: [],
        charts: [],
        diagrams: [],
        tables: [],
        summary: ''
      }
    };
  }
}

// Create vision chunk from analysis
function createVisionChunk(analysis: VisionAnalysis, pageNumber: number): EnhancedChunk {
  let content = `=== VISUAL CONTENT ANALYSIS - PAGE ${pageNumber} ===\n\n`;
  
  // Add summary
  if (analysis.summary) {
    content += `OVERVIEW: ${analysis.summary}\n\n`;
  }

  // Add mathematical formulas
  if (analysis.mathFormulas?.length > 0) {
    content += `MATHEMATICAL FORMULAS:\n`;
    analysis.mathFormulas.forEach((formula, i) => {
      content += `Formula ${i + 1}: ${formula.latex}\n`;
      content += `Description: ${formula.description}\n\n`;
    });
  }

  // Add charts and graphs
  if (analysis.charts?.length > 0) {
    content += `CHARTS AND GRAPHS:\n`;
    analysis.charts.forEach((chart, i) => {
      content += `Chart ${i + 1} (${chart.type}):\n`;
      content += `Description: ${chart.description}\n`;
      content += `Key Insights: ${chart.data_insights}\n\n`;
    });
  }

  // Add diagrams
  if (analysis.diagrams?.length > 0) {
    content += `DIAGRAMS AND ILLUSTRATIONS:\n`;
    analysis.diagrams.forEach((diagram, i) => {
      content += `Diagram ${i + 1} (${diagram.type}):\n`;
      content += `Description: ${diagram.description}\n\n`;
    });
  }

  // Add tables
  if (analysis.tables?.length > 0) {
    content += `TABLES AND DATA:\n`;
    analysis.tables.forEach((table, i) => {
      content += `Table ${i + 1}:\n`;
      content += `Content: ${table.description}\n`;
      content += `Key Data: ${table.key_data}\n\n`;
    });
  }

  return {
    content: content.trim(),
    type: 'vision',
    pageNumber,
    source: `Page ${pageNumber} (visual analysis)`
  };
}

// Enhanced chunking that preserves vision content
export const createEnhancedChunks = async (chunks: EnhancedChunk[]): Promise<string[]> => {
  try {
    console.log('🧩 Creating enhanced chunks from text + vision content...');
    
    // Separate text and vision chunks
    const textChunks = chunks.filter(c => c.type === 'text');
    const visionChunks = chunks.filter(c => c.type === 'vision');
    
    console.log(`📝 Text chunks: ${textChunks.length}`);
    console.log(`👁️ Vision chunks: ${visionChunks.length}`);

    // Process text chunks with existing chunking logic
    const { createTextChunks } = await import('./chunkingUtils');
    const combinedText = textChunks.map(c => c.content).join('\n\n');
    const processedTextChunks = combinedText.length > 0 ? await createTextChunks(combinedText) : [];

    // Combine with vision chunks (keep vision chunks intact)
    const visionChunkContents = visionChunks.map(c => c.content);
    
    // Interleave text and vision chunks for better context distribution
    const finalChunks: string[] = [];
    const maxLength = Math.max(processedTextChunks.length, visionChunkContents.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (i < processedTextChunks.length) {
        finalChunks.push(processedTextChunks[i]);
      }
      if (i < visionChunkContents.length) {
        finalChunks.push(visionChunkContents[i]);
      }
    }

    console.log(`✅ Enhanced chunking complete: ${finalChunks.length} total chunks`);
    return finalChunks;

  } catch (error) {
    console.error('❌ Enhanced chunking failed:', error);
    // Fallback to simple text extraction
    return chunks.map(c => c.content);
  }
};

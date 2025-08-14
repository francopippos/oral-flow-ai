
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, GraduationCap, Building2, Award, Users, Download } from 'lucide-react';

const ContentLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tutti', icon: BookOpen },
    { id: 'university', name: 'Università', icon: GraduationCap },
    { id: 'highschool', name: 'Scuole Superiori', icon: Building2 },
    { id: 'certifications', name: 'Certificazioni', icon: Award },
    { id: 'professional', name: 'Formazione Professionale', icon: Users },
  ];

  const contentPools = [
    {
      id: 1,
      title: "Storia Contemporanea - UniRoma",
      category: "university",
      faculty: "Lettere e Filosofia",
      level: "Laurea Triennale",
      downloads: "1.2k",
      rating: 4.8,
      subjects: ["Storia", "Politica", "Sociologia"],
      description: "Materiali completi per l'esame di Storia Contemporanea",
      language: "it"
    },
    {
      id: 2,
      title: "Advanced English Literature - Oxford",
      category: "university",
      faculty: "Modern Languages",
      level: "Master",
      downloads: "856",
      rating: 4.9,
      subjects: ["Literature", "Critical Analysis"],
      description: "Comprehensive materials for advanced literature studies",
      language: "en"
    },
    {
      id: 3,
      title: "Matematica Avanzata - Liceo Scientifico",
      category: "highschool",
      faculty: "Liceo Scientifico",
      level: "5° Anno",
      downloads: "2.1k",
      rating: 4.7,
      subjects: ["Matematica", "Analisi", "Geometria"],
      description: "Preparazione completa per la maturità scientifica",
      language: "it"
    },
    {
      id: 4,
      title: "IELTS Academic Preparation",
      category: "certifications",
      faculty: "Cambridge Assessment",
      level: "B2-C2",
      downloads: "3.4k",
      rating: 4.8,
      subjects: ["English", "Academic Writing", "Speaking"],
      description: "Complete preparation materials for IELTS Academic",
      language: "en"
    },
    {
      id: 5,
      title: "Derecho Constitucional - UAM",
      category: "university",
      faculty: "Derecho",
      level: "2° Curso",
      downloads: "945",
      rating: 4.6,
      subjects: ["Derecho", "Constitución", "Política"],
      description: "Materiales completos de Derecho Constitucional",
      language: "es"
    },
    {
      id: 6,
      title: "Marketing Digital Avanzado",
      category: "professional",
      faculty: "Google Academy",
      level: "Profesional",
      downloads: "1.8k",
      rating: 4.9,
      subjects: ["Marketing", "Digital", "Analytics"],
      description: "Curso profesional de marketing digital",
      language: "es"
    }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? contentPools 
    : contentPools.filter(content => content.category === selectedCategory);

  const getLanguageFlag = (lang: string) => {
    const flags = { it: '🇮🇹', en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪' };
    return flags[lang as keyof typeof flags] || '🌐';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              📚 Libreria Contenuti Globale
            </h2>
            <p className="text-xl text-muted-foreground">
              Materiali di studio da università e istituzioni partner in tutto il mondo
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? 'bg-oralflow-500 text-white'
                      : 'bg-white text-oralflow-700 hover:bg-oralflow-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((content) => (
              <Card key={content.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-tight">
                      {content.title}
                    </CardTitle>
                    <span className="text-xl">{getLanguageFlag(content.language)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {content.faculty} • {content.level}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {content.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {content.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>{content.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{content.rating}</span>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        content.category === 'university' ? 'border-blue-500 text-blue-700' :
                        content.category === 'highschool' ? 'border-green-500 text-green-700' :
                        content.category === 'certifications' ? 'border-purple-500 text-purple-700' :
                        'border-orange-500 text-orange-700'
                      }
                    >
                      {categories.find(c => c.id === content.category)?.name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">🤝 Partner Educativi</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-muted-foreground">
                <div>Università La Sapienza</div>
                <div>Oxford University</div>
                <div>Universidad Autónoma</div>
                <div>Sorbonne Paris</div>
                <div>Cambridge Assessment</div>
                <div>Google Academy</div>
                <div>Microsoft Learn</div>
                <div>LinkedIn Learning</div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                + 150 istituzioni educative partner in crescita
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentLibrary;

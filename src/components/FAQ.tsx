import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const FAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What is Lovable?",
      answer: "Lovable is an AI-powered platform that transforms your ideas into fully functional web applications in minutes, not weeks. Simply describe what you want to build, and our AI creates beautiful, responsive web apps with modern design systems."
    },
    {
      question: "Why is this a private beta?",
      answer: "We're limiting access to ensure the best possible experience for early adopters. This allows us to gather focused feedback, iterate quickly, and ensure each user gets personalized attention as we perfect the platform."
    },
    {
      question: "What makes Lovable different?",
      answer: "Unlike traditional development tools, Lovable understands natural language and generates production-ready code with modern frameworks like React, TypeScript, and Tailwind CSS. No coding experience required - just describe your vision."
    },
    {
      question: "What kind of applications can I build?",
      answer: "You can build a wide variety of web applications: landing pages, e-commerce sites, dashboards, portfolios, SaaS tools, and more. If it runs in a browser, Lovable can help you build it."
    },
    {
      question: "What happens after the beta?",
      answer: "Private beta users will get lifetime premium access at no cost, priority support, and the ability to influence our roadmap. You'll also have first access to new features and enterprise tools."
    },
    {
      question: "How do I get invited?",
      answer: "Request access through our form. We're accepting applications on a rolling basis and will notify selected participants within 48 hours. Priority is given to developers, designers, and entrepreneurs with specific project needs."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Quick FAQ
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about joining Lovable's private beta
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-primary/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-8">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-8 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Still have questions? We'll answer them personally during your beta interview.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
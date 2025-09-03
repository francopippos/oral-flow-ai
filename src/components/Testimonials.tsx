
import { Star, Quote } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import student1 from '../assets/student1.jpg';
import student2 from '../assets/student2.jpg';
import student3 from '../assets/student3.jpg';
import teacher1 from '../assets/teacher1.jpg';

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = [
    {
      name: t('testimonials.student1Name'),
      role: t('testimonials.student1Role'),
      content: t('testimonials.student1Content'),
      rating: 5,
      subject: t('testimonials.student1Subject'),
      avatar: student1
    },
    {
      name: t('testimonials.teacher1Name'),
      role: t('testimonials.teacher1Role'),
      content: t('testimonials.teacher1Content'),
      rating: 5,
      subject: t('testimonials.teacher1Subject'),
      avatar: teacher1
    },
    {
      name: t('testimonials.student2Name'),
      role: t('testimonials.student2Role'),
      content: t('testimonials.student2Content'),
      rating: 5,
      subject: t('testimonials.student2Subject'),
      avatar: student2
    },
    {
      name: t('testimonials.student3Name'),
      role: t('testimonials.student3Role'),
      content: t('testimonials.student3Content'),
      rating: 5,
      subject: t('testimonials.student3Subject'),
      avatar: student3
    }
  ];

  return (
    <section id="testimonials" className="py-20 gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-oralmind-100 hover:shadow-lg transition-all duration-300 animate-fade-in relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-oralmind-200">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={`${testimonial.name} profile`} />
                    <AvatarFallback className="bg-gradient-to-br from-oralmind-500 to-success-500 text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-oralmind-600 font-medium">{testimonial.subject}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

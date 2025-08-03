import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();
  const footerLinks = {
    prodotto: [{
      name: t('nav.features'),
      href: '#features'
    }, {
      name: t('nav.howItWorks'),
      href: '#how-it-works'
    }, {
      name: 'Prezzi',
      href: '#pricing'
    }, {
      name: 'Demo',
      href: '#demo'
    }],
    supporto: [{
      name: t('footer.helpCenter'),
      href: '#help'
    }, {
      name: t('footer.guides'),
      href: '#guides'
    }, {
      name: t('footer.faq'),
      href: '#faq'
    }, {
      name: t('footer.contact'),
      href: '#contact'
    }],
    azienda: [{
      name: t('footer.about'),
      href: '#about'
    }, {
      name: t('footer.blog'),
      href: '#blog'
    }, {
      name: t('footer.careers'),
      href: '#careers'
    }, {
      name: t('footer.press'),
      href: '#press'
    }],
    legale: [{
      name: t('footer.privacy'),
      href: '/privacy'
    }, {
      name: t('footer.terms'),
      href: '/terms'
    }, {
      name: t('footer.cookies'),
      href: '/cookies'
    }, {
      name: t('footer.gdpr'),
      href: '/gdpr'
    }]
  };
  const socialLinks = [{
    icon: Facebook,
    href: '#',
    name: 'Facebook'
  }, {
    icon: Twitter,
    href: '#',
    name: 'Twitter'
  }, {
    icon: Instagram,
    href: '#',
    name: 'Instagram'
  }, {
    icon: Linkedin,
    href: '#',
    name: 'LinkedIn'
  }];
  return <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-oralmind-500 to-success-500 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">OralMind</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span>info@oralmind.ai</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <Phone className="h-4 w-4" />
                  <span>+39 02 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <MapPin className="h-4 w-4" />
                  <span>Roma, Italia</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-white">{t('footer.product')}</h3>
                <ul className="space-y-3">
                  {footerLinks.prodotto.map(link => <li key={link.name}>
                      <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                        {link.name}
                      </a>
                    </li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white">{t('footer.support')}</h3>
                <ul className="space-y-3">
                  {footerLinks.supporto.map(link => <li key={link.name}>
                      <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                        {link.name}
                      </a>
                    </li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white">{t('footer.company')}</h3>
                <ul className="space-y-3">
                  {footerLinks.azienda.map(link => <li key={link.name}>
                      <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                        {link.name}
                      </a>
                    </li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white">{t('footer.legal')}</h3>
                <ul className="space-y-3">
                  {footerLinks.legale.map(link => <li key={link.name}>
                      <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                        {link.name}
                      </a>
                    </li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 mb-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-semibold mb-4">{t('footer.newsletter')}</h3>
              <p className="text-slate-400 mb-6">
                {t('footer.newsletterDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" placeholder={t('footer.emailPlaceholder')} className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-oralmind-500" />
                <button className="bg-gradient-to-r from-oralmind-500 to-success-500 hover:from-oralmind-600 hover:to-success-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                  {t('footer.subscribe')}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-400 text-sm">
                {t('footer.copyright')}
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map(social => <a key={social.name} href={social.href} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300" aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                  </a>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
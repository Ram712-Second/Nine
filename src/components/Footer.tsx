import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-2xl font-light mb-4">9 Architects</h3>
            <p className="text-white/70 font-light leading-relaxed">
              Creating spaces that inspire and transform lives through innovative architectural design.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4 tracking-wider">Quick Links</h4>
            <nav className="space-y-2">
              {['Home', 'About', 'Services', 'Process', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-white/70 hover:text-white transition-colors duration-300 font-light"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-light mb-4 tracking-wider">Contact Info</h4>
            <div className="space-y-2 text-white/70 font-light">
              <p>123 Architecture Street</p>
              <p>New York, NY 10001</p>
              <p>contact@9architects.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm font-light">
            © 2024 9 Architects. All rights reserved.
          </p>

          <div className="flex gap-6">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-white/60 hover:text-white transition-colors duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

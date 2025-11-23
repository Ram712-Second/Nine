import { useState, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ClientLogos from '@/components/ClientLogos';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useLenis();

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <div className="dark">
          <Header />
          <Hero />
          <About />
          <ClientLogos />
          <Services />
          <Projects />
          <Process />
          <Testimonials />
          <Contact />
          <Footer />
          <WhatsAppButton />
        </div>
      )}
    </>
  );
};

export default Index;

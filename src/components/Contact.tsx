import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        gsap.fromTo(
          '.contact-form',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.contact-map',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      },
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- Connect to Google Forms (Headless) ---
    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeB2zPTiHhj2atfwmiwkDlrKwq3vQ7V9c4EDrzB9e_r1nztYQ/formResponse';

    // This method requires using FormData and sending an opaque request.
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('entry.749987193', formData.name);
    formDataToSubmit.append('entry.318305727', formData.email);
    formDataToSubmit.append('entry.1382148214', formData.phone);
    formDataToSubmit.append('entry.1406642824', formData.message);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        body: formDataToSubmit,
        mode: 'no-cors', // This is crucial to prevent CORS errors with Google Forms.
      });

      // Since we can't check the response with 'no-cors', we assume success if fetch doesn't throw an error.
      toast({
        title: 'Message Sent!',
        description:
          'Thank you for contacting us. We will get back to you soon.',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center mb-16 text-black">Contact Us</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <form onSubmit={handleSubmit} className="contact-form space-y-6">
            <Input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white border-black/50 text-black placeholder:text-black/50"
            />

            <Input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white border-black/50 text-black placeholder:text-black/50"
            />

            <Input
              type="tel"
              name="phone"
              placeholder="Enter Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-white border-black/50 text-black placeholder:text-black/50"
            />

            <Textarea
              name="message"
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="bg-white border-black/50 text-black placeholder:text-black/50"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-black/90 transition-colors duration-300 h-12 text-base font-light tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

          <div className="contact-map h-[500px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

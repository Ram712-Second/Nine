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
  
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzCd7UwSq4TuPxQ7mgdDOGiOsS9txTCC1EFevZjalg3UmyOVEKw3Tr2dK-PJBfKL86J/exec",
        {
          method: "POST",
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you soon.",
      });
  
      setFormData({ name: "", email: "", phone: "", message: "" });
  
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Failed!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31534.986574265073!2d76.5573263!3d8.8913681!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05fc57b969325d%3A0x71d768a2ece68365!2s9architects!5e0!3m2!1sen!2sin!4v1765007240235!5m2!1sen!2sin"
              width="100%"
              height="80%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              // className="grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


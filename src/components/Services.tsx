import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Home, Trees, Ruler, Hammer } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Building2,
    title: 'Architectural Design',
    description: 'Innovative and functional architectural solutions tailored to your vision and requirements.',
  },
  {
    icon: Home,
    title: 'Interior Design',
    description: 'Creating beautiful, cohesive interior spaces that reflect your style and enhance livability.',
  },
  {
    icon: Trees,
    title: 'Landscape Planning',
    description: 'Harmonious outdoor environments that complement architectural design and natural surroundings.',
  },
  {
    icon: Ruler,
    title: 'Structural Consulting',
    description: 'Expert structural engineering to ensure safety, durability, and design integrity.',
  },
  {
    icon: Hammer,
    title: 'Project Execution',
    description: 'End-to-end project management ensuring quality delivery within timeline and budget.',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        gsap.fromTo(
          '.service-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
          }
        );
      },
    });
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center mb-16 text-black">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="service-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500"
              >
                <CardHeader>
                  <Icon className="w-12 h-12 mb-4 text-black" strokeWidth={1} />
                  <CardTitle className="text-2xl font-light text-black">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black/70 font-light leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

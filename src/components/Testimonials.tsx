import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Sarah Mitchell',
    project: 'Residential Villa',
    rating: 5,
    text: '9 Architects transformed our dream home into reality. Their attention to detail and innovative design approach exceeded all expectations.',
  },
  {
    name: 'James Anderson',
    project: 'Corporate Office',
    rating: 5,
    text: 'Professional, creative, and efficient. The team delivered a stunning office space that perfectly balances form and function.',
  },
  {
    name: 'Emily Chen',
    project: 'Boutique Hotel',
    rating: 5,
    text: 'Working with 9 Architects was an absolute pleasure. They brought fresh perspectives and created a unique hospitality experience.',
  },
  {
    name: 'Michael Roberts',
    project: 'Urban Loft',
    rating: 5,
    text: 'Exceptional craftsmanship and design vision. Our urban loft is now a masterpiece of modern architecture.',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        gsap.fromTo(
          '.testimonial-content',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          }
        );
      },
    });
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding bg-black"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center mb-16 text-white">Client Testimonials</h2>

        <div className="testimonial-content max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-8 md:p-12 text-center">
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-white text-white"
                        />
                      ))}
                    </div>

                    <p className="text-2xl md:text-3xl font-light text-white mb-8 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>

                    <div className="space-y-1">
                      <div className="text-xl font-light text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm tracking-wider text-white/60 uppercase">
                        {testimonial.project}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/10 border-white/20 text-white hover:bg-white/20" />
            <CarouselNext className="right-0 bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

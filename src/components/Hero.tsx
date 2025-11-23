import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const heroImages = [hero1, hero2, hero3];

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ delay: 0.3 });

    timeline
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-screen p-0">
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={`Architecture ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-8 bg-white/10 border-white/20 text-white hover:bg-white/20" />
        <CarouselNext className="right-8 bg-white/10 border-white/20 text-white hover:bg-white/20" />
      </Carousel>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-6 max-w-5xl">
          <h1
            ref={headlineRef}
            className="text-white mb-6 font-light leading-tight"
          >
            We Design Spaces <br />
            That Inspire
          </h1>
          <p
            ref={subtextRef}
            className="text-white/90 text-xl md:text-2xl font-light tracking-wide"
          >
            Transforming visions into architectural masterpieces
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

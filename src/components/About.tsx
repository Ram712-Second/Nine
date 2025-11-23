import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImage from '@/assets/about-studio.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [experience, setExperience] = useState(0);
  const [projects, setProjects] = useState(0);
  const [awards, setAwards] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animateCounter = (setter: (value: number) => void, target: number) => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => setter(Math.floor(obj.value)),
      });
    };

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        animateCounter(setExperience, 15);
        animateCounter(setProjects, 250);
        animateCounter(setAwards, 32);

        gsap.fromTo(
          '.about-text',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.about-image',
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
      id="about"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-image">
            <img
              src={aboutImage}
              alt="9 Architects Studio"
              className="w-full h-[600px] object-cover"
            />
          </div>

          <div>
            <h2 className="about-text mb-6 text-black">About Us</h2>
            <p className="about-text text-lg md:text-xl text-black/70 mb-8 font-light leading-relaxed">
              9 Architects is a leading architectural firm specializing in innovative, 
              sustainable, and timeless design. With over 15 years of experience, 
              we transform spaces into inspiring environments that enhance lives and communities.
            </p>
            <p className="about-text text-lg md:text-xl text-black/70 mb-12 font-light leading-relaxed">
              Our multidisciplinary team combines creativity with technical expertise 
              to deliver exceptional results across residential, commercial, and urban projects.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div className="about-text text-center">
                <div className="text-5xl md:text-6xl font-light text-black mb-2">
                  {experience}+
                </div>
                <div className="text-sm tracking-wider text-black/60 uppercase">
                  Years Experience
                </div>
              </div>

              <div className="about-text text-center">
                <div className="text-5xl md:text-6xl font-light text-black mb-2">
                  {projects}+
                </div>
                <div className="text-sm tracking-wider text-black/60 uppercase">
                  Projects Completed
                </div>
              </div>

              <div className="about-text text-center">
                <div className="text-5xl md:text-6xl font-light text-black mb-2">
                  {awards}+
                </div>
                <div className="text-sm tracking-wider text-black/60 uppercase">
                  Awards Won
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

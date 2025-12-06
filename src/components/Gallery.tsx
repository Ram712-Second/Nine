import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masonry from './Masonry';

gsap.registerPlugin(ScrollTrigger);

// --- TODO: Replace with your actual photo data ---
const masonryItems = [
  { id: "1", img: "https://picsum.photos/id/1015/600/900", url: "#", height: 900 },
  { id: "2", img: "https://picsum.photos/id/1011/600/750", url: "#", height: 750 },
  { id: "3", img: "https://picsum.photos/id/1020/600/800", url: "#", height: 800 },
  { id: "4", img: "https://picsum.photos/id/1025/600/600", url: "#", height: 600 },
  { id: "5", img: "https://picsum.photos/id/103/600/400", url: "#", height: 400 },
  { id: "6", img: "https://picsum.photos/id/1043/600/800", url: "#", height: 800 },
  { id: "7", img: "https://picsum.photos/id/1047/600/900", url: "#", height: 900 },
  { id: "8", img: "https://picsum.photos/id/1050/600/500", url: "#", height: 500 },
  { id: "9", img: "https://picsum.photos/id/106/600/900", url: "#", height: 900 },
  { id: "10", img: "https://picsum.photos/id/1060/600/700", url: "#", height: 700 },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate videos
    gsap.fromTo(
      '.video-embed',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.video-section',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-gray-50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center mb-16 text-black">Our Work</h2>

        {/* --- YouTube Videos Section --- */}
        <div className="video-section mb-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* --- TODO: Replace with your YouTube video URLs --- */}
            <div className="video-embed aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/cF6qaUftxlA?autoplay=1&mute=1"
                title="YouTube video player 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
            <div className="video-embed aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/cF6qaUftxlA?autoplay=1&mute=1"
                title="YouTube video player 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>

        {/* --- Photo Gallery Section --- */}
        <div className="photo-gallery">
          <h3 className="text-center text-3xl mb-12 text-black/80">
            Photo Showcase
          </h3>
          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.8}
            stagger={0.06}
            animateFrom="bottom"
            scaleOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
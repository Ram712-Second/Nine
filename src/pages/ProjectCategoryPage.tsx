import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import Masonry from '@/components/Masonry';
import NotFound from './NotFound';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryData {
  title: string;
  subtitle: string;
  description: string;
  images: { id: string; img: string; url: string; height: number; title: string; description: string }[];
}

const categoryData: Record<string, CategoryData> = {
  interior: {
    title: 'Interior Design',
    subtitle: 'Crafting Beautiful Spaces',
    description: 'Explore our collection of elegant interior designs that transform living spaces into works of art.',
    images: [
      { id: 'int-1', img: '/projects/interior/reception.jpg', url: '#', height: 400, title: 'ANAMTHARA RECEPTION', description: 'Elegant welcome area design' },
      { id: 'int-2', img: '/projects/interior/LOBY.jpg', url: '#', height: 400, title: 'SAVITRI HOTEL LOBBY', description: 'Modern hotel lobby interior' },
      { id: 'int-3', img: '/projects/interior/deluxe-double-room.jpg', url: '#', height: 400, title: 'DELUXE ROOM', description: 'Luxurious bedroom interior' },
      { id: 'int-4', img: '/projects/interior/int-4.jpg', url: '#', height: 400, title: 'GUEST ROOM', description: 'Comfortable accommodation design' },
      { id: 'int-5', img: '/projects/interior/restaurant.jpg', url: '#', height: 400, title: 'RESTAURANT INTERIOR', description: 'Elegant dining space design' },
      { id: 'int-6', img: '/projects/interior/RESTAURENT.jpg', url: '#', height: 400, title: 'DINING HALL', description: 'Spacious restaurant interior' },
      { id: 'int-7', img: '/projects/interior/banquet-hall-max-180.jpg', url: '#', height: 400, title: 'BANQUET HALL', description: 'Grand event space design' },
      { id: 'int-8', img: '/projects/interior/board-room.jpg', url: '#', height: 400, title: 'BOARD ROOM', description: 'Professional meeting space' },
      { id: 'int-9', img: '/projects/interior/int-9.jpg', url: '#', height: 400, title: 'LIVING SPACE', description: 'Modern living area' },
      { id: 'int-10', img: '/projects/interior/RESTURRENT%202.jpg', url: '#', height: 400, title: 'SUITE ROOM', description: 'Premium suite interior' },
      { id: 'int-11', img: '/projects/interior/deluxe-twin-bed-room.jpg', url: '#', height: 400, title: 'TWIN BEDROOM', description: 'Modern twin room design' },
      { id: 'int-12', img: '/projects/interior/restaurant%20(1).jpg', url: '#', height: 400, title: 'FINE DINING', description: 'Exquisite restaurant design' },
    ],
  },
  residential: {
    title: 'Residential',
    subtitle: 'Luxury Living Redefined',
    description: 'Discover our residential projects featuring bespoke homes designed for comfort and elegance.',
    images: [
      { id: 'res-1', img: '/projects/residential/ChatGPT%20Image%20Feb%2016,%202026,%2009_39_12%20AM.png', url: '#', height: 400, title: 'HARISREE RESIDENCY', description: 'Premium residential living' },
      { id: 'res-2', img: '/projects/residential/ChatGPT%20Image%20Feb%2016,%202026,%2010_59_03%20AM.png', url: '#', height: 400, title: 'RANI GATE', description: 'Traditional residential design' },
      { id: 'res-3', img: '/projects/residential/ChatGPT%20Image%20Feb%2016,%202026,%2009_41_01%20AM.png', url: '#', height: 400, title: 'HOLIDAY VISTA', description: 'Holiday home retreat' },
      { id: 'res-4', img: '/projects/residential/getlstd-property-photo%20(2).jpg', url: '#', height: 400, title: 'SILVER SAND', description: 'Coastal residential property' },
      { id: 'res-5', img: '/projects/residential/res-5.jpg', url: '#', height: 400, title: 'MODERN VILLA', description: 'Contemporary villa design' },
      { id: 'res-6', img: '/projects/residential/ChatGPT%20Image%20Feb%2014,%202026,%2002_41_02%20PM.png', url: '#', height: 400, title: 'CLASSIC REGENCY', description: 'Classic-style residence' },
      { id: 'res-7', img: '/projects/residential/res-7.jpg', url: '#', height: 400, title: 'URBAN LIVING', description: 'City apartment design' },
      { id: 'res-8', img: '/projects/residential/res-8.jpg', url: '#', height: 400, title: 'LUXURY APARTMENT', description: 'Premium apartment living' },
      { id: 'res-9', img: '/projects/residential/ChatGPT%20Image%20Feb%2016,%202026,%2009_52_31%20AM.png', url: '#', height: 400, title: 'VENICE STYLE HOME', description: 'Venetian-inspired residence' },
      { id: 'res-10', img: '/projects/residential/res-10.jpg', url: '#', height: 400, title: 'GARDEN RESIDENCE', description: 'Garden-facing living' },
      { id: 'res-11', img: '/projects/residential/res-11.jpg', url: '#', height: 400, title: 'PENTHOUSE', description: 'Luxury penthouse design' },
      { id: 'res-12', img: '/projects/residential/res-12.jpg', url: '#', height: 400, title: 'FAMILY HOME', description: 'Spacious family living' },
    ],
  },
  commercial: {
    title: 'Commercial',
    subtitle: 'Inspiring Workspaces',
    description: 'Browse our commercial projects from modern offices to retail spaces and hospitality venues.',
    images: [
      { id: 'com-1', img: '/projects/commercial/com-1.jpg', url: '#', height: 400, title: 'AL BAYT KOOTTIKAL', description: 'Modern open-plan workspace' },
      { id: 'com-2', img: '/projects/commercial/com-2.jpg', url: '#', height: 400, title: 'ANAS UNIVERSAL', description: 'Collaborative work environment' },
      { id: 'com-3', img: '/projects/commercial/com-3.jpg', url: '#', height: 400, title: 'COSMO', description: 'Luxury hospitality design' },
      { id: 'com-4', img: '/projects/commercial/com-4.jpg', url: '#', height: 400, title: 'DEV RESIDENCY', description: 'State-of-the-art meeting spaces' },
      { id: 'com-5', img: '/projects/commercial/com-5.jpg', url: '#', height: 400, title: 'HYUNDAI SHOWROOM', description: 'Immersive dining experience' },
      { id: 'com-6', img: '/projects/commercial/com-6.jpg', url: '#', height: 400, title: 'KC BRIGHT', description: 'Brand-forward shopping space' },
      { id: 'com-7', img: '/projects/commercial/com-7.jpg', url: '#', height: 400, title: 'KC CENTER', description: 'Impressive first impressions' },
      { id: 'com-8', img: '/projects/commercial/com-8.jpg', url: '#', height: 400, title: 'KC SHELL TRIVANDRUM', description: 'Creative technology space' },
      { id: 'com-9', img: '/projects/commercial/com-9.png', url: '#', height: 400, title: 'IZIYAN SPORTS CITY', description: 'Sports complex and facilities' },
      { id: 'com-10', img: '/projects/commercial/com-10.png', url: '#', height: 400, title: 'MEMMORIES INN', description: 'Premium hospitality venue' },
      { id: 'com-11', img: '/projects/commercial/RENDER%201.jpg', url: '#', height: 400, title: 'COMMERCIAL RENDER', description: 'Architectural visualization' },
      { id: 'com-12', img: '/projects/commercial/com-11.jpg', url: '#', height: 400, title: 'MODERN OFFICE', description: 'Contemporary workspace design' },
    ],
  },
  hospitality: {
    title: 'Hospitality',
    subtitle: 'Exceptional Guest Experiences',
    description: 'Discover our hospitality projects featuring hotels, resorts, and venues designed for memorable experiences.',
    images: [
      { id: 'hos-1', img: '/projects/hospitality/ANAMTHARA/getlstd-property-photo%20(1).jpg', url: '#', height: 400, title: 'ANAMTHARA EXTERIOR', description: 'Stunning exterior design' },
      { id: 'hos-2', img: '/projects/hospitality/ANAMTHARA/banquet-hall-max-180%20(1).jpg', url: '#', height: 400, title: 'GRAND BANQUET', description: 'Luxury event venue' },
      { id: 'hos-3', img: '/projects/hospitality/SAVITRI%20HOTEL/NIGHT.jpg', url: '#', height: 400, title: 'SAVITRI NIGHT VIEW', description: 'Evening ambiance' },
      { id: 'hos-4', img: '/projects/hospitality/SAVITRI%20HOTEL/OUTDOOR.jpg', url: '#', height: 400, title: 'SAVITRI OUTDOOR', description: 'Beautiful outdoor spaces' },
      { id: 'hos-5', img: '/projects/hospitality/SAVITRI%20HOTEL/OUT%20DOOR.jpg', url: '#', height: 400, title: 'GARDEN VIEW', description: 'Scenic outdoor areas' },
      { id: 'hos-6', img: '/projects/hospitality/ANAMTHARA/lawn.jpg', url: '#', height: 400, title: 'LAWN AREA', description: 'Landscaped outdoor space' },
      { id: 'hos-7', img: '/projects/hospitality/SAVITRI%20HOTEL/ROOM%204.jpg', url: '#', height: 400, title: 'SAVITRI SUITE', description: 'Premium accommodation' },
      { id: 'hos-8', img: '/projects/hospitality/MARAMON%20RESORT/ChatGPT%20Image%20Feb%2016,%202026,%2011_41_14%20AM.png', url: '#', height: 400, title: 'MARAMON RESORT', description: 'Riverside retreat' },
      { id: 'hos-9', img: '/projects/hospitality/PERINGALAM%20RESORT/ChatGPT%20Image%20Feb%2016,%202026,%2012_03_05%20PM.png', url: '#', height: 400, title: 'PERINGALAM RESORT', description: 'Nature resort' },
      { id: 'hos-10', img: '/projects/hospitality/HOTEL%20EAST%20VENICE/ChatGPT%20Image%20Feb%2016,%202026,%2009_52_31%20AM.png', url: '#', height: 400, title: 'HOTEL EAST VENICE', description: 'Venetian elegance' },
      { id: 'hos-11', img: '/projects/hospitality/CLASSIC%20REGENCY/ChatGPT%20Image%20Feb%2014,%202026,%2002_41_02%20PM.png', url: '#', height: 400, title: 'CLASSIC REGENCY', description: 'Timeless hospitality' },
      { id: 'hos-12', img: '/projects/hospitality/SILVER%20SAND/getlstd-property-photo%20(2).jpg', url: '#', height: 400, title: 'SILVER SAND', description: 'Beachfront paradise' },
    ],
  },
};

const ProjectCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const category = slug ? categoryData[slug] : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setImageLoaded(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrevious = useCallback(() => {
    if (!category) return;
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev === 0 ? category.images.length - 1 : prev - 1));
  }, [category]);

  const goToNext = useCallback(() => {
    if (!category) return;
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev === category.images.length - 1 ? 0 : prev + 1));
  }, [category]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  if (!category) {
    return <NotFound />;
  }

  const currentImage = category.images[currentIndex];

  return (
    <Layout theme="light">
      <section className="bg-background pt-32 pb-24 px-4 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => navigate('/', { state: { scrollTo: `project-${slug}` } })}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <div className="mb-3 text-sm font-light uppercase tracking-widest text-muted-foreground">
              {category.subtitle}
            </div>
            <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
              {category.title}
            </h1>
            {/* <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {category.description}
            </p> */}
          </motion.div>

          {/* Masonry Gallery */}
          <Masonry
            items={category.images}
            animateFrom="bottom"
            stagger={0.04}
            blurToFocus={true}
            onImageClick={openLightbox}
          />
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Loading spinner */}
              {!imageLoaded && (
                <div className="flex items-center justify-center w-[80vw] h-[60vh] md:w-[60vw] md:h-[70vh]">
                  <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}

              <img
                src={currentImage.img}
                alt={currentImage.title}
                className={`max-w-full max-h-[85vh] object-contain rounded-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Image info - only show when image is loaded */}
              {imageLoaded && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                  <h3 className="text-white text-xl font-semibold">{currentImage.title}</h3>
                  {/* <p className="text-white/70 text-sm">{currentImage.description}</p> */}
                  <p className="text-white/50 text-xs mt-2">{currentIndex + 1} / {category.images.length}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ProjectCategoryPage;

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
      { id: 'int-1', img: 'https://picsum.photos/seed/int1/600/400', url: '#', height: 400, title: 'Modern Living Room', description: 'Minimalist design with warm tones' },
      { id: 'int-2', img: 'https://picsum.photos/seed/int2/600/400', url: '#', height: 400, title: 'Contemporary Kitchen', description: 'Sleek finishes and open layout' },
      { id: 'int-3', img: 'https://picsum.photos/seed/int3/600/400', url: '#', height: 400, title: 'Cozy Bedroom Suite', description: 'Tranquil retreat with natural materials' },
      { id: 'int-4', img: 'https://picsum.photos/seed/int4/600/400', url: '#', height: 400, title: 'Luxury Bathroom', description: 'Marble accents and ambient lighting' },
      { id: 'int-5', img: 'https://picsum.photos/seed/int5/600/400', url: '#', height: 400, title: 'Dining Area', description: 'Elegant entertaining space' },
      { id: 'int-6', img: 'https://picsum.photos/seed/int6/600/400', url: '#', height: 400, title: 'Study Room', description: 'Productive and stylish workspace' },
      { id: 'int-7', img: 'https://picsum.photos/seed/int7/600/400', url: '#', height: 400, title: 'Open Plan Living', description: 'Seamless flow between spaces' },
      { id: 'int-8', img: 'https://picsum.photos/seed/int8/600/400', url: '#', height: 400, title: 'Master Suite', description: 'Luxurious personal sanctuary' },
      { id: 'int-9', img: 'https://picsum.photos/seed/int9/600/400', url: '#', height: 400, title: 'Lounge Area', description: 'Relaxed sophistication' },
      { id: 'int-10', img: 'https://picsum.photos/seed/int10/600/400', url: '#', height: 400, title: 'Walk-in Closet', description: 'Organized luxury storage' },
      { id: 'int-11', img: 'https://picsum.photos/seed/int11/600/400', url: '#', height: 400, title: 'Hallway Design', description: 'Grand entrance statement' },
      { id: 'int-12', img: 'https://picsum.photos/seed/int12/600/400', url: '#', height: 400, title: 'Kids Room', description: 'Playful yet refined design' },
    ],
  },
  residential: {
    title: 'Residential',
    subtitle: 'Luxury Living Redefined',
    description: 'Discover our residential projects featuring bespoke homes designed for comfort and elegance.',
    images: [
      { id: 'res-1', img: 'https://picsum.photos/seed/res1/600/400', url: '#', height: 400, title: 'Modern Villa', description: 'Contemporary luxury living' },
      { id: 'res-2', img: 'https://picsum.photos/seed/res2/600/400', url: '#', height: 400, title: 'Hillside Residence', description: 'Panoramic views and privacy' },
      { id: 'res-3', img: 'https://picsum.photos/seed/res3/600/400', url: '#', height: 400, title: 'Beachfront Home', description: 'Coastal living at its finest' },
      { id: 'res-4', img: 'https://picsum.photos/seed/res4/600/400', url: '#', height: 400, title: 'Urban Townhouse', description: 'City sophistication meets comfort' },
      { id: 'res-5', img: 'https://picsum.photos/seed/res5/600/400', url: '#', height: 400, title: 'Garden Estate', description: 'Nature-integrated living' },
      { id: 'res-6', img: 'https://picsum.photos/seed/res6/600/400', url: '#', height: 400, title: 'Penthouse Suite', description: 'Sky-high luxury apartment' },
      { id: 'res-7', img: 'https://picsum.photos/seed/res7/600/400', url: '#', height: 400, title: 'Lake House', description: 'Serene waterfront retreat' },
      { id: 'res-8', img: 'https://picsum.photos/seed/res8/600/400', url: '#', height: 400, title: 'Country Manor', description: 'Classic elegance in the countryside' },
      { id: 'res-9', img: 'https://picsum.photos/seed/res9/600/400', url: '#', height: 400, title: 'Minimalist Home', description: 'Less is more philosophy' },
      { id: 'res-10', img: 'https://picsum.photos/seed/res10/600/400', url: '#', height: 400, title: 'Smart Home', description: 'Technology meets design' },
      { id: 'res-11', img: 'https://picsum.photos/seed/res11/600/400', url: '#', height: 400, title: 'Family Residence', description: 'Spacious living for families' },
      { id: 'res-12', img: 'https://picsum.photos/seed/res12/600/400', url: '#', height: 400, title: 'Eco House', description: 'Sustainable luxury living' },
    ],
  },
  commercial: {
    title: 'Commercial',
    subtitle: 'Inspiring Workspaces',
    description: 'Browse our commercial projects from modern offices to retail spaces and hospitality venues.',
    images: [
      { id: 'com-1', img: 'https://picsum.photos/seed/com1/600/400', url: '#', height: 400, title: 'Tech Office', description: 'Modern open-plan workspace' },
      { id: 'com-2', img: 'https://picsum.photos/seed/com2/600/400', url: '#', height: 400, title: 'Co-working Space', description: 'Collaborative work environment' },
      { id: 'com-3', img: 'https://picsum.photos/seed/com3/600/400', url: '#', height: 400, title: 'Boutique Hotel', description: 'Luxury hospitality design' },
      { id: 'com-4', img: 'https://picsum.photos/seed/com4/600/400', url: '#', height: 400, title: 'Conference Center', description: 'State-of-the-art meeting spaces' },
      { id: 'com-5', img: 'https://picsum.photos/seed/com5/600/400', url: '#', height: 400, title: 'Restaurant Design', description: 'Immersive dining experience' },
      { id: 'com-6', img: 'https://picsum.photos/seed/com6/600/400', url: '#', height: 400, title: 'Retail Store', description: 'Brand-forward shopping space' },
      { id: 'com-7', img: 'https://picsum.photos/seed/com7/600/400', url: '#', height: 400, title: 'Corporate Lobby', description: 'Impressive first impressions' },
      { id: 'com-8', img: 'https://picsum.photos/seed/com8/600/400', url: '#', height: 400, title: 'Innovation Hub', description: 'Creative technology space' },
      { id: 'com-9', img: 'https://picsum.photos/seed/com9/600/400', url: '#', height: 400, title: 'Cafe Interior', description: 'Warm and inviting atmosphere' },
      { id: 'com-10', img: 'https://picsum.photos/seed/com10/600/400', url: '#', height: 400, title: 'Showroom', description: 'Product display excellence' },
      { id: 'com-11', img: 'https://picsum.photos/seed/com11/600/400', url: '#', height: 400, title: 'Spa & Wellness', description: 'Tranquil commercial retreat' },
      { id: 'com-12', img: 'https://picsum.photos/seed/com12/600/400', url: '#', height: 400, title: 'Startup Office', description: 'Agile workspace design' },
    ],
  },
  renovation: {
    title: 'Renovation',
    subtitle: 'Transforming Possibilities',
    description: 'See how we breathe new life into existing structures with thoughtful and creative redesigns.',
    images: [
      { id: 'ren-1', img: 'https://picsum.photos/seed/ren1/600/400', url: '#', height: 400, title: 'Loft Conversion', description: 'Industrial charm meets modern comfort' },
      { id: 'ren-2', img: 'https://picsum.photos/seed/ren2/600/400', url: '#', height: 400, title: 'Kitchen Remodel', description: 'Complete culinary transformation' },
      { id: 'ren-3', img: 'https://picsum.photos/seed/ren3/600/400', url: '#', height: 400, title: 'Bathroom Renovation', description: 'Spa-like personal retreat' },
      { id: 'ren-4', img: 'https://picsum.photos/seed/ren4/600/400', url: '#', height: 400, title: 'Heritage Restoration', description: 'Preserving history with modern touch' },
      { id: 'ren-5', img: 'https://picsum.photos/seed/ren5/600/400', url: '#', height: 400, title: 'Basement Conversion', description: 'Underground living space' },
      { id: 'ren-6', img: 'https://picsum.photos/seed/ren6/600/400', url: '#', height: 400, title: 'Facade Makeover', description: 'Stunning exterior transformation' },
      { id: 'ren-7', img: 'https://picsum.photos/seed/ren7/600/400', url: '#', height: 400, title: 'Open Plan Conversion', description: 'Breaking walls, creating flow' },
      { id: 'ren-8', img: 'https://picsum.photos/seed/ren8/600/400', url: '#', height: 400, title: 'Roof Extension', description: 'Expanding upward with style' },
      { id: 'ren-9', img: 'https://picsum.photos/seed/ren9/600/400', url: '#', height: 400, title: 'Garden Room Addition', description: 'Blending indoor and outdoor' },
      { id: 'ren-10', img: 'https://picsum.photos/seed/ren10/600/400', url: '#', height: 400, title: 'Period Property Update', description: 'Classic meets contemporary' },
      { id: 'ren-11', img: 'https://picsum.photos/seed/ren11/600/400', url: '#', height: 400, title: 'Garage Conversion', description: 'New purpose, new design' },
      { id: 'ren-12', img: 'https://picsum.photos/seed/ren12/600/400', url: '#', height: 400, title: 'Complete Overhaul', description: 'Full property transformation' },
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
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {category.description}
            </p>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
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
                src={currentImage.img.replace('/600/400', '/1200/800')}
                alt={currentImage.title}
                className={`max-w-full max-h-[85vh] object-contain rounded-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'}`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Image info - only show when image is loaded */}
              {imageLoaded && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                  <h3 className="text-white text-xl font-semibold">{currentImage.title}</h3>
                  <p className="text-white/70 text-sm">{currentImage.description}</p>
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

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Masonry from '@/components/Masonry';
import NotFound from './NotFound';

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
      { id: 'int-1', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', url: '#', height: 400, title: 'Modern Living Room', description: 'Minimalist design with warm tones' },
      { id: 'int-2', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', url: '#', height: 500, title: 'Contemporary Kitchen', description: 'Sleek finishes and open layout' },
      { id: 'int-3', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', url: '#', height: 350, title: 'Cozy Bedroom Suite', description: 'Tranquil retreat with natural materials' },
      { id: 'int-4', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', url: '#', height: 450, title: 'Luxury Bathroom', description: 'Marble accents and ambient lighting' },
      { id: 'int-5', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80', url: '#', height: 380, title: 'Dining Area', description: 'Elegant entertaining space' },
      { id: 'int-6', img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80', url: '#', height: 520, title: 'Study Room', description: 'Productive and stylish workspace' },
      { id: 'int-7', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', url: '#', height: 420, title: 'Open Plan Living', description: 'Seamless flow between spaces' },
      { id: 'int-8', img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80', url: '#', height: 360, title: 'Master Suite', description: 'Luxurious personal sanctuary' },
      { id: 'int-9', img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&q=80', url: '#', height: 480, title: 'Lounge Area', description: 'Relaxed sophistication' },
      { id: 'int-10', img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80', url: '#', height: 400, title: 'Walk-in Closet', description: 'Organized luxury storage' },
      { id: 'int-11', img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80', url: '#', height: 440, title: 'Hallway Design', description: 'Grand entrance statement' },
      { id: 'int-12', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80', url: '#', height: 390, title: 'Kids Room', description: 'Playful yet refined design' },
    ],
  },
  residential: {
    title: 'Residential',
    subtitle: 'Luxury Living Redefined',
    description: 'Discover our residential projects featuring bespoke homes designed for comfort and elegance.',
    images: [
      { id: 'res-1', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', url: '#', height: 450, title: 'Modern Villa', description: 'Contemporary luxury living' },
      { id: 'res-2', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80', url: '#', height: 380, title: 'Hillside Residence', description: 'Panoramic views and privacy' },
      { id: 'res-3', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', url: '#', height: 500, title: 'Beachfront Home', description: 'Coastal living at its finest' },
      { id: 'res-4', img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80', url: '#', height: 420, title: 'Urban Townhouse', description: 'City sophistication meets comfort' },
      { id: 'res-5', img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80', url: '#', height: 360, title: 'Garden Estate', description: 'Nature-integrated living' },
      { id: 'res-6', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', url: '#', height: 480, title: 'Penthouse Suite', description: 'Sky-high luxury apartment' },
      { id: 'res-7', img: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80', url: '#', height: 400, title: 'Lake House', description: 'Serene waterfront retreat' },
      { id: 'res-8', img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80', url: '#', height: 520, title: 'Country Manor', description: 'Classic elegance in the countryside' },
      { id: 'res-9', img: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80', url: '#', height: 370, title: 'Minimalist Home', description: 'Less is more philosophy' },
      { id: 'res-10', img: 'https://images.unsplash.com/photo-1600074169098-16a54d791d0d?w=600&q=80', url: '#', height: 440, title: 'Smart Home', description: 'Technology meets design' },
      { id: 'res-11', img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80', url: '#', height: 410, title: 'Family Residence', description: 'Spacious living for families' },
      { id: 'res-12', img: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&q=80', url: '#', height: 390, title: 'Eco House', description: 'Sustainable luxury living' },
    ],
  },
  commercial: {
    title: 'Commercial',
    subtitle: 'Inspiring Workspaces',
    description: 'Browse our commercial projects from modern offices to retail spaces and hospitality venues.',
    images: [
      { id: 'com-1', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', url: '#', height: 420, title: 'Tech Office', description: 'Modern open-plan workspace' },
      { id: 'com-2', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80', url: '#', height: 380, title: 'Co-working Space', description: 'Collaborative work environment' },
      { id: 'com-3', img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=600&q=80', url: '#', height: 500, title: 'Boutique Hotel', description: 'Luxury hospitality design' },
      { id: 'com-4', img: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=600&q=80', url: '#', height: 450, title: 'Conference Center', description: 'State-of-the-art meeting spaces' },
      { id: 'com-5', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', url: '#', height: 360, title: 'Restaurant Design', description: 'Immersive dining experience' },
      { id: 'com-6', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80', url: '#', height: 480, title: 'Retail Store', description: 'Brand-forward shopping space' },
      { id: 'com-7', img: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80', url: '#', height: 400, title: 'Corporate Lobby', description: 'Impressive first impressions' },
      { id: 'com-8', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', url: '#', height: 520, title: 'Innovation Hub', description: 'Creative technology space' },
      { id: 'com-9', img: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=600&q=80', url: '#', height: 370, title: 'Cafe Interior', description: 'Warm and inviting atmosphere' },
      { id: 'com-10', img: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=600&q=80', url: '#', height: 440, title: 'Showroom', description: 'Product display excellence' },
      { id: 'com-11', img: 'https://images.unsplash.com/photo-1600494603473-d2ad00adbe6d?w=600&q=80', url: '#', height: 410, title: 'Spa & Wellness', description: 'Tranquil commercial retreat' },
      { id: 'com-12', img: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80', url: '#', height: 390, title: 'Startup Office', description: 'Agile workspace design' },
    ],
  },
  renovation: {
    title: 'Renovation',
    subtitle: 'Transforming Possibilities',
    description: 'See how we breathe new life into existing structures with thoughtful and creative redesigns.',
    images: [
      { id: 'ren-1', img: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80', url: '#', height: 450, title: 'Loft Conversion', description: 'Industrial charm meets modern comfort' },
      { id: 'ren-2', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80', url: '#', height: 380, title: 'Kitchen Remodel', description: 'Complete culinary transformation' },
      { id: 'ren-3', img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80', url: '#', height: 500, title: 'Bathroom Renovation', description: 'Spa-like personal retreat' },
      { id: 'ren-4', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80', url: '#', height: 420, title: 'Heritage Restoration', description: 'Preserving history with modern touch' },
      { id: 'ren-5', img: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=600&q=80', url: '#', height: 360, title: 'Basement Conversion', description: 'Underground living space' },
      { id: 'ren-6', img: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=600&q=80', url: '#', height: 480, title: 'Facade Makeover', description: 'Stunning exterior transformation' },
      { id: 'ren-7', img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80', url: '#', height: 400, title: 'Open Plan Conversion', description: 'Breaking walls, creating flow' },
      { id: 'ren-8', img: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=600&q=80', url: '#', height: 520, title: 'Roof Extension', description: 'Expanding upward with style' },
      { id: 'ren-9', img: 'https://images.unsplash.com/photo-1600047508788-786f3865b4b9?w=600&q=80', url: '#', height: 370, title: 'Garden Room Addition', description: 'Blending indoor and outdoor' },
      { id: 'ren-10', img: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&q=80', url: '#', height: 440, title: 'Period Property Update', description: 'Classic meets contemporary' },
      { id: 'ren-11', img: 'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=600&q=80', url: '#', height: 410, title: 'Garage Conversion', description: 'New purpose, new design' },
      { id: 'ren-12', img: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=600&q=80', url: '#', height: 390, title: 'Complete Overhaul', description: 'Full property transformation' },
    ],
  },
};

const ProjectCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const category = slug ? categoryData[slug] : undefined;

  if (!category) {
    return <NotFound />;
  }

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
            scaleOnHover={true}
            hoverScale={1.05}
            blurToFocus={true}
          />
        </div>
      </section>
    </Layout>
  );
};

export default ProjectCategoryPage;

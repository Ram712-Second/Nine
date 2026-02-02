import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const teamMembers = [
  {
    id: 1,
    name: 'Alexander Mitchell',
    role: 'Founder & Principal Architect',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    id: 2,
    name: 'Sophia Ramirez',
    role: 'Lead Interior Designer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Senior Project Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Design Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    id: 5,
    name: 'James Walker',
    role: 'Structural Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 6,
    name: 'Elena Petrova',
    role: 'Landscape Architect',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

const Team = () => {
  return (
    <section id="team" className="relative bg-background py-24 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
            Our Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Meet the talented people behind our award-winning designs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({ delay: 3000, stopOnInteraction: false }),
            ]}
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent className="-ml-4">
              {teamMembers.map((member) => (
                <CarouselItem
                  key={member.id}
                  className="pl-4 basis-[60%] sm:basis-[40%] lg:basis-1/4"
                >
                  <div className="group relative overflow-hidden rounded-xl">
                    <div className="aspect-[3/4] max-h-[320px] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white md:text-2xl">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-light tracking-wide text-white/80">
                        {member.role}
                      </p>

                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 h-10 w-10 border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-background" />
            <CarouselNext className="-right-4 md:-right-12 h-10 w-10 border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-background" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;

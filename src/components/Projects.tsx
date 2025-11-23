import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: "Skyline Residence",
    location: "Manhattan, New York",
    description: "Luxury penthouse with panoramic city views",
    color: "from-slate-800 to-slate-900",
  },
  {
    id: 2,
    title: "Glass Pavilion",
    location: "Miami Beach, Florida",
    description: "Modern waterfront architecture",
    color: "from-blue-900 to-slate-800",
  },
  {
    id: 3,
    title: "Urban Workspace",
    location: "San Francisco, California",
    description: "Tech company headquarters design",
    color: "from-gray-800 to-slate-900",
  },
  {
    id: 4,
    title: "Zen Garden House",
    location: "Kyoto, Japan",
    description: "Minimalist residential sanctuary",
    color: "from-stone-800 to-gray-900",
  },
  {
    id: 5,
    title: "Metropolitan Tower",
    location: "Dubai, UAE",
    description: "Mixed-use commercial complex",
    color: "from-amber-900 to-slate-900",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className="sticky top-20 mb-20 h-[70vh] w-full"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
        {/* Background gradient (placeholder for image) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl font-bold text-white/5">{project.id}</div>
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white"
          >
            <div className="mb-2 text-sm font-light uppercase tracking-widest text-white/70">
              {project.location}
            </div>
            <h3 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
              {project.title}
            </h3>
            <p className="mb-6 text-lg text-white/90 md:text-xl">
              {project.description}
            </p>
            <button className="group/btn flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-medium backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50">
              <span>View Project</span>
              <svg
                className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative bg-background py-24 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our portfolio of architectural excellence
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

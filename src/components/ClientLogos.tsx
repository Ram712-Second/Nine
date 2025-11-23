import { motion } from 'framer-motion';

const clients = [
  { name: "Luxury Corp", abbr: "LC" },
  { name: "Urban Dev", abbr: "UD" },
  { name: "Skyline Group", abbr: "SG" },
  { name: "Metropolitan", abbr: "MP" },
  { name: "Horizon Real", abbr: "HR" },
  { name: "Zenith Build", abbr: "ZB" },
  { name: "Apex Properties", abbr: "AP" },
  { name: "Elite Estates", abbr: "EE" },
];

const ClientLogos = () => {
  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="relative bg-background py-20 overflow-hidden border-y border-border/50">
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light text-foreground tracking-tight"
        >
          Trusted By Leading Brands
        </motion.h2>
      </div>

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling logos */}
        <motion.div
          className="flex gap-16"
          animate={{
            x: [0, -50 * clients.length + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <div className="group relative w-32 h-32 flex items-center justify-center">
                {/* Logo placeholder - elegant monogram style */}
                <div className="w-full h-full rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:border-border group-hover:bg-card">
                  <span className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors tracking-wider">
                    {client.abbr}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;

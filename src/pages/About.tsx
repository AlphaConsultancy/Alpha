import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Users, BarChart3, Target, Globe, Handshake, Star,
  Play, Pause, ShieldCheck, Zap, Sparkles, Heart, Rocket
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryImage {
  src: string;
}

const galleryImages: GalleryImage[] = [
  { src: "1.webp" },
  { src: "2.webp" },
  { src: "3.webp" },
  { src: "4.webp" },
  { src: "5.webp" },
  { src: "6.webp" },
  { src: "7.webp" },
  { src: "8.webp" },
  { src: "9.webp" },
  { src: "10.webp" },
  { src: "11.webp" },
  { src: "12.webp" }
];

const values = [
  { icon: <ShieldCheck className="text-primary-foreground" />, title: "Integrity", text: "Integrity in every interaction" },
  { icon: <Zap className="text-primary-foreground" />, title: "Excellence", text: "Excellence in service delivery" },
  { icon: <Heart className="text-primary-foreground" />, title: "Personalized", text: "Personalized attention to each client" },
  { icon: <Sparkles className="text-primary-foreground" />, title: "Innovation", text: "Innovation in career solutions" },
  { icon: <Rocket className="text-primary-foreground" />, title: "Success", text: "Commitment to client success" },
];

const ImageWithSkeleton = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/10 relative group shadow-lg bg-white/5"
    >
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-[24px] md:rounded-[32px]" />}
      <img
        src={src.replace(/\.(jpg|jpeg|JPG)$/, '.webp')}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        alt={alt}
      />
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};




const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        videoRef.current.muted = false;
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Background Decorative Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-light/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-3/5 text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 backdrop-blur-md border border-primary/20 text-primary text-xs font-body font-semibold tracking-wider uppercase mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                India's Top Career Consultancy
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-[1.1]"
              >
                About <br />
                <span className="text-gradient-cyan">Alpha Consultancy</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
              >
                Since our inception, we've focused on delivering results that matter.
                From expert placement assistance to advanced personality development, we bridge the gap between skill and success.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/contact" className="px-8 py-4 bg-gradient-cyan rounded-xl text-primary-foreground font-body font-semibold shadow-cyan hover:opacity-90 transition-all">
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Floating Glass Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.4
              }}
              className="w-full lg:w-2/5 relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-[40px] p-10 shadow-2xl overflow-hidden group"
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[60px]" />

                <Zap className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-display text-3xl font-bold text-white mb-4">The Alpha Edge</h3>
                <p className="font-body text-white/70 leading-relaxed mb-8">
                  We don't just point you in a direction. We build the engine that takes you there.
                  98% success rate across 500+ global partners.
                </p>

                <ul className="space-y-4">
                  {[
                    "Industry-Leading Placement Networks",
                    "Intensive Interview & Resume Coaching",
                    "Advanced Personality & Soft Skills Training"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/90 font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Secondary floating element */}
              <motion.div
                animate={{ y: [20, 0, 20] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 z-20 bg-secondary/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <Star className="text-primary fill-primary w-5 h-5" />
                <span className="text-white font-display font-bold px-2">Top Performance Review 2025</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* Story & Mission Section */}
      <section className="pt-20 md:pt-28 pb-8 px-4 md:px-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            {/* Left Column: Our Story (Asymmetric split) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-5/12"
            >
              <div className="sticky top-32">
                <span className="font-display text-primary text-sm font-bold tracking-[0.3em] uppercase mb-6 block">
                  01 / Our Story
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                  Transforming Careers,{" "}
                  <span className="text-gradient-cyan">Changing Lives</span>
                </h2>
                <div className="space-y-6 text-muted-foreground font-body text-base md:text-lg leading-relaxed border-l-2 border-primary/20 pl-6">
                  <p>
                    Alpha Consultancy started with a clear mission: <span className="text-foreground font-semibold">to turn career aspirations into professional reality.</span> We bridge the critical gap between raw talent and the corporate world through strategic job guidance and placement support.
                  </p>
                  <p>
                    From a focused career coaching firm, we've evolved into a powerhouse for <span className="text-primary font-bold">professional transformation.</span> Our expertise in placement assistance and skill-building has empowered thousands to secure roles in top-tier organizations.
                  </p>
                  <p>
                    We believe success is a blend of <span className="text-foreground font-semibold">technical readiness and personal impact.</span> By combining resume coaching, interview mastery, and intensive personality development, we ensure you don't just find a job—you build a legacy.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Mission & Vision (Dynamic Grid) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-7/12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    badge: "🎯",
                    title: "Our Mission",
                    text: "To accelerate career success by providing world-class placement assistance, expert job guidance, and comprehensive personality development.",
                    accent: "border-l-cyan-500",
                    glow: "bg-cyan-500/10"
                  },
                  {
                    badge: "🔭",
                    title: "Our Vision",
                    text: "To be the global leader in professional empowerment, setting the standard for skill excellence and successful career placements.",
                    accent: "border-l-primary",
                    glow: "bg-primary/10"
                  },
                ].map((item, i) => (
                  <div key={i} className={`group relative bg-white/5 backdrop-blur-xl border border-white/10 ${item.accent} border-l-4 rounded-[32px] p-8 md:p-10 hover:bg-white/10 transition-all duration-500 shadow-2xl overflow-hidden flex flex-col min-h-[350px] justify-between`}>
                    <div className={`absolute -top-4 -right-4 w-32 h-32 ${item.glow} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 -z-10`} />

                    <div>
                      <span className="text-4xl md:text-5xl mb-6 md:mb-8 block relative z-10">{item.badge}</span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6 relative z-10">{item.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed relative z-10">{item.text}</p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="pt-8 pb-12 px-4 md:px-8">
        <div className="container mx-auto">
          <SectionHeading badge="Leadership" title="Meet Our Founders" description="Visionary leaders driving Alpha Consultancy's mission to transform careers." />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Aftab Barkat",
                role: "Co-Founder & CEO",
                desc: "Visionary leader with over 15 years of experience in career counseling and organizational development.",
                tags: ["Career Strategy", "Leadership Development", "Business Growth"],
                img: "./Aftab_barkat.png",
              },
              {
                name: "Sabia Barkat",
                role: "Co-Founder & COO",
                desc: "Expert in educational consulting and student development with a passion for empowering young minds.",
                tags: ["Education Consulting", "Student Development", "Academic Planning"],
                img: "./Sabia_Barkat.png",
              },
            ].map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-gradient-card rounded-2xl border border-border p-6 text-center"
              >
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/30">
                  <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{founder.name}</h3>
                <p className="text-primary text-sm font-body mb-3">{founder.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{founder.desc}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {founder.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Success Gallery */}
      <section className="pt-8 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden">
        <div className="container mx-auto">
          <SectionHeading
            badge="Success Gallery"
            title="Professional Impact"
            description="Moments of professional transformation and corporate excellence."
          />

          <div className="flex flex-col xl:flex-row gap-8 items-start">
            {/* Left Column: Standing Portrait Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full xl:w-1/3 aspect-[3/4] xl:aspect-[2/3] rounded-[40px] overflow-hidden border-2 border-primary/30 bg-black/40 backdrop-blur-sm relative group cursor-pointer shadow-[0_0_50px_rgba(6,182,212,0.15)]"
              onClick={togglePlay}
            >
              {/* Combined Logo & Play Placeholder */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 p-12"
                  >
                    <div className="relative group/logo">
                      <img
                        src="/logo.jpg"
                        alt="Alpha Consultancy Logo"
                        className="w-full max-w-[480px] h-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-700 rounded-3xl"
                      />
                      {/* Integrated Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/30 backdrop-blur-xl flex items-center justify-center border border-white/40 group-hover:scale-110 group-hover:bg-primary/50 transition-all duration-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                          <Play fill="white" className="text-white ml-2 w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <video
                ref={videoRef}
                src="/Alpha-Consultancy.mp4"
                className={`w-full h-full object-contain relative z-0 transition-all duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                preload="metadata"
                muted
                loop
                playsInline
              />

              <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white bg-primary/80 px-4 py-1.5 rounded-full">Success Journey</span>
              </div>
            </motion.div>

            {/* Right Column: 12 Image Grid */}
            <div className="w-full xl:w-2/3">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                {galleryImages.map((img, i) => (
                  <ImageWithSkeleton
                    key={i}
                    src={`/Gallery_grid_images/${img.src}`}
                    alt={`Alpha Consultancy Impact ${i + 1}`}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

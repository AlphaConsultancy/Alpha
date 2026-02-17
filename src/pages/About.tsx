import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, BarChart3, Target, Globe, Handshake, Star, Play, Pause } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ShieldCheck, Zap, Sparkles, Heart, Rocket } from "lucide-react";

const values = [
  { icon: <ShieldCheck className="text-primary-foreground" />, title: "Integrity", text: "Integrity in every interaction" },
  { icon: <Zap className="text-primary-foreground" />, title: "Excellence", text: "Excellence in service delivery" },
  { icon: <Heart className="text-primary-foreground" />, title: "Personalized", text: "Personalized attention to each client" },
  { icon: <Sparkles className="text-primary-foreground" />, title: "Innovation", text: "Innovation in career solutions" },
  { icon: <Rocket className="text-primary-foreground" />, title: "Success", text: "Commitment to client success" },
];



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
                img: "https://alphaconsultancyinc.com/Assets/images/Team/Aftab_barkat.png",
              },
              {
                name: "Sabia Barkat",
                role: "Co-Founder & COO",
                desc: "Expert in educational consulting and student development with a passion for empowering young minds.",
                tags: ["Education Consulting", "Student Development", "Academic Planning"],
                img: "https://alphaconsultancyinc.com/Assets/images/Team/Sabia_Barkat.png",
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

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6 auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px]">
            {/* Top Row Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-1 lg:col-span-3 lg:row-span-1 rounded-3xl overflow-hidden border border-white/5 relative group"
            >
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Professional workshop at Alpha Consultancy office in Ahmedabad" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-1 lg:col-span-6 lg:row-span-1 rounded-3xl overflow-hidden border border-white/5 relative group"
            >
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Team meeting and collaboration session at Alpha Consultancy" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="col-span-2 lg:col-span-3 lg:row-span-1 rounded-3xl overflow-hidden border border-white/5 relative group"
            >
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Alpha Consultancy success story: individual achieving career goals" />
            </motion.div>

            {/* Middle Row: Left Images + Central Video + Right Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-2 lg:col-span-4 lg:row-span-4 row-span-2 flex flex-col md:flex-row lg:flex-col gap-4"
            >
              <div className="flex-1 rounded-3xl overflow-hidden border border-white/5 relative group">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Corporate training session for job placement in Ahmedabad" />
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden border border-white/5 relative group">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Alpha Consultancy resource center training students for future jobs" />
              </div>
            </motion.div>

            {/* Central Video Anchor - Prominent Standing Portrait Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-2 lg:col-span-4 lg:row-span-4 row-span-4 rounded-[32px] md:rounded-[40px] overflow-hidden border border-primary/20 bg-black relative group cursor-pointer shadow-2xl shadow-primary/10"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src="/Alpha-Consultancy.mp4"
                className={`w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-60 group-hover:scale-105 group-hover:opacity-40'}`}
                preload="metadata"
                muted
                loop
                playsInline
              />

              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20"
                  >
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 backdrop-blur-xl flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-primary/40 transition-all duration-500 shadow-2xl">
                      <Play fill="white" className="text-white ml-2 w-8 h-8 md:w-12 md:h-12" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Pause fill="white" className="text-white w-6 h-6" />
                  </div>
                </motion.div>
              )}

              <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white">Success Journey</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="col-span-2 lg:col-span-4 lg:row-span-4 row-span-2 flex flex-col md:flex-row lg:flex-col gap-4 md:gap-6"
            >
              <div className="flex-1 rounded-3xl overflow-hidden border border-white/5 relative group">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Modern office environment for high-end professional development" />
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden border border-white/5 relative group">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Leadership coaching and career navigation with Alpha Consultancy" />
              </div>
            </motion.div>

            {/* Bottom Row Images (Mixed aspect ratios) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="col-span-1 lg:col-span-4 lg:row-span-1 rounded-3xl overflow-hidden border border-white/5 relative group"
            >
              <img src="https://images.unsplash.com/photo-1454165833202-d196c735afe1?q=80&w=800" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Data-driven career analysis at Alpha Consultancy" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="col-span-1 lg:col-span-4 lg:row-span-1 rounded-3xl overflow-hidden border border-white/5 relative group"
            >
              <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Community support and networking at Alpha Consultancy" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="col-span-2 lg:col-span-4 lg:row-span-1 rounded-3xl overflow-hidden border border-white/5 relative group"
            >
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Professional presentation on career strategies with Alpha Consultancy mentors" />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

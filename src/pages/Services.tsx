import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Target, GraduationCap, Briefcase, Rocket, Users, Globe, Star, Handshake } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ServiceScene3D from "@/components/ServiceScene3D";

const services = [
  {
    icon: <Target className="text-primary" />,
    title: "Career counselling & Job guidance",
    description: "Expert guidance to help you navigate your career path and secure your ideal job role.",
    features: [
      "Personalized Career Roadmap",
      "One-on-One Counseling Sessions",
      "Job Market Trend Analysis",
      "Career Transition Support"
    ],
  },
  {
    icon: <Users className="text-primary" />,
    title: "Placement Assistance",
    description: "Dedicated support to connect you with top employers and secure successful placements.",
    features: [
      "Job Matching & Recommendations",
      "Employer Network Access",
      "Placement Support Programs",
      "Regular Feedback & Support"
    ],
  },
  {
    icon: <Briefcase className="text-primary" />,
    title: "Resume writing & Interview coaching",
    description: "Professional resume crafting and interview preparation to make you stand out from the crowd.",
    features: [
      "ATS-Optimized Resumes",
      "Customized Cover Letters",
      "Intensive Mock Interviews",
      "Post-Interview Follow-up Tips"
    ],
  },
  {
    icon: <Star className="text-primary" />,
    title: "English speaking & Personality Development",
    description: "Enhance your communication skills and build a powerful professional personality.",
    features: [
      "Spoken English Proficiency",
      "Public Speaking Training",
      "Personality Enhancement",
      "Body Language & Etiquette"
    ],
  },
  {
    icon: <Handshake className="text-primary" />,
    title: "Corporate & Soft Skills training",
    description: "Master the essential soft skills and professional etiquette required for corporate success.",
    features: [
      "Effective Communication Skills",
      "Leadership & Team Building",
      "Time & Stress Management",
      "Corporate Culture Adaptability"
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Decorative Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-light/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <ServiceScene3D />

        <div className="relative z-10 container mx-auto text-center px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow" />
            <span className="text-white text-xs font-display font-medium tracking-[0.2em] uppercase">Tailored Excellence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-[0.95] tracking-tighter"
          >
            Empowering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-light to-primary bg-[length:200%_auto] animate-shimmer">
              Professional Journeys
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-muted-foreground/80 font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Strategic placement assistance, resume mastery, and personality transformation designed for the modern corporate landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-display font-bold shadow-2xl shadow-primary/20 hover:scale-105 hover:bg-white hover:text-primary transition-all duration-300"
            >
              Start Your Evolution
            </Link>
            <a
              href="#services"
              className="w-full md:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-display font-bold hover:bg-white/10 transition-all duration-300"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="section-padding relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <SectionHeading
            badge="Solutions"
            title="Our Core Expertises"
            description="Specialized programs designed to accelerate your career trajectory."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-navy-deep/50 relative">
        <div className="container mx-auto">
          <SectionHeading
            badge="The Roadmap"
            title="Success Architecture"
            description="Our proven methodology for your professional transformation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { step: "01", title: "Global Discovery", desc: "We analyze your unique profile and career aspirations to build a strategy." },
              { step: "02", title: "Target Analysis", desc: "Mapping your skills against current industry benchmarks and requirements." },
              { step: "03", title: "Skill Evolution", desc: "Intensive training focusing on your technical and interpersonal gaps." },
              { step: "04", title: "Peak Placement", desc: "Strategic positioning and interview coaching to secure your ideal role." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 text-8xl font-black text-white/5 group-hover:text-primary/10 transition-colors uppercase italic tracking-tighter">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="text-primary font-display font-bold text-sm tracking-widest mb-6 block">PHASE {item.step}</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent w-0 group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;

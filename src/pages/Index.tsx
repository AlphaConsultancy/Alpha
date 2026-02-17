import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, GraduationCap, Briefcase, Rocket, Users, Globe, Star, Handshake } from "lucide-react";
import { lazy, Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";

const Hero3DScene = lazy(() => import("@/components/Hero3DScene"));

const services = [
  {
    icon: <Target className="text-primary" />,
    title: "Career counselling & Job guidance",
    description: "Expert guidance to help you navigate your career path and secure your ideal job role.",
    features: ["One-on-One Counseling", "Career Roadmap", "Job Search Strategy", "Industry Insights"],
  },
  {
    icon: <Users className="text-primary" />,
    title: "Placement Assistance",
    description: "Dedicated support to connect you with top employers and secure successful placements.",
    features: ["Job Matching", "Interview Scheduling", "Employer Connect", "Placement Tracking"],
  },
  {
    icon: <Briefcase className="text-primary" />,
    title: "Resume writing & Interview coaching",
    description: "Professional resume crafting and interview preparation to make you stand out from the crowd.",
    features: ["ATS-Friendly Resumes", "Portfolio Building", "Mock Interviews", "Confident Communication"],
  },
  {
    icon: <Star className="text-primary" />,
    title: "English speaking & Personality Development",
    description: "Enhance your communication skills and build a powerful professional personality.",
    features: ["Fluent English", "Body Language", "Public Speaking", "Confidence Building"],
  },
  {
    icon: <Handshake className="text-primary" />,
    title: "Corporate & Soft Skills training",
    description: "Master the essential soft skills and professional etiquette required for corporate success.",
    features: ["Leadership Skills", "Emotional Intelligence", "Team Collaboration", "Corporate Etiquette"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Hero3DScene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-[1] pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center pt-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-body font-semibold tracking-wider uppercase mb-6">
              India's Leading Career Consultancy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Shape Your Future with{" "}
            <span className="text-gradient-cyan">Expert Guidance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Empowering you with expert placement assistance, job guidance, and professional personality development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-cyan rounded-xl text-primary-foreground font-body font-semibold shadow-cyan hover:opacity-90 transition-all pointer-events-auto"
            >
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-body font-semibold hover:bg-secondary transition-all pointer-events-auto"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>


      {/* Services */}
      <section className="relative z-10 py-32 md:py-48">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left side space for sphere */}
            <div className="hidden lg:block lg:w-1/2" />

            {/* Right side content */}
            <div className="w-full lg:w-1/2">
              <div className="text-left mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-body font-semibold tracking-wider uppercase mb-4">
                  Our Services
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Comprehensive <span className="text-gradient-cyan">Career Solutions</span>
                </h2>
                <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl">
                  From students to executives, we provide end-to-end career guidance and professional development services.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service, i) => (
                  <ServiceCard key={service.title} {...service} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;

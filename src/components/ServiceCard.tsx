import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const ServiceCard = ({ icon, title, description, features, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  // Handle mouse movement for tilt and glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize values to [-0.5, 0.5]
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);

    // Set custom properties for glow position
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 transition-all duration-500 overflow-hidden"
    >
      {/* Dynamic Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6, 182, 212, 0.15), transparent 40%)"
        }}
      />

      {/* Content Container (Layered for Depth) */}
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-cyan/10 flex items-center justify-center text-3xl mb-6 border border-cyan-500/20 group-hover:bg-gradient-cyan group-hover:shadow-cyan transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
          <div className="group-hover:text-primary-foreground transition-colors duration-500">
            {icon}
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-muted-foreground text-[15px] mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>

        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-glow shadow-primary/40" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative Border Glow */}
      <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ServiceCard;

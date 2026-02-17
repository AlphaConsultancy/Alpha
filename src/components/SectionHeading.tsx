import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
  children?: ReactNode;
  center?: boolean;
}

const SectionHeading = ({ badge, title, description, children, center = true }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${center ? "text-center" : ""}`}
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary text-xs font-body font-semibold tracking-wider uppercase mb-4">
        {badge}
      </span>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground font-body max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
};

export default SectionHeading;

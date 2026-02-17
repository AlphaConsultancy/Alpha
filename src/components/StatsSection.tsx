import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

const StatItem = ({ value, suffix, label }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient-cyan mb-2">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground text-sm font-body">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 15000, suffix: "+", label: "Careers Transformed" },
    { value: 500, suffix: "+", label: "Partner Organizations" },
    { value: 50, suffix: "+", label: "Expert Counselors" },
    { value: 98, suffix: "%", label: "Success Rate" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="section-padding"
    >
      <div className="container mx-auto">
        <div className="bg-gradient-card rounded-3xl border border-border p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;

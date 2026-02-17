import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Clock, Target, FileText, Lightbulb, BarChart3, Handshake, CalendarClock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const consultationTypes = [
  "Career Guidance & Counseling",
  "Stream/Course Selection",
  "Study Abroad Planning",
  "Job Readiness & Interview Prep",
  "Resume/LinkedIn Review",
  "Career Transition",
  "Leadership Coaching",
  "Entrepreneurship Guidance",
  "Other",
];

const ageGroups = [
  "School Student (10th-12th)",
  "College Student",
  "Recent Graduate",
  "Working Professional (0-5 years)",
  "Mid-Career Professional (5+ years)",
  "Senior Professional/Executive",
  "Career Break/Second Career",
];

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

const benefits = [
  { icon: <Target className="text-primary" />, title: "Personalized Assessment", desc: "Comprehensive evaluation of your skills, interests, and aspirations." },
  { icon: <FileText className="text-primary" />, title: "Action Plan", desc: "Customized roadmap with clear steps to achieve your career goals." },
  { icon: <Lightbulb className="text-primary" />, title: "Expert Insights", desc: "Industry knowledge and trends from experienced career counselors." },
  { icon: <BarChart3 className="text-primary" />, title: "Resources & Tools", desc: "Access to assessment tools, templates, and career resources." },
  { icon: <Handshake className="text-primary" />, title: "Ongoing Support", desc: "Follow-up guidance and support throughout your career journey." },
  { icon: <CalendarClock className="text-primary" />, title: "Flexible Scheduling", desc: "Online, in-person, or phone consultations at your convenience." },
];

const faqs = [
  { q: "Is the first consultation really free?", a: "Yes! Your first 30-minute consultation is completely free with no obligations." },
  { q: "How long is a consultation session?", a: "The free initial consultation is 30 minutes. Paid sessions range from 60-90 minutes." },
  { q: "Can I reschedule my appointment?", a: "Yes, you can reschedule up to 24 hours before your appointment." },
  { q: "What should I prepare for the consultation?", a: "Bring your resume/CV, academic records, and any questions about your career." },
  { q: "Do you offer consultations in other languages?", a: "Yes, we offer consultations in Hindi, Kannada, Tamil, Telugu, and other regional languages." },
];

const ContactCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 transition-all duration-500 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6, 182, 212, 0.1), transparent 40%)" }} />
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    ageGroup: "", consultationType: "", date: "", time: "",
    mode: "", message: "", agree: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our team will contact you within 24 hours.");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all backdrop-blur-md";
  const labelClass = "block text-[13px] font-display font-bold text-primary/80 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Background Decorative Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-light/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow" />
            <span className="text-white text-[10px] font-display font-medium tracking-[0.3em] uppercase">Connect With Alpha</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tighter leading-tight"
          >
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-light to-primary bg-[length:200%_auto] animate-shimmer">
              Professional Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-muted-foreground/80 font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Take the first step towards career excellence. Schedule a high-impact session with our expert consultants today.
          </motion.p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="pt-0 pb-8 md:pb-12 px-4 md:px-8 relative z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 backdrop-blur-2xl bg-white/5 rounded-[40px] border border-white/10 p-8 md:p-12 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="relative z-10">
                <h2 className="font-display text-3xl font-black text-foreground mb-8 tracking-tighter">Strategic Session <span className="text-primary italic">Request</span></h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input type="text" required className={inputClass} placeholder="Enter first name"
                        value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input type="text" required className={inputClass} placeholder="Enter last name"
                        value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Email Identification</label>
                      <input type="email" required className={inputClass} placeholder="your@email.com"
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                      <label className={labelClass}>Direct Phone</label>
                      <input type="tel" required className={inputClass} placeholder="+91 XXXXXXXXXX"
                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Demographic Filter</label>
                      <select required className={inputClass}
                        value={formData.ageGroup} onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}>
                        <option value="" className="bg-navy">Select age group</option>
                        {ageGroups.map((g) => <option key={g} value={g} className="bg-navy">{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Consultation Pathway</label>
                      <select required className={inputClass}
                        value={formData.consultationType} onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}>
                        <option value="" className="bg-navy">Select pathway</option>
                        {consultationTypes.map((t) => <option key={t} value={t} className="bg-navy">{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>Strategic Date</label>
                      <input type="date" required className={inputClass}
                        value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                    </div>
                    <div>
                      <label className={labelClass}>Timeline Slot</label>
                      <select required className={inputClass}
                        value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })}>
                        <option value="" className="bg-navy">Select time</option>
                        {timeSlots.map((t) => <option key={t} value={t} className="bg-navy">{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Meeting Interface</label>
                      <select required className={inputClass}
                        value={formData.mode} onChange={(e) => setFormData({ ...formData, mode: e.target.value })}>
                        <option value="" className="bg-navy">Select interface</option>
                        <option value="online" className="bg-navy">Online Interface</option>
                        <option value="in-person" className="bg-navy">In-Person Lounge</option>
                        <option value="phone" className="bg-navy">Direct Voice</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Mission Objectives & Goals</label>
                    <textarea required rows={4} className={inputClass} placeholder="Describe your career goals and current roadblocks..."
                      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>

                  <label className="flex items-center gap-4 cursor-pointer group/label">
                    <div className="relative w-5 h-5 border-2 border-primary/30 rounded flex items-center justify-center transition-all group-hover/label:border-primary">
                      <input type="checkbox" required className="absolute inset-0 opacity-0 cursor-pointer"
                        checked={formData.agree} onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} />
                      {formData.agree && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-primary rounded-[2px]" />}
                    </div>
                    <span className="text-[13px] text-muted-foreground font-medium group-hover/label:text-foreground transition-colors">
                      Acknowledged Strategic Terms & Privacy Policy
                    </span>
                  </label>

                  <button type="submit" className="group relative w-full py-5 bg-primary text-primary-foreground rounded-2xl font-display font-black text-lg shadow-2xl shadow-primary/30 overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <span className="relative z-10">Initiate Consultation</span>
                    <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 opacity-10" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Sidebar */}
            <div className="space-y-6">
              <ContactCard>
                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-primary rounded-full" /> Direct Channels
                </h3>
                <div className="space-y-6">
                  <a href="mailto:alphaconsultancyinc@gmail.com" className="group/item flex items-center gap-4 text-muted-foreground hover:text-white transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:bg-primary/20 transition-all">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium">alphaconsultancyinc@gmail.com</span>
                  </a>
                  <a href="tel:+919274709029" className="group/item flex items-center gap-4 text-muted-foreground hover:text-white transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover/item:bg-primary/20 transition-all">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium">+91 9274709029</span>
                  </a>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                      <MapPin size={18} />
                    </div>
                    <span className="text-sm font-medium">Ahmedabad, Gujarat, India</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                      <Clock size={18} />
                    </div>
                    <span className="text-sm font-medium">Mon - Sat: 24/7</span>
                  </div>
                </div>
              </ContactCard>

              <motion.a
                href="https://wa.me/+919274709029"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="block"
              >
                <ContactCard className="border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 text-center">
                  <div className="text-4xl mb-4 animate-bounce">💬</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 tracking-tight">Rapid WhatsApp Link</h3>
                  <p className="text-muted-foreground text-sm font-medium">Verified response within 10 minutes</p>
                </ContactCard>
              </motion.a>

              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=Alpha+Consultancy+Ahmedabad+Makarba+Road"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                <ContactCard className="bg-navy-deep/80 border-dashed border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all cursor-pointer">
                  <h4 className="font-display text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-4">India Operation</h4>
                  <p className="text-xs text-white/30 leading-relaxed font-medium">
                    FF26, block K, Al Burooj, Makarba Road near Empire Party Plot. Ahmedabad, Gujarat.
                  </p>
                </ContactCard>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pt-8 md:pt-12 pb-8 md:pb-12 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto relative z-10 px-4">
          <SectionHeading badge="Strategic Value" title="High-Impact Outcomes" description="Experience the Alpha advantage through our structured consultation process." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[80px] transition-all group-hover:w-32 group-hover:h-32 group-hover:bg-primary/10" />
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <div className="text-primary">{b.icon}</div>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-tight">{b.title}</h3>
                <p className="text-muted-foreground/80 text-[15px] leading-relaxed group-hover:text-foreground/90 transition-colors">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pt-8 md:pt-12 pb-20 md:pb-28 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionHeading badge="Assistance" title="Strategic Clarity FAQ" />
          <div className="grid gap-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 cursor-pointer open:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <summary className="font-display text-lg font-bold text-foreground list-none flex justify-between items-center tracking-tight">
                  <span className="pr-8">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-open:rotate-45 transition-transform">
                    <span className="text-primary text-2xl leading-none">+</span>
                  </div>
                </summary>
                <div className="relative overflow-hidden transition-all duration-500">
                  <p className="mt-4 text-muted-foreground/90 text-[15px] leading-relaxed font-medium pl-1 border-l-2 border-primary/30">
                    {faq.a}
                  </p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#020617] border-t border-white/5 overflow-hidden">
      {/* Footer Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4 group">
              <img
                src="/logo.jpg"
                alt="Alpha Consultancy"
                className="w-12 h-12 rounded-xl object-cover transition-transform duration-500 group-hover:scale-110 shadow-2xl shadow-primary/10"
              />
              <span className="font-display text-2xl font-black text-foreground tracking-tighter uppercase">
                Alpha <span className="text-primary italic">Consultancy</span>
              </span>
            </div>
            <p className="text-white/40 text-[15px] leading-relaxed font-medium max-w-sm">
              India's premium career architecture firm. Dedicated to engineering professional excellence through strategic guidance and personality evolution.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xs font-black text-white/20 uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <div className="flex flex-col gap-4">
              {[
                { to: "/", label: "Home Base" },
                { to: "/about", label: "Our Philosophy" },
                { to: "/services", label: "Service Pillars" },
                { to: "/contact", label: "Secure Consultation" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center gap-3 text-white/50 hover:text-primary text-sm font-bold tracking-tight transition-all"
                >
                  <div className="w-0 h-[1px] bg-primary transition-all group-hover:w-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-black text-white/20 uppercase tracking-[0.2em] mb-8">Core Pillars</h4>
            <div className="flex flex-col gap-4">
              {["Career Guidance", "Placement Strategy", "Corporate Training", "Elite Soft Skills", "Executive Coaching"].map(
                (s) => (
                  <Link key={s} to="/services" className="group flex items-center gap-3 text-white/50 hover:text-primary text-sm font-bold tracking-tight transition-all">
                    <div className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-primary transition-all" />
                    {s}
                  </Link>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-black text-white/20 uppercase tracking-[0.2em] mb-8">Headquarters</h4>
            <div className="space-y-6">
              <a
                href="mailto:alphaconsultancyinc@gmail.com"
                aria-label="Send an email to Alpha Consultancy"
                className="group flex items-center gap-4 text-white/50 hover:text-white transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all">
                  <Mail size={16} className="text-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold tracking-tight">alphaconsultancyinc@gmail.com</span>
              </a>
              <a
                href="tel:+919274709029"
                aria-label="Call Alpha Consultancy at +91 9274709029"
                className="group flex items-center gap-4 text-white/50 hover:text-white transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all">
                  <Phone size={16} className="text-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold tracking-tight">+91 9274709029</span>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Alpha+Consultancy+Ahmedabad+Makarba+Road"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Alpha Consultancy headquarters in Ahmedabad"
                className="group flex items-center gap-4 text-white/30 hover:text-white transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all">
                  <MapPin size={16} className="text-primary" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Ahmedabad, Gujarat</span>
                  <span className="text-[11px] font-bold tracking-tight">Al Burooj, Makarba Road</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Alpha Consultancy Inc. Engineering Excellence.
          </p>
          <div className="flex gap-8">
            <a
              href="https://wa.me/+919274709029"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              className="group flex items-center gap-2 text-white/20 hover:text-primary text-[10px] font-black uppercase tracking-[0.2em] transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-green-500/50 group-hover:bg-green-500 animate-pulse" aria-hidden="true" />
              WhatsApp Interface
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

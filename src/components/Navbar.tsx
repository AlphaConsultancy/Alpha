import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
        ? "bg-navy/40 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        : "bg-transparent py-5 border-b border-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-10">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="Alpha Consultancy Logo"
              className="w-11 h-11 rounded-xl object-cover transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1 shadow-2xl shadow-primary/20"
            />
            <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-lg pointer-events-none" />
          </div>
          <span className="font-display text-xl font-black text-foreground tracking-tighter uppercase">
            Alpha <span className="text-primary italic">Consultancy</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative font-display text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-500 pb-1 ${location.pathname === link.to
                ? "text-primary"
                : "text-white/40 hover:text-white"
                }`}
            >
              <span className="relative z-10">{link.label}</span>
              {location.pathname === link.to ? (
                <motion.div
                  layoutId="nav-indicator-desktop"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow"
                />
              ) : (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/20 transition-all duration-500 group-hover:w-full" />
              )}
            </Link>
          ))}

          <Link
            to="/contact"
            className="group relative px-7 py-3 bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all hover:border-primary/50"
          >
            <div className="relative z-10 font-display text-xs font-black uppercase tracking-widest text-white group-hover:text-primary transition-colors">
              Secure Session
            </div>
            <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white transition-all active:scale-90"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 px-4 py-6 md:hidden"
          >
            <div className="backdrop-blur-3xl bg-navy/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between px-6 py-4 rounded-2xl font-display text-sm font-bold uppercase tracking-widest transition-all ${location.pathname === link.to
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {link.label}
                  {location.pathname === link.to && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-4 block w-full py-5 bg-white text-navy rounded-2xl font-display font-black text-center uppercase tracking-widest shadow-xl active:scale-[0.98] transition-transform"
              >
                Secure Session
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="pt-32 pb-20 container mx-auto px-4 md:px-8 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-8 tracking-tighter">
                        Privacy <span className="text-primary italic">Policy</span>
                    </h1>

                    <div className="space-y-12 font-body text-muted-foreground leading-relaxed">
                        <section>
                            <h2 className="text-foreground text-xl font-bold mb-4 uppercase tracking-widest text-primary/80">1. Data Transmission</h2>
                            <p>
                                At Alpha Consultancy, we prioritize your professional security. Any information shared via our "Secure Session" portal is transmitted via encrypted channels directly to our strategic consulting team. We do not store your personal details in public databases.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-foreground text-xl font-bold mb-4 uppercase tracking-widest text-primary/80">2. Information Collection</h2>
                            <p>
                                We collect specific professional identification data including your name, corporate email, and contact number. This data is used exclusively for scheduled consultation sessions and strategic guidance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-foreground text-xl font-bold mb-4 uppercase tracking-widest text-primary/80">3. Strategic Confidentiality</h2>
                            <p>
                                Every mission objective and professional goal shared with us is treated with elite-level confidentiality. We do not sell, trade, or transfer your identification data to outside parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-foreground text-xl font-bold mb-4 uppercase tracking-widest text-primary/80">4. Third-Party Services</h2>
                            <p>
                                We utilize premium infrastructure providers (Netlify, Resend) to ensure the high-availability and security of our transmission systems. These partners are compliant with global security standards.
                            </p>
                        </section>

                        <section className="pt-10 border-t border-white/5">
                            <p className="text-sm font-semibold text-foreground/60 italic">
                                Last Updated: February 2026. For high-priority inquiries regarding data security, contact our operations desk directly.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;

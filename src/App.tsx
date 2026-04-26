import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
const Spline = lazy(() => import('@splinetool/react-spline'));
import { 
  Code2, 
  Smartphone, 
  Palette, 
  Rocket, 
  ArrowRight, 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Instagram,
  ChevronDown,
  ExternalLink,
  Globe,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#services' },
    { name: 'Projets', href: '#work' },
    { name: 'L\'Agence', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'py-4 glass-morphism' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center font-display font-bold text-white text-lg">
            M
          </div>
          <span className="font-display font-bold text-xl tracking-tight uppercase">MADADEV<span className="text-blue-accent">972</span></span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-slate-400 hover:text-white font-medium transition-colors relative group text-sm"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium cursor-pointer hover:bg-white/10 transition-all"
          >
            Contactez-nous
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-dark border-b border-white/10"
          >
            <div className="flex flex-col gap-4 p-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-display font-bold text-white hover:text-blue-accent"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl mt-4">
                COMMENCER UN PROJET
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, description, delay, accentColor = "blue" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    viewport={{ once: true }}
    className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all backdrop-blur-sm"
  >
    <div className={`text-xs font-bold mb-2 uppercase tracking-wider ${accentColor === 'blue' ? 'text-blue-accent' : accentColor === 'emerald' ? 'text-emerald-accent' : 'text-indigo-accent'}`}>
      {title}
    </div>
    <div className="text-xl font-semibold mb-3 leading-snug">{description}</div>
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all text-xs font-bold tracking-widest text-slate-500 uppercase">
       Explorer <ArrowRight size={14} />
    </div>
  </motion.div>
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

const RobotIntro = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setIsLoaded(true);
      const spline = viewer.spline;
      
      // Tentative de masquer le logo "Built with Spline"
      try {
        const logo = viewer.shadowRoot?.querySelector('#logo');
        if (logo) logo.style.display = 'none';
        
        // Autre sélecteur possible pour les versions récentes
        const watermark = viewer.shadowRoot?.querySelector('a[href*="spline.design"]');
        if (watermark) watermark.style.display = 'none';
      } catch (e) {
        console.warn("Impossible de masquer le logo Spline");
      }

      if (!spline) return;

      const allObjects = spline.getAllObjects();
      
      const targets = allObjects.map((obj: any) => ({
        obj: obj,
        initialY: obj.position.y,
        name: obj.name.toLowerCase()
      }));

      function loop() {
        targets.forEach((item: any) => {
          const isHeadPart = item.name.includes('head') || 
                             item.name.includes('eye') || 
                             item.name.includes('neck');

          if (!isHeadPart) {
            item.obj.rotation.x = 0;
            item.obj.rotation.z = 0;
            item.obj.position.y = item.initialY;
          }
        });
        requestAnimationFrame(loop);
      }
      loop();
    };

    viewer.addEventListener('load-complete', handleLoad);
    return () => viewer.removeEventListener('load-complete', handleLoad);
  }, []);

  return (
    <section className="relative w-full h-screen bg-primary-dark flex items-center justify-center overflow-hidden px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Texte à gauche */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="z-20 relative pointer-events-none"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-blue-accent font-display font-bold tracking-widest uppercase mb-4 block"
          >
            Bienvenue dans le futur
          </motion.span>
          <h2 className="text-white font-display font-black text-5xl md:text-7xl leading-tight uppercase mb-6">
            NOTRE EXPERTISE AU SERVICE DE <span className="text-gradient">VOTRE VISION</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md mb-8 leading-relaxed">
            Nous créons des expériences numériques immersives où la technologie rencontre l'art. Laissez notre assistant vous guider.
          </p>
        </motion.div>

        {/* Robot à droite avec animation d'entrée */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={isLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full h-[50vh] lg:h-[80vh] pointer-events-auto z-10"
        >
          <spline-viewer 
            ref={viewerRef}
            url="/robot_landing.splinecode" 
            style={{ width: '100%', height: '100%' }}
          />
        </motion.div>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-dark z-30">
           <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce z-20 pointer-events-none">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};


const Hero = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={targetRef} className="relative min-h-[768px] lg:h-screen flex items-center overflow-hidden px-12">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 items-center relative z-20">
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-accent text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-accent animate-pulse"></span>
            Basé en Martinique • Antilles
          </div>
          <h1 className="font-display font-extrabold text-[64px] md:text-[84px] leading-[0.9] tracking-tighter mb-8">
            L'EXCELLENCE <br />
            <span className="text-gradient italic">DIGITALE</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed font-light">
            Propulsez votre entreprise avec des solutions web et mobiles sur-mesure. Une ingénierie de haut niveau pour des performances exceptionnelles.
          </p>
          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-white text-black font-bold rounded-xl transition-transform"
            >
              Démarrer un projet
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Voir le portfolio
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-12 lg:col-span-5 relative hidden lg:block"
        >
          <div className="bg-gradient-to-tr from-blue-500/10 to-transparent border border-white/10 rounded-3xl backdrop-blur-sm p-8 flex flex-col justify-between h-[500px]">
             <div className="space-y-6">
                <ServiceCard 
                  title="DÉVELOPPEMENT WEB"
                  description="Architectures Cloud Scalables"
                  delay={0.2}
                  accentColor="blue"
                />
                <ServiceCard 
                  title="UX / UI DESIGN"
                  description="Interfaces Ultra-Fluides"
                  delay={0.3}
                  accentColor="emerald"
                />
                <ServiceCard 
                  title="MOBILE NATIVE"
                  description="iOS & Android Performance"
                  delay={0.4}
                  accentColor="indigo"
                />
             </div>
             
             <div className="mt-8 flex items-end justify-between">
                <div className="space-y-1">
                   <div className="text-4xl font-bold font-display tracking-tight">+150</div>
                   <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Projets Livrés</div>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all cursor-pointer">
                   <ArrowRight size={20} />
                </div>
             </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ children, subtitle, align = 'center' }) => (
  <div className={`max-w-4xl mb-20 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-accent-teal font-display font-bold tracking-widest uppercase mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="font-display font-black text-4xl md:text-6xl text-white"
    >
      {children}
    </motion.h2>
  </div>
);

export default function App() {
  const smoothOptions = { damping: 20, stiffness: 100 };
  
  return (
    <div className="relative bg-primary-dark font-sans selection:bg-accent-teal selection:text-black">
      <Navbar />
      
      <RobotIntro />

      <Hero />

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[50vh] h-[50vh] bg-accent-teal/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Nos Expertises">
            Des services <span className="text-gradient">haut de gamme</span> pour votre croissance.
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={Code2}
              title="Développement Web"
              description="Sites vitrines, e-commerce et applications web complexes basés sur les technologies les plus performantes (React, Next.js, Cloud)."
              delay={0.1}
            />
            <ServiceCard 
              icon={Smartphone}
              title="Apps Mobiles"
              description="Expériences mobiles natives et cross-platform (iOS & Android) fluides, intuitives et conçues pour durer."
              delay={0.2}
            />
            <ServiceCard 
              icon={Palette}
              title="UI/UX Design"
              description="Design d'interface moderne et recherche utilisateur approfondie pour maximiser l'engagement et la conversion."
              delay={0.3}
            />
            <ServiceCard 
              icon={Zap}
              title="Performance & SEO"
              description="Optimisation technique pointue pour des temps de chargement records et une visibilité maximale sur les moteurs de recherche."
              delay={0.4}
            />
            <ServiceCard 
              icon={Shield}
              title="Sécurité Cloud"
              description="Architectures serveurs sécurisées et scalables pour protéger vos données et celles de vos clients."
              delay={0.5}
            />
            <ServiceCard 
              icon={Rocket}
              title="Stratégie Digitale"
              description="Accompagnement de A à Z pour transformer votre vision en succès numérique mesurable et durable."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Réalisations" align="left">
            Ils nous font <span className="text-gradient">confiance</span>.
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[1, 2].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative h-[500px] rounded-[40px] overflow-hidden cursor-pointer"
              >
                <img 
                  src={`https://images.unsplash.com/photo-1${item === 1 ? '498050100021-c5249f4df085' : '460761263504-24251fb74291'}?q=80&w=2070&auto=format&fit=crop`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  alt="Project"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-all" />
                <div className="absolute bottom-0 left-0 p-12 w-full translate-y-4 group-hover:translate-y-0 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-accent-teal text-black text-xs font-black uppercase rounded-lg">Web App</span>
                    <span className="text-white/60 text-sm">2024</span>
                  </div>
                  <h3 className="font-display font-black text-4xl text-white mb-4">Projet Innovant {item}</h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <p className="text-white/70 max-w-sm">Refonte complète de l'architecture digitale et optimisation SEO.</p>
                    <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-accent-teal transition-all">
                      <ExternalLink />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Section (Martinique vibe) */}
      <section id="about" className="py-32 px-6 relative flex flex-col items-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading subtitle="L'Agence" align="left">
              Le talent local, <br />
              <span className="text-gradient">L'engagement global</span>.
            </SectionHeading>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Basés au cœur de la Martinique, nous fusionnons la vibe caribéenne avec les standards technologiques internationaux. Madadev972 n'est pas seulement une agence de dev, c'est votre partenaire de transformation.
            </p>
            <div className="space-y-6">
              {[
                { title: "Proximité & Écoute", text: "Nous parlons votre langue et comprenons votre marché local." },
                { title: "Rigueur Française", text: "Des processus structurés et une qualité de code irréprochable." },
                { title: "Innovation Continue", text: "Toujours à la pointe des frameworks et des tendances UX/UI." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent-teal/20 flex items-center justify-center text-accent-teal shrink-0 mt-1">
                    <Code2 size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-white/50">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[60px] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-700 glass-morphism p-4">
              <img 
                src="https://images.unsplash.com/photo-1542011016-76ef30cf1c01?q=80&w=1974&auto=format&fit=crop" 
                className="w-full h-full object-cover rounded-[45px]"
                alt="Martinique Landscape"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 p-8 glass-morphism rounded-3xl animate-float">
               <div className="flex items-center gap-4">
                  <div className="text-4xl font-display font-black text-accent-teal">10+</div>
                  <div className="text-sm font-bold opacity-60 uppercase">Années <br />d'Expérience</div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-40 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[60px] bg-gradient-to-br from-accent-teal/20 to-accent-pink/20 p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary-dark/80 backdrop-blur-2xl z-0" />
          <div className="relative z-10">
            <h2 className="font-display font-black text-5xl md:text-8xl mb-8">PRÊT À <span className="text-gradient">BRILLER ?</span></h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12">
              Votre projet mérite une exécution exceptionnelle. Discutons de vos ambitions dès aujourd'hui.
            </p>
            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="px-16 py-8 bg-white text-black font-black text-2xl rounded-full hover:bg-accent-teal shadow-2xl shadow-accent-teal/20 transition-all"
            >
              CONTACTER L'AGENCE
            </motion.button>
          </div>
        </motion.div>
      </section>

      <footer className="py-20 px-12 border-t border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-6 text-xl font-display font-bold uppercase tracking-tight">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">M</div>
              MADADEV<span className="text-blue-accent">972</span>
            </div>
            <p className="text-slate-500 mb-8 leading-relaxed text-sm">
              L'agence digitale premium en Martinique. Nous sculptons le futur du web avec passion et ingénierie de pointe.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Expertise</h4>
              <ul className="space-y-4 text-slate-500 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Développement Web</a></li>
                <li><a href="#" className="hover:text-white transition-colors">UX/UI Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Architecture Cloud</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Martinique</h4>
              <ul className="space-y-4 text-slate-500 text-xs">
                <li>Fort-de-France</li>
                <li>Antilles Françaises</li>
                <li>Innovation Locale</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          <div>© 2024 Madadev972 — Fort-de-France</div>
          <div className="flex gap-8">
            <span>Innovation</span>
            <span>Performance</span>
            <span>Caraïbes</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

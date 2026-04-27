import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import {
  Code2,
  Smartphone,
  Palette,
  Rocket,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Zap,
  Shield,
  Eye,
  Filter,
  Users,
  Target,
  Flag,
  Globe,
  Layout,
  Cpu,
  Layers,
  CheckCircle2,
  Coffee,
  Mail,
  MessageSquare,
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Github
} from 'lucide-react';

// --- COMPOSANTS PARTAGÉS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '/#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'L\'Agence', href: '/agence' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'py-4 bg-primary-dark/80 backdrop-blur-xl border-white/10' : 'py-8 bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-12 flex justify-between items-center text-white">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer text-white no-underline">
          <img src="/logo.png" alt="MADADEV Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
          <span className="font-display font-bold text-2xl tracking-tighter uppercase text-white">MADADEV</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-white">
          {navLinks.map((link, idx) => (
            <motion.div key={link.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Link to={link.href} className="text-slate-400 hover:text-white font-medium transition-colors relative group text-sm no-underline text-white">{link.name}</Link>
            </motion.div>
          ))}
          <Link to="/contact" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium cursor-pointer hover:bg-white/10 transition-all no-underline">Contactez-nous</Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-primary-dark border-b border-white/10">
            <div className="flex flex-col gap-4 p-8 text-white">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="text-xl font-display font-bold text-white hover:text-blue-accent no-underline">{link.name}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ title, description, delay, accentColor = "blue", href = "#" }: any) => (
  <Link to={href} className="block no-underline h-full text-white">
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.8 }} viewport={{ once: true }} className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/20 transition-all backdrop-blur-sm cursor-pointer h-full text-white">
      <div className={`text-xs font-bold mb-2 uppercase tracking-wider ${accentColor === 'blue' ? 'text-blue-accent' : accentColor === 'emerald' ? 'text-emerald-accent' : 'text-indigo-accent'}`}>{title}</div>
      <div className="text-xl font-semibold mb-3 leading-snug text-white">{description}</div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all text-xs font-bold tracking-widest text-slate-500 uppercase text-white">En savoir plus <ArrowRight size={14} /></div>
    </motion.div>
  </Link>
);

const PersistentRobot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFloating, setIsFloating] = useState(true);
  const [heroRect, setHeroRect] = useState<DOMRect | null>(null);
  const viewerRef = useRef<any>(null);
  const SplineElement = 'spline-viewer' as any;

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    let logoInterval: any;
    const handleLoad = () => {
      setIsLoaded(true);
      const hideLogo = () => {
        const shadow = viewer.shadowRoot;
        if (shadow) {
          const logo = shadow.querySelector('#logo');
          if (logo) logo.remove();
          const watermark = shadow.querySelector('a[href*="spline.design"]');
          if (watermark) watermark.remove();
          if (!shadow.querySelector('#anti-logo')) {
            const style = document.createElement('style');
            style.id = 'anti-logo';
            style.textContent = '#logo, a[href*="spline.design"] { display: none !important; opacity: 0 !important; }';
            shadow.appendChild(style);
          }
        }
      };
      hideLogo();
      logoInterval = setInterval(hideLogo, 100);
      const spline = viewer.spline;
      if (!spline) return;
      const allObjects = spline.getAllObjects();
      const targets = allObjects.map((obj: any) => ({ obj: obj, initialY: obj.position.y, name: obj.name.toLowerCase() }));
      function loop() {
        targets.forEach((item: any) => {
          const isHeadPart = item.name.includes('head') || item.name.includes('eye') || item.name.includes('neck');
          if (!isHeadPart) {
            item.obj.rotation.x = 0; item.obj.rotation.z = 0; item.obj.position.y = item.initialY;
          }
        });
        requestAnimationFrame(loop);
      }
      loop();
    };
    viewer.addEventListener('load-complete', handleLoad);
    return () => { 
      viewer.removeEventListener('load-complete', handleLoad); 
      if (logoInterval) clearInterval(logoInterval); 
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const isHome = window.location.pathname === '/';
      const scrollY = window.scrollY;
      const placeholder = document.getElementById('robot-hero-placeholder');
      
      if (isHome && scrollY < 200 && placeholder) {
        const rect = placeholder.getBoundingClientRect();
        if (rect.width > 0) {
          setHeroRect(rect);
          setIsFloating(false);
          return;
        }
      }
      setIsFloating(true);
    };

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    const interval = setInterval(updatePosition, 100);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={false}
      animate={isFloating ? {
        top: 100,
        left: window.innerWidth - 200 - 40,
        width: 200,
        height: 200,
        borderRadius: 40,
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 40,
        opacity: 1,
        scale: 1,
      } : {
        top: heroRect?.top ?? 0,
        left: heroRect?.left ?? 0,
        width: heroRect?.width ?? 0,
        height: heroRect?.height ?? 0,
        borderRadius: 100,
        boxShadow: '0 0px 0px rgba(0,0,0,0)',
        background: 'rgba(255,255,255,0)',
        backdropFilter: 'blur(0px)',
        border: '1px solid rgba(255,255,255,0)',
        zIndex: 10,
        opacity: 1,
        scale: 1,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 80, mass: 1 }}
      className="fixed pointer-events-auto overflow-hidden group"
      style={{
        WebkitMaskImage: isFloating ? 'none' : 'radial-gradient(circle, black 60%, transparent 100%)',
        maskImage: isFloating ? 'none' : 'radial-gradient(circle, black 60%, transparent 100%)',
      }}
    >
      <SplineElement 
        ref={viewerRef} 
        url="/robot_landing.splinecode" 
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: isFloating ? '800px' : '100%', 
          height: isFloating ? '800px' : '100%',
          transform: isFloating ? 'translate(-50%, -50%) scale(0.25)' : 'translate(-50%, -50%) scale(1)',
          transition: 'all 0.5s ease-in-out',
          transformOrigin: 'center center'
        }} 
      />
      {!isLoaded && <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/20"><div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" /></div>}
      {isFloating && <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />}
    </motion.div>
  );
};

const RobotIntro = () => {
  return (
    <section className="relative w-full h-screen bg-primary-dark flex items-center justify-center overflow-hidden px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="z-20 relative pointer-events-none text-white">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-blue-accent font-display font-bold tracking-widest uppercase mb-4 block text-white">Bienvenue dans le futur</motion.span>
          <h2 className="text-white font-display font-black text-5xl md:text-7xl leading-tight uppercase mb-6">NOTRE EXPERTISE AU SERVICE DE <span className="text-gradient text-white">VOTRE VISION</span></h2>
          <p className="text-slate-400 text-lg max-w-md mb-8 leading-relaxed text-white">Nous créons des expériences numériques immersives où la technologie rencontre l'art. Laissez notre assistant vous guider.</p>
        </motion.div>
        <div id="robot-hero-placeholder" className="relative w-full h-[50vh] lg:h-[80vh] pointer-events-none z-10 overflow-hidden rounded-[100px]">
          <div className="absolute inset-0 bg-blue-500/5 rounded-[100px] border border-white/5 text-white" />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce z-20 pointer-events-none text-white"><ChevronDown size={32} /></div>
    </section>
  );
};

const SectionHeading = ({ children, subtitle, align = 'center' }: any) => (
  <div className={`max-w-4xl mb-20 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-accent-teal font-display font-bold tracking-widest uppercase mb-4 block text-white">{subtitle}</motion.span>
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-display font-black text-4xl md:text-6xl text-white uppercase">{children}</motion.h2>
  </div>
);

// --- SECTION TECH STACK SCROLL (Inspiré de Weave) ---

const TechStackScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const techs = [
    { name: "Flutter", desc: "Performance native multi-plateforme iOS & Android.", img: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?q=80&w=2000" },
    { name: "React & Next.js", desc: "Architectures Web modernes et SEO-friendly.", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000" },
    { name: "Node.js", desc: "Backends scalables et temps réel ultra-rapides.", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000" },
    { name: "Kubernetes", desc: "Orchestration cloud et haute disponibilité.", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2000" },
    { name: "Spline 3D", desc: "Expériences immersives et animations interactives.", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.onChange(v => {
      const index = Math.min(Math.floor(v * techs.length), techs.length - 1);
      if (index !== activeIndex) setActiveIndex(index);
    });
  }, [scrollYProgress, activeIndex, techs.length]);

  const scrollToIndex = (index: number) => {
    if (!targetRef.current) return;
    const sectionTop = targetRef.current.offsetTop;
    const sectionHeight = targetRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    
    const targetProgress = (index + 0.5) / techs.length;
    const targetScroll = sectionTop + targetProgress * (sectionHeight - windowHeight);
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-primary-dark text-white">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0 text-white">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex} 
              initial={{ opacity: 0, scale: 1.1 }} 
              animate={{ opacity: 0.8, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ duration: 0.8 }} 
              className="absolute inset-0 w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${techs[activeIndex].img})`,
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'
              }} 
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/20 to-transparent text-white" />
        </div>
        <div className="max-w-7xl mx-auto w-full px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10 text-white">
          <div className="lg:col-span-4 text-white">
            <span className="text-blue-accent font-display font-bold tracking-widest uppercase mb-6 block text-white">Notre Stack Tech</span>
            <h2 className="text-4xl md:text-6xl font-display font-black leading-tight text-white uppercase">LA PUISSANCE <br/><span className="text-gradient text-white">SANS LIMITES.</span></h2>
            <p className="text-lg text-slate-400 mt-6 max-w-sm font-light leading-relaxed text-white">Nous utilisons les outils les plus performants du marché pour transformer vos idées en produits d'exception.</p>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-16 justify-center text-white">
            {techs.map((tech, i) => (
              <motion.div 
                key={tech.name} 
                animate={{ 
                  opacity: activeIndex === i ? 1 : 0.2, 
                  x: activeIndex === i ? 0 : -20, 
                  scale: activeIndex === i ? 1.1 : 0.9 
                }} 
                transition={{ duration: 0.4 }} 
                className="text-white cursor-pointer group/item"
                onClick={() => scrollToIndex(i)}
              >
                <h3 className={`text-5xl md:text-7xl font-display font-black text-white uppercase mb-2 transition-colors ${activeIndex === i ? 'text-white' : 'group-hover/item:text-white/60'}`}>{tech.name}</h3>
                <p className={`text-blue-accent text-xl font-bold transition-all duration-500 ${activeIndex === i ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PAGES PRINCIPALES ---

const Home = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0.5);
  const [width, setWidth] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - window.innerWidth);
      }
    };
    
    const timer = setTimeout(handleResize, 1000);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const percent = e.clientX / window.innerWidth;
    setMouseX(percent);
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  return (
    <>
      <RobotIntro />
      <section ref={targetRef} className="relative min-h-[768px] lg:h-screen flex items-center overflow-hidden px-12 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 items-center relative z-20 text-white">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="col-span-12 lg:col-span-7 py-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-accent text-xs font-bold uppercase tracking-widest mb-8 text-white">
              <span className="w-2 h-2 rounded-full bg-blue-accent animate-pulse text-white"></span>Basé en Martinique • Antilles
            </div>
            <h1 className="font-display font-extrabold text-[64px] md:text-[84px] leading-[1.1] md:leading-[0.95] tracking-tighter mb-8 uppercase text-white">L'EXCELLENCE <br /><span className="text-gradient italic pb-2 inline-block text-white">DIGITALE</span></h1>
            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed font-light text-white">Propulsez votre entreprise avec des solutions web et mobiles sur-mesure. Une ingénierie de haut niveau pour des performances exceptionnelles.</p>
            <div className="flex gap-4 text-white">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-xl transition-transform hover:scale-105 cursor-pointer">Démarrer un projet</button>
              <Link to="/portfolio" className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all hover:scale-105 text-white no-underline cursor-pointer">Voir le portfolio</Link>
            </div>
          </motion.div>
          <div className="col-span-12 lg:col-span-5 relative hidden lg:block text-white">
            <div className="bg-gradient-to-tr from-blue-500/10 to-transparent border border-white/10 rounded-3xl backdrop-blur-sm p-8 flex flex-col justify-between min-h-[550px] h-full text-white">
              <div className="space-y-4 text-white">
                <ServiceCard title="DÉVELOPPEMENT WEB" description="Architectures Cloud Scalables" delay={0.2} accentColor="blue" href="/expertise/web" />
                <ServiceCard title="UX / UI DESIGN" description="Interfaces Ultra-Fluides" delay={0.3} accentColor="emerald" href="/expertise/design" />
                <ServiceCard title="MOBILE NATIVE" description="iOS & Android Flutter Performance" delay={0.4} accentColor="indigo" href="/expertise/mobile" />
              </div>
              <div className="mt-8 flex items-end justify-between text-white">
                <div className="text-white"><div className="text-4xl font-bold font-display tracking-tight text-white">150+</div><div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold text-white">Projets Livrés</div></div>
                <Link to="/portfolio" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-all">
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Engagement Local */}
      {/* Section Expertises Secondaires */}
      <section id="services" className="py-32 px-6 relative overflow-hidden bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto text-white">
          <SectionHeading subtitle="Nos Expertises">Des services <span className="text-gradient text-white">haut de gamme</span> pour votre croissance.</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            <ServiceCard title="Performance & SEO" description="Optimisation technique pointue pour des temps de chargement records." delay={0.1} />
            <ServiceCard title="Sécurité Cloud" description="Architectures serveurs sécurisées et scalables pour vos données." delay={0.2} />
            <ServiceCard title="Stratégie Digitale" description="Accompagnement de A à Z pour transformer votre vision." delay={0.3} />
          </div>
        </div>
      </section>


      {/* Section Portfolio Teaser */}
      <section className="py-32 bg-primary-dark text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-white mb-16">
          <SectionHeading subtitle="Réalisations" align="left">Le futur <span className="text-gradient text-white">en action</span>.</SectionHeading>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringCarousel(true)}
          onMouseLeave={() => setIsHoveringCarousel(false)}
          className="mx-4 md:mx-10 rounded-[40px] md:rounded-[80px] overflow-hidden relative bg-white/5 border border-white/5 cursor-none [&_*]:cursor-none group/carousel"
        >
          <AnimatePresence>
            {isHoveringCarousel && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  zIndex: 100,
                  x: cursorPos.x - 24,
                  y: cursorPos.y - 24,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.1 }}
                className="hidden md:block"
              >
                <img src="/le-curseur-lateral.png" className="w-12 h-12 object-contain drop-shadow-2xl" alt="Scroll Cursor" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div 
            ref={carouselRef}
            animate={{ x: -mouseX * width }}
            transition={{ type: "spring", stiffness: 40, damping: 20, mass: 0.5 }}
            className="flex gap-8 w-max px-12 py-10"
          >
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id} 
                className="w-[300px] md:w-[600px] h-[400px] md:h-[600px] rounded-[40px] overflow-hidden border border-white/10 group relative flex-shrink-0"
              >
                <Link to={`/portfolio/${project.id}`} className="block h-full no-underline">
                  <img src={project.image} className="w-full h-full object-cover transition-all duration-700" alt={project.title} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                  <div className="absolute bottom-0 p-10">
                    <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: project.color }}>{project.category}</span>
                    <h3 className="text-3xl md:text-4xl font-display font-black uppercase text-white leading-none">{project.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 text-center text-white">
          <Link to="/portfolio" className="inline-flex items-center gap-3 text-blue-accent font-bold uppercase tracking-widest hover:gap-6 transition-all no-underline text-white">Découvrir tous nos projets <ArrowRight size={20} className="text-white"/></Link>
        </div>
      </section>

      {/* Section Tech Stack Scroll */}
      <TechStackScroll />

      {/* Section Agence Teaser */}
      <section id="about" className="py-32 px-6 relative overflow-hidden bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-white">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="text-white">
            <SectionHeading subtitle="L'Agence" align="left">Le talent local, <br /><span className="text-gradient text-white">L'engagement global</span>.</SectionHeading>
            <p className="text-xl text-white/70 leading-relaxed mb-8 text-white">Basés en Martinique, nous fusionnons la vibe caribéenne avec les standards technologiques internationaux.</p>
            <Link to="/agence" className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all text-white inline-block text-sm uppercase tracking-widest no-underline">Découvrir l'histoire</Link>
          </motion.div>
          <div className="relative aspect-square rounded-[60px] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-700 bg-primary-dark border border-white/10 flex items-center justify-center text-white shadow-2xl">
              <img src="/martinique.png" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110" alt="Madadev Martinique" />
          </div>
        </div>
      </section>

      {/* Section Contact CTA */}
      <section className="py-40 px-6 bg-primary-dark text-white">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto rounded-[60px] bg-white/5 p-20 text-center relative border border-white/10 overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 z-0 text-white" />
          <div className="relative z-10 text-white">
            <h2 className="font-display font-black text-5xl md:text-8xl mb-8 uppercase tracking-tighter text-white">PRÊT À <span className="text-gradient text-white">BRILLER ?</span></h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 text-white">Votre projet mérite une exécution exceptionnelle. Discutons de vos ambitions dès aujourd'hui.</p>
            <Link to="/contact" className="px-16 py-8 bg-white text-black font-black text-2xl rounded-full hover:bg-blue-accent transition-all hover:scale-105 shadow-2xl cursor-pointer no-underline inline-block">CONTACTER L'AGENCE</Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

// --- PAGES EXPERTISES ---

const ExpertiseLayout = ({ title, subtitle, icon: Icon, color, children }: any) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen text-white bg-primary-dark">
      <div className="max-w-7xl mx-auto text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 text-white">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-white">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-widest mb-8 text-white" style={{ color }}><Icon size={18} /> {subtitle}</div>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8 uppercase text-white">{title}</h1>
            <div className="h-1 w-24 mb-8 text-white" style={{ backgroundColor: color }} />
          </motion.div>
          <div className="bg-white/5 rounded-[60px] aspect-video border border-white/10 flex items-center justify-center relative overflow-hidden text-white">
             <div className="absolute inset-0 opacity-20 blur-[100px] text-white" style={{ backgroundColor: color }} />
             <Icon size={120} className="relative z-10 opacity-50 text-white" style={{ color }} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

const WebExpertise = () => (
  <ExpertiseLayout title={<>Web <br/><span className="text-gradient text-white">Architectures</span></>} subtitle="Développement Web" icon={Code2} color="#60a5fa">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
      <div className="space-y-8 text-white">
        <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-blue-accent text-white">Architecture Cluster-Label</h2>
        <p className="text-xl text-slate-400 leading-relaxed font-light text-white">Bâtir des architectures robustes, basées sur des clusters scalables pour une disponibilité de 99.9%.</p>
        <ul className="space-y-4 text-white">
          {["Next.js & React Frontend", "Microservices Node.js", "Déploiement Docker & Kubernetes", "SEO Technique Pro"].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-300 text-white"><CheckCircle2 size={20} className="text-blue-accent text-white"/> {item}</li>
          ))}
        </ul>
      </div>
    </div>
  </ExpertiseLayout>
);

const DesignExpertise = () => (
  <ExpertiseLayout title={<>Interfaces <br/><span className="text-gradient text-white">Ultra Fluides</span></>} subtitle="UX / UI Design" icon={Palette} color="#34d399">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
      <div className="space-y-8 text-white">
        <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-emerald-accent text-white">L'Émotion par le Design</h2>
        <p className="text-xl text-slate-400 leading-relaxed font-light text-white">Une interface fluide est invisible. Nous concevons des parcours utilisateurs où chaque interaction semble naturelle.</p>
      </div>
    </div>
  </ExpertiseLayout>
);

const MobileExpertise = () => (
  <ExpertiseLayout title={<>Flutter <br/><span className="text-gradient text-white">Performance</span></>} subtitle="Apps iOS & Android" icon={Smartphone} color="#818cf8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
      <div className="space-y-8 text-white">
        <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-indigo-accent text-white">Expertise Native Flutter</h2>
        <p className="text-xl text-slate-400 leading-relaxed font-light text-white">En tant que développeur Flutter, je conçois des applications avec une fluidité de 120Hz et un temps de développement optimisé.</p>
      </div>
    </div>
  </ExpertiseLayout>
);

// --- DONNÉES PROJETS ---

const PROJECTS = [
  { 
    id: 1, 
    title: "Eco-Tropical Resort", 
    category: "Web Design", 
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2000", 
    color: "#34d399",
    challenge: "Créer une expérience de réservation immersive pour un complexe éco-responsable de luxe en Martinique.",
    solution: "Une interface fluide utilisant le WebGL pour des transitions fluides et un système de réservation temps réel optimisé.",
    techs: ["React", "Three.js", "Node.js", "Stripe API"],
    detailImages: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000"
    ]
  },
  { 
    id: 2, 
    title: "Fintech Antilles", 
    category: "App Mobile", 
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000", 
    color: "#60a5fa",
    challenge: "Démocratiser l'accès aux services bancaires numériques pour les entrepreneurs de la zone caraïbe.",
    solution: "Une application mobile sécurisée avec authentification biométrique et gestion de multi-devises simplifiée.",
    techs: ["Flutter", "Firebase", "Google Cloud", "Rust"],
    detailImages: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"
    ]
  },
  { 
    id: 3, 
    title: "Madinina Market", 
    category: "E-Commerce", 
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000", 
    color: "#818cf8",
    challenge: "Connecter les artisans locaux directement aux consommateurs via une plateforme logistique intégrée.",
    solution: "Un marketplace robuste supportant des milliers de SKUs avec un tableau de bord vendeur intuitif.",
    techs: ["Next.js", "Shopify Engine", "PostgreSQL", "Tailwind"],
    detailImages: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000"
    ]
  },
  { 
    id: 4, 
    title: "Luxury Travel App", 
    category: "UX Research", 
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000", 
    color: "#f472b6",
    challenge: "Redéfinir le parcours voyageur pour une clientèle haut de gamme exigeante.",
    solution: "Une phase de recherche intensive aboutissant à un design minimaliste et prédictif.",
    techs: ["Figma", "User Testing", "Prototyping", "Design System"],
    detailImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
      "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?q=80&w=1000"
    ]
  },
  { 
    id: 5, 
    title: "Smart City FDF", 
    category: "Big Data", 
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1000", 
    color: "#fbbf24",
    challenge: "Analyser les flux de transport urbain pour optimiser le trafic à Fort-de-France.",
    solution: "Visualisation de données massives en temps réel issue de capteurs IoT disséminés dans la ville.",
    techs: ["Python", "TensorFlow", "React Dashboards", "AWS"],
    detailImages: [
      "https://images.unsplash.com/photo-1558441719-ff34b0ad4b98?q=80&w=1000",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000"
    ]
  },
  { 
    id: 6, 
    title: "Crypto Ocean", 
    category: "Blockchain", 
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000", 
    color: "#60a5fa",
    challenge: "Permettre l'investissement fractionné dans des projets de préservation des récifs coralliens.",
    solution: "Une plateforme d'échange de tokens d'impact basée sur la transparence de la blockchain.",
    techs: ["Solidity", "Web3.js", "Ethereum", "Ethers.js"],
    detailImages: [
      "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?q=80&w=1000",
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1000"
    ]
  }
];

// --- PAGES AUTRES ---

const PortfolioPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen text-white bg-primary-dark">
      <div className="max-w-7xl mx-auto text-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-white">
          <div className="text-white"><motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-blue-accent font-display font-bold tracking-widest uppercase mb-4 block text-white">Nos Réalisations</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-display font-black leading-none uppercase text-white">NOS PROJETS <br/><span className="text-gradient text-white">SIGNATURE</span></motion.h1></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {PROJECTS.map((project, idx) => (
            <Link key={project.id} to={`/portfolio/${project.id}`} className="no-underline text-white block h-full">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="group relative aspect-[4/5] rounded-[40px] overflow-hidden bg-white/5 border border-white/10 cursor-pointer text-white h-full">
                <img src={project.image} className="w-full h-full object-cover grayscale-0 group-hover:grayscale group-hover:scale-110 transition-all duration-700 text-white" alt={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-all text-white" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-white" style={{ color: project.color }}>{project.category}</span>
                  <h3 className="text-3xl font-display font-black text-white mb-6 leading-none uppercase">{project.title}</h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 text-white">
                    <span className="text-sm text-white/50 font-medium text-white">Découvrir l'étude de cas</span>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg">
                      <Eye size={20} className="text-black" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const AgencyPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen text-white bg-primary-dark">
      <div className="max-w-7xl mx-auto text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 text-white">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-white">
            <span className="text-blue-accent font-display font-bold tracking-widest uppercase mb-6 block text-white">L'Histoire Madadev</span>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8 uppercase text-white">L'ALLIANCE DU <br/><span className="text-gradient text-white">CODE & DE L'ÎLE</span></h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl font-light text-white font-sans">Fusionner la rigueur d'ingénierie et la créativité caribéenne pour propulser la Martinique au sommet du digital.</p>
          </motion.div>
          <div className="relative text-white">
             <div className="aspect-[4/5] rounded-[60px] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-700 bg-black border border-white/10 shadow-2xl text-white">
                <img src="/martinique.png" className="w-full h-full object-cover opacity-90" alt="Vision" />
             </div>
          </div>
        </div>
      </div>
      <TechStackScroll />
    </div>
  );
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === Number(id));
  useEffect(() => window.scrollTo(0, 0), []);

  if (!project) return <div className="pt-40 text-center text-white">Projet non trouvé.</div>;

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen text-white bg-primary-dark">
      <div className="max-w-7xl mx-auto">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group no-underline uppercase text-xs font-bold tracking-widest">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
            <X size={14} className="rotate-45" />
          </div>
          Retour au Portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: project.color }}>{project.category}</motion.span>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8 uppercase">{project.title}</h1>
            
            <div className="space-y-12 mt-16">
              <section>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Le Challenge</h2>
                <p className="text-2xl text-white/80 leading-relaxed font-light">{project.challenge}</p>
              </section>
              <section>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">La Solution</h2>
                <p className="text-xl text-slate-400 leading-relaxed font-light">{project.solution}</p>
              </section>
              <section>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-3">
                  {project.techs.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">{tech}</span>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="sticky top-40">
            <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10 group shadow-2xl">
              <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </div>
          </motion.div>
        </div>

        <section className="py-24 border-t border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.detailImages?.map((img, i) => (
                <div key={i} className="aspect-video rounded-[40px] bg-white/5 overflow-hidden border border-white/10">
                   <img src={img} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity duration-700" alt={`Detail ${i + 1}`} />
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

const ContactPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:contact@madadev.com?subject=${formState.subject}&body=De: ${formState.name} (${formState.email})%0D%0A%0D%0A${formState.message}`;
  };

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen text-white bg-primary-dark overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-blue-accent font-display font-bold tracking-widest uppercase mb-6 block">Contact</span>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8 uppercase">
              PARLONS DE VOTRE <br/><span className="text-gradient">PROCHAIN PROJET</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-lg font-light">
              Que vous ayez une idée précise ou simplement une vision, nous sommes là pour transformer vos ambitions en réalité digitale.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-accent transition-colors">
                  <Mail className="text-blue-accent" size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Professionnel</div>
                  <div className="text-xl font-medium">contact@madadev.com</div>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/place/Martinique/@14.6415,-61.0242,11z" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-6 group no-underline text-white cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-accent transition-colors">
                  <Globe className="text-emerald-accent" size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Localisation</div>
                  <div className="text-xl font-medium group-hover:text-emerald-accent transition-colors">Martinique, Antilles Françaises</div>
                </div>
              </a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "#", color: "hover:text-blue-400" },
                { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                { icon: Twitter, href: "#", color: "hover:text-sky-400" },
                { icon: Github, href: "#", color: "hover:text-slate-400" }
              ].map((social, i) => (
                <a key={i} href={social.href} className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:bg-white/10 ${social.color}`}>
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nom Complet</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-accent transition-colors text-white"
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-accent transition-colors text-white"
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Sujet</label>
                <input 
                  type="text" 
                  required
                  placeholder="Projet de Développement Web"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-accent transition-colors text-white"
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Votre Message</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Dites-nous en plus sur vos besoins..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-accent transition-colors resize-none text-white"
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl hover:bg-blue-accent transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                ENVOYER LE MESSAGE
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- APP WRAPPER ---

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

export default function App() {
  return (
    <Router>
      <div className="relative bg-primary-dark font-sans selection:bg-accent-teal selection:text-black min-h-screen text-white">
        <Navbar />
        <PersistentRobot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
          <Route path="/agence" element={<AgencyPage />} />
          <Route path="/expertise/web" element={<WebExpertise />} />
          <Route path="/expertise/design" element={<DesignExpertise />} />
          <Route path="/expertise/mobile" element={<MobileExpertise />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <footer className="py-20 px-12 bg-primary-dark text-white relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 text-white">
            <div className="max-w-sm text-white">
              <div className="flex items-center gap-3 mb-6 text-2xl font-display font-bold uppercase tracking-tighter text-white">
                <img src="/logo.png" alt="MADADEV Logo" className="h-8 w-auto" />MADADEV
              </div>
              <p className="text-slate-500 mb-8 leading-relaxed text-sm text-white">L'agence digitale premium en Martinique. Expertise Flutter & Architectures Cloud.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

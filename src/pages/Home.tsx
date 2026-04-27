import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RobotIntro } from '../components/Robot/RobotIntro';
import { ServiceCard, SectionHeading } from '../components/Shared';
import { TechStackScroll } from '../components/TechStackScroll';
import { PROJECTS } from '../data/projects';

export const Home = () => {
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
      <section ref={targetRef} className="relative min-h-[768px] lg:h-screen flex items-center overflow-hidden px-12 bg-bg-base text-text-main">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 items-center relative z-20 text-text-main">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="col-span-12 lg:col-span-7 py-8 text-text-main">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-accent text-xs font-bold uppercase tracking-widest mb-8 text-text-main">
              <span className="w-2 h-2 rounded-full bg-blue-accent animate-pulse text-text-main"></span>Basé en Martinique • Antilles
            </div>
            <h1 className="font-display font-extrabold text-[64px] md:text-[84px] leading-[1.1] md:leading-[0.95] tracking-tighter mb-8 uppercase text-text-main">L'EXCELLENCE <br /><span className="text-gradient italic pb-2 inline-block text-text-main">DIGITALE</span></h1>
            <p className="text-lg text-text-muted max-w-lg mb-10 leading-relaxed font-light text-text-main">Propulsez votre entreprise avec des solutions web et mobiles sur-mesure. Une ingénierie de haut niveau pour des performances exceptionnelles.</p>
            <div className="flex gap-4 text-text-main">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-xl transition-transform hover:scale-105 cursor-pointer">Démarrer un projet</button>
              <Link to="/portfolio" className="px-8 py-4 bg-bg-card border border-border-subtle rounded-xl font-bold hover:bg-white/10 transition-all hover:scale-105 text-text-main no-underline cursor-pointer">Voir le portfolio</Link>
            </div>
          </motion.div>
          <div className="col-span-12 lg:col-span-5 relative hidden lg:block text-text-main">
            <div className="bg-gradient-to-tr from-blue-500/10 to-transparent border border-border-subtle rounded-3xl backdrop-blur-sm p-8 flex flex-col justify-between min-h-[550px] h-full text-text-main">
              <div className="space-y-4 text-text-main">
                <ServiceCard title="DÉVELOPPEMENT WEB" description="Architectures Cloud Scalables" delay={0.2} accentColor="blue" href="/expertise/web" />
                <ServiceCard title="UX / UI DESIGN" description="Interfaces Ultra-Fluides" delay={0.3} accentColor="emerald" href="/expertise/design" />
                <ServiceCard title="MOBILE NATIVE" description="iOS & Android Flutter Performance" delay={0.4} accentColor="indigo" href="/expertise/mobile" />
              </div>
              <div className="mt-8 flex items-end justify-between text-text-main">
                <div className="text-text-main"><div className="text-4xl font-bold font-display tracking-tight text-text-main">150+</div><div className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold text-text-main">Projets Livrés</div></div>
                <Link to="/portfolio" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-text-main/50 hover:text-text-main hover:border-white transition-all">
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 px-6 relative overflow-hidden bg-bg-base text-text-main">
        <div className="max-w-7xl mx-auto text-text-main">
          <SectionHeading subtitle="Nos Expertises">Des services <span className="text-gradient text-text-main">haut de gamme</span> pour votre croissance.</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-text-main">
            <ServiceCard title="Performance & SEO" description="Optimisation technique pointue pour des temps de chargement records." delay={0.1} />
            <ServiceCard title="Sécurité Cloud" description="Architectures serveurs sécurisées et scalables pour vos données." delay={0.2} />
            <ServiceCard title="Stratégie Digitale" description="Accompagnement de A à Z pour transformer votre vision." delay={0.3} />
          </div>
        </div>
      </section>

      <section className="py-32 bg-bg-base text-text-main overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-text-main mb-16">
          <SectionHeading subtitle="Réalisations" align="left">Le futur <span className="text-gradient text-text-main">en action</span>.</SectionHeading>
        </div>

        <div 
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringCarousel(true)}
          onMouseLeave={() => setIsHoveringCarousel(false)}
          className="mx-4 md:mx-10 rounded-[40px] md:rounded-[80px] overflow-hidden relative bg-bg-card border border-border-subtle cursor-none [&_*]:cursor-none group/carousel"
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
                className="w-[300px] md:w-[600px] h-[400px] md:h-[600px] rounded-[40px] overflow-hidden border border-border-subtle group relative flex-shrink-0"
              >
                <Link to={`/portfolio/${project.id}`} className="block h-full no-underline">
                  <img src={project.image} className="w-full h-full object-cover transition-all duration-700" alt={project.title} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                  <div className="absolute bottom-0 p-10">
                    <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: project.color }}>{project.category}</span>
                    <h3 className="text-3xl md:text-4xl font-display font-black uppercase text-text-main leading-none">{project.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 text-center text-text-main">
          <Link to="/portfolio" className="inline-flex items-center gap-3 text-blue-accent font-bold uppercase tracking-widest hover:gap-6 transition-all no-underline text-text-main">Découvrir tous nos projets <ArrowRight size={20} className="text-text-main"/></Link>
        </div>
      </section>

      <TechStackScroll />

      <section id="about" className="py-32 px-6 relative overflow-hidden bg-bg-base text-text-main">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center text-text-main">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="text-text-main">
            <SectionHeading subtitle="L'Agence" align="left">Le talent local, <br /><span className="text-gradient text-text-main">L'engagement global</span>.</SectionHeading>
            <p className="text-xl text-text-main/70 leading-relaxed mb-8 text-text-main">Basés en Martinique, nous fusionnons la vibe caribéenne avec les standards technologiques internationaux.</p>
            <Link to="/agence" className="px-8 py-4 bg-bg-card border border-border-subtle rounded-xl font-bold hover:bg-white/10 transition-all text-text-main inline-block text-sm uppercase tracking-widest no-underline">Découvrir l'histoire</Link>
          </motion.div>
          <div className="relative aspect-square rounded-[60px] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-700 bg-bg-base border border-border-subtle flex items-center justify-center text-text-main shadow-2xl">
              <img src="/martinique.png" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110" alt="Madadev Martinique" />
          </div>
        </div>
      </section>

      <section className="py-40 px-6 bg-bg-base text-text-main">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto rounded-[60px] bg-bg-card p-20 text-center relative border border-border-subtle overflow-hidden text-text-main">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 z-0 text-text-main" />
          <div className="relative z-10 text-text-main">
            <h2 className="font-display font-black text-5xl md:text-8xl mb-8 uppercase tracking-tighter text-text-main">PRÊT À <span className="text-gradient text-text-main">BRILLER ?</span></h2>
            <p className="text-xl text-text-main/60 max-w-2xl mx-auto mb-12 text-text-main">Votre projet mérite une exécution exceptionnelle. Discutons de vos ambitions dès aujourd'hui.</p>
            <Link to="/contact" className="px-16 py-8 bg-white text-black font-black text-2xl rounded-full hover:bg-blue-accent transition-all hover:scale-105 shadow-2xl cursor-pointer no-underline inline-block">CONTACTER L'AGENCE</Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

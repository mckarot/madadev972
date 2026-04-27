import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';

export const TechStackScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  const techs = [
    { name: "Apps iOS & Android", desc: "Une seule application native pour tous les téléphones, fluide et performante.", img: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?q=80&w=2000" },
    { name: "Web Performance", desc: "Des sites ultra-rapides optimisés pour Google (SEO) et la conversion.", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000" },
    { name: "Systèmes Sécurisés", desc: "Une infrastructure robuste et évolutive pour gérer vos données en toute confiance.", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000" },
    { name: "Hébergement Cloud", desc: "Une mise en ligne stable sur des serveurs haute disponibilité (VPS).", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2000" },
    { name: "Design Immersif", desc: "Des expériences interactives en 3D pour marquer les esprits de vos clients.", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000" },
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
    <section ref={targetRef} className="relative h-[300vh] bg-bg-base text-text-main">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden text-text-main">
        <div className="absolute inset-0 z-0 text-text-main">
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/20 to-transparent text-text-main" />
        </div>
        <div className="max-w-7xl mx-auto w-full px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 relative z-10 text-text-main">
          <div className="lg:col-span-5 text-text-main">
            <span className="text-blue-accent font-display font-bold tracking-widest uppercase mb-6 block text-text-main">Notre Stack Tech</span>
            <h2 className="text-4xl md:text-6xl font-display font-black leading-tight text-text-main uppercase">L'EXCELLENCE TECHNIQUE <br/><span className="text-gradient text-text-main">AU SERVICE DE VOTRE RÉUSSITE.</span></h2>
            <p className="text-lg text-text-muted mt-8 max-w-sm font-light leading-relaxed text-text-main">Je sélectionne les technologies les plus performantes pour bâtir des outils sur-mesure qui font grandir votre entreprise.</p>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-12 justify-center text-text-main lg:pl-12">
            {techs.map((tech, i) => (
              <motion.div 
                key={tech.name} 
                animate={{ 
                  opacity: activeIndex === i ? 1 : 0.2, 
                  x: activeIndex === i ? 0 : -20, 
                  scale: activeIndex === i ? 1.1 : 0.9 
                }} 
                transition={{ duration: 0.4 }} 
                className="text-text-main cursor-pointer group/item"
                onClick={() => scrollToIndex(i)}
              >
                <h3 className={`text-4xl md:text-5xl font-display font-black text-text-main uppercase mb-2 transition-colors ${activeIndex === i ? 'text-text-main' : 'group-hover/item:text-text-main/60'}`}>{tech.name}</h3>
                <p className={`text-blue-accent text-xl font-bold transition-all duration-500 ${activeIndex === i ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

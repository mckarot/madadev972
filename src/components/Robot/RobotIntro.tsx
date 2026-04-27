import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const RobotIntro = () => {
  return (
    <section className="relative w-full h-screen bg-bg-base flex items-center justify-center overflow-hidden px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="z-20 relative pointer-events-none text-text-main">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-blue-accent font-display font-bold tracking-widest uppercase mb-4 block text-text-main">Bienvenue dans le futur</motion.span>
          <h2 className="text-text-main font-display font-black text-5xl md:text-7xl leading-tight uppercase mb-6">NOTRE EXPERTISE AU SERVICE DE <span className="text-gradient text-text-main">VOTRE VISION</span></h2>
          <p className="text-text-muted text-lg max-w-md mb-8 leading-relaxed text-text-main">
            Nous créons des expériences numériques immersives où la technologie rencontre l'art.
            <br />
            Notre <span className="text-gradient font-bold">assistant</span> veillera sur vous avec <span className="text-gradient font-bold">bienveillance</span> tout au long de votre <span className="text-gradient font-bold">voyage</span> au cœur de notre univers.
          </p>
        </motion.div>
        <div id="robot-hero-placeholder" className="relative w-full h-[50vh] lg:h-[80vh] pointer-events-none z-10 overflow-hidden rounded-[100px]">
          <div className="absolute inset-0 bg-blue-500/5 rounded-[100px] border border-border-subtle text-text-main" />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-main/30 animate-bounce z-20 pointer-events-none text-text-main"><ChevronDown size={32} /></div>
    </section>
  );
};

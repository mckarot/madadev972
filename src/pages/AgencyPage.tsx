import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { TechStackScroll } from '../components/TechStackScroll';
import { useSEO } from '../hooks/useSEO';

export const AgencyPage = () => {
  useSEO(
    "L'Agence Digitale de Martinique",
    "Découvrez l'histoire de MADADEV. Une fusion entre ingénierie de pointe et créativité caribéenne pour accompagner les entreprises locales."
  );
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen text-text-main bg-bg-base">
      <div className="max-w-7xl mx-auto text-text-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 text-text-main">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-text-main">
            <span className="text-blue-accent font-display font-bold tracking-widest uppercase mb-6 block text-text-main">L'Histoire Madadev</span>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8 uppercase text-text-main">L'ALLIANCE DU <br/><span className="text-gradient text-text-main">CODE & DE L'ÎLE</span></h1>
            <p className="text-xl text-text-muted leading-relaxed mb-10 max-w-xl font-light text-text-main font-sans">Fusionner la rigueur d'ingénierie et la créativité caribéenne pour propulser la Martinique au sommet du digital.</p>
          </motion.div>
          <div className="relative text-text-main">
             <div className="aspect-[4/5] rounded-[60px] overflow-hidden rotate-3 hover:rotate-0 transition-all duration-700 bg-black border border-border-subtle shadow-2xl text-text-main">
                <img src="/martinique.png" className="w-full h-full object-cover opacity-90" alt="Vision" />
             </div>
          </div>
        </div>
      </div>
      <TechStackScroll />
    </div>
  );
};

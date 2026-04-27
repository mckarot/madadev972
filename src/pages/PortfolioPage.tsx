import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export const PortfolioPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen text-text-main bg-bg-base">
      <div className="max-w-7xl mx-auto text-text-main">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-text-main">
          <div className="text-text-main"><motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-blue-accent font-display font-bold tracking-widest uppercase mb-4 block text-text-main">Nos Réalisations</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-display font-black leading-none uppercase text-text-main">NOS PROJETS <br/><span className="text-gradient text-text-main">SIGNATURE</span></motion.h1></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-text-main">
          {PROJECTS.map((project, idx) => (
            <Link key={project.id} to={`/portfolio/${project.id}`} className="no-underline text-text-main block h-full">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="group relative aspect-[4/5] rounded-[40px] overflow-hidden bg-bg-card border border-border-subtle cursor-pointer text-text-main h-full">
                <img src={project.image} className="w-full h-full object-cover grayscale-0 group-hover:grayscale group-hover:scale-110 transition-all duration-700 text-text-main" alt={project.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-all text-text-main" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-text-main">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-text-main" style={{ color: project.color }}>{project.category}</span>
                  <h3 className="text-3xl font-display font-black text-text-main mb-6 leading-none uppercase">{project.title}</h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 text-text-main">
                    <span className="text-sm text-text-main/50 font-medium text-text-main">Découvrir l'étude de cas</span>
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

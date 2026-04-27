import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2, Palette, Smartphone, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const ExpertiseLayout = ({ title, subtitle, icon: Icon, color, children }: any) => {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen text-text-main bg-bg-base">
      <div className="max-w-7xl mx-auto text-text-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 text-text-main">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-text-main">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-bg-card border border-border-subtle text-sm font-bold uppercase tracking-widest mb-8 text-text-main" style={{ color }}><Icon size={18} /> {subtitle}</div>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8 uppercase text-text-main">{title}</h1>
            <div className="h-1 w-24 mb-8 text-text-main" style={{ backgroundColor: color }} />
          </motion.div>
          <div className="bg-bg-card rounded-[60px] aspect-video border border-border-subtle flex items-center justify-center relative overflow-hidden text-text-main">
             <div className="absolute inset-0 opacity-20 blur-[100px] text-text-main" style={{ backgroundColor: color }} />
             <Icon size={120} className="relative z-10 opacity-50 text-text-main" style={{ color }} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export const WebExpertise = () => {
  useSEO(
    "Expertise Web Performance",
    "Solutions web ultra-rapides avec Next.js et React. Optimisation SEO locale pour les PME en Martinique."
  );
  return (
    <ExpertiseLayout title={<>Solutions <br/><span className="text-gradient text-text-main">Web Performance</span></>} subtitle="Développement Web" icon={Code2} color="#60a5fa">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-text-main">
        <div className="space-y-8 text-text-main">
          <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-blue-accent text-text-main">Architectures Modernes</h2>
          <p className="text-xl text-text-muted leading-relaxed font-light text-text-main">Conception de sites ultra-rapides et sécurisés, optimisés pour offrir la meilleure expérience utilisateur à vos clients et booster votre visibilité.</p>
          <ul className="space-y-4 text-text-main">
            {[
              "Next.js & React pour une fluidité totale", 
              "Optimisation SEO Locale & Technique", 
              "Hébergement Haute Performance", 
              "Interface d'administration sur-mesure"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300 text-text-main"><CheckCircle2 size={20} className="text-blue-accent text-text-main"/> {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </ExpertiseLayout>
  );
};

export const DesignExpertise = () => {
  useSEO(
    "UX / UI Design Immersif",
    "Conception d'interfaces fluides et immersives. Nous créons des parcours utilisateurs naturels et engageants pour vos produits digitaux."
  );
  return (
    <ExpertiseLayout title={<>Interfaces <br/><span className="text-gradient text-text-main">Ultra Fluides</span></>} subtitle="UX / UI Design" icon={Palette} color="#34d399">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-text-main">
        <div className="space-y-8 text-text-main">
          <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-emerald-accent text-text-main">L'Émotion par le Design</h2>
          <p className="text-xl text-text-muted leading-relaxed font-light text-text-main">Une interface fluide est invisible. Nous concevons des parcours utilisateurs où chaque interaction semble naturelle.</p>
        </div>
      </div>
    </ExpertiseLayout>
  );
};

export const MobileExpertise = () => {
  useSEO(
    "Développement Mobile Flutter",
    "Apps iOS et Android performantes avec une seule base de code. Fluidité 120Hz et expérience native haut de gamme."
  );
  return (
    <ExpertiseLayout title={<>Flutter <br/><span className="text-gradient text-text-main">Performance</span></>} subtitle="Apps iOS & Android" icon={Smartphone} color="#818cf8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-text-main">
        <div className="space-y-8 text-text-main">
          <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-indigo-accent text-text-main">Multi-Plateforme Natif</h2>
          <p className="text-xl text-text-muted leading-relaxed font-light text-text-main">Grâce à la puissance de Flutter, je développe votre application simultanément pour <strong>iOS et Android</strong>. Une seule base de code pour une présence totale, avec une fluidité native exceptionnelle et des délais de mise sur le marché réduits.</p>
        </div>
      </div>
    </ExpertiseLayout>
  );
};

import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { X, Zap, Eye } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

const NodeCard = memo(({ 
  x, y, 
  orientation = 'landscape', 
  label, 
  type = 'image', 
  content, 
  color = 'blue',
  hasInput = true,
  hasOutput = true,
  constraints
}: any) => {
  const isPortrait = orientation === 'portrait';
  const width = isPortrait ? 'w-[220px] md:w-[300px]' : 'w-[280px] md:w-[400px]';
  const aspect = isPortrait ? 'aspect-[3/4]' : 'aspect-video';
  
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraints}
      style={{ x, y }}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
      className={`absolute ${width} bg-bg-card p-2 rounded-3xl border border-border-subtle shadow-2xl backdrop-blur-xl`}
    >
      <div className={`relative ${aspect} rounded-2xl overflow-hidden bg-black`}>
        {type === 'video' ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
            <source src={content} type="video/mp4" />
          </video>
        ) : (
          <img src={content} className="w-full h-full object-cover pointer-events-none" alt="" />
        )}
        <div className={`absolute top-3 left-3 px-2 py-1 bg-${color}-500/80 backdrop-blur-md rounded-lg text-[8px] font-bold uppercase tracking-widest text-text-main`}>
          {label}
        </div>
      </div>
      {hasInput && (
        <div className={`absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-${color}-500 rounded-full z-10`} />
      )}
      {hasOutput && (
        <div className={`absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-${color}-500 rounded-full z-10`} />
      )}
    </motion.div>
  );
});

const DraggableCanvas = memo(({ images }: { images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x1 = useMotionValue(50);
  const y1 = useMotionValue(100);
  const x2 = useMotionValue(window.innerWidth < 768 ? 50 : 500);
  const y2 = useMotionValue(window.innerWidth < 768 ? 350 : 350);
  const x3 = useMotionValue(window.innerWidth < 768 ? 50 : 950);
  const y3 = useMotionValue(window.innerWidth < 768 ? 650 : 150);

  const nodeConfig = {
    n1: { orientation: 'landscape' as const },
    n2: { orientation: 'portrait' as const },
    n3: { orientation: 'landscape' as const }
  };

  const isMobile = window.innerWidth < 768;
  const getDims = useCallback((orientation: 'portrait' | 'landscape') => {
    const isPortrait = orientation === 'portrait';
    const w = isMobile ? (isPortrait ? 220 : 280) : (isPortrait ? 300 : 400);
    const h = isPortrait ? w * (4/3) : w / 1.77;
    return { w, h };
  }, [isMobile]);

  const d1 = getDims(nodeConfig.n1.orientation);
  const d2 = getDims(nodeConfig.n2.orientation);
  const d3 = getDims(nodeConfig.n3.orientation);


  const p1_out_x = useTransform(x1, v => v + d1.w);
  const p1_out_y = useTransform(y1, v => v + d1.h / 2 + 8);
  const p2_in_x = useTransform(x2, v => v);
  const p2_in_y = useTransform(y2, v => v + d2.h / 2 + 8);

  const p2_out_x = useTransform(x2, v => v + d2.w);
  const p2_out_y = useTransform(y2, v => v + d2.h / 2 + 8);
  const p3_in_x = useTransform(x3, v => v);
  const p3_in_y = useTransform(y3, v => v + d3.h / 2 + 8);

  const path1D = useTransform([p1_out_x, p1_out_y, p2_in_x, p2_in_y], ([x1, y1, x2, y2]) => {
    const cx = ((x1 as number) + (x2 as number)) / 2;
    return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
  });

  const path2D = useTransform([p2_out_x, p2_out_y, p3_in_x, p3_in_y], ([x1, y1, x2, y2]) => {
    const cx = ((x1 as number) + (x2 as number)) / 2;
    return `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
  });

  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const d = getDims(nodeConfig.n1.orientation);
        setConstraints({
          left: -(d.w / 2),
          right: offsetWidth - (d.w / 2),
          top: -(d.h / 2),
          bottom: offsetHeight - (d.h / 2)
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[900px] md:h-[850px] bg-pg-bg rounded-[40px] md:rounded-[80px] overflow-hidden border border-border-subtle cursor-grab active:cursor-grabbing group/canvas">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--color-pg-dot) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path d={path1D} fill="transparent" stroke="var(--color-pg-line)" strokeWidth="2" />
        <motion.path d={path2D} fill="transparent" stroke="var(--color-pg-line)" strokeWidth="2" />
      </svg>

      {images[0] && <NodeCard x={x1} y={y1} orientation={nodeConfig.n1.orientation} label="Input Image" content={images[0]} color="blue" hasInput={false} constraints={constraints} />}
      <NodeCard x={x2} y={y2} orientation={nodeConfig.n2.orientation} label="Video Engine" type="video" content="/background.mp4" color="purple" constraints={constraints} />
      {images[1] && <NodeCard x={x3} y={y3} orientation={nodeConfig.n3.orientation} label="Output Result" content={images[1]} color="emerald" hasOutput={false} constraints={constraints} />}
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-bg-card border border-border-subtle rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-blue-accent pointer-events-none">
        <Zap size={14} className="animate-pulse" /> Playground Interactif
      </div>
    </div>
  );
});

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === Number(id));

  useSEO(
    project ? `Projet ${project.title}` : "Détails du Projet",
    project ? `${project.title} - ${project.challenge}. Une réalisation signée MADADEV.` : "Découvrez les détails de nos réalisations digitales."
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 40, stiffness: 120, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const tX = useTransform(springX, [-300, 300], [20, -20]);
  const tY = useTransform(springY, [-300, 300], [20, -20]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen text-text-main bg-bg-base">
      <div className="max-w-7xl mx-auto">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-12 group no-underline uppercase text-xs font-bold tracking-widest">
          <div className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center group-hover:border-white transition-colors">
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
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Le Challenge</h2>
                <p className="text-2xl text-text-main/80 leading-relaxed font-light">{project.challenge}</p>
              </section>
              <section>
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">La Solution</h2>
                <p className="text-xl text-text-muted leading-relaxed font-light">{project.solution}</p>
              </section>
              <section>
                <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-3">
                  {project.techs.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-bg-card border border-border-subtle rounded-full text-sm font-medium">{tech}</span>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5, x: 100 }} 
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ 
              type: "spring", 
              damping: 12, 
              stiffness: 80, 
              mass: 1.2,
              delay: 0.2
            }}
            className="sticky top-40"
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10 group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] bg-bg-card transition-colors duration-500 hover:border-white/40"
            >
              {/* Effet de brillance au chargement */}
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />

              <motion.img 
                src={project.image} 
                initial={{ scale: 1.4 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ x: tX, y: tY, scale: 1.2 }}
                className="w-full h-full object-cover" 
                alt={project.title} 
              />
              
              {/* Overlay de couleur subtil */}
              <div 
                className="absolute inset-0 opacity-5 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: project.color }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-all duration-700" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <section className="py-24 border-t border-border-subtle px-4 md:px-12 max-w-[1800px] mx-auto">
         <DraggableCanvas images={project.detailImages || []} />
      </section>
    </div>
  );
};

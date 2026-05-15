import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, motionValue } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { X, Zap, Eye, Move } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useSEO } from '../hooks/useSEO';

const NodeCard = memo(({ 
  orientation = 'landscape', 
  label, 
  type = 'image', 
  content, 
  color = 'blue',
  hasInput = true,
  hasOutput = true,
  constraints,
  onFullscreen,
  x,
  y
}: any) => {
  const isPortrait = orientation === 'portrait';
  const width = isPortrait ? 'w-[200px] md:w-[280px]' : 'w-[280px] md:w-[400px]';
  const aspect = isPortrait ? 'aspect-[9/20]' : 'aspect-video';
  
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraints}
      style={{ x, y }}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ scale: 1.02, borderColor: 'var(--color-blue-accent)', transition: { duration: 0.2 } }}
      className={`absolute ${width} bg-bg-card p-2 rounded-3xl border border-border-subtle shadow-2xl backdrop-blur-xl cursor-grab active:cursor-grabbing group/card`}
    >
      <div className={`relative ${aspect} rounded-2xl overflow-hidden bg-black`}>
        {type === 'video' ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
            <source src={content} type="video/mp4" />
          </video>
        ) : (
          <img src={content} className="w-full h-full object-contain pointer-events-none" alt="" />
        )}
        <div className={`absolute top-3 left-3 px-2 py-1 bg-${color}-500/80 backdrop-blur-md rounded-lg text-[8px] font-bold uppercase tracking-widest text-text-main flex items-center gap-2`}>
           <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
           {label}
        </div>
        <button 
          onClick={() => onFullscreen(content)}
          className="absolute bottom-3 right-3 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all text-white/50 hover:text-white cursor-pointer z-20"
        >
          <Eye size={12} />
        </button>
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

const DynamicPath = memo(({ x1, y1, x2, y2, w1, h1, h2 }: any) => {
  const path = useTransform([x1, y1, x2, y2], ([vx1, vy1, vx2, vy2]) => {
    const startX = (vx1 as number) + w1 - 2; 
    const startY = (vy1 as number) + h1 / 2;
    const endX = (vx2 as number) + 2;
    const endY = (vy2 as number) + h2 / 2;
    
    const cx = (startX + endX) / 2;
    return `M ${startX} ${startY} C ${cx} ${startY}, ${cx} ${endY}, ${endX} ${endY}`;
  });

  return <motion.path d={path} fill="transparent" stroke="var(--color-pg-line)" strokeWidth="2" strokeLinecap="round" />;
});

const DraggableCanvas = memo(({ project, images, videos, onFullscreenVideo }: { project: any, images: string[], videos?: string[], onFullscreenVideo: (url: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const isMobile = window.innerWidth < 768;

  // Construction d'une liste alternée : Image 1, Vidéo 1, Image 2, Vidéo 2...
  const nodes: any[] = [];
  const maxLen = Math.max(images.length, (videos || []).length);
  const forcedOrientation = project.playgroundOrientation || 'landscape';
  
  for (let i = 0; i < maxLen; i++) {
    if (images[i]) {
      nodes.push({ 
        id: `img-${i}`, 
        type: 'image' as const, 
        content: images[i], 
        label: `Image ${i + 1}`, 
        color: 'blue' as const, 
        orientation: forcedOrientation
      });
    }
    if (videos && videos[i]) {
      nodes.push({ 
        id: `vid-${i}`, 
        type: 'video' as const, 
        content: videos[i], 
        label: `Video ${i + 1}`, 
        color: i % 2 === 0 ? 'purple' as const : 'orange' as const, 
        orientation: forcedOrientation
      });
    }
  }

  const defaultPositions = [
    { x: 100, y: 150 },
    { x: 550, y: 350 },
    { x: 1000, y: 100 },
    { x: 1400, y: 450 },
    { x: 300, y: 600 },
    { x: 800, y: 650 }
  ];

  // Création des MotionValues de manière stable sans utiliser useMotionValue dans une boucle
  const motionPositions = useRef(nodes.map((_, i) => ({
    x: motionValue(isMobile ? 50 : (defaultPositions[i]?.x || 100 + i * 100)),
    y: motionValue(isMobile ? 100 + i * 250 : (defaultPositions[i]?.y || 100 + i * 50))
  }))).current;

  // Calcul des dimensions exactes pour les lignes
  const getDims = (orientation: 'portrait' | 'landscape') => {
    const isPortrait = orientation === 'portrait';
    const totalW = isMobile ? (isPortrait ? 200 : 280) : (isPortrait ? 280 : 400);
    // L'aspect ratio s'applique sur le contenu interne (p-2 = 16px de padding total)
    const innerW = totalW - 16;
    const innerH = isPortrait ? (innerW * 20/9) : (innerW * 9/16);
    // Hauteur totale = hauteur interne + padding (16) + bordures (2)
    const totalH = innerH + 18;
    return { w: totalW, h: totalH };
  };

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setConstraints({
          left: -150,
          right: offsetWidth - 150,
          top: -150,
          bottom: offsetHeight - 150
        });
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[900px] md:h-[850px] bg-bg-base rounded-[40px] md:rounded-[80px] overflow-hidden border border-border-subtle cursor-grab active:cursor-grabbing group/canvas shadow-inner">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-[0.20] pointer-events-none"
      >
        <source src="/playground_fond.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--color-pg-dot) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          
          const d1 = getDims(node.orientation);
          const d2 = getDims(nodes[i+1].orientation);
          
          // On utilise useTransform ici car on est dans le rendu, mais sur des MotionValues stables
          return (
             <DynamicPath 
               key={`path-${i}`}
               x1={motionPositions[i].x} 
               y1={motionPositions[i].y} 
               x2={motionPositions[i+1].x} 
               y2={motionPositions[i+1].y}
               w1={d1.w}
               h1={d1.h}
               h2={d2.h}
             />
          );
        })}
      </svg>
      
      {/* Rendu dynamique des noeuds */}
      {nodes.map((node, i) => (
        <NodeCard 
          key={`${node.id}-${images.length}-${videos?.length}`}
          x={motionPositions[i].x}
          y={motionPositions[i].y}
          orientation={node.orientation} 
          label={node.label} 
          type={node.type}
          content={node.content} 
          color={node.color}
          hasInput={i > 0}
          hasOutput={i < nodes.length - 1}
          constraints={constraints}
          onFullscreen={onFullscreenVideo}
        />
      ))}
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-bg-card border border-border-subtle rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-blue-accent pointer-events-none shadow-xl">
        <Zap size={14} className="animate-pulse" /> 
        <span className="flex items-center gap-2">
          Playground Interactif
          <span className="w-1 h-1 rounded-full bg-blue-accent/30" />
          <span className="text-text-muted">Attrapez les cartes pour interagir</span>
        </span>
      </div>
    </div>
  );
});

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);
  const project = PROJECTS.find(p => p.id === Number(id));
  
  if (!project) {
    return (
      <div className="pt-40 pb-20 px-6 min-h-screen text-text-main bg-bg-base flex flex-col items-center justify-center">
        <h1 className="text-4xl font-display font-black mb-8">PROJET INTROUVABLE</h1>
        <Link to="/portfolio" className="text-blue-accent hover:underline">Retour au Portfolio</Link>
      </div>
    );
  }

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
         <DraggableCanvas 
           project={project}
           images={project.detailImages || []} 
           videos={project.detailVideos} 
           onFullscreenVideo={setFullscreenVideo}
         />
      </section>

      {/* Modal Plein Écran */}
      {fullscreenVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12"
          onClick={() => setFullscreenVideo(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-5xl w-full aspect-video md:aspect-auto md:h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <video 
              autoPlay 
              loop 
              controls
              className="w-full h-full object-contain"
            >
              <source src={fullscreenVideo} type="video/mp4" />
            </video>
            <button 
              onClick={() => setFullscreenVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/10"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

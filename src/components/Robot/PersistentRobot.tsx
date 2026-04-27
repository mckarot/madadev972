import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';

export const PersistentRobot = memo(() => {
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
      {!isLoaded && <div className="absolute inset-0 flex items-center justify-center bg-bg-base/20"><div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" /></div>}
      {isFloating && <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />}
    </motion.div>
  );
});

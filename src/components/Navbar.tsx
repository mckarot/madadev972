import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { prefetchPortfolio, prefetchAgency, prefetchContact, prefetchExpertise } from '../App';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '/', prefetch: prefetchExpertise },
    { name: 'Portfolio', href: '/portfolio', prefetch: prefetchPortfolio },
    { name: 'L\'Agence', href: '/agence', prefetch: prefetchAgency },
  ];


  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'py-4 bg-bg-base/80 backdrop-blur-xl border-border-subtle' : 'py-8 bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer text-text-main no-underline">
          <img src="/logo.png" alt="MADADEV Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">MADADEV</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.div key={link.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Link 
                to={link.href} 
                onMouseEnter={() => link.prefetch && link.prefetch()}
                className="text-text-muted hover:text-text-main font-medium transition-colors relative group text-sm no-underline"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-text-main transition-all"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <Link 
            to="/contact" 
            onMouseEnter={() => prefetchContact()}
            className="px-5 py-2.5 bg-bg-card border border-border-subtle rounded-full text-text-main text-sm font-medium cursor-pointer hover:bg-white/10 transition-all no-underline"
          >
            Contactez-nous
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="text-text-main">
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-text-main">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-bg-base border-b border-border-subtle">
            <div className="flex flex-col gap-4 p-8">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="text-xl font-display font-bold text-text-main hover:text-blue-accent no-underline">{link.name}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

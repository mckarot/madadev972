import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Composants de base (non-lazy car nécessaires immédiatement)
import { Navbar } from './components/Navbar';
import { PersistentRobot } from './components/Robot/PersistentRobot';
import { PageLoader } from './components/PageLoader';
import { useTheme } from './hooks/useTheme';

// Chargement Lazy des pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const AgencyPage = lazy(() => import('./pages/AgencyPage').then(m => ({ default: m.AgencyPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

// Expertise pages
const Expertise = lazy(() => import('./pages/ExpertisePages').then(m => ({ 
  WebExpertise: m.WebExpertise, 
  DesignExpertise: m.DesignExpertise, 
  MobileExpertise: m.MobileExpertise 
})));

// Helper pour le lazy loading des experts car ils sont groupés
const WebExpertise = lazy(() => import('./pages/ExpertisePages').then(m => ({ default: m.WebExpertise })));
const DesignExpertise = lazy(() => import('./pages/ExpertisePages').then(m => ({ default: m.DesignExpertise })));
const MobileExpertise = lazy(() => import('./pages/ExpertisePages').then(m => ({ default: m.MobileExpertise })));

// Déclarations globales pour TypeScript (Spline Viewer)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="relative bg-bg-base font-sans selection:bg-blue-accent/30 selection:text-text-main min-h-screen text-text-main transition-colors duration-500">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <PersistentRobot />
        
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
            <Route path="/agence" element={<AgencyPage />} />
            <Route path="/expertise/web" element={<WebExpertise />} />
            <Route path="/expertise/design" element={<DesignExpertise />} />
            <Route path="/expertise/mobile" element={<MobileExpertise />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>

        <footer className="py-20 px-12 bg-bg-base text-text-main relative z-10 border-t border-border-subtle">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-6 text-2xl font-display font-bold uppercase tracking-tighter">
                <img src="/logo.png" alt="MADADEV Logo" className="h-8 w-auto" />MADADEV
              </div>
              <p className="text-text-muted mb-8 leading-relaxed text-sm">
                L'agence digitale premium en Martinique. Expertise Flutter & Architectures Cloud.
              </p>
            </div>
            <div className="text-text-muted text-xs uppercase tracking-widest font-bold">
              © {new Date().getFullYear()} MADADEV. Tous droits réservés.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

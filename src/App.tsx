import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Composants de base (non-lazy car nécessaires immédiatement)
import { Navbar } from './components/Navbar';
import { PersistentRobot } from './components/Robot/PersistentRobot';
import { PageLoader } from './components/PageLoader';
import { ScrollToHash } from './components/ScrollToHash';
import { useTheme } from './hooks/useTheme';

// Fonctions de chargement pour le prefetching
export const prefetchHome = () => import('./pages/Home');
export const prefetchPortfolio = () => import('./pages/PortfolioPage');
export const prefetchProjectDetail = () => import('./pages/ProjectDetailPage');
export const prefetchAgency = () => import('./pages/AgencyPage');
export const prefetchContact = () => import('./pages/ContactPage');
export const prefetchExpertise = () => import('./pages/ExpertisePages');

// Chargement Lazy des pages
const Home = lazy(() => prefetchHome().then(m => ({ default: m.Home })));
const PortfolioPage = lazy(() => prefetchPortfolio().then(m => ({ default: m.PortfolioPage })));
const ProjectDetailPage = lazy(() => prefetchProjectDetail().then(m => ({ default: m.ProjectDetailPage })));
const AgencyPage = lazy(() => prefetchAgency().then(m => ({ default: m.AgencyPage })));
const ContactPage = lazy(() => prefetchContact().then(m => ({ default: m.ContactPage })));

// Expertise pages
const WebExpertise = lazy(() => prefetchExpertise().then(m => ({ default: m.WebExpertise })));
const DesignExpertise = lazy(() => prefetchExpertise().then(m => ({ default: m.DesignExpertise })));
const MobileExpertise = lazy(() => prefetchExpertise().then(m => ({ default: m.MobileExpertise })));

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
      <ScrollToHash />
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
              <Link to="/#top" className="flex items-center gap-3 mb-6 text-2xl font-display font-bold uppercase tracking-tighter no-underline text-text-main group">
                <img src="/logo_sans_lettres.png" alt="MADADEV Logo" className="h-8 w-auto group-hover:scale-105 transition-transform" />
                MADADEV
              </Link>
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

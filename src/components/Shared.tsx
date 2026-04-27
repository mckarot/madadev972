import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  delay: number;
  accentColor?: "blue" | "emerald" | "indigo";
  href?: string;
}

export const ServiceCard = ({ title, description, delay, accentColor = "blue", href = "#" }: ServiceCardProps) => (
  <Link to={href} className="block no-underline h-full text-text-main">
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.8 }} viewport={{ once: true }} className="p-6 bg-bg-card rounded-2xl border border-border-subtle group hover:border-white/20 transition-all backdrop-blur-sm cursor-pointer h-full text-text-main">
      <div className={`text-xs font-bold mb-2 uppercase tracking-wider ${accentColor === 'blue' ? 'text-blue-accent' : accentColor === 'emerald' ? 'text-emerald-accent' : 'text-indigo-accent'}`}>{title}</div>
      <div className="text-xl font-semibold mb-3 leading-snug text-text-main">{description}</div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all text-xs font-bold tracking-widest text-text-muted uppercase text-text-main">En savoir plus <ArrowRight size={14} /></div>
    </motion.div>
  </Link>
);

export const SectionHeading = ({ children, subtitle, align = 'center' }: any) => (
  <div className={`max-w-4xl mb-20 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-accent-teal font-display font-bold tracking-widest uppercase mb-4 block text-text-main">{subtitle}</motion.span>
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-display font-black text-4xl md:text-6xl text-text-main uppercase">{children}</motion.h2>
  </div>
);

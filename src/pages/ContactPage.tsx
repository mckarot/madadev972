import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Globe, Linkedin, Instagram, Twitter, Github, Send } from 'lucide-react';

export const ContactPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:contact@madadev.com?subject=${formState.subject}&body=De: ${formState.name} (${formState.email})%0D%0A%0D%0A${formState.message}`;
  };

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen text-text-main bg-bg-base overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-blue-accent font-display font-bold tracking-widest uppercase mb-6 block">Contact</span>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8 uppercase">
              PARLONS DE VOTRE <br/><span className="text-gradient">PROCHAIN PROJET</span>
            </h1>
            <p className="text-xl text-text-muted leading-relaxed mb-12 max-w-lg font-light">
              Que vous ayez une idée précise ou simplement une vision, nous sommes là pour transformer vos ambitions en réalité digitale.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-border-subtle flex items-center justify-center group-hover:border-blue-accent transition-colors">
                  <Mail className="text-blue-accent" size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Email Professionnel</div>
                  <div className="text-xl font-medium">contact@madadev.com</div>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/place/Martinique/@14.6415,-61.0242,11z" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-6 group no-underline text-text-main cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-border-subtle flex items-center justify-center group-hover:border-emerald-accent transition-colors">
                  <Globe className="text-emerald-accent" size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Localisation</div>
                  <div className="text-xl font-medium group-hover:text-emerald-accent transition-colors">Martinique, Antilles Françaises</div>
                </div>
              </a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "#", color: "hover:text-blue-400" },
                { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                { icon: Twitter, href: "#", color: "hover:text-sky-400" },
                { icon: Github, href: "#", color: "hover:text-text-muted" }
              ].map((social, i) => (
                <a key={i} href={social.href} className={`w-12 h-12 rounded-xl bg-bg-card border border-border-subtle flex items-center justify-center transition-all hover:bg-white/10 ${social.color}`}>
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-bg-card border border-border-subtle rounded-[40px] p-8 md:p-12 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Nom Complet</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-bg-card border border-border-subtle rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-accent transition-colors text-text-main"
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-bg-card border border-border-subtle rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-accent transition-colors text-text-main"
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Sujet</label>
                <input 
                  type="text" 
                  required
                  placeholder="Projet de Développement Web"
                  className="w-full bg-bg-card border border-border-subtle rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-accent transition-colors text-text-main"
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Votre Message</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Dites-nous en plus sur vos besoins..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-accent transition-colors resize-none text-text-main"
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl hover:bg-blue-accent transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                ENVOYER LE MESSAGE
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

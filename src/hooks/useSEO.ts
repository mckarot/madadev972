import { useEffect } from 'react';

export const useSEO = (title: string, description: string) => {
  useEffect(() => {
    // Mise à jour du titre
    document.title = `${title} | MADADEV`;

    // Mise à jour de la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = description;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [title, description]);
};

# Notes sur la sauvegarde locale de Spline

Cette note sert de rappel pour assurer la pérennité de l'animation du robot, même si le service Spline venait à fermer ou à changer ses conditions.

## 1. Sécuriser les Assets (Le Robot)
*   **Fichiers `.splinecode`** : Les fichiers dans ton dossier `/public` sont tes créations physiques. Tant que tu les as, ton robot existe.
*   **Textures et Polices** : Lors de l'exportation depuis l'éditeur Spline, assure-toi que les assets sont "Embed" (intégrés) pour éviter que le fichier n'essaie de les télécharger sur les serveurs de Spline au moment de l'affichage.

## 2. Sécuriser le Lecteur (Le Moteur JS)
*   **Actuellement** : On utilise le CDN (jsdelivr) pour la rapidité du développement.
*   **Pour le futur (Production)** : Il faudra basculer sur la version installée via **npm** (`@splinetool/react-spline` ou `@splinetool/viewer`).
*   **Build Final** : La commande `npm run build` crée un dossier `dist/` qui contient une copie locale de tout le code nécessaire. Ce dossier est **autonome**.

## 3. Pourquoi le test "copier-coller" a échoué ?
*   Probablement un problème de chemins relatifs ou de dépendances internes manquantes dans le fichier minifié.
*   La méthode propre consiste à laisser **Vite** gérer cela via l'installation npm classique plutôt que de copier le fichier à la main.

---
**Verdict** : Tant que tu as les fichiers `.splinecode` et que tu compiles ton site avec les packages npm, ton projet est "immortel".

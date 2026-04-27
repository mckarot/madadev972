# 📋 Fiche Technique : Implémentation Backend Contact (Option B)

Cette fiche détaille comment mettre en place un micro-serveur Node.js sur ton VPS RackNerd pour gérer l'envoi d'emails de manière sécurisée et professionnelle.

---

## 🏗️ L'Architecture
1. **Frontend (React/Vite)** : Envoie une requête `POST` avec les données du formulaire.
2. **Backend (Node.js/Express)** : Reçoit la requête, valide les données, et communique avec un service d'envoi.
3. **Service d'Envoi (Resend/SendGrid)** : Assure la délivrabilité de l'email vers ta boîte de réception.
4. **VPS (RackNerd)** : Héberge le backend et utilise **PM2** pour garantir qu'il ne s'arrête jamais.

---

## 🛠️ Stack Technique Recommandée
*   **Runtime** : Node.js
*   **Framework** : Express.js
*   **Envoi d'Email** : [Resend](https://resend.com) (Recommandé pour sa simplicité et sa qualité)
*   **Gestionnaire de Processus** : PM2
*   **Serveur Web / Reverse Proxy** : Nginx

---

## 🚀 Étapes d'Implémentation

### 1. Préparation sur le VPS
Dans un dossier séparé (ex: `/var/www/api-madadev`), initialise un projet Node :
```bash
npm init -y
npm install express resend cors dotenv express-rate-limit
```

### 2. Exemple de structure du serveur (`server.js`)
```javascript
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({ origin: 'https://ton-domaine.com' }));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    await resend.emails.send({
      from: 'Contact <onboarding@resend.dev>',
      to: 'ton-email@exemple.com',
      subject: `Nouveau message: ${subject}`,
      text: `De: ${name} (${email})\n\n${message}`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 3. Configuration de Nginx (Reverse Proxy)
Pour que ton site puisse parler au backend, configure Nginx ainsi :
```nginx
location /api/ {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### 4. Mise en production avec PM2
```bash
pm2 start server.js --name "madadev-api"
pm2 save
pm2 startup
```

---

## 🔒 Points de Vigilance (Sécurité)
*   **Rate Limiting** : Utilise `express-rate-limit` pour empêcher le spam.
*   **Honeypot** : Ajoute un champ invisible dans ton formulaire React. Si ce champ est rempli par un robot, rejette la requête.
*   **Variables d'ENV** : Stocke toujours tes clés API dans un fichier `.env` sur le VPS.

---

## 💡 Pourquoi cette solution ?
1. **Délivrabilité** : Passer par Resend garantit que l'email ne finit pas en Spam.
2. **Évolutivité** : Tu pourras plus tard ajouter une base de données (ex: MongoDB ou PostgreSQL) pour sauvegarder les contacts.
3. **Professionnalisme** : Tu maîtrises toute la chaîne de données sur ton propre VPS.

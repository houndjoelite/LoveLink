# 🚀 Guide de Déploiement LoveLink

## 📋 Préparation pour GitHub

### 1. Initialiser le repository Git
```bash
git init
git add .
git commit -m "Initial commit: LoveLink - Application de messagerie privée pour couples"
```

### 2. Créer le repository sur GitHub
1. Aller sur [GitHub.com](https://github.com)
2. Cliquer sur "New repository"
3. Nom: `LoveLink` ou `lovelink-app`
4. Description: "Application de messagerie privée et chiffrée pour couples"
5. Public ou Private (selon votre choix)
6. Ne pas initialiser avec README (on a déjà le nôtre)

### 3. Connecter le repository local
```bash
git remote add origin https://github.com/VOTRE-USERNAME/LoveLink.git
git branch -M main
git push -u origin main
```

## 🌐 Déploiement sur Vercel

### Option 1: Déploiement Frontend + Backend séparé

#### Frontend (Vercel)
1. Aller sur [Vercel.com](https://vercel.com)
2. Importer le repository GitHub
3. Configuration:
   - Framework: Create React App
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/build`
   - Install Command: `cd client && npm install`

#### Backend (Railway/Heroku/Render)
1. **Railway** (Recommandé):
   - Aller sur [Railway.app](https://railway.app)
   - Connecter GitHub
   - Sélectionner le dossier `server`
   - Déployer automatiquement

2. **Heroku**:
   ```bash
   heroku create lovelink-server
   cd server
   git subtree push --prefix server heroku main
   ```

### Option 2: Déploiement Full-Stack (Vercel)

#### Configuration pour Vercel
Créer `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    },
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/build/$1"
    }
  ]
}
```

## 🔧 Variables d'Environnement

### Frontend (.env)
```env
REACT_APP_SERVER_URL=https://votre-backend-url.com
REACT_APP_ENVIRONMENT=production
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
CLIENT_URL=https://votre-frontend-url.com
```

## 📱 Configuration pour Production

### 1. Mettre à jour les URLs
Dans `client/src/contexts/LoveContext.js`:
```javascript
const newSocket = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000', {
  transports: ['websocket'],
  upgrade: true
});
```

### 2. Optimiser pour la production
```bash
# Client
cd client
npm run build

# Vérifier le build
npm run build
```

### 3. Configuration CORS
Dans `server/server.js`, mettre à jour:
```javascript
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
```

## 🎯 URLs de Test

### Développement Local
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Démo: `http://localhost:3000/chat/DEMO123`

### Production
- Frontend: `https://votre-app.vercel.app`
- Backend: `https://votre-backend.railway.app`
- Démo: `https://votre-app.vercel.app/chat/DEMO123`

## 🔐 Sécurité en Production

### 1. HTTPS obligatoire
- Vercel fournit HTTPS automatiquement
- Railway/Heroku aussi

### 2. Variables d'environnement
- Ne jamais commiter les clés API
- Utiliser les variables d'environnement Vercel/Railway

### 3. Headers de sécurité
Ajouter dans `server/server.js`:
```javascript
app.use((req, res, next) => {
  res.header('X-Frame-Options', 'DENY');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
```

## 📊 Monitoring

### 1. Logs
- Vercel: Dashboard → Functions → Logs
- Railway: Dashboard → Logs

### 2. Analytics
- Ajouter Google Analytics si souhaité
- Vercel Analytics (intégré)

## 🚀 Déploiement Rapide

### Script automatisé
Créer `deploy.sh`:
```bash
#!/bin/bash
echo "🚀 Déploiement LoveLink..."

# Build client
cd client && npm run build && cd ..

# Commit changes
git add .
git commit -m "Deploy: $(date)"

# Push to GitHub
git push origin main

echo "✅ Déployé ! Vérifiez Vercel/Railway"
```

## 🎉 Résultat Final

Après déploiement, vous aurez:
- ✅ Application accessible en ligne
- ✅ HTTPS automatique
- ✅ Déploiement automatique sur push
- ✅ Mode démo accessible publiquement
- ✅ Backend sécurisé et scalable

---

**💕 LoveLink sera accessible au monde entier pour connecter les amoureux !**




# 🚀 Guide de Démarrage Rapide - LoveLink

## Installation Express (5 minutes)

### 1. Installer les dépendances
```bash
# Terminal 1 - Serveur
cd server
npm install

# Terminal 2 - Client  
cd client
npm install
```

### 2. Lancer l'application
```bash
# Terminal 1 - Serveur (port 5000)
cd server
npm start

# Terminal 2 - Client (port 3000)
cd client
npm start
```

### 3. Tester l'application
1. Ouvrez `http://localhost:3000` dans votre navigateur
2. Cliquez sur "Créer notre lien d'amour"
3. Partagez le QR code ou le lien avec votre partenaire
4. Testez l'envoi de messages !

## 🎯 Test Rapide

### Test 1: Création de salle
- ✅ Page d'accueil s'affiche
- ✅ Bouton "Créer" génère un code
- ✅ QR code s'affiche

### Test 2: Connexion partenaire
- ✅ Lien fonctionne (nouvel onglet)
- ✅ Code de salle accepté
- ✅ Connexion établie

### Test 3: Chat sécurisé
- ✅ Messages s'affichent
- ✅ Chiffrement automatique
- ✅ Interface romantique

## 🔧 Dépannage Express

**Erreur "Cannot find module"**
```bash
npm install --force
```

**Port déjà utilisé**
```bash
# Changer le port dans server/server.js
const PORT = process.env.PORT || 5001;
```

**CORS errors**
```bash
# Vérifier que le serveur est sur le port 5000
# Et le client sur le port 3000
```

## 💡 Fonctionnalités Testées

- ✅ Chiffrement des messages (libsodium)
- ✅ Communication P2P (WebRTC + Socket.io)
- ✅ QR codes et liens d'invitation
- ✅ Interface romantique responsive
- ✅ Gestion des déconnexions
- ✅ Codes de salle temporaires

## 🎨 Personnalisation Rapide

**Changer les couleurs** (dans `client/src/App.css`):
```css
.gradient-romantic {
  background: linear-gradient(135deg, #votre-couleur1 0%, #votre-couleur2 100%);
}
```

**Modifier le message de bienvenue** (dans `WelcomePage.js`):
```jsx
<h1 className="text-4xl font-bold text-gray-900 mb-2">
  Votre Titre Personnalisé
</h1>
```

---

**💕 LoveLink est prêt à connecter les amoureux !**




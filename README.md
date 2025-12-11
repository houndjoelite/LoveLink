# 💕 LoveLink - Application de Messagerie Privée pour Deux Amoureux

> **⚠️ ATTENTION - PROJET DE DÉMONSTRATION SEULEMENT ⚠️**
> 
> Ce projet est une **démonstration technique et éducative** conçue pour un usage local uniquement. 
> 
> **NE PAS UTILISER POUR DES MESSAGES RÉELLES OU SENSIBLES**
> 
> - Ceci est un projet de démonstration à des fins d'apprentissage
> - Non destiné à une utilisation en production
> - Aucune garantie de sécurité n'est fournie
> - À utiliser uniquement dans un environnement de développement local

> **"Juste toi et moi, pour toujours 💞"**

LoveLink est une application de messagerie décentralisée et chiffrée conçue comme démonstration technique pour illustrer les concepts de développement web, de chiffrement et de communication P2P.

## ✨ Fonctionnalités

### 🔐 Sécurité & Confidentialité
- **Chiffrement de bout en bout** avec libsodium
- **Communication P2P** via WebRTC (pas de serveur central pour les messages)
- **Aucune donnée stockée** sur serveur (messages chiffrés localement)
- **Salles d'amour temporaires** avec codes d'accès uniques

### 💕 Interface Romantique
- **Design doux et élégant** avec dégradés rose/violet
- **Animations subtiles** et effets visuels romantiques
- **Interface responsive** pour mobile et desktop
- **Thème optimisé** pour l'intimité et la romance

### 🚀 Fonctionnalités Techniques
- **Connexion P2P** sans compte utilisateur
- **QR Code et liens d'invitation** pour connecter facilement les partenaires
- **Serveur de signalisation minimal** (Node.js + Socket.io)
- **Messages en temps réel** avec statuts de connexion
- **Chiffrement automatique** des messages

## 🏗️ Architecture

```
LoveLink/
├── client/                 # Application React frontend
│   ├── src/
│   │   ├── components/     # Composants UI
│   │   ├── contexts/       # Gestion d'état global
│   │   └── App.js         # Point d'entrée
│   └── package.json
├── server/                 # Serveur de signalisation
│   ├── server.js          # Serveur Node.js + Socket.io
│   └── package.json
└── README.md
```

### 🔧 Technologies Utilisées

**Frontend:**
- React 18 + React Router DOM
- TailwindCSS pour le design
- Socket.io-client pour la signalisation
- libsodium-wrappers pour le chiffrement
- react-qr-code pour les QR codes

**Backend:**
- Node.js + Express
- Socket.io pour WebSocket
- CORS pour les connexions cross-origin

**Sécurité:**
- Chiffrement symétrique avec libsodium
- Communication P2P via WebRTC
- Codes de salle temporaires (expiration 24h)

## 🚀 Installation et Lancement

### Prérequis
- Node.js 16+ 
- npm ou yarn

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd LoveLink
```

### 2. Installer les dépendances

**Serveur:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 3. Lancer l'application

**Terminal 1 - Serveur de signalisation:**
```bash
cd server
npm start
```
Le serveur sera accessible sur `http://localhost:5000`

**Terminal 2 - Application React:**
```bash
cd client
npm start
```
L'application sera accessible sur `http://localhost:3000`

## 💡 Comment utiliser LoveLink

### 👫 Pour les couples

1. **Créer une salle d'amour** 💕
   - Ouvrez LoveLink dans votre navigateur
   - Cliquez sur "Créer notre lien d'amour"
   - Partagez le QR code ou le lien avec votre partenaire

2. **Rejoindre votre partenaire** 💌
   - Ouvrez le lien partagé ou scannez le QR code
   - Entrez le code de 8 caractères
   - Votre connexion d'amour sera établie !

3. **Chatter en toute intimité** 💬
   - Vos messages sont automatiquement chiffrés
   - Communication directe entre vos appareils
   - Interface romantique et sécurisée

### 🔒 Sécurité

- **Chiffrement automatique** : Tous les messages sont chiffrés avant l'envoi
- **Pas de serveur central** : Les messages passent directement entre vos appareils
- **Codes temporaires** : Les salles d'amour expirent après 24h
- **Aucune donnée stockée** : Vos conversations restent privées

## 🛠️ Développement

### Structure des composants

```
src/
├── App.js                 # Routeur principal
├── contexts/
│   └── LoveContext.js     # Gestion d'état global + chiffrement
└── components/
    ├── WelcomePage.js     # Page d'accueil
    ├── CreateRoomPage.js  # Création de salle + QR code
    ├── JoinRoomPage.js    # Connexion à une salle
    └── ChatRoom.js        # Interface de chat
```

### API du serveur

**Endpoints REST:**
- `POST /api/create-love-room` - Créer une nouvelle salle
- `POST /api/join-love-room` - Rejoindre une salle existante

**Événements Socket.io:**
- `join-love-room` - Rejoindre une salle
- `love-offer/answer/ice-candidate` - Signalisation WebRTC
- `love-message` - Messages chiffrés

### Variables d'environnement

Créer un fichier `.env` dans le dossier `server/`:
```
PORT=5000
NODE_ENV=development
```

## 🎨 Personnalisation

### Modifier le thème romantique

Le design utilise TailwindCSS avec des couleurs personnalisées. Pour modifier le thème :

1. Éditez `client/tailwind.config.js`
2. Modifiez les couleurs dans `client/src/App.css`
3. Ajustez les dégradés dans les composants

### Ajouter de nouvelles fonctionnalités

- **Messages vocaux** : Intégrer Web Audio API
- **Photos romantiques** : Ajouter l'upload de fichiers
- **Mode éphémère** : Messages qui disparaissent
- **Notifications push** : Pour les messages reçus

## 🐛 Dépannage

### Problèmes courants

**"Impossible de se connecter au serveur"**
- Vérifiez que le serveur est lancé sur le port 5000
- Vérifiez votre pare-feu et connexion réseau

**"QR code ne fonctionne pas"**
- Assurez-vous que les deux appareils sont sur le même réseau
- Vérifiez que les deux navigateurs supportent WebRTC

**"Messages ne s'affichent pas"**
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que les deux partenaires sont connectés

### Logs de débogage

Activer les logs détaillés :
```javascript
// Dans LoveContext.js
console.log('Debug mode activé');
```

## 📱 Compatibilité

- **Navigateurs** : Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile** : iOS 13+, Android 8+
- **WebRTC** : Requis pour la communication P2P

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 💝 Remerciements

- **libsodium** pour le chiffrement sécurisé
- **Socket.io** pour la signalisation WebRTC
- **React** et **TailwindCSS** pour l'interface
- **Tous les couples** qui testent et améliorent LoveLink

---

**Fait avec 💕 pour connecter les amoureux**

*LoveLink - Votre intimité numérique protégée*
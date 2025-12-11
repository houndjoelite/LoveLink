# 💕 LoveLink - Application de Messagerie Privée pour Couples

> **📋 Statut du Projet**
> 
> Ce projet est actuellement en **phase de développement** et sert de démonstration technique de mes compétences en développement full-stack, cryptographie et communication temps réel.
> 
> **Note importante** : Cette application n'a pas encore fait l'objet d'un audit de sécurité complet. Pour une utilisation en production avec des données sensibles, un audit professionnel serait nécessaire.

> **"Juste toi et moi, pour toujours 💞"**

LoveLink est une application de messagerie décentralisée avec chiffrement de bout en bout, conçue comme démonstration technique pour illustrer les concepts de développement web, de cryptographie et de communication pair-à-pair.

## ✨ Fonctionnalités

### 🔐 Sécurité & Confidentialité
- **Chiffrement de bout en bout** avec [libsodium](https://libsodium.gitbook.io/doc/)
- **Communication pair-à-pair** via [WebRTC](https://webrtc.org/) (pas de serveur central pour les messages)
- **Aucun stockage serveur** (messages chiffrés localement)
- **Salles temporaires** avec codes d'accès uniques

### 💕 Interface Romantique
- **Design élégant** avec dégradés rose/violet
- **Animations subtiles** et effets visuels romantiques
- **Interface responsive** pour mobile et desktop
- **Thème optimisé** pour l'intimité et la confidentialité

### 🚀 Fonctionnalités Techniques
- **Connexion P2P** sans compte utilisateur
- **QR codes et liens d'invitation** pour connecter facilement les partenaires
- **Serveur de signalisation minimal** ([Node.js](https://nodejs.org/) + [Socket.io](https://socket.io/))
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

**Frontend :**
- [React 18](https://react.dev/) - Bibliothèque UI
- [React Router DOM](https://reactrouter.com/) - Routage côté client
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [Socket.io Client](https://socket.io/docs/v4/client-api/) - Signalisation WebSocket
- [libsodium-wrappers](https://github.com/jedisct1/libsodium.js) - Bibliothèque cryptographique
- [react-qr-code](https://www.npmjs.com/package/react-qr-code) - Génération de QR codes

**Backend :**
- [Node.js](https://nodejs.org/) - Environnement d'exécution JavaScript
- [Express](https://expressjs.com/) - Framework d'application web
- [Socket.io](https://socket.io/) - Bibliothèque WebSocket
- [CORS](https://github.com/expressjs/cors) - Partage de ressources cross-origin

**Sécurité :**
- Chiffrement symétrique avec [libsodium](https://libsodium.gitbook.io/doc/)
- Communication pair-à-pair via [WebRTC](https://webrtc.org/)
- Codes de salle temporaires (expiration 24h)

## 🚀 Installation et Lancement

### Prérequis
- [Node.js](https://nodejs.org/) 16+ 
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd LoveLink
```

### 2. Installer les dépendances

**Serveur :**
```bash
cd server
npm install
```

**Client :**
```bash
cd client
npm install
```

### 3. Lancer l'application

**Terminal 1 - Serveur de signalisation :**
```bash
cd server
npm start
```
Le serveur sera accessible sur `http://localhost:5000`

**Terminal 2 - Application React :**
```bash
cd client
npm start
```
L'application sera accessible sur `http://localhost:3000`

## 💡 Comment Utiliser LoveLink

### 👫 Pour les Couples

1. **Créer une salle d'amour** 💕
   - Ouvrez LoveLink dans votre navigateur
   - Cliquez sur "Créer notre lien d'amour"
   - Partagez le QR code ou le lien avec votre partenaire

2. **Rejoindre votre partenaire** 💌
   - Ouvrez le lien partagé ou scannez le QR code
   - Entrez le code à 8 caractères
   - Votre connexion d'amour sera établie !

3. **Chatter en toute intimité** 💬
   - Vos messages sont automatiquement chiffrés
   - Communication directe entre vos appareils
   - Interface romantique et sécurisée

### 🔒 Sécurité

- **Chiffrement automatique** : Tous les messages sont chiffrés avant l'envoi
- **Pas de serveur central** : Les messages passent directement entre vos appareils
- **Codes temporaires** : Les salles d'amour expirent après 24h
- **Aucun stockage de données** : Vos conversations restent privées

## 🛠️ Développement

### Structure des Composants

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

### API du Serveur

**Endpoints REST :**
- `POST /api/create-love-room` - Créer une nouvelle salle
- `POST /api/join-love-room` - Rejoindre une salle existante

**Événements Socket.io :**
- `join-love-room` - Rejoindre une salle
- `love-offer/answer/ice-candidate` - Signalisation WebRTC
- `love-message` - Messages chiffrés

### Variables d'Environnement

Créer un fichier `.env` dans le dossier `server/` :
```
PORT=5000
NODE_ENV=development
```

## 🎨 Personnalisation

### Modifier le Thème Romantique

Le design utilise TailwindCSS avec des couleurs personnalisées. Pour modifier le thème :

1. Éditez `client/tailwind.config.js`
2. Modifiez les couleurs dans `client/src/App.css`
3. Ajustez les dégradés dans les composants

### Ajouter de Nouvelles Fonctionnalités

- **Messages vocaux** : Intégrer Web Audio API
- **Photos romantiques** : Ajouter l'upload de fichiers
- **Mode éphémère** : Messages qui disparaissent
- **Notifications push** : Pour les messages reçus

## 🐛 Dépannage

### Problèmes Courants

**"Impossible de se connecter au serveur"**
- Vérifiez que le serveur est lancé sur le port 5000
- Vérifiez votre pare-feu et connexion réseau

**"Le QR code ne fonctionne pas"**
- Assurez-vous que les deux appareils sont sur le même réseau
- Vérifiez que les deux navigateurs supportent WebRTC

**"Les messages ne s'affichent pas"**
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que les deux partenaires sont connectés

### Logs de Débogage

Activer les logs détaillés :
```javascript
// Dans LoveContext.js
console.log('Mode debug activé');
```

## 📱 Compatibilité

- **Navigateurs** : Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile** : iOS 13+, Android 8+
- **WebRTC** : Requis pour la communication P2P

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/NouvelleFonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrir une Pull Request

## 📚 Documentation

- [Documentation WebRTC](https://webrtc.org/getting-started/overview)
- [Documentation libsodium](https://libsodium.gitbook.io/doc/)
- [Documentation Socket.io](https://socket.io/docs/v4/)
- [Documentation React](https://react.dev/)
- [Documentation TailwindCSS](https://tailwindcss.com/docs)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 💝 Remerciements

- [**libsodium**](https://libsodium.gitbook.io/doc/) pour le chiffrement sécurisé
- [**Socket.io**](https://socket.io/) pour la signalisation WebRTC
- [**React**](https://react.dev/) et [**TailwindCSS**](https://tailwindcss.com/) pour l'interface
- **Tous les couples** qui testent et améliorent LoveLink

## 🔗 Liens Utiles

- [API WebRTC - Documentation MDN](https://developer.mozilla.org/fr/docs/Web/API/WebRTC_API)
- [Bonnes Pratiques Cryptographiques](https://libsodium.gitbook.io/doc/quickstart)
- [Tutoriel Socket.io](https://socket.io/get-started/chat)
- [Documentation React Hooks](https://react.dev/reference/react)

---

**Fait avec 💕 pour connecter les amoureux**

*LoveLink - Votre intimité numérique protégée*
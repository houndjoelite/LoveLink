const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configuration CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Stockage temporaire
const connections = new Map();
const loveRooms = new Map();

// Endpoint pour créer une nouvelle salle d'amour
app.post('/api/create-love-room', (req, res) => {
  try {
    const generateRoomId = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    
    let roomId;
    let attempts = 0;
    const maxAttempts = 5;
    
    do {
      roomId = generateRoomId();
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error('Impossible de générer un code de salle unique');
      }
    } while (loveRooms.has(roomId));
    
    const room = {
      id: roomId,
      createdAt: new Date(),
      participants: [],
      status: 'waiting',
      creatorSocketId: null,
      lastActivity: new Date()
    };
    
    loveRooms.set(roomId, room);
    
    console.log(`✨ Salle créée: ${roomId}`);
    
    res.json({
      success: true,
      roomId,
      invitationUrl: `http://localhost:3000/join/${roomId}`,
      message: 'Salle d\'amour créée avec succès 💕',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erreur lors de la création de la salle:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la création de la salle'
    });
  }
});

// Fonction utilitaire pour normaliser l'ID de la salle
const normalizeRoomId = (id) => {
  if (!id) return '';
  return id.trim();
};

// Endpoint pour vérifier une salle
app.post('/api/check-room', (req, res) => {
  try {
    const { roomId } = req.body;
    
    if (!roomId) {
      return res.status(200).json({
        exists: false,
        error: 'Aucun code de salle fourni'
      });
    }
    
    const normalizedRoomId = normalizeRoomId(roomId);
    
    let foundRoom = null;
    let foundRoomId = null;
    
    for (const [id, room] of loveRooms.entries()) {
      if (id.toLowerCase() === normalizedRoomId.toLowerCase()) {
        foundRoom = room;
        foundRoomId = id;
        break;
      }
    }
    
    if (!foundRoom) {
      return res.status(200).json({
        exists: false,
        error: 'Code de salle invalide ou expiré'
      });
    }
    
    if (foundRoom.participants.length >= 2) {
      return res.status(200).json({
        exists: false,
        error: 'Cette salle est déjà complète'
      });
    }
    
    res.status(200).json({
      exists: true,
      roomId: foundRoomId,
      status: foundRoom.status
    });
    
  } catch (error) {
    console.error('Erreur lors de la vérification de la salle:', error);
    res.status(200).json({
      exists: false,
      error: 'Erreur lors de la vérification de la salle'
    });
  }
});

// Fonction pour trouver une salle par son ID
const findRoomById = (roomId) => {
  try {
    const normalizedId = roomId ? roomId.trim() : '';
    if (!normalizedId) return null;
    
    if (loveRooms.has(normalizedId)) {
      return {
        room: loveRooms.get(normalizedId),
        originalId: normalizedId
      };
    }
    
    for (const [id, room] of loveRooms.entries()) {
      if (id.toLowerCase() === normalizedId.toLowerCase()) {
        return { room, originalId: id };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erreur dans findRoomById:', error);
    return null;
  }
};

// Endpoint pour rejoindre une salle
app.post('/api/join-love-room', (req, res) => {
  const { roomId } = req.body;
  
  const roomInfo = findRoomById(roomId);
  
  if (!roomInfo) {
    return res.status(404).json({
      success: false,
      error: 'Cette salle d\'amour n\'existe pas ou a expiré 💔'
    });
  }
  
  const { room, originalId } = roomInfo;
  
  if (room.participants.length >= 2) {
    return res.status(400).json({
      success: false,
      error: 'Cette salle d\'amour est déjà complète 💔'
    });
  }
  
  res.json({
    success: true,
    roomId: originalId,
    message: 'Prêt à rejoindre votre partenaire 💕',
    isCreator: false
  });
});

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('💕 Utilisateur connecté:', socket.id);

  // Rejoindre une salle d'amour
  socket.on('join-love-room', ({ roomId, isCreator = false }) => {
    const roomInfo = findRoomById(roomId);
    
    if (!roomInfo) {
      socket.emit('error', { 
        type: 'room_not_found',
        message: 'Salle d\'amour introuvable. Vérifiez le code et réessayez. 💔' 
      });
      return;
    }

    const { room, originalId } = roomInfo;
    
    if (room.participants.length >= 2) {
      socket.emit('error', { 
        type: 'room_full',
        message: 'Cette salle d\'amour est déjà complète. 💔' 
      });
      return;
    }

    if (isCreator) {
      room.creatorSocketId = socket.id;
    }

    socket.join(originalId);
    connections.set(socket.id, originalId);
    
    const participant = {
      id: socket.id,
      isCreator,
      joinedAt: new Date(),
      username: isCreator ? 'Créateur' : 'Partenaire'
    };
    
    room.participants.push(participant);
    
    console.log(`💕 ${socket.id} a rejoint la salle d'amour ${originalId} (${isCreator ? 'Créateur' : 'Invité'})`);
    
    if (room.participants.length === 2) {
      room.status = 'connected';
      console.log(`✨ La salle ${originalId} est maintenant complète !`);
      
      io.to(originalId).emit('love-connection-established', {
        roomId: originalId,
        participants: room.participants.map(p => ({
          id: p.id,
          isCreator: p.isCreator
        }))
      });
    }
    
    socket.to(originalId).emit('partner-joined', {
      partnerId: socket.id,
      isCreator,
      roomInfo: {
        participantCount: room.participants.length,
        status: room.status
      }
    });
    
    socket.emit('room-info', {
      roomId: originalId,
      isCreator,
      participants: room.participants,
      status: room.status
    });
    
    console.log(`📊 Salle ${originalId}: ${room.participants.length}/2 participants`);
  });

  // 🔥 CORRECTION PRINCIPALE : Gestion des messages
  socket.on('love-message', (data) => {
    const { roomId, message, tempId } = data;
    
    console.log(`📥 [serveur] love-message reçu de ${socket.id}:`, { roomId, tempId, msgLength: message?.length });
    
    const roomInfo = findRoomById(roomId);
    if (!roomInfo) {
      console.error('❌ Salle introuvable:', roomId);
      socket.emit('error', { 
        type: 'invalid_room',
        message: 'Salle introuvable' 
      });
      return;
    }
    
    const { room, originalId } = roomInfo;
    const sender = room.participants.find(p => p.id === socket.id);
    
    if (!sender) {
      console.error('❌ Utilisateur non autorisé:', socket.id);
      socket.emit('error', { 
        type: 'unauthorized',
        message: 'Vous ne faites pas partie de cette salle' 
      });
      return;
    }
    
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    // 1️⃣ ENVOYER LA CONFIRMATION À L'EXPÉDITEUR
    socket.emit('love-message', {
      type: 'confirmation',
      tempId: tempId,
      newId: messageId,
      timestamp: timestamp
    });
    
    console.log(`✅ [serveur] Confirmation envoyée à ${socket.id} pour tempId: ${tempId}`);
    
    // 2️⃣ DIFFUSER LE MESSAGE AUX AUTRES PARTICIPANTS
    socket.to(originalId).emit('love-message', {
      messageId: messageId,
      from: socket.id,
      message: message,
      timestamp: timestamp,
      senderId: socket.id,
      isSystem: false,
      roomId: originalId
    });
    
    console.log(`📤 [serveur] Message diffusé dans la salle ${originalId}`);
    console.log(`👥 Participants:`, room.participants.map(p => `${p.id} (${p.isCreator ? 'créateur' : 'invité'})`));
  });

  // Signalisation WebRTC - Offre
  socket.on('love-offer', (data) => {
    if (!data.roomId || !loveRooms.has(data.roomId)) {
      return socket.emit('error', { message: 'Salle introuvable' });
    }
    
    const room = loveRooms.get(data.roomId);
    const sender = room.participants.find(p => p.id === socket.id);
    
    if (!sender) {
      return socket.emit('error', { message: 'Non autorisé' });
    }
    
    if (data.to) {
      const targetUser = room.participants.find(p => p.id === data.to);
      if (targetUser) {
        socket.to(targetUser.id).emit('love-offer', {
          from: socket.id,
          offer: data.offer,
          roomId: data.roomId
        });
      }
    } else {
      socket.to(data.roomId).emit('love-offer', {
        offer: data.offer,
        senderId: socket.id
      });
    }
  });

  // Signalisation WebRTC - Réponse
  socket.on('love-answer', (data) => {
    if (!data.roomId || !loveRooms.has(data.roomId)) {
      return socket.emit('error', { message: 'Salle introuvable' });
    }
    
    const room = loveRooms.get(data.roomId);
    
    if (data.to) {
      const targetUser = room.participants.find(p => p.id === data.to);
      if (targetUser) {
        socket.to(targetUser.id).emit('love-answer', {
          from: socket.id,
          answer: data.answer
        });
      }
    } else {
      socket.to(data.roomId).emit('love-answer', {
        answer: data.answer,
        senderId: socket.id
      });
    }
  });

  // Échange des candidats ICE
  socket.on('love-ice-candidate', (data) => {
    if (!data.roomId || !loveRooms.has(data.roomId)) {
      return socket.emit('error', { message: 'Salle introuvable' });
    }
    
    const room = loveRooms.get(data.roomId);
    
    if (data.to) {
      const targetUser = room.participants.find(p => p.id === data.to);
      if (targetUser) {
        socket.to(targetUser.id).emit('love-ice-candidate', {
          from: socket.id,
          candidate: data.candidate
        });
      }
    } else {
      socket.to(data.roomId).emit('love-ice-candidate', {
        candidate: data.candidate,
        senderId: socket.id
      });
    }
  });

  socket.on('ice-candidate', (data) => {
    if (!data.roomId || !loveRooms.has(data.roomId)) {
      return socket.emit('error', { message: 'Salle introuvable' });
    }
    
    const room = loveRooms.get(data.roomId);
    const targetUser = room.participants.find(p => p.id === data.to);
    
    if (targetUser) {
      socket.to(targetUser.id).emit('ice-candidate', {
        from: socket.id,
        candidate: data.candidate
      });
    }
  });

  // Nettoyage en cas de déconnexion imminente
  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (roomId === socket.id) continue;
      
      const room = loveRooms.get(roomId);
      if (!room) continue;
      
      room.participants = room.participants.filter(p => p.id !== socket.id);
      
      socket.to(roomId).emit('partner-left', {
        message: 'Votre partenaire s\'est déconnecté',
        remainingParticipants: room.participants.length
      });
      
      if (room.participants.length === 0) {
        loveRooms.delete(roomId);
        console.log(`💔 Salle d'amour ${roomId} supprimée (vide)`);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`👋 Utilisateur déconnecté: ${socket.id}`);
    
    const roomId = connections.get(socket.id);
    if (!roomId || !loveRooms.has(roomId)) {
      return;
    }
    
    const room = loveRooms.get(roomId);
    room.participants = room.participants.filter(p => p.id !== socket.id);
    connections.delete(socket.id);
    
    console.log(`🚪 ${socket.id} a quitté la salle ${roomId}`);
    
    socket.to(roomId).emit('partner-left', {
      partnerId: socket.id,
      message: 'Votre partenaire s\'est déconnecté(e) 💔',
      remainingParticipants: room.participants.length
    });
    
    if (room.participants.length === 0) {
      console.log(`🗑️ Suppression de la salle vide: ${roomId}`);
      loveRooms.delete(roomId);
    }
  });
});

// Nettoyage des salles inactives
setInterval(() => {
  const now = new Date();
  for (const [roomId, room] of loveRooms.entries()) {
    if (now - room.createdAt > 24 * 60 * 60 * 1000) {
      loveRooms.delete(roomId);
      console.log(`💔 Nettoyage: Salle d'amour ${roomId} expirée`);
    }
  }
}, 60 * 60 * 1000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`💕 Serveur LoveLink en cours d'exécution sur le port ${PORT}`);
  console.log('💕 Prêt à connecter les amoureux!');
  console.log(`💕 URL: http://localhost:${PORT}`);
});
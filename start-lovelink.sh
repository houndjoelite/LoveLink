#!/bin/bash

echo "💕 LoveLink - Démarrage de l'application d'amour 💕"
echo

echo "🚀 Démarrage du serveur de signalisation..."
gnome-terminal -- bash -c "cd server && npm start; exec bash" &

sleep 3

echo "💻 Démarrage de l'application React..."
gnome-terminal -- bash -c "cd client && npm start; exec bash" &

echo
echo "✅ LoveLink est en cours de démarrage !"
echo "📱 Application: http://localhost:3000"
echo "🔧 Serveur: http://localhost:5000"
echo
echo "💕 Prêt à connecter les amoureux !"


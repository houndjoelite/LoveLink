@echo off
echo 💕 LoveLink - Démarrage de l'application d'amour 💕
echo.

echo 🚀 Démarrage du serveur de signalisation...
start "LoveLink Server" cmd /k "cd server && npm start"

timeout /t 3 /nobreak > nul

echo 💻 Démarrage de l'application React...
start "LoveLink Client" cmd /k "cd client && npm start"

echo.
echo ✅ LoveLink est en cours de démarrage !
echo 📱 Application: http://localhost:3000
echo 🔧 Serveur: http://localhost:5000
echo.
echo 💕 Prêt à connecter les amoureux !
pause

@echo off
echo Starting YojanaAI...
echo.

echo Starting Backend...
cd server
start "Backend" cmd /k "npm install && npm run dev"

echo Starting Frontend...
cd ..\client
start "Frontend" cmd /k "npm install && npm start"

echo.
echo YojanaAI is starting!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
pause

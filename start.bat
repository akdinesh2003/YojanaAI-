@echo off
echo Starting YojanaAI...
echo.

echo Starting Backend Server...
start "YojanaAI Backend" cmd /k "cd server && npm install && npm run dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend...
start "YojanaAI Frontend" cmd /k "cd client && npm install && npm start"

echo.
echo YojanaAI is starting up!
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul

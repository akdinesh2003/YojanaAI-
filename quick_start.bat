@echo off
title YojanaAI - Quick Start Setup
color 0A

echo.
echo ========================================
echo    🚀 YOJANAAI QUICK START SETUP 🚀
echo ========================================
echo.

echo 🎯 Setting up YojanaAI with FREE local AI...
echo.

echo 📋 Prerequisites Check:
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and restart this script.
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js found
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found!
    echo.
    pause
    exit /b 1
) else (
    echo ✅ npm found
)

echo.
echo ========================================
echo    🦙 STEP 1: OLLAMA SETUP 🦙
echo ========================================
echo.

echo 📥 Downloading Ollama (Free Local AI)...
echo.
echo Please:
echo 1. Go to: https://ollama.ai
echo 2. Download and install Ollama for Windows
echo 3. Restart your computer if prompted
echo 4. Come back and press any key to continue...
echo.
pause

echo.
echo 🚀 Installing AI Model...
echo.
echo Please open a NEW Command Prompt as Administrator and run:
echo.
echo    ollama run llama3
echo.
echo This will download the AI model (3-5 GB, takes 10-20 minutes)
echo Wait for it to complete, then come back here.
echo.
pause

echo.
echo 🔧 Testing Ollama...
echo.
echo Please open Command Prompt and run:
echo.
echo    ollama list
echo.
echo You should see "llama3" in the list.
echo Press any key when Ollama is working...
echo.
pause

echo.
echo ========================================
echo    ⚙️ STEP 2: ENVIRONMENT SETUP ⚙️
echo ========================================
echo.

echo 🎯 Creating environment configuration...
call create_env.bat

echo.
echo ========================================
echo    🚀 STEP 3: LAUNCH YOJANAAI 🚀
echo ========================================
echo.

echo 🎉 All setup complete! Launching YojanaAI...
echo.
echo Your app will be available at:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:5000
echo - Ollama: http://localhost:11434
echo.
echo Press any key to start the application...
pause

echo.
echo 🚀 Starting YojanaAI...
call start.bat

echo.
echo 🎉 YojanaAI is now running!
echo.
echo 🌟 Features available:
echo - Upload government scheme PDFs
echo - AI-powered analysis and summaries
echo - Multilingual support (English, Hindi, Telugu)
echo - 100%% FREE with unlimited usage
echo.
echo Enjoy your AI-powered government scheme analyzer!
echo.
pause

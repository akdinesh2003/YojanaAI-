@echo off
echo Creating .env file for YojanaAI...
echo.
echo Choose your AI provider:
echo 1. Ollama (Local - 100%% Free, Unlimited)
echo 2. Hugging Face (Free - 30k requests/month)
echo 3. Google Gemini (Free - 15 req/min)
echo 4. Anthropic Claude (Free - Limited)
echo.
set /p choice="Enter your choice (1-4): "

cd server

if exist .env (
    echo .env file already exists!
    echo Please edit it manually to change your AI provider.
    pause
    exit /b
)

echo # Server Configuration > .env
echo PORT=5000 >> .env
echo NODE_ENV=development >> .env
echo CLIENT_URL=http://localhost:3000 >> .env
echo. >> .env

if "%choice%"=="1" (
    echo # Ollama Configuration (Local - 100%% Free) >> .env
    echo AI_PROVIDER=ollama >> .env
    echo OLLAMA_BASE_URL=http://localhost:11434 >> .env
    echo OLLAMA_MODEL=llama3 >> .env
    echo # No API key needed - runs locally >> .env
) else if "%choice%"=="2" (
    echo # Hugging Face Configuration (Free - 30k req/month) >> .env
    echo AI_PROVIDER=huggingface >> .env
    echo HUGGINGFACE_API_KEY=your_huggingface_token_here >> .env
    echo HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.2 >> .env
) else if "%choice%"=="3" (
    echo # Google Gemini Configuration (Free - 15 req/min) >> .env
    echo AI_PROVIDER=gemini >> .env
    echo GEMINI_API_KEY=your_gemini_api_key_here >> .env
    echo GEMINI_MODEL=gemini-pro >> .env
) else if "%choice%"=="4" (
    echo # Anthropic Claude Configuration (Free - Limited) >> .env
    echo AI_PROVIDER=claude >> .env
    echo CLAUDE_API_KEY=your_claude_api_key_here >> .env
    echo CLAUDE_MODEL=claude-3-haiku-20240307 >> .env
) else (
    echo # Default to Ollama (Local - 100%% Free) >> .env
    echo AI_PROVIDER=ollama >> .env
    echo OLLAMA_BASE_URL=http://localhost:11434 >> .env
    echo OLLAMA_MODEL=llama3 >> .env
    echo # No API key needed - runs locally >> .env
)

echo. >> .env
echo # File Upload Configuration >> .env
echo MAX_FILE_SIZE=10485760 >> .env
echo UPLOAD_PATH=./uploads >> .env
echo. >> .env
echo # Rate Limiting >> .env
echo RATE_LIMIT_WINDOW_MS=900000 >> .env
echo RATE_LIMIT_MAX_REQUESTS=100 >> .env
echo. >> .env
echo # Logging >> .env
echo LOG_LEVEL=info >> .env
echo. >> .env
echo # Security >> .env
echo ENABLE_CORS=true >> .env
echo ENABLE_HELMET=true >> .env

echo.
echo .env file created successfully in server directory!
echo.
if "%choice%"=="1" (
    echo You chose OLLAMA (Local - 100%% Free)!
    echo.
    echo NEXT STEPS:
    echo 1. Download Ollama from: https://ollama.ai
    echo 2. Install and run: ollama run llama3
    echo 3. Run start.bat to launch YojanaAI
    echo.
    echo No API keys needed - everything runs on your computer!
) else (
    echo You chose a cloud provider!
    echo.
    echo IMPORTANT: You need to edit the .env file and add your API key.
    echo.
    echo After editing, you can run start.bat to launch the application.
)
echo.
pause

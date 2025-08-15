# 🦙 Ollama Setup Guide for YojanaAI

## 🎯 **What is Ollama?**
Ollama is a **100% FREE** local AI service that runs on your computer. It provides unlimited AI usage without any API costs or monthly limits.

## ✅ **Why Choose Ollama?**
- **💰 100% FREE** - No monthly costs
- **♾️ Unlimited usage** - No API call limits
- **🏠 Runs locally** - No internet dependency
- **🔒 Private** - Your data stays on your computer
- **🚀 High quality** - Uses models like Llama 3, Mistral

## 📥 **Step 1: Download Ollama**

### Windows:
1. Go to [https://ollama.ai](https://ollama.ai)
2. Click "Download for Windows"
3. Run the installer
4. Restart your computer if prompted

### Alternative (if installer doesn't work):
1. Download from: [https://github.com/ollama/ollama/releases](https://github.com/ollama/ollama/releases)
2. Look for `ollama-windows-amd64.zip`
3. Extract and run `ollama.exe`

## 🚀 **Step 2: Install AI Model**

1. **Open Command Prompt** (as Administrator)
2. **Run this command:**
   ```bash
   ollama run llama3
   ```
3. **Wait for download** (about 3-5 GB, takes 10-20 minutes)
4. **Model will start automatically**

## 🔧 **Step 3: Test Ollama**

1. **Open new Command Prompt**
2. **Test with:**
   ```bash
   ollama list
   ```
3. **You should see:**
   ```
   NAME    ID      SIZE   MODIFIED
   llama3  latest  3.8GB  2 minutes ago
   ```

## 🎯 **Step 4: Setup YojanaAI**

1. **Run `create_env.bat`** in your project folder
2. **Choose option 1** (Ollama)
3. **Run `start.bat`** to launch the application

## 🌐 **Access Your App**

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Ollama:** http://localhost:11434

## 🧪 **Test AI Features**

1. **Upload a PDF** (government scheme document)
2. **Choose analysis type** (summary, eligibility, benefits)
3. **Select language** (English, Hindi, Telugu)
4. **Get AI-powered analysis!**

## 🔍 **Troubleshooting**

### Ollama not starting?
```bash
# Check if Ollama is running
ollama list

# Start Ollama service
ollama serve
```

### Model not found?
```bash
# Pull the model again
ollama pull llama3

# Run the model
ollama run llama3
```

### Port conflicts?
- Make sure ports 3000, 5000, and 11434 are free
- Close other applications using these ports

## 📱 **Available Models**

You can try different models:
```bash
# Fast and efficient
ollama run mistral

# Best quality (larger)
ollama run llama3

# Code focused
ollama run codellama

# Multilingual
ollama run qwen2
```

## 🎉 **You're All Set!**

Your YojanaAI now runs with:
- ✅ **Unlimited AI analysis** (100% free)
- ✅ **Local processing** (no internet needed)
- ✅ **Multilingual support** (English, Hindi, Telugu)
- ✅ **PDF processing** and AI insights
- ✅ **No monthly costs** or API limits

**Enjoy your free, unlimited AI-powered government scheme analyzer!** 🚀

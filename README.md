# YojanaAI 🧾

**AI That Reads Government Schemes for You**

## 🚀 Features
- Upload or select government scheme PDFs
- AI explains benefits, eligibility, and deadlines
- Multilingual support (Telugu, Hindi, English)
- Voice-based interaction (optional)
- Smart summarization of complex documents
- User-friendly interface for all age groups

## 🛠️ Tech Stack
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js + Express
- **AI/NLP**: OpenAI GPT API + LangChain
- **PDF Parsing**: PDF.js + pdf-parse
- **Voice Support**: Web Speech API
- **Languages**: i18n + GPT translation
- **Database**: MongoDB (optional for user data)

## 🌍 Impact
Empowers citizens to understand and access public welfare schemes easily, bridging the gap between government policies and public understanding.

## 📦 Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd YojanaAI
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In server directory, create .env file
   cp .env.example .env
   ```
   
   Add your OpenAI API key to `.env`:
   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=5000
   MONGODB_URI=your_mongodb_uri_here
   ```

4. **Run the application**
   ```bash
   # Terminal 1 - Start backend
   cd server
   npm run dev
   
   # Terminal 2 - Start frontend
   cd client
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🎯 Usage

1. **Upload PDF**: Drag and drop or select a government scheme PDF
2. **AI Analysis**: The AI will automatically extract and summarize key information
3. **View Results**: See eligibility criteria, benefits, deadlines, and requirements
4. **Language Support**: Switch between Telugu, Hindi, and English
5. **Voice Interaction**: Use voice commands for hands-free operation

## 🏗️ Project Structure
```
YojanaAI/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   ├── assets/        # Images, icons, etc.
│   │   └── App.js         # Main app component
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── utils/            # Utility functions
│   ├── models/           # Database models (if using DB)
│   ├── package.json
│   └── server.js         # Main server file
├── README.md
└── .gitignore
```

## 🔧 API Endpoints

- `POST /api/upload` - Upload and process PDF
- `POST /api/analyze` - Analyze PDF content with AI
- `GET /api/schemes` - Get list of processed schemes
- `POST /api/translate` - Translate content to different languages

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Areas for Contribution
- Regional language support (Telugu, Hindi, etc.)
- Accessibility improvements
- UI/UX enhancements
- Performance optimizations
- Additional AI features

## 📱 Screenshots

*Coming soon - Add screenshots of your application here*

## 🚀 Roadmap

- [ ] PDF upload and processing
- [ ] AI-powered content analysis
- [ ] Multilingual support
- [ ] Voice interaction
- [ ] User authentication
- [ ] Scheme database
- [ ] Mobile app
- [ ] Offline support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Government of India for making schemes accessible
- Open source community for various libraries and tools

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check our documentation

---

**Made with ❤️ for the people of India**

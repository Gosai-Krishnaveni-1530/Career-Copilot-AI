# CareerCopilot AI 🚀

CareerCopilot AI is an AI-powered career guidance platform that helps students, graduates, and job seekers improve their resumes, identify skill gaps, and receive personalized career recommendations using Large Language Models (LLMs).

---

## ✨ Features

### 📄 Resume ATS Analysis
- Upload PDF resumes
- ATS score calculation
- Strengths & weaknesses identification
- Current skills extraction
- Missing skills detection
- Resume improvement suggestions

### 🎯 Resume vs Job Description Matching
- Compare resume against a Job Description
- Match score calculation
- Missing keywords identification
- Strength analysis
- Personalized recommendations

### 🤖 AI Career Coach
- Interactive AI assistant
- Personalized career guidance
- Project recommendations
- Certification suggestions
- Interview preparation advice
- Learning roadmap generation

### 📊 Dashboard Analytics
- ATS score visualization
- Skills overview
- Resume insights
- Career recommendations
- Performance breakdown

### 🛣️ Learning Roadmap
- Customized learning plans
- Skill development paths
- Career growth recommendations

### ⚙️ Settings
- AI model selection
- Coach response customization
- User profile management
- Data management options

### 💬 Floating AI Assistant
- Available throughout the application
- Persistent chat history
- Resume-aware conversations
- JD Match-aware conversations

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Context API

### Backend
- Node.js
- Express.js
- Multer
- PDF-Parse

### AI Models
- Ollama
- Llama 3.2
- Phi-3
- Gemma
- Qwen

### Utilities
- PDFKit
- Local Storage

---

## 📂 Project Structure

```text
career-copilot-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/career-copilot-ai.git

cd career-copilot-ai
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd backend

npm install

node server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## 🦙 Ollama Setup

Install Ollama:

https://ollama.com

Pull required models:

```bash
ollama pull llama3.2

ollama pull phi3

ollama pull gemma

ollama pull qwen
```

Start Ollama:

```bash
ollama serve
```

---

## 📈 Application Workflow

1. Upload Resume
2. ATS Analysis Generated
3. Dashboard Displays Insights
4. Compare Resume with JD
5. View Match Score & Missing Skills
6. Chat with AI Career Coach
7. Receive Personalized Guidance
8. Follow Learning Roadmap

---

## 🔥 Key Highlights

- AI-Powered Resume Analysis
- ATS Optimization
- Job Description Matching
- Personalized Career Coaching
- Skill Gap Identification
- Learning Roadmaps
- Interactive Dashboard
- Multiple LLM Support
- Persistent AI Chat
- Modern SaaS UI

---

## 🎯 Future Enhancements

- Resume Builder
- Interview Simulator
- Job Search Integration
- LinkedIn Profile Analyzer
- Multi-Resume Management
- Cloud Deployment
- User Authentication
- Theme Customization

---

## 👩‍💻 Author

Krishnaveni Gosai

Built with ❤️ using React, Node.js, Express, Tailwind CSS, and Ollama.

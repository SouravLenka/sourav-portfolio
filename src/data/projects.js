export const projects = [
  {
    title: "AI Resume Parser",
    shortDescription: "OCR-powered AI system for extracting structured, ATS-ready data from scanned resumes.",
    longDescription: "An end-to-end intelligent document processing system that converts scanned resume images into structured JSON data. It features a hybrid architecture using GPU-accelerated Vision-Language OCR (olmOCR-2) and modular local NLP parsing logic for high accuracy and scalability.",
    tech: ["Python", "OCR", "Vision-Language", "NLP", "PyTorch", "Transformers"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop", // Resume/Document
    github: "https://github.com/SouravLenka/ai-resume-parser.git"
  },
  {
    title: "Jarvis AI Assistant",
    shortDescription: "Python-based system automation & voice assistant.",
    longDescription: "A flagship Python automation project designed for system interaction and productivity. It executes system commands, handles file operations, processes logs, and demonstrates advanced subprocess usage. Built with a focus on reliability and system-level understanding.",
    tech: ["Python", "Automation", "Subprocess", "Linux", "Speech Recog"],
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2070&auto=format&fit=crop", // AI/Robotics
    github: "https://github.com/SouravLenka/jarivs.git"
  },
  {
    title: "Nexus Learning Platform",
    shortDescription: "Full-Stack PHP & MySQL E-Learning System.",
    longDescription: "A complete full-stack e-learning web application featuring course playlists, video-based learning, user engagement tools (likes, bookmarks, comments), and a powerful admin dashboard for tutors to manage content and users. Built with a modular and scalable PHP architecture.",
    tech: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", // Education/School
    github: "https://github.com/SouravLenka/NEXUS.git"
  },
  {
    title: "RAG-Based PDF Question Answering Chatbot",
    shortDescription: "AI-powered study assistant for extracting answers from PDF notes.",
    longDescription: "An advanced RAG-based AI system that enables natural-language queries over PDF documents. It uses FAISS for semantic retrieval, HuggingFace embeddings for vector storage, and local LLaMA models via Ollama for privacy-focused, document-grounded answer generation. Built with LangChain and Streamlit.",
    tech: ["Python", "LangChain", "FAISS", "HuggingFace", "Ollama", "LLaMA"],
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop", // Documents/Data
    github: "https://github.com/SouravLenka/RAG-BOT.git"
  },
  {
    title: "QR Code Generator Web Application",
    shortDescription: "Flask-based QR Code Generator with instant preview and download.",
    longDescription: "Developed and deployed a Flask-based QR Code Generator web application that allows users to generate QR codes from URLs or text, preview them instantly, and download the generated QR image. Features dynamic request handling and production-ready cloud deployment.",
    tech: ["Python", "Flask", "HTML/CSS", "Jinja2", "QR Code", "Pillow", "Render"],
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/QR-generator.git",
    live: "https://qr-generator-gxi1.onrender.com"
  },
  {
    title: "Attendance Calculator",
    shortDescription: "Interactive Streamlit app for academic attendance planning.",
    longDescription: "A production-deployed Python application that helps students maintain target attendance. It calculates required future classes, safe-to-miss counts, and provides visual progress tracking with Matplotlib. Deployed on Streamlit Cloud.",
    tech: ["Python", "Streamlit", "Matplotlib", "Pandas", "Cloud Deployment"],
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop", // Data/Stats
    github: "https://github.com/SouravLenka/attendance-calculator.git",
    live: "https://attendance-calculator.streamlit.app/"
  },
  {
    title: "ISL Detection Project",
    shortDescription: "Computer vision & machine learning system for Indian Sign Language recognition.",
    longDescription: "A gesture recognition pipeline designed to identify hand signs in Indian Sign Language. Focuses on image data preparation, class-wise labeling, and model-ready dataset organization for CNN-based classification. Aims to bridge communication gaps for the hearing-impaired.",
    tech: ["Python", "Computer Vision", "Machine Learning", "OpenCV", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1974&auto=format&fit=crop", // Communication/Sign Language
    github: "https://github.com/SouravLenka/ISL-Project.git"
  },
  {
    title: "AI Personal Finance Tracker",
    shortDescription: "AI-assisted expense analysis & budget monitoring system.",
    longDescription: "A Python & Streamlit-based application that extracts transaction data from bank statements (PhonePe), categorizes expenses using AI logic, and provides financial insights through an interactive modular dashboard. Designed with a scalable, AI-ready architecture.",
    tech: ["Python", "Streamlit", "Data Extraction", "AI Categorization", "Financial Analytics"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop", // Finance/Money
    github: "https://github.com/SouravLenka/finance_tracker.git"
  },
  {
    title: "OMEN Chatbot",
    shortDescription: "AI-powered conversational assistant using OpenAI API.",
    longDescription: "A Python-based AI chatbot built with Streamlit and OpenAI API. Features multi-turn conversational memory, secure API key handling, and a modern chat interface. Designed for production-style LLM integration and real-time response generation.",
    tech: ["Python", "OpenAI API", "Streamlit", "LLM", "NLP"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2012&auto=format&fit=crop", // Robot/AI
    github: "https://github.com/SouravLenka/chatbot.git",
    live: "https://omenchatbot.streamlit.app/"
  },
  {
    title: "EcoAssist",
    shortDescription: "AI sustainability policy assistant.",
    longDescription: "Developed during an internship (1M1B), this RAG-based Streamlit application helps users understand sustainability policies. It focuses on real-world social impact through accessible AI.",
    tech: ["Python", "Streamlit", "RAG", "AI"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5afa?q=80&w=2072&auto=format&fit=crop", // Nature/Green
    github: "https://github.com/SouravLenka/ecoassist.git"
  },
  {
    title: "Firebase Basic Projects",
    shortDescription: "Secure authentication & real-time database apps using Firebase.",
    longDescription: "A collection of mini applications demonstrating Firebase core services. Implemented user-based authentication, NoSQL data modeling with Firestore, and real-time synchronization. Developed during a Firebase & DevOps workshop to master BaaS fundamentals.",
    tech: ["Firebase Auth", "Firestore", "JavaScript", "HTML/CSS", "NoSQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop", // Cloud/Data
    github: "https://github.com/SouravLenka/Firebase-Projects.git"
  },
  {
    title: "Mini E-Commerce Website",
    shortDescription: "Basic product listing & shopping flow web application.",
    longDescription: "A frontend-focused web application demonstrating the core structure of an online shopping platform. Features product listings with dynamic details, a clean responsive layout, and interactive shopping flow elements using HTML, CSS, and vanilla JavaScript.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop", // Shop/Retail
    github: "https://github.com/SouravLenka/ecommerce.git"
  }
];

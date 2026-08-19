export const projects = [
  {
    title: "Astral Rift",
    shortDescription:
      "Local co-op roguelite space shooter built with Godot 4 & C#/.NET featuring event-driven architecture & shader visuals.",
    longDescription:
      "Astral Rift is a high-octane local co-op roguelite space shooter built in Godot 4 (.NET / GDScript). It features a dual-pilot combat system (Cyan Nova Pulse & Purple Rift Collapse), dynamic arena velocity physics, procedural wave scaling, floating damage indicators, combo streak mechanics, and an event-driven decoupled HUD powered by a global GameEvents bus. Built with shader-driven cinematic intro sequences and modular UI component architecture.",
    features: [
      "2-Player Local Co-Op (WASD & Arrow controls)",
      "Event-Driven Global Event Bus Architecture (GameEvents.gd)",
      "Distinct Pilot Ultimates: Nova Pulse & Rift Collapse",
      "Procedural Enemy Waves & Scalable Boss Encounters",
      "Dynamic Combo Streak System & Floating Damage FX",
      "Shader-Driven Cinematic SORA Branding & Rift Visuals",
      "Modular Scene Architecture with Decoupled UI HUD Components",
    ],
    tech: [
      "Godot 4",
      "GDScript",
      "C# / .NET 8",
      "Shaders (GLSL)",
      "Event Bus Pattern",
      "Game Architecture",
    ],
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=2074&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/Astral-Rift.git",
    iconName: "Gamepad",
  },
  {
    title: "AI StoryTeller",
    shortDescription:
      "Transforms uploaded images into creative, engaging stories using a two-stage AI pipeline.",
    longDescription:
      "An AI-powered web application that transforms uploaded images into creative, engaging stories using a two-stage AI pipeline. The system first generates image captions using a vision-language model, then converts the caption into a detailed story using a large language model.",
    features: [
      "Image upload support",
      "AI-based image caption generation",
      "Story generation from captions",
      "Two-stage AI pipeline architecture",
      "Clean and interactive UI",
    ],
    tech: [
      "Python",
      "Streamlit",
      "BLIP",
      "LLM Integration",
      "Prompt Engineering",
    ],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/AI_StoryTeller.git",
    iconName: "Story",
  },
  {
    title: "MindForge (Hackathon Project)",
    shortDescription: "AI-based intelligent learning assistant for context-aware doubt resolution.",
    longDescription: "MindForge is an AI-powered intelligent learning assistant developed as a hackathon project, where I served as the Team Leader. I led the architectural design and coordinated frontend, backend, and AI integration. The system delivers context-aware, syllabus-aligned doubt resolution using a Retrieval-Augmented Generation (RAG) pipeline.",
    features: [
      "Context-aware doubt resolution",
      "RAG-based architecture",
      "Syllabus-aligned document retrieval",
      "Conversational memory handling",
      "AI-generated structured explanations",
      "Modular full-stack integration"
    ],
    tech: ["React", "Flask", "LangChain", "ChromaDB", "Ollama", "Llama 3", "RAG", "Python", "Axios"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/PS-HK19_MindForge_MindForge.git",
    iconName: "Mind"
  },
  {
    title: "AI Resume Parser",
    shortDescription:
      "OCR-powered AI system for extracting structured, ATS-ready data from scanned resumes.",
    longDescription:
      "An end-to-end intelligent document processing system that converts scanned resume images into structured JSON data. It features a hybrid architecture using GPU-accelerated Vision-Language OCR (olmOCR-2) and modular local NLP parsing logic for high accuracy and scalability.",
    features: [
      "Vision-Language OCR extraction",
      "Hybrid parsing architecture",
      "ATS-ready JSON formatting",
      "GPU-accelerated processing",
      "Scalable document pipeline",
    ],
    tech: [
      "Python",
      "OCR",
      "Vision-Language",
      "NLP",
      "PyTorch",
      "Transformers",
    ],
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/ai-resume-parser.git",
    iconName: "FileText",
  },
  {
    title: "Jarvis AI Assistant",
    shortDescription: "Python-based system automation & voice assistant.",
    longDescription:
      "A flagship Python automation project designed for system interaction and productivity. It executes system commands, handles file operations, processes logs, and demonstrates advanced subprocess usage. Built with a focus on reliability and system-level understanding.",
    features: [
      "Voice command recognition",
      "System automation routines",
      "File management tools",
      "Log processing capabilities",
      "Subprocess optimization",
    ],
    tech: ["Python", "Automation", "Subprocess", "Linux", "Speech Recog"],
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/jarivs.git",
    iconName: "Bot",
  },
  {
    title: "Nexus Learning Platform",
    shortDescription: "Full-Stack PHP & MySQL E-Learning System.",
    longDescription:
      "A complete full-stack e-learning web application featuring course playlists, video-based learning, user engagement tools (likes, bookmarks, comments), and a powerful admin dashboard for tutors to manage content and users. Built with a modular and scalable PHP architecture.",
    features: [
      "Course management dashboard",
      "Interactive video player",
      "User engagement features",
      "Admin content controls",
      "Scalable SQL database",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "HTML/CSS"],
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/NEXUS.git",
    iconName: "Globe",
  },
  {
    title: "RAG-Based PDF Question Answering Chatbot",
    shortDescription:
      "AI-powered study assistant for extracting answers from PDF notes.",
    longDescription:
      "An advanced RAG-based AI system that enables natural-language queries over PDF documents. It uses FAISS for semantic retrieval, HuggingFace embeddings for vector storage, and local LLaMA models via Ollama for privacy-focused, document-grounded answer generation. Built with LangChain and Streamlit.",
    features: [
      "Natural language PDF queries",
      "FAISS semantic retrieval",
      "Privacy-focused local inference",
      "LangChain integration",
      "Streamlit user interface",
    ],
    tech: ["Python", "LangChain", "FAISS", "HuggingFace", "Ollama", "LLaMA"],
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/RAG-BOT.git",
    iconName: "Brain",
  },
  {
    title: "QR Code Generator Web Application",
    shortDescription:
      "Flask-based QR Code Generator with instant preview and download.",
    longDescription:
      "Developed and deployed a Flask-based QR Code Generator web application that allows users to generate QR codes from URLs or text, preview them instantly, and download the generated QR image. Features dynamic request handling and production-ready cloud deployment.",
    features: [
      "Instant QR generation",
      "Dynamic image previews",
      "Production cloud deployment",
      "Single-page application feel",
      "Downloadable QR assets",
    ],
    tech: [
      "Python",
      "Flask",
      "HTML/CSS",
      "Jinja2",
      "QR Code",
      "Pillow",
      "Render",
    ],
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/QR-generator.git",
    live: "https://qr-generator-gxi1.onrender.com",
    iconName: "QrCode",
  },
  {
    title: "Attendance Calculator",
    shortDescription:
      "Interactive Streamlit app for academic attendance planning.",
    longDescription:
      "A production-deployed Python application that helps students maintain target attendance. It calculates required future classes, safe-to-miss counts, and provides visual progress tracking with Matplotlib. Deployed on Streamlit Cloud.",
    features: [
      "Required class prediction",
      "Safe-to-miss calculation",
      "Visual progress tracking",
      "Interactive data input",
      "Cloud-ready deployment",
    ],
    tech: ["Python", "Streamlit", "Matplotlib", "Pandas", "Cloud Deployment"],
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/attendance-calculator.git",
    live: "https://attendance-calculator.streamlit.app/",
    iconName: "Calculator",
  },
  {
    title: "ISL Detection Project",
    shortDescription:
      "Computer vision & machine learning system for Indian Sign Language recognition.",
    longDescription:
      "A gesture recognition pipeline designed to identify hand signs in Indian Sign Language. Focuses on image data preparation, class-wise labeling, and model-ready dataset organization for CNN-based classification. Aims to bridge communication gaps for the hearing-impaired.",
    features: [
      "Sign language recognition",
      "CNN classification model",
      "Dataset labeling system",
      "Real-time hand tracking",
      "Accessibility focus",
    ],
    tech: [
      "Python",
      "Computer Vision",
      "Machine Learning",
      "OpenCV",
      "TensorFlow",
    ],
    image:
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1974&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/ISL-Project.git",
    iconName: "Hand",
  },
  {
    title: "AI Personal Finance Tracker",
    shortDescription:
      "AI-assisted expense analysis & budget monitoring system.",
    longDescription:
      "A Python & Streamlit-based application that extracts transaction data from bank statements (PhonePe), categorizes expenses using AI logic, and provides financial insights through an interactive modular dashboard. Designed with a scalable, AI-ready architecture.",
    features: [
      "Automated statement parsing",
      "AI expense categorization",
      "Budget insight generation",
      "Interactive data charts",
      "Scalable financial engine",
    ],
    tech: [
      "Python",
      "Streamlit",
      "Data Extraction",
      "AI Categorization",
      "Financial Analytics",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/finance_tracker.git",
    iconName: "Wallet",
  },
  {
    title: "OMEN Chatbot",
    shortDescription: "AI-powered conversational assistant using OpenAI API.",
    longDescription:
      "A Python-based AI chatbot built with Streamlit and OpenAI API. Features multi-turn conversational memory, secure API key handling, and a modern chat interface. Designed for production-style LLM integration and real-time response generation.",
    features: [
      "Multi-turn conversation",
      "Secure key management",
      "Modern chat UI",
      "OpenAI integration",
      "Context-aware handling",
    ],
    tech: ["Python", "OpenAI API", "Streamlit", "LLM", "NLP"],
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2012&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/chatbot.git",
    live: "https://omenchatbot.streamlit.app/",
    iconName: "MessageSquare",
  },
  {
    title: "EcoAssist",
    shortDescription: "AI sustainability policy assistant.",
    longDescription:
      "Developed during an internship (1M1B), this RAG-based Streamlit application helps users understand sustainability policies. It focuses on real-world social impact through accessible AI.",
    features: [
      "Policy context retrieval",
      "Sustainable goal tracking",
      "Social impact metrics",
      "RAG architecture",
      "Accessible AI interface",
    ],
    tech: ["Python", "Streamlit", "RAG", "AI"],
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5afa?q=80&w=2072&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/ecoassist.git",
    iconName: "Cpu",
  },
  {
    title: "Firebase Basic Projects",
    shortDescription:
      "Secure authentication & real-time database apps using Firebase.",
    longDescription:
      "A collection of mini applications demonstrating Firebase core services. Implemented user-based authentication, NoSQL data modeling with Firestore, and real-time synchronization. Developed during a Firebase & DevOps workshop to master BaaS fundamentals.",
    features: [
      "Secure user authentication",
      "NoSQL database syncing",
      "Real-time data flow",
      "BaaS implementation",
      "Mini-app ecosystem",
    ],
    tech: ["Firebase Auth", "Firestore", "JavaScript", "HTML/CSS", "NoSQL"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/Firebase-Projects.git",
    iconName: "Flame",
  },
  {
    title: "Mini E-Commerce Website",
    shortDescription: "Basic product listing & shopping flow web application.",
    longDescription:
      "A frontend-focused web application demonstrating the core structure of an online shopping platform. Features product listings with dynamic details, a clean responsive layout, and interactive shopping flow elements using HTML, CSS, and vanilla JavaScript.",
    features: [
      "Dynamic product listing",
      "Interactive shopping flow",
      "Responsive layout design",
      "Clean UI architecture",
      "Vanilla JS interactions",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
    github: "https://github.com/SouravLenka/ecommerce.git",
    iconName: "ShoppingBag",
  },
];

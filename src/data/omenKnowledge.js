/**
 * OMEN Knowledge Base - Cyber AI Intelligence Engine Data
 * Contains comprehensive facts, project summaries, tech stack details,
 * contact routes, and response triggers for Sourav Lenka's portfolio.
 */

export const SOURAV_PROFILE = {
  name: "Sourav Lenka",
  role: "AI & Automation Engineer | CS Undergraduate",
  tagline: "Building intelligent agentic systems, autonomous workflows, and cloud-backed AI applications.",
  bio: "Sourav Lenka is an aspiring AI & Automation Engineer and Computer Science undergraduate specializing in LLMs, RAG Pipelines, Vector Databases (FAISS/ChromaDB), Agentic AI, and DevOps Cloud Infrastructure. He engineers self-sustaining AI solutions, Vision-Language document processing systems, system automation bots, and full-stack web applications.",
  email: "souravlenka.work@gmail.com",
  github: "https://github.com/SouravLenka",
  linkedin: "https://www.linkedin.com/in/souravlenkaaa",
  resume: "/resume.pdf",
  location: "Bhubaneswar / India",
  education: "Bachelor of Technology in Computer Science & Engineering",
  coreFocus: [
    "AI & Agentic Workflows",
    "LLMs & RAG Pipelines",
    "Python & System Automation",
    "Cloud & DevOps Infrastructure"
  ]
};

export const QUICK_PROMPTS = [
  { id: "about", label: "⚡ Tell me about Sourav", query: "Who is Sourav Lenka?" },
  { id: "projects", label: "🚀 Show top RAG & AI projects", query: "What are Sourav's top AI & RAG projects?" },
  { id: "skills", label: "🛠️ What's Sourav's tech stack?", query: "What technical skills does Sourav have?" },
  { id: "contact", label: "📬 How do I contact Sourav?", query: "How can I contact Sourav or hire him?" }
];

export const KNOWLEDGE_TOPICS = [
  {
    keywords: ["who", "sourav", "bio", "about", "profile", "background", "introduce", "intro"],
    intent: "about_sourav",
    title: "About Sourav Lenka",
    text: "Sourav Lenka is an **AI & Automation Engineer** and CS undergraduate focused on creating autonomous AI agents, RAG pipelines, system automation scripts, and cloud infrastructure.\n\nHe specializes in **Python, LangChain, ChromaDB/FAISS, Ollama/Local LLMs, Computer Vision (OpenCV), and AWS/DevOps**.",
    actions: [
      { label: "View Skills", actionType: "scroll", target: "skills" },
      { label: "Download Resume", actionType: "link", target: "/resume.pdf", download: true }
    ]
  },
  {
    keywords: ["rag", "retrieval", "vector", "chromadb", "faiss", "langchain", "llama", "ollama", "doubt", "mindforge"],
    intent: "rag_expertise",
    title: "RAG & LLM Systems Expertise",
    text: "Sourav has engineered multiple high-performance RAG pipelines:\n\n" +
          "• **MindForge (Hackathon Project)**: Syllabi-aligned doubt resolution assistant built with LangChain, ChromaDB, and Ollama (Llama 3).\n" +
          "• **RAG-Based PDF Q&A Chatbot**: Natural language document search using FAISS vector store & HuggingFace embeddings.\n" +
          "• **EcoAssist**: Sustainability policy assistant for RAG context retrieval.",
    actions: [
      { label: "View MindForge Project", actionType: "scroll", target: "projects" },
      { label: "Contact Sourav", actionType: "scroll", target: "contact" }
    ]
  },
  {
    keywords: ["project", "projects", "work", "built", "apps", "portfolio", "github", "code"],
    intent: "projects_overview",
    title: "Sourav's Featured Projects",
    text: "Sourav's standout projects include:\n\n" +
          "1. 🚀 **MindForge**: Context-aware RAG learning assistant (Hackathon Lead).\n" +
          "2. 📄 **AI Resume Parser**: Hybrid Vision-Language OCR (olmOCR-2) resume extractor.\n" +
          "3. 🎮 **Astral Rift**: 2-Player co-op space roguelite shooter in Godot 4 & C#.\n" +
          "4. 🤖 **Jarvis AI Assistant**: System automation & voice command suite in Python.\n" +
          "5. 📸 **AI StoryTeller**: Image-to-story dual-stage AI pipeline (BLIP + LLMs).\n" +
          "6. 📱 **QR Code Generator**: Flask web application on Render.",
    actions: [
      { label: "Explore Projects Section", actionType: "scroll", target: "projects" },
      { label: "Open GitHub Profile", actionType: "link", target: "https://github.com/SouravLenka" }
    ]
  },
  {
    keywords: ["skill", "skills", "tech", "stack", "technology", "languages", "python", "frameworks", "tools"],
    intent: "skills_breakdown",
    title: "Technical Stack & Mastery",
    text: "Sourav's engineering toolkit encompasses:\n\n" +
          "• **AI & LLM Systems**: LangChain, ChromaDB, FAISS, Ollama/Llama 3, BLIP, OpenCV, Vision OCR.\n" +
          "• **Languages & Backend**: Python (Primary), C# / .NET 8, GDScript, PHP, Flask, JavaScript, SQL.\n" +
          "• **Automation & Cloud**: n8n, Bash, AWS Cloud/CLI, Linux Admin, CI/CD, Docker/Firebase.\n" +
          "• **Frontend & UI**: React 19, Vite, TailwindCSS, Framer Motion, Three.js / OGL.",
    actions: [
      { label: "Jump to Skills Radar", actionType: "scroll", target: "skills" }
    ]
  },
  {
    keywords: ["contact", "email", "hire", "reach", "linkedin", "message", "github", "connect"],
    intent: "contact_info",
    title: "Get in Touch with Sourav",
    text: "You can reach Sourav Lenka directly via:\n\n" +
          "📧 **Email**: souravlenka.work@gmail.com\n" +
          "💼 **LinkedIn**: [souravlenkaaa](https://www.linkedin.com/in/souravlenkaaa)\n" +
          "💻 **GitHub**: [SouravLenka](https://github.com/SouravLenka)\n\n" +
          "He is open for AI engineering opportunities, collaborations, and contract work!",
    actions: [
      { label: "Send Message Now", actionType: "scroll", target: "contact" },
      { label: "Open LinkedIn", actionType: "link", target: "https://www.linkedin.com/in/souravlenkaaa" }
    ]
  },
  {
    keywords: ["resume", "cv", "experience", "education", "degree", "qualification"],
    intent: "resume_info",
    title: "Resume & Background",
    text: "Sourav is pursuing a B.Tech in Computer Science & Engineering. He has led hackathon engineering teams and developed production-ready AI tools.\n\nYou can view and download his complete ATS-optimized resume directly below.",
    actions: [
      { label: "📄 Download Resume (PDF)", actionType: "link", target: "/resume.pdf", download: true }
    ]
  },
  {
    keywords: ["game", "astral", "rift", "godot", "c#", "shooter", "graphics", "shaders"],
    intent: "astral_rift",
    title: "Astral Rift - Co-Op Space Shooter",
    text: "Astral Rift is a local 2-player co-op roguelite shooter built in Godot 4 & C#/.NET 8. It features dual pilot abilities (Cyan Nova Pulse & Purple Rift Collapse), GLSL shaders, procedural enemy waves, and an event-driven global event bus architecture.",
    actions: [
      { label: "View GitHub Repo", actionType: "link", target: "https://github.com/SouravLenka/Astral-Rift.git" }
    ]
  },
  {
    keywords: ["ocr", "resume parser", "parser", "cv parser", "pdf parser", "vision"],
    intent: "resume_parser",
    title: "AI Resume Parser System",
    text: "The AI Resume Parser is a hybrid GPU-accelerated document pipeline using Vision-Language OCR (olmOCR-2) and custom PyTorch parsing logic to convert unstructured resume image scans into structured ATS JSON data.",
    actions: [
      { label: "View GitHub Repo", actionType: "link", target: "https://github.com/SouravLenka/ai-resume-parser.git" }
    ]
  },
  {
    keywords: ["hackathon", "achievement", "award", "lead", "leadership"],
    intent: "achievements_info",
    title: "Achievements & Leadership",
    text: "Sourav served as the **Team Leader** for the MindForge Hackathon project, driving AI architecture and full-stack integration under tight deadlines. He actively contributes to open source and continuous AI/DevOps innovation.",
    actions: [
      { label: "View Achievements Section", actionType: "scroll", target: "achievements" }
    ]
  }
];

export const DEFAULT_FALLBACK = {
  title: "OMEN Neural Intelligence Base",
  text: "I am **OMEN**, Sourav Lenka's autonomous portfolio AI. I can assist you with details regarding:\n\n" +
        "• Sourav's **AI & RAG Engineering Projects** (MindForge, Resume Parser, Astral Rift)\n" +
        "• His **Tech Stack** (Python, LangChain, Vector DBs, AWS, React)\n" +
        "• **Contact Routes & Resume Download**\n\n" +
        "Try asking: *'What RAG projects has Sourav built?'* or select a quick topic below!",
  actions: [
    { label: "Show Projects", actionType: "scroll", target: "projects" },
    { label: "Contact Sourav", actionType: "scroll", target: "contact" }
  ]
};

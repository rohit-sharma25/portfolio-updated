import { knowledgeBase } from './knowledgeBase';
import { getGroqResponse } from './groqService';

export type AIProvider = 'static' | 'gemini' | 'openai' | 'groq';

export type ContextActionType = 'view_project' | 'open_github' | 'view_case_study' | 'download_resume' | 'contact';

export interface ContextAction {
  type: ContextActionType;
  label: string;
  url?: string;
  payload?: any;
}

export interface AIResponse {
  text: string;
  actions?: ContextAction[];
}

export class ResponseEngine {
  private provider: AIProvider;

  constructor(provider: AIProvider = 'static') {
    this.provider = provider;
  }

  public setProvider(provider: AIProvider) {
    this.provider = provider;
  }

  public async getResponse(query: string, currentContext?: string): Promise<AIResponse> {
    if (this.provider === 'static') {
      return this.getStaticResponse(query, currentContext);
    }

    if (this.provider === 'gemini') {
      // Future integration
      return { text: "Gemini integration coming soon." };
    }

    if (this.provider === 'openai') {
      // Future integration
      return { text: "OpenAI integration coming soon." };
    }

    if (this.provider === 'groq') {
      try {
        const groqResponse = await getGroqResponse(query, currentContext);
        if (groqResponse && groqResponse.text) {
          return { text: groqResponse.text };
        }
      } catch (error) {
        console.warn("Groq API failed or key missing. Falling back to static engine.", error);
        return this.getStaticResponse(query, currentContext);
      }
    }

    return this.getStaticResponse(query, currentContext);
  }

  private async getStaticResponse(query: string, currentContext?: string): Promise<AIResponse> {
    const lowerQuery = query.toLowerCase().trim();

    // ── 1. GREETINGS ──────────────────────────────────────────────
    if (/^(hi|hey|hello|howdy|yo|sup|what's up|hey there|good morning|good evening|good afternoon|greetings)([.!\s]|$)/i.test(lowerQuery)) {
      if (currentContext) {
        // Route to contextual answer if we have context
        const ctxResponse = this.getContextualResponse(currentContext);
        if (ctxResponse) return ctxResponse;
      }
      return {
        text: `Hey there! 👋 I'm R.AI, Rohit's digital twin. I can tell you all about his projects, internships, hackathons, and more. What would you like to explore?`,
        actions: [
          { type: 'view_project', label: 'View Projects', url: '#projects' },
          { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' },
          { type: 'contact', label: 'Contact Rohit', url: '#contact' }
        ]
      };
    }

    // ── 2. CONTEXTUAL ──────────────────────────────────────────────
    if ((lowerQuery.includes('tell me more') || lowerQuery.includes('what is this') || lowerQuery.includes('explain this')) && currentContext) {
      const ctxResponse = this.getContextualResponse(currentContext);
      if (ctxResponse) return ctxResponse;
    }

    // ── 3. ABOUT ROHIT ────────────────────────────────────────────
    if (lowerQuery.includes('who is rohit') || lowerQuery.includes('tell me about yourself') ||
        lowerQuery.includes('introduce yourself') || lowerQuery.includes('about rohit') ||
        lowerQuery.includes('about you') || lowerQuery === 'who are you' ||
        lowerQuery === 'what do you do') {
      return {
        text: `${knowledgeBase.personalInfo.about} Rohit wears multiple hats: ${knowledgeBase.personalInfo.positioning.join(', ')}. He has shipped 12+ projects, led teams in 3 hackathons, and completed 3 internships across web development, AI, and generative AI research.`,
        actions: [
          { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' },
          { type: 'view_project', label: 'View Projects', url: '#projects' }
        ]
      };
    }

    // ── 4. SPECIFIC PROJECTS ──────────────────────────────────────
    if (lowerQuery.includes('autofixnow') || lowerQuery === 'autofixnow') {
      return {
        text: "AutoFixNow was pitched during the Sabka AI Hackathon. Rohit served as Team Leader, leading product planning and the final presentation. It was his first major full-stack AI project — a platform that diagnoses and fixes car issues using AI.",
        actions: [
          { type: 'view_case_study', label: 'View Case Study', url: '/case-studies/autofixnow' },
          { type: 'view_project', label: 'See in Portfolio', url: '#autofixnow' }
        ]
      };
    }

    if (lowerQuery.includes('mediaios') || lowerQuery.includes('mediai') || lowerQuery.includes('medi ai') || lowerQuery.includes('medi_ai') || lowerQuery === 'mediai') {
      return {
        text: "MediAI OS is an AI-powered operating system concept for healthcare. It integrates patient data, diagnostic tools, and intelligent assistance into a unified interface. Built with FastAPI, RAG pipelines, and modern frontend technologies.",
        actions: [
          { type: 'view_project', label: 'View MediAI OS', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('sahayak')) {
      return {
        text: "SAHAYAK is an AI assistant designed for accessibility and inclusion. It uses Firebase for real-time data, NLP for intent recognition, and FastAPI for backend services. The focus is on making AI useful for everyday tasks.",
        actions: [
          { type: 'view_project', label: 'View SAHAYAK', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('interactive learning') || lowerQuery.includes('learning platform')) {
      return {
        text: "Interactive Learning Platform is a full-stack educational tool built with PyTorch research insights applied to adaptive learning. It demonstrates Rohit's ability to bridge AI research with practical EdTech applications.",
        actions: [
          { type: 'view_project', label: 'View Project', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('faceinsight') || lowerQuery.includes('face insight') || lowerQuery.includes('face')) {
      return {
        text: "FaceInsight is a computer vision project that performs facial analysis — detecting features, expressions, and attributes. Built with TensorFlow and OpenCV-style pipelines, it was part of Rohit's AI internship work.",
        actions: [
          { type: 'view_project', label: 'View FaceInsight', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('emotion analyzer') || lowerQuery.includes('emotion') && (lowerQuery.includes('analyze') || lowerQuery.includes('detect'))) {
      return {
        text: "Emotion Analyzer uses NLP and TensorFlow to detect sentiment and emotional tone from text. It's a demonstration of how Rohit applies machine learning to human-centric problems.",
        actions: [
          { type: 'view_project', label: 'View Project', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('resume screening') || (lowerQuery.includes('ai resume'))) {
      return {
        text: "AI Resume Screening is an automated system that parses, analyzes, and scores resumes using ML classification techniques. Built with Python and deployed with automation pipelines.",
        actions: [
          { type: 'view_project', label: 'View Project', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('edith')) {
      return {
        text: "EDITH (Enhanced Digital Intelligence & Task Handler) is a virtual AI assistant that supports voice commands, task automation, and Gemini API integration. Think of it as an AI butler for daily productivity.",
        actions: [
          { type: 'view_project', label: 'View EDITH', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('lumina') && (lowerQuery.includes('ai') || lowerQuery.includes('lumina'))) {
      return {
        text: "Lumina AI is an intelligent lighting or AI concept project — Rohit's exploration into combining AI with ambient interaction design.",
        actions: [
          { type: 'view_project', label: 'View Project', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('doom') || lowerQuery.includes('doom 3d') || lowerQuery.includes('3d experience')) {
      return {
        text: "Doom 3D Experience is a creative frontend project that recreates the classic Doom aesthetic in 3D using modern web technologies (React, Three.js-style rendering). A showcase of Rohit's creative frontend skills.",
        actions: [
          { type: 'view_project', label: 'View Doom 3D', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('expensifer')) {
      return {
        text: "Expensifer is a full-stack expense tracking application built during the RECKON 2026 hackathon. Rohit led the team, architecting the MongoDB + Express + React stack. It simplifies splitting and tracking shared expenses.",
        actions: [
          { type: 'view_project', label: 'View Expensifer', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('tcp10')) {
      return {
        text: "TCP10 is Rohit's project from SUNHACKS-2K25, where he served as Team Leader. It's a full-stack application that demonstrates his ability to deliver under hackathon time constraints.",
        actions: [
          { type: 'view_project', label: 'View TCP10', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('project') && (lowerQuery.includes('all') || lowerQuery.includes('list') || lowerQuery.includes('show'))) {
      return {
        text: `Rohit has built ${knowledgeBase.projects.length} projects across AI, Full Stack, and Frontend categories. Notable ones include AutoFixNow, MediAI OS, SAHAYAK, Expensifer, EDITH, and the Doom 3D Experience.`,
        actions: [
          { type: 'view_project', label: 'View All Projects', url: '#projects' },
          { type: 'open_github', label: 'GitHub Profile', url: 'https://github.com/rohit-sharma25' }
        ]
      };
    }

    // ── 5. HACKATHONS ─────────────────────────────────────────────
    if (lowerQuery.includes('hackathon')) {
      return {
        text: `Rohit has led teams in 3 hackathons:\n\n• **Sabka AI** — Built AutoFixNow (Team Leader)\n• **SUNHACKS-2K25** — Built TCP10 (Team Leader)\n• **RECKON 2026** — Built Expensifer (Team Leader)\n\nAll three projects showcase his ability to ship working products under tight deadlines.`,
        actions: [
          { type: 'view_project', label: 'View Hackathon Projects', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('sabka') || lowerQuery.includes('ai for inclusion')) {
      return {
        text: "Sabka AI (AI for Inclusion Hackathon) is where Rohit pitched AutoFixNow. As Team Leader, he drove product planning, design, and the final pitch. The experience shaped his product-building philosophy.",
        actions: [
          { type: 'view_project', label: 'View AutoFixNow', url: '#autofixnow' }
        ]
      };
    }

    if (lowerQuery.includes('sunhacks') || lowerQuery.includes('sun hack')) {
      return {
        text: "SUNHACKS-2K25 was hosted by Sandip University. Rohit led his team to build TCP10, a full-stack application. The hackathon sharpened his rapid prototyping and team leadership skills.",
        actions: [
          { type: 'view_project', label: 'View TCP10', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('reckon') || lowerQuery.includes('reckon 2026')) {
      return {
        text: "RECKON 2026 is the hackathon where Rohit built Expensifer — an expense tracking app. He served as Team Leader and delivered a polished full-stack product under pressure.",
        actions: [
          { type: 'view_project', label: 'View Expensifer', url: '#projects' }
        ]
      };
    }

    // ── 6. INTERNSHIPS ────────────────────────────────────────────
    if (lowerQuery.includes('internship')) {
      return {
        text: `Rohit has completed 3 internships:\n\n• **TechieHelp** — Web Development Intern (Jul–Aug 2025) — Earned '3rd Best Intern of the Month'\n• **Enginow** — AI Intern (Jan–Feb 2026) — Focused on ML and computer vision\n• **SIN Education & Technologies** — Generative AI Research Intern (May–Aug 2026) — Market research and agentic AI development`,
        actions: [
          { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' },
          { type: 'contact', label: 'Contact Rohit', url: '#contact' }
        ]
      };
    }

    if (lowerQuery.includes('techiehelp') || lowerQuery.includes('techie help')) {
      return {
        text: "At TechieHelp, Rohit worked as a Web Development Intern. He contributed to client projects and was recognized as the 3rd Best Intern of the Month — a testament to his work ethic and delivery quality.",
        actions: [
          { type: 'contact', label: 'Ask Rohit about TechieHelp', url: '#contact' }
        ]
      };
    }

    if (lowerQuery.includes('enginow')) {
      return {
        text: "At Enginow, Rohit served as an Artificial Intelligence Intern. He worked on ML models, computer vision pipelines, and gained hands-on experience in production AI systems.",
        actions: [
          { type: 'contact', label: 'Ask Rohit about Enginow', url: '#contact' }
        ]
      };
    }

    if (lowerQuery.includes('sin') && (lowerQuery.includes('education') || lowerQuery.includes('intern'))) {
      return {
        text: "At SIN Education & Technologies, Rohit worked as a Generative AI Market & Development Research Intern. He researched agentic AI, RAG systems, and market trends — directly feeding into projects like MediAI OS and SAHAYAK.",
        actions: [
          { type: 'view_project', label: 'View AI Projects', url: '#projects' }
        ]
      };
    }

    // ── 7. SKILLS & TECHNOLOGIES ──────────────────────────────────
    if (lowerQuery.includes('skill') || lowerQuery.includes('technologies') || lowerQuery.includes('tech stack') ||
        lowerQuery.includes('what do you know') || lowerQuery.includes('what can you do') ||
        lowerQuery.includes('tools') || lowerQuery.includes('expertise') || lowerQuery.includes('competencies')) {
      return {
        text: `Rohit's skill set spans four pillars:\n\n🤖 **AI Engineering** — Python, TensorFlow, PyTorch, FastAPI, RAG, LangChain, Gemini API, NLP, Computer Vision, Speech Recognition\n\n💻 **Full Stack** — React, TypeScript, Node.js, Express, MongoDB, Firebase, REST APIs, Auth\n\n🎨 **Product Design** — Figma, UI/UX, Wireframing, Interaction Design, Motion Design, Accessibility\n\n🚀 **Deployment & Tools** — Git, GitHub, Vercel, Render, Netlify, VS Code`,
        actions: [
          { type: 'open_github', label: 'GitHub Profile', url: 'https://github.com/rohit-sharma25' },
          { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' }
        ]
      };
    }

    if (lowerQuery.includes('python')) {
      return {
        text: "Python is Rohit's primary language for AI and backend work. He uses it for ML pipelines (TensorFlow, PyTorch), API development (FastAPI), automation, and data processing across most of his AI projects.",
        actions: [
          { type: 'view_project', label: 'View Python Projects', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('react')) {
      return {
        text: "React is Rohit's go-to frontend framework. He's used it across AutoFixNow, Expensifer, this portfolio, the Nike website, Doom 3D Experience, and more. He pairs it with TypeScript and Framer Motion for polished UIs.",
        actions: [
          { type: 'view_project', label: 'View React Projects', url: '#projects' }
        ]
      };
    }

    if (lowerQuery.includes('typescript') || lowerQuery === 'ts') {
      return {
        text: "TypeScript is Rohit's preferred language for scalable frontend and backend code. He uses it across this portfolio, Expensifer, and MediAI OS for type safety and developer experience.",
        actions: [
          { type: 'open_github', label: 'GitHub Profile', url: 'https://github.com/rohit-sharma25' }
        ]
      };
    }

    // ── 8. PORTFOLIO & WEBSITE ────────────────────────────────────
    if (lowerQuery.includes('portfolio') || lowerQuery.includes('this website') || lowerQuery.includes('how was this built') ||
        lowerQuery.includes('built with') || lowerQuery.includes('this site') || lowerQuery.includes('this portfolio')) {
      return {
        text: "This portfolio was built with React 19, TypeScript, Vite 8, Tailwind CSS v4, Framer Motion, and GSAP. It features a smooth-scrolling Lenis experience, a custom AI companion (me!), dark/light theme, interactive capability visualizations, and a guided portfolio tour. The code is open source on GitHub.",
        actions: [
          { type: 'open_github', label: 'View Source Code', url: 'https://github.com/rohit-sharma25' }
        ]
      };
    }

    if (lowerQuery.includes('framer') || lowerQuery.includes('motion') || lowerQuery.includes('animation')) {
      return {
        text: "Rohit uses Framer Motion and GSAP extensively for animations across this portfolio. From micro-interactions on cards to parallax scrolling and the AI companion drone animations — motion design is a core part of his product philosophy.",
        actions: [
          { type: 'view_project', label: 'Experience the Portfolio', url: '#projects' }
        ]
      };
    }

    // ── 9. EDUCATION ──────────────────────────────────────────────
    if (lowerQuery.includes('education') || lowerQuery.includes('college') || lowerQuery.includes('university') ||
        lowerQuery.includes('study') || lowerQuery.includes('degree') || lowerQuery.includes('academic') ||
        lowerQuery.includes('btech') || lowerQuery.includes('b.tech') || lowerQuery.includes('bachelor')) {
      return {
        text: "Rohit is currently pursuing his B.Tech, actively building projects and gaining industry experience through internships. His education provides the theoretical foundation for his practical AI and full-stack work.",
        actions: [
          { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' }
        ]
      };
    }

    // ── 10. LOCATION / BACKGROUND ─────────────────────────────────
    if (lowerQuery.includes('where are you from') || lowerQuery.includes('where do you live') ||
        lowerQuery.includes('location') || lowerQuery.includes('based') || lowerQuery.includes('hometown')) {
      return {
        text: "Rohit is based in India. He's actively pursuing opportunities in AI engineering, full-stack development, and product building — open to remote, hybrid, and on-site roles.",
        actions: [
          { type: 'contact', label: 'Contact Rohit', url: '#contact' }
        ]
      };
    }

    // ── 11. SOCIAL LINKS / GITHUB / CONNECT ───────────────────────
    if (lowerQuery.includes('github') || lowerQuery.includes('social') || lowerQuery.includes('linkedin') ||
        lowerQuery.includes('twitter') || lowerQuery.includes('connect with') || lowerQuery.includes('follow') ||
        lowerQuery === 'social media') {
      return {
        text: "You can find Rohit online:\n\n🐙 **GitHub**: github.com/rohit-sharma25 — All his projects are open source\n💼 **LinkedIn**: Linkedin — Connect professionally\n📧 **Email**: Reach out via the contact section below",
        actions: [
          { type: 'open_github', label: 'GitHub Profile', url: 'https://github.com/rohit-sharma25' },
          { type: 'contact', label: 'Contact Rohit', url: '#contact' }
        ]
      };
    }

    if (lowerQuery.includes('git')) {
      return {
        text: "Git and GitHub are central to Rohit's workflow. He uses them for version control, collaboration, and CI/CD across all his projects and internships.",
        actions: [
          { type: 'open_github', label: 'GitHub Profile', url: 'https://github.com/rohit-sharma25' }
        ]
      };
    }

    // ── 12. BUILD PHILOSOPHY ──────────────────────────────────────
    if (lowerQuery.includes('philosophy') || lowerQuery.includes('how do you think') ||
        lowerQuery.includes('approach') || lowerQuery.includes('manifesto') ||
        lowerQuery.includes('design philosophy') || lowerQuery.includes('build philosophy')) {
      return {
        text: "Rohit's build philosophy centers on three beliefs:\n\n1. **Why I Build** — Technology should be invisible magic that solves human friction, not creates more.\n\n2. **How I Think** — Design is how it works, not just how it looks. Empathy drives architecture decisions.\n\n3. **What Good Software Does** — It respects the user's time, evokes emotional response through craft, and feels right — not just works right.",
        actions: [
          { type: 'view_project', label: 'Read Full Philosophy', url: '#philosophy' }
        ]
      };
    }

    // ── 13. CERTIFICATIONS ───────────────────────────────────────
    if (lowerQuery.includes('certification') || lowerQuery.includes('certificate') || lowerQuery.includes('learning journey')) {
      return {
        text: "Rohit has earned certifications across multiple domains:\n\n• Capture The Flags — IIT Jodhpur\n• RAG-based Agent — Microsoft\n• C Programming — Infosys\n• Generative AI — Google Cloud\n• Front-End Development — JIET\n• Cybersecurity Analyst — Forage\n• Accenture Development — Forage\n• Web Dev Internship — TechieHelp\n\nHe believes in continuous learning as a core habit.",
        actions: [
          { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' }
        ]
      };
    }

    // ── 14. CURRENTLY READING / LEARNING ─────────────────────────
    if (lowerQuery.includes('currently reading') || lowerQuery.includes('books') || lowerQuery.includes('reading') ||
        lowerQuery.includes('learn') || lowerQuery.includes('studying') || lowerQuery.includes('self improvement')) {
      return {
        text: "Rohit is currently diving into:\n\n📚 **Agentic AI** — Multi-agent systems and autonomous workflows\n📚 **MCP (Model Context Protocol)** — Standardizing AI context management\n📚 **Advanced RAG** — Improving retrieval-augmented generation pipelines\n📚 **AI Workflows** — Productionizing end-to-end AI systems",
        actions: [
          { type: 'view_project', label: 'View AI Projects', url: '#projects' }
        ]
      };
    }

    // ── 15. EXPERIENCE / BACKGROUND ───────────────────────────────
    if (lowerQuery.includes('experience') || lowerQuery.includes('background') || lowerQuery.includes('journey') ||
        lowerQuery.includes('career') || lowerQuery.includes('timeline')) {
      return {
        text: "Rohit's journey spans:\n\n• **3 Internships** — Web Dev (TechieHelp), AI (Enginow), Generative AI Research (SIN Education)\n• **3 Hackathons** — Led teams at Sabka AI, SUNHACKS-2K25, and RECKON 2026\n• **12+ Projects** — Across AI, Full Stack, Frontend, and Product Design\n• **Continuous Learning** — Certifications from Microsoft, Google Cloud, IIT Jodhpur, and more",
        actions: [
          { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' },
          { type: 'view_project', label: 'View Timeline', url: '#experience' }
        ]
      };
    }

    // ── 16. CASE STUDIES ──────────────────────────────────────────
    if (lowerQuery.includes('case study') || lowerQuery.includes('case studies')) {
      return {
        text: "Rohit has in-depth case studies for his flagship projects like AutoFixNow and MediAI OS. These walk through the problem, approach, architecture, and results.",
        actions: [
          { type: 'view_case_study', label: 'View Case Studies', url: '/case-studies/autofixnow' },
          { type: 'view_project', label: 'View Projects', url: '#projects' }
        ]
      };
    }

    // ── 17. TOUR ──────────────────────────────────────────────────
    if (lowerQuery.includes('tour') || lowerQuery.includes('guide me') || lowerQuery.includes('show me around') ||
        lowerQuery.includes('walk me through') || lowerQuery.includes('navigate') || lowerQuery.includes('take me')) {
      return {
        text: "I'd love to give you a tour! Click the 'Take Portfolio Tour' button at the bottom-left of the screen, and I'll guide you through each section of Rohit's journey — from the hero to the contact form.",
        actions: [
          { type: 'view_project', label: 'Start Exploring', url: '#hero' }
        ]
      };
    }

    // ── 18. THANK YOU ─────────────────────────────────────────────
    if (lowerQuery.includes('thank') || lowerQuery.includes('thanks') || lowerQuery.includes('appreciate') ||
        lowerQuery.includes('grateful') || lowerQuery === 'ty') {
      return {
        text: "You're very welcome! 🙌 I'm glad I could help. If you have any more questions about Rohit's work, feel free to ask. And don't forget to drop him a message — he'd love to hear from you!",
        actions: [
          { type: 'contact', label: 'Contact Rohit', url: '#contact' }
        ]
      };
    }

    // ── 19. GOODBYE ───────────────────────────────────────────────
    if (lowerQuery.includes('bye') || lowerQuery.includes('goodbye') || lowerQuery.includes('see you') ||
        lowerQuery.includes('farewell') || lowerQuery.includes('see ya') || lowerQuery === 'cya') {
      return {
        text: "It was great chatting with you! 👋 Feel free to come back anytime to explore more of Rohit's work. Have an amazing day!",
        actions: [
          { type: 'contact', label: 'Contact Rohit', url: '#contact' }
        ]
      };
    }

    // ── 20. TESTIMONIALS ──────────────────────────────────────────
    if (lowerQuery.includes('testimonial') || lowerQuery.includes('recommendation') || lowerQuery.includes('what others say') ||
        lowerQuery.includes('feedback') || lowerQuery.includes('review')) {
      return {
        text: "Rohit has received strong recognition from peers and mentors — including being named 3rd Best Intern of the Month at TechieHelp. The Testimonials section on this portfolio captures what collaborators and mentors have said about working with him.",
        actions: [
          { type: 'view_project', label: 'View Testimonials', url: '#testimonials' }
        ]
      };
    }

    // ── 21. CONTACT ───────────────────────────────────────────────
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('get in touch') ||
        lowerQuery.includes('message') || lowerQuery.includes('reach out') || lowerQuery.includes('hire') ||
        lowerQuery.includes('opportunity') || lowerQuery.includes('collaborate') || lowerQuery.includes('work together')) {
      return {
        text: "You can reach Rohit through the contact form at the bottom of this portfolio. He's open to collaboration, internship opportunities, freelance projects, and full-time roles in AI engineering and full-stack development. His inbox is always open!",
        actions: [
          { type: 'contact', label: 'Go to Contact Form', url: '#contact' }
        ]
      };
    }

    // ── 22. RESUME ────────────────────────────────────────────────
    if (lowerQuery.includes('resume') || lowerQuery.includes('cv') || lowerQuery.includes('curriculum')) {
      return {
        text: "You can download Rohit's latest resume below. It covers his experience, projects, skills, certifications, and education in detail.",
        actions: [
          { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' }
        ]
      };
    }

    // ── 23. LATEST / CURRENTLY WORKING ON ─────────────────────────
    if (lowerQuery.includes('working on') || lowerQuery.includes('latest') || lowerQuery.includes('current project') ||
        lowerQuery.includes('building now') || lowerQuery.includes('what\'s new') || lowerQuery.includes('what is new') ||
        lowerQuery.includes('currently building')) {
      return {
        text: `Rohit is currently focused on:\n\n🔨 **Building**: AutoFixNow V2 — Taking his hackathon project to production with enhanced features\n📖 **Learning**: Agentic AI — Multi-agent systems, autonomous workflows, and advanced RAG\n🚀 **Latest Project**: MediAI OS — An AI-powered healthcare operating system`,
        actions: [
          { type: 'view_project', label: 'View Latest Projects', url: '#projects' }
        ]
      };
    }

    // ── 24. HELP ──────────────────────────────────────────────────
    if (lowerQuery.includes('help') || lowerQuery.includes('what can i ask') || lowerQuery.includes('commands') ||
        lowerQuery.includes('what can you') || lowerQuery === '/help') {
      return {
        text: "Here's what you can ask me about:\n\n👤 **Rohit** — Who he is, his background, skills\n💼 **Projects** — AutoFixNow, MediAI OS, EDITH, SAHAYAK, and more\n🏆 **Hackathons** — Sabka AI, SUNHACKS, RECKON\n📋 **Internships** — TechieHelp, Enginow, SIN Education\n📜 **Certifications** — Microsoft, Google Cloud, IIT Jodhpur\n📚 **Reading** — What he's currently learning\n🎯 **Philosophy** — How he thinks about building products\n\nOr just chat with me — I'm friendly! 😊",
        actions: [
          { type: 'view_project', label: 'Explore Portfolio', url: '#projects' },
          { type: 'contact', label: 'Contact Rohit', url: '#contact' }
        ]
      };
    }

    // ── 25. AI / ARTIFICIAL INTELLIGENCE ──────────────────────────
    if (lowerQuery.includes('artificial intelligence') || lowerQuery.includes('ai') && !lowerQuery.includes('sahayak')) {
      if (lowerQuery.includes('what is') || lowerQuery.includes('how does') || lowerQuery.includes('explain')) {
        return {
          text: "Rohit's AI work spans RAG systems, NLP, computer vision, speech recognition, and agentic AI. He's built production-ready AI tools using Python, TensorFlow, FastAPI, LangChain, and Gemini API. Projects like MediAI OS and SAHAYAK showcase his ability to integrate AI into real-world products.",
          actions: [
            { type: 'view_project', label: 'View AI Projects', url: '#projects' }
          ]
        };
      }
      return {
        text: "Rohit specializes in AI Engineering — building intelligent systems that solve real problems. His AI work includes RAG pipelines, NLP applications, computer vision, voice assistants (EDITH), and AI agents. He's particularly focused on making AI accessible and practical.",
        actions: [
          { type: 'view_project', label: 'View AI Engineering Section', url: '#ai_engineering' }
        ]
      };
    }

    // ── 26. MACHINE LEARNING ──────────────────────────────────────
    if (lowerQuery.includes('machine learning') || lowerQuery.includes('ml') || lowerQuery.includes('deep learning') ||
        lowerQuery.includes('neural network')) {
      return {
        text: "Rohit uses ML across multiple projects — from classification models in Resume Screening to computer vision in FaceInsight and Emotion Analyzer. He's worked with TensorFlow and PyTorch, and applies ML to solve practical, human-centric problems.",
        actions: [
          { type: 'view_project', label: 'View ML Projects', url: '#projects' }
        ]
      };
    }

    // ── 27. RAG ───────────────────────────────────────────────────
    if (lowerQuery.includes('rag') || lowerQuery.includes('retrieval') || lowerQuery.includes('vector')) {
      if (lowerQuery === 'rag' || lowerQuery.includes('what is rag')) {
        return {
          text: "RAG (Retrieval-Augmented Generation) combines information retrieval with LLMs to produce context-aware, accurate responses. Rohit has implemented RAG pipelines in MediAI OS and SAHAYAK to give AI assistants access to relevant knowledge bases.",
          actions: [
            { type: 'view_project', label: 'View RAG Projects', url: '#projects' }
          ]
        };
      }
      return {
        text: "Rohit has built RAG (Retrieval-Augmented Generation) systems in projects like MediAI OS and SAHAYAK. He's currently deepening his knowledge of advanced RAG techniques, chunking strategies, and vector database integration.",
        actions: [
          { type: 'view_project', label: 'View RAG Projects', url: '#projects' }
        ]
      };
    }

    // ── 28. DESIGN / UI/UX ───────────────────────────────────────
    if (lowerQuery.includes('design') || lowerQuery.includes('ui') || lowerQuery.includes('ux') ||
        lowerQuery.includes('figma') || lowerQuery.includes('user interface') || lowerQuery.includes('user experience')) {
      return {
        text: "Rohit approaches design as a product thinker. He uses Figma for high-fidelity prototypes and believes good design is invisible — it should feel natural and intuitive. His portfolio itself is a showcase of his design philosophy: glassmorphism, micro-interactions, fluid animations, and thoughtful typography.",
        actions: [
          { type: 'view_project', label: 'View Design Work', url: '#projects' }
        ]
      };
    }

    // ── 29. DEPLOYMENT ────────────────────────────────────────────
    if (lowerQuery.includes('deploy') || lowerQuery.includes('hosting') || lowerQuery.includes('vercel') ||
        lowerQuery.includes('render') || lowerQuery.includes('netlify') || lowerQuery.includes('devops') ||
        lowerQuery.includes('ci/cd') || lowerQuery.includes('cicd')) {
      return {
        text: "Rohit deploys projects across multiple platforms: Vercel (frontend/portfolio), Render (backend APIs), Netlify (static sites), and Streamlit (ML demos). He uses Git-based CI/CD workflows for continuous deployment.",
        actions: [
          { type: 'open_github', label: 'See Deployment Workflows', url: 'https://github.com/rohit-sharma25' }
        ]
      };
    }

    // ── 30. FUN / PERSONAL ────────────────────────────────────────
    if (lowerQuery.includes('hobby') || lowerQuery.includes('interest') || lowerQuery.includes('passion') ||
        lowerQuery.includes('fun') || lowerQuery.includes('personal')) {
      return {
        text: "Beyond code, Rohit is passionate about product thinking, design, and continuous learning. He loves participating in hackathons, exploring new AI research, and building things that make a real impact. This portfolio itself is a labor of love — every detail was carefully crafted.",
        actions: [
          { type: 'view_project', label: 'Explore the Portfolio', url: '#hero' }
        ]
      };
    }

    // ── Default fallback ───────────────────────────────────────────
    return {
      text: "I'm not sure I have an answer for that yet! 😅 Here's what I can help with: Rohit's projects, internships, hackathons, skills, certifications, or his build philosophy. Feel free to ask about anything specific!",
      actions: [
        { type: 'view_project', label: 'View Projects', url: '#projects' },
        { type: 'contact', label: 'Contact Rohit', url: '#contact' },
        { type: 'download_resume', label: 'Download Resume', url: '/resume.pdf' }
      ]
    };
  }

  /**
   * Returns a contextual response based on which section the user is viewing.
   */
  private getContextualResponse(context: string): AIResponse | null {
    switch (context) {
      case 'capabilities':
        return {
          text: "Every technology here has been used in at least one real-world project. Select any capability and I'll show you where it was applied — from AI engineering to deployment tools.",
          actions: [
            { type: 'open_github', label: 'View GitHub', url: 'https://github.com/rohit-sharma25' }
          ]
        };
      case 'autofixnow':
        return {
          text: "AutoFixNow was pitched during the Sabka AI Hackathon. Rohit served as Team Leader, leading product planning and the final presentation. It was his first major full-stack project.",
          actions: [
            { type: 'view_project', label: 'View AutoFixNow', url: '#autofixnow' }
          ]
        };
      case 'hero':
        return {
          text: "Welcome to Rohit's digital universe! 🚀 Every section here reflects how he thinks about building products — with craft, purpose, and attention to detail. Scroll down or take the guided tour!",
          actions: [
            { type: 'view_project', label: 'View Projects', url: '#projects' },
            { type: 'contact', label: 'Get in Touch', url: '#contact' }
          ]
        };
      case 'experience':
        return {
          text: "Rohit's journey includes 3 internships across web development, AI engineering, and generative AI research — plus leading teams in 3 hackathons. Each experience shaped how he approaches product building.",
          actions: [
            { type: 'contact', label: "Let's connect", url: '#contact' }
          ]
        };
      case 'ai_engineering':
        return {
          text: "AI Engineering is Rohit's primary focus area. He builds RAG systems, NLP applications, computer vision tools, and AI agents — always with a product-first mindset.",
          actions: [
            { type: 'view_project', label: 'View AI Projects', url: '#projects' }
          ]
        };
      case 'projects':
        return {
          text: "Rohit has shipped 12+ projects across AI, full stack, and frontend. Each one was an experiment in product design, technical architecture, and user experience.",
          actions: [
            { type: 'open_github', label: 'GitHub Profile', url: 'https://github.com/rohit-sharma25' }
          ]
        };
      case 'contact':
        return {
          text: "Still here? Let's build something together. Rohit is always open to interesting conversations and collaborations.",
          actions: [
            { type: 'contact', label: 'Send a Message', url: '#contact' }
          ]
        };
      default:
        return null;
    }
  }
}

export const aiEngine = new ResponseEngine('groq');

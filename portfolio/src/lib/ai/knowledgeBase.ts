export const knowledgeBase = {
  personalInfo: {
    name: 'Rohit Sharma',
    positioning: ['AI Engineer', 'Full Stack Architect', 'Product Builder'],
    about: 'I am an AI Engineer and Full Stack Architect passionate about building intelligent products.',
  },
  internships: [
    {
      company: 'TechieHelp',
      role: 'Web Development Intern',
      duration: 'July 2025 – August 2025',
      highlights: ['3rd Best Intern of the Month']
    },
    {
      company: 'Enginow',
      role: 'Artificial Intelligence Intern',
      duration: 'January 2026 – February 2026',
      highlights: []
    },
    {
      company: 'SIN Education & Technologies',
      role: 'Generative AI Market & Development Research Intern',
      duration: 'May 2026 – August 2026',
      highlights: []
    }
  ],
  hackathons: [
    {
      name: 'SUNHACKS-2K25',
      project: 'TCP10',
      role: 'Team Leader'
    },
    {
      name: 'Sabka AI',
      project: 'AutoFixNow',
      role: 'Team Leader',
      context: 'AutoFixNow was pitched during the Sabka AI Hackathon. Rohit served as Team Leader and led product planning and presentation.'
    },
    {
      name: 'RECKON 2026',
      project: 'Expensifer',
      role: 'Team Leader'
    }
  ],
  projects: [
    { id: 'autofixnow', name: 'AutoFixNow', category: 'AI', hasCaseStudy: true, github: '#' },
    { id: 'mediaios', name: 'MediAI OS', category: 'AI', hasCaseStudy: true, github: '#' },
    { id: 'sahayak', name: 'SAHAYAK', category: 'AI', hasCaseStudy: false, github: '#' },
    { id: 'interactive-learning', name: 'Interactive Learning Platform', category: 'Full Stack', hasCaseStudy: false, github: '#' },
    { id: 'faceinsight', name: 'FaceInsight', category: 'AI', hasCaseStudy: false, github: '#' },
    { id: 'emotionanalyzer', name: 'Emotion Analyzer', category: 'AI', hasCaseStudy: false, github: '#' },
    { id: 'airesume', name: 'AI Resume Screening', category: 'AI', hasCaseStudy: false, github: '#' },
    { id: 'edith', name: 'EDITH Virtual Assistant', category: 'AI', hasCaseStudy: false, github: '#' },
    { id: 'luminaai', name: 'Lumina AI', category: 'AI', hasCaseStudy: false, github: '#' },
    { id: 'doom3d', name: 'Doom 3D Experience', category: 'Frontend', hasCaseStudy: false, github: '#' },
    { id: 'expensifer', name: 'Expensifer', category: 'Full Stack', hasCaseStudy: false, github: '#' },
    { id: 'tcp10', name: 'TCP10', category: 'Full Stack', hasCaseStudy: false, github: '#' }
  ],
  contextualInsights: {
    hero: "Hi, I'm R.AI. I know everything about Rohit's projects, experience, and journey. Feel free to explore or take a Portfolio Tour.",
    autofixnow: "AutoFixNow was pitched during the Sabka AI Hackathon. Rohit served as Team Leader and led product planning and presentation.",
    experience: "Rohit completed 3 internships and participated in multiple hackathons while building AI and full-stack products.",
    ai_engineering: "AI Engineering is one of Rohit's primary focus areas, including RAG systems, NLP, AI Agents, and automation.",
  }
};

export type KnowledgeBase = typeof knowledgeBase;

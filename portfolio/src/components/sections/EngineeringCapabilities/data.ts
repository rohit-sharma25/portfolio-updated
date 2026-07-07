export type ProficiencyStatus = 'Production Ready' | 'Building' | 'Exploring';

export interface Technology {
  name: string;
  status: ProficiencyStatus;
  purpose: string[];
  usedIn: string[];
}

export interface CapabilityPillar {
  id: string;
  title: string;
  description: string;
  technologies: Technology[];
}

export const CAPABILITIES_DATA: CapabilityPillar[] = [
  {
    id: 'ai-engineering',
    title: 'AI Engineering',
    description: 'Designing and deploying intelligent systems, from foundation models to autonomous agents.',
    technologies: [
      {
        name: 'Python',
        status: 'Production Ready',
        purpose: ['Machine Learning', 'Data Pipelines', 'Backend Logic'],
        usedIn: ['MediAI OS', 'SAHAYAK', 'FaceInsight', 'Resume Screening', 'Enginow Internship', 'SIN Internship']
      },
      {
        name: 'TensorFlow',
        status: 'Building',
        purpose: ['Machine Learning', 'Computer Vision', 'Model Training'],
        usedIn: ['Emotion Analyzer', 'FaceInsight', 'Enginow Internship']
      },
      {
        name: 'PyTorch',
        status: 'Exploring',
        purpose: ['Deep Learning', 'Research', 'Neural Networks'],
        usedIn: ['Interactive Learning Platform', 'SIN Internship']
      },
      {
        name: 'FastAPI',
        status: 'Production Ready',
        purpose: ['AI APIs', 'Backend Services', 'Inference Servers'],
        usedIn: ['MediAI OS', 'SAHAYAK', 'EDITH']
      },
      {
        name: 'RAG',
        status: 'Building',
        purpose: ['Contextual AI', 'Knowledge Retrieval', 'Vector Databases'],
        usedIn: ['SAHAYAK', 'MediAI OS', 'SIN Internship']
      },
      {
        name: 'LangChain',
        status: 'Building',
        purpose: ['LLM Orchestration', 'Agentic Workflows'],
        usedIn: ['MediAI OS', 'SAHAYAK']
      },
      {
        name: 'Gemini API',
        status: 'Production Ready',
        purpose: ['Generative Text', 'Multimodal Analysis', 'AI Assistants'],
        usedIn: ['EDITH', 'MediAI OS', 'Portfolio']
      },
      {
        name: 'Machine Learning',
        status: 'Production Ready',
        purpose: ['Predictive Analytics', 'Classification', 'Regression'],
        usedIn: ['Resume Screening', 'Enginow Internship']
      },
      {
        name: 'NLP',
        status: 'Building',
        purpose: ['Sentiment Analysis', 'Text Parsing', 'Chatbots'],
        usedIn: ['Emotion Analyzer', 'SAHAYAK', 'Enginow Internship']
      },
      {
        name: 'Computer Vision',
        status: 'Building',
        purpose: ['Object Detection', 'Facial Recognition', 'Image Processing'],
        usedIn: ['FaceInsight', 'Enginow Internship']
      },
      {
        name: 'Speech Recognition',
        status: 'Exploring',
        purpose: ['Voice Interfaces', 'Audio Processing'],
        usedIn: ['EDITH']
      },
      {
        name: 'Automation',
        status: 'Production Ready',
        purpose: ['Task Orchestration', 'Workflow Optimization'],
        usedIn: ['Resume Screening', 'EDITH']
      }
    ]
  },
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    description: 'Architecting scalable, responsive, and robust web applications from frontend to backend.',
    technologies: [
      {
        name: 'React',
        status: 'Production Ready',
        purpose: ['Interactive UI', 'Component Architecture', 'SPAs'],
        usedIn: ['AutoFixNow', 'Expensifer', 'Nike Website', 'Doom Experience', 'Portfolio', 'TechieHelp Internship']
      },
      {
        name: 'TypeScript',
        status: 'Production Ready',
        purpose: ['Type Safety', 'Scalable Codebases', 'Tooling'],
        usedIn: ['Portfolio', 'Expensifer', 'MediAI OS']
      },
      {
        name: 'JavaScript',
        status: 'Production Ready',
        purpose: ['Dynamic Interactions', 'DOM Manipulation'],
        usedIn: ['AutoFixNow', 'Resume Screening', 'TechieHelp Internship']
      },
      {
        name: 'Node.js',
        status: 'Production Ready',
        purpose: ['Backend Runtime', 'API Gateways', 'Microservices'],
        usedIn: ['AutoFixNow', 'Expensifer', 'Sabka AI Hackathon']
      },
      {
        name: 'Express',
        status: 'Production Ready',
        purpose: ['REST APIs', 'Server Logic', 'Middleware'],
        usedIn: ['AutoFixNow', 'Expensifer']
      },
      {
        name: 'MongoDB',
        status: 'Production Ready',
        purpose: ['NoSQL Database', 'Flexible Schemas', 'User Data'],
        usedIn: ['AutoFixNow', 'Expensifer', 'Sabka AI Hackathon']
      },
      {
        name: 'Firebase',
        status: 'Building',
        purpose: ['Real-time Database', 'Serverless Functions'],
        usedIn: ['SAHAYAK', 'Chat Interfaces']
      },
      {
        name: 'REST APIs',
        status: 'Production Ready',
        purpose: ['Client-Server Communication', 'Data Fetching'],
        usedIn: ['All Projects']
      },
      {
        name: 'Authentication',
        status: 'Production Ready',
        purpose: ['User Security', 'JWT', 'OAuth'],
        usedIn: ['AutoFixNow', 'Expensifer', 'MediAI OS']
      },
      {
        name: 'Responsive Design',
        status: 'Production Ready',
        purpose: ['Mobile-first Layouts', 'Cross-device Compatibility'],
        usedIn: ['Portfolio', 'Nike Website', 'Doom Experience', 'TechieHelp Internship']
      }
    ]
  },
  {
    id: 'product-design',
    title: 'Product Design',
    description: 'Crafting premium, intuitive, and accessible user experiences that delight users.',
    technologies: [
      {
        name: 'Figma',
        status: 'Production Ready',
        purpose: ['High-fidelity Prototypes', 'Vector Graphics', 'Design Handoff'],
        usedIn: ['Prime Design', 'Nike UI', 'Porsche Concept', 'Portfolio']
      },
      {
        name: 'UI/UX',
        status: 'Production Ready',
        purpose: ['User Flows', 'Information Architecture', 'Visual Hierarchy'],
        usedIn: ['Portfolio', 'Prime Design', 'AutoFixNow']
      },
      {
        name: 'Wireframing',
        status: 'Production Ready',
        purpose: ['Low-fidelity Layouts', 'Rapid Iteration'],
        usedIn: ['Prime Design', 'Expensifer']
      },
      {
        name: 'Interaction Design',
        status: 'Building',
        purpose: ['Micro-interactions', 'State Transitions'],
        usedIn: ['Portfolio', 'Doom Experience']
      },
      {
        name: 'Glassmorphism',
        status: 'Production Ready',
        purpose: ['Modern Aesthetic', 'Depth & Hierarchy'],
        usedIn: ['Portfolio', 'Prime Design']
      },
      {
        name: 'Motion Design',
        status: 'Building',
        purpose: ['Framer Motion', 'GSAP', 'Fluid Animations'],
        usedIn: ['Portfolio', 'Doom Experience', 'Nike UI']
      },
      {
        name: 'Design Systems',
        status: 'Building',
        purpose: ['Component Libraries', 'Design Tokens'],
        usedIn: ['Portfolio', 'MediAI OS']
      },
      {
        name: 'Accessibility',
        status: 'Building',
        purpose: ['WCAG Compliance', 'Screen Reader Support', 'Color Contrast'],
        usedIn: ['Portfolio', 'AutoFixNow']
      }
    ]
  },
  {
    id: 'deployment-tools',
    title: 'Deployment & Tools',
    description: 'Streamlining development workflows and ensuring robust, high-availability deployments.',
    technologies: [
      {
        name: 'Git',
        status: 'Production Ready',
        purpose: ['Version Control', 'Branching Strategies'],
        usedIn: ['All Projects', 'All Internships']
      },
      {
        name: 'GitHub',
        status: 'Production Ready',
        purpose: ['Source Code Management', 'Collaboration', 'CI/CD'],
        usedIn: ['All Projects']
      },
      {
        name: 'Vercel',
        status: 'Production Ready',
        purpose: ['Frontend Deployment', 'Serverless Functions', 'Edge Networking'],
        usedIn: ['Portfolio', 'Expensifer', 'Nike Website']
      },
      {
        name: 'Render',
        status: 'Building',
        purpose: ['Backend Hosting', 'Database Hosting'],
        usedIn: ['AutoFixNow API', 'MediAI OS Backend']
      },
      {
        name: 'Netlify',
        status: 'Production Ready',
        purpose: ['Static Site Hosting', 'Continuous Deployment'],
        usedIn: ['Doom Experience', 'Prime Design']
      },
      {
        name: 'Streamlit',
        status: 'Building',
        purpose: ['Data Apps', 'ML Prototyping'],
        usedIn: ['Emotion Analyzer', 'FaceInsight']
      },
      {
        name: 'VS Code',
        status: 'Production Ready',
        purpose: ['Primary IDE', 'Extensions', 'Debugging'],
        usedIn: ['Daily Development']
      },
      {
        name: 'Replit',
        status: 'Exploring',
        purpose: ['Cloud IDE', 'Rapid Prototyping'],
        usedIn: ['Hackathons', 'Quick Experiments']
      }
    ]
  }
];

export const CURRENTLY_LEARNING = [
  'Agentic AI',
  'MCP (Model Context Protocol)',
  'Advanced RAG',
  'Multi-Agent Systems',
  'AI Workflows'
];

export const CURRENT_FOCUS = {
  building: 'AutoFixNow V2',
  learning: 'Agentic AI',
  latest: 'MediAI OS',
  experience: '3 Internships & 3 Hackathons'
};

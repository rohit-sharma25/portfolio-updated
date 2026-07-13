import { useRef, useState, useMemo, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ExternalLink, Code2, LayoutTemplate } from 'lucide-react';
import { JourneyModal } from '../ui/JourneyModal';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTag = 'All' | 'AI/ML' | 'Python' | 'Development' | 'UI/UX';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  filterTags: FilterTag[];
  liveUrl: string;
  githubUrl: string;
  imageUrl?: string;
  problem?: string;
  solution?: string;
  role?: string;
  challenges?: string;
  learnings?: string;
  futureVision?: string;
}

function isValidLink(url?: string) {
  if (!url) return false;
  const trimmed = url.trim();
  return trimmed !== '' && trimmed !== '#';
}

const ALL_FILTER_TAGS: FilterTag[] = ['All', 'AI/ML', 'Python', 'Development', 'UI/UX'];

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index, onOpenCaseStudy }: { project: Project; index: number; onOpenCaseStudy: (p: Project) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const liveHref = isValidLink(project.liveUrl) ? project.liveUrl : undefined;
  const githubHref = isValidLink(project.githubUrl) ? project.githubUrl : undefined;

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({ x: (y - centerY) / 12, y: (centerX - x) / 12 });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="relative rounded-2xl overflow-hidden border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] transition-all duration-500 h-full"
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        {/* Card Glow */}
        <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"
          style={{ background: 'radial-gradient(400px circle at 50% 50%, rgba(168,85,247,0.08), transparent)' }} />

        {/* Image area */}
        <div className="relative h-48 overflow-hidden bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_srgb,var(--color-background)_90%,transparent)] z-10" />
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <LayoutTemplate className="w-12 h-12 text-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)]" />
            </div>
          )}
          {/* Role badge */}
          {project.role && (
            <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-[10px] font-mono font-medium backdrop-blur-md border"
              style={{
                background: 'rgba(0,0,0,0.6)',
                borderColor: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.8)',
              }}>
              {project.role}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 relative z-10 flex flex-col justify-between" style={{ minHeight: '120px' }}>
          <h3 className="text-base font-semibold text-[var(--color-text-main)] mb-4 font-heading group-hover:text-[var(--color-primary)] transition-colors">
            {project.title}
          </h3>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenCaseStudy(project)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300"
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
              }}
            >
              View Details
            </button>
            {liveHref && (
              <a href={liveHref} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: 'color-mix(in srgb, var(--color-text-main) 6%, transparent)',
                  color: 'color-mix(in srgb, var(--color-text-main) 60%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-text-main) 8%, transparent)',
                }}>
                <ExternalLink className="w-3 h-3" />
                Live
              </a>
            )}
            {githubHref && (
              <a href={githubHref} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ml-auto"
                style={{
                  color: 'color-mix(in srgb, var(--color-text-main) 40%, transparent)',
                }}>
                <Code2 className="w-3 h-3" />
                Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Projects (shown in section) ────────────────────────────────────────────
// Note: SAHAYAK, AutoFixNow, Expensifer, MediAI OS, Interactive Learning Platform
// are in the Featured Projects section and not repeated here.

const MAIN_PROJECTS: Project[] = [
  // ── AI / ML ─────────────────────────────────────────────────────────────────────
  {
    title: 'EDITH \u2013 Voice Assistant',
    desc: 'Personal AI voice assistant capable of understanding and responding to spoken commands in real time using speech recognition and AI reasoning.',
    tags: ['Python', 'Voice AI', 'STT/TTS'],
    filterTags: ['AI/ML', 'Python'],
    liveUrl: 'https://rohit-sharma25.github.io/EDITH-personal-AI-voice-agent/',
    githubUrl: 'https://github.com/rohit-sharma25/EDITH-personal-AI-voice-agent',
    imageUrl: '/Edith.png',
    role: 'Creator & Lead Developer',
    problem: 'Off-the-shelf voice assistants are locked into closed ecosystems and lack deep customization for developer workflows.',
    solution: 'A personalized, fully extensible AI voice assistant that integrates directly with local system tools and developer workflows.',
    challenges: 'Handling background noise and maintaining context over long, multi-turn verbal conversations.',
    learnings: 'Mastered Speech-to-Text (STT) pipelines, Text-to-Speech (TTS) synthesis, and context management in LLMs.',
    futureVision: 'Integrating advanced agentic capabilities so EDITH can independently execute multi-step coding tasks.',
  },
  {
    title: 'FaceInsight',
    desc: 'Computer vision application that detects human faces in real time and predicts key facial attributes including age range and emotional state.',
    tags: ['Python', 'Computer Vision', 'AI/ML'],
    filterTags: ['AI/ML', 'Python'],
    liveUrl: 'https://face-recognition-git-main-rohit-s-projects-0ba6e1fb.vercel.app/',
    githubUrl: 'https://github.com/rohit-sharma25/face-detection',
    imageUrl: '/face-detection.png',
    role: 'Computer Vision Engineer',
    problem: 'Real-time facial attribute analysis often requires heavy, slow models that cannot run efficiently on standard hardware.',
    solution: 'An optimized computer vision pipeline that detects faces and predicts attributes (age, emotion) with minimal latency.',
    challenges: 'Optimizing inference speed so the application could run smoothly in real-time without dropping frames.',
    learnings: 'Gained expertise in OpenCV, edge computing principles, and lightweight model architectures.',
    futureVision: 'Developing a privacy-first edge SDK that runs entirely offline without sending frame data to a server.',
  },
  {
    title: 'Emotion Analyzer',
    desc: 'NLP-based emotion detection system that classifies text and paragraphs into emotional categories using machine learning trained on a custom dataset.',
    tags: ['Python', 'NLP', 'Machine Learning'],
    filterTags: ['AI/ML', 'Python'],
    liveUrl: 'https://emotion-analyzer1.streamlit.app/',
    githubUrl: 'https://github.com/rohit-sharma25/Emotion-Analyzer',
    imageUrl: '/emotion.png',
    role: 'ML Engineer',
    problem: 'Manually identifying emotional tone in large volumes of text is time-consuming and subjective.',
    solution: 'A trained NLP classifier that automatically detects and categorizes emotions from text input with high accuracy.',
    challenges: 'Curating a balanced training dataset and handling the nuances of sarcasm, ambiguity, and mixed emotions.',
    learnings: 'Built strong foundations in text preprocessing, feature engineering (TF-IDF), and scikit-learn model pipelines.',
  },
  {
    title: 'Virtual Assistant for Customer Query',
    desc: 'Intelligent customer support chatbot built with NLP and machine learning to handle e-commerce queries, featuring intent classification and automated responses.',
    tags: ['Python', 'NLP', 'Machine Learning'],
    filterTags: ['AI/ML', 'Python'],
    liveUrl: 'https://rohit-sharma25.github.io/AI-Customer-Query-Assistant/templates/index.html',
    githubUrl: 'https://github.com/rohit-sharma25/AI-Customer-Query-Assistant',
    imageUrl: '/AI.png',
    role: 'NLP Engineer',
    problem: 'E-commerce businesses spend enormous resources on repetitive customer support queries that can be automated.',
    solution: 'A conversational AI assistant that classifies customer intent and provides instant, accurate automated responses.',
    challenges: 'Achieving high intent classification accuracy across diverse query phrasings while keeping latency low.',
    learnings: 'Learned intent classification, dialogue management, and deploying NLP models as web services.',
  },
  {
    title: 'AI Resume Screening & Ranking',
    desc: 'Intelligent resume screening tool using NLP and ML to rank candidates through TF-IDF similarity, skill matching, and experience analysis.',
    tags: ['Python', 'NLP', 'TF-IDF', 'Streamlit'],
    filterTags: ['AI/ML', 'Python'],
    liveUrl: 'https://ai-ranking-system.streamlit.app/',
    githubUrl: 'https://github.com/rohit-sharma25/Resume-Ranking-System',
    imageUrl: '/AI-resume.png',
    role: 'ML Developer',
    problem: 'Recruiters manually reviewing hundreds of resumes is inefficient, biased, and inconsistent.',
    solution: 'An automated system that parses resumes, extracts skills and experience, and ranks candidates objectively using TF-IDF and semantic similarity.',
    challenges: 'Handling varied resume formats, extracting structured data from unstructured text, and defining fair ranking criteria.',
    learnings: 'Practiced document parsing, semantic similarity, and building end-to-end ML pipelines with Streamlit.',
  },
  // ── Python ─────────────────────────────────────────────────────────────────────
  {
    title: 'Flappy Game',
    desc: 'Browser-based Flappy-style game built in Python with real-time animations, collision detection, and score tracking.',
    tags: ['Python', 'Pygame', 'asyncio'],
    filterTags: ['Python'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25/Flappy_game-',
    imageUrl: '/flappy.png',
    role: 'Developer',
    problem: 'Building a fast, smooth game loop with frame-perfect collision detection in Python.',
    solution: 'Used Pygame for rendering and asyncio for non-blocking game logic, delivering a fluid 60 FPS experience.',
    challenges: 'Optimizing the game loop to maintain consistent frame rates and handling edge-case collision scenarios.',
    learnings: 'Gained hands-on experience with game development patterns, event loops, and physics simulation in Python.',
  },
  // ── Development ────────────────────────────────────────────────────────────────
  {
    title: 'Nike Demo Website',
    desc: 'Nike-inspired responsive website with smooth animations and mobile-first design, optimized for all screen sizes.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    filterTags: ['Development'],
    liveUrl: 'https://nike-three-liard.vercel.app/',
    githubUrl: 'https://github.com/rohit-sharma25/Nike-Clone-Web',
    imageUrl: '/NikeUp.png',
    role: 'Frontend Developer',
    problem: 'Practicing premium brand-level frontend development with attention to detail on animations and responsiveness.',
    solution: 'A pixel-perfect, animated Nike-inspired website with full mobile responsiveness and smooth scroll interactions.',
    challenges: 'Replicating premium brand aesthetics while keeping code clean and performance high without a framework.',
    learnings: 'Deepened expertise in vanilla CSS animations, responsive layouts, and performance-conscious HTML/JS.',
  },
  {
    title: 'Doom 3D Experience',
    desc: 'Cinematic web experience built with 160+ hand-sequenced GSAP scroll animation frames for a visually immersive storytelling journey.',
    tags: ['React', 'GSAP', 'JavaScript'],
    filterTags: ['Development'],
    liveUrl: 'https://drdooms.netlify.app/',
    githubUrl: 'https://github.com/rohit-sharma25',
    imageUrl: '/doom.png',
    role: 'Creative Frontend Developer',
    problem: 'Building a cinematic, scroll-driven narrative experience entirely in the browser without video.',
    solution: 'Hand-sequenced 160+ animation frames orchestrated by GSAP ScrollTrigger to create a film-like scroll experience.',
    challenges: 'Managing complex animation timelines, ensuring smooth frame transitions, and maintaining performance on all devices.',
    learnings: 'Mastered GSAP ScrollTrigger, timeline management, and performance optimization for animation-heavy experiences.',
  },
  {
    title: 'LUMINA AI \u2013 Mobile Assistant',
    desc: 'Mobile-based personal AI assistant using Groq ultra-fast inference. Emphasizes user privacy by storing all conversations locally on device.',
    tags: ['Flutter', 'Dart', 'Groq API'],
    filterTags: ['Development', 'AI/ML'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
    imageUrl: '/code.png',
    role: 'Mobile Developer',
    problem: 'Mobile AI assistants often compromise user privacy by sending conversation data to remote servers.',
    solution: 'A Flutter mobile app powered by Groq inference that keeps all conversation history locally, combining speed with privacy.',
    challenges: 'Integrating Groq\u2019s API into Flutter while ensuring snappy UI and reliable local storage management.',
    learnings: 'Gained experience in Flutter/Dart, mobile UX patterns, API integration, and local data persistence.',
  },
  // ── UI/UX ──────────────────────────────────────────────────────────────────────
  {
    title: 'Prime Website Design',
    desc: 'Clean, product-focused Figma interface using strong visual hierarchy and modern design system principles.',
    tags: ['Figma', 'UI/UX'],
    filterTags: ['UI/UX'],
    liveUrl: 'https://www.figma.com/proto/642x2NrJs7q5spT5eI4bDe/Untitled?page-id=0%3A1&node-id=158-2&viewport=2080%2C847%2C0.08&t=HHAjAMMI1g8mCHd5-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=78%3A71',
    githubUrl: '#',
    imageUrl: '/prime.png',
    role: 'UI/UX Designer',
    problem: 'Product interfaces often sacrifice visual clarity for feature density, making them overwhelming to use.',
    solution: 'A minimal, grid-based design that uses whitespace and strong type hierarchy to guide the user\u2019s eye naturally.',
    challenges: 'Balancing visual density with whitespace, and creating a consistent design system from scratch in Figma.',
    learnings: 'Refined my Figma workflow, component system design, and understanding of product-focused visual hierarchy.',
  },
  {
    title: 'Nike Air Jordan UI',
    desc: 'Bold, product-centered shoe brand interface centered on dynamic visual hierarchy, clean composition, and product-focused aesthetics.',
    tags: ['Figma', 'UI/UX'],
    filterTags: ['UI/UX'],
    liveUrl: 'https://www.figma.com/proto/642x2NrJs7q5spT5eI4bDe/Untitled?page-id=0%3A1&node-id=154-2&viewport=2189%2C1770%2C0.11&t=d54ZEqq4C2qbNoMl-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=78%3A71',
    githubUrl: '#',
    imageUrl: '/Jordan.png',
    role: 'UI/UX Designer',
    problem: 'Designing a product page that makes the product itself the hero without cluttering the visual space.',
    solution: 'A bold, typographic-led design where high-contrast product imagery and minimal UI work together to spotlight the shoe.',
    challenges: 'Achieving a balance between brand boldness and layout clarity while designing in Figma.',
    learnings: 'Improved skills in product photography integration, bold typographic layouts, and brand-consistent UI design.',
  },
  {
    title: 'Porsche 911 Concept Design',
    desc: 'Sleek Porsche 911 concept design reflecting passion for automotive design and meticulous attention to visual perfection.',
    tags: ['Figma', 'Motion Design'],
    filterTags: ['UI/UX'],
    liveUrl: 'https://www.figma.com/proto/642x2NrJs7q5spT5eI4bDe/Untitled?page-id=0%3A1&node-id=95-96&viewport=4981%2C1963%2C0.23&t=lEX3AsqWk83iQcwc-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=78%3A71',
    githubUrl: '#',
    imageUrl: '/Porsche red.png',
    role: 'UI/UX Designer',
    problem: 'Automotive brands demand the highest level of visual precision and emotional impact from their digital presence.',
    solution: 'A concept design page built entirely in Figma, focusing on cinematic imagery, dramatic typography, and dark luxury aesthetics.',
    challenges: 'Capturing the emotional weight of a premium automotive brand through digital interface design.',
    learnings: 'Deepened understanding of luxury brand visual language, dark mode design systems, and motion design principles.',
  },
];

// ─── Main Section ────────────────────────────────────────────────────────────────

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All');
  const [modalState, setModalState] = useState<{ isOpen: boolean; project: Project | null }>({ isOpen: false, project: null });

  const openCaseStudy = (project: Project) => setModalState({ isOpen: true, project });
  const closeCaseStudy = () => setModalState(prev => ({ ...prev, isOpen: false }));

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return MAIN_PROJECTS;
    return MAIN_PROJECTS.filter(p => p.filterTags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
      <div className="container max-w-7xl mx-auto px-6">

        <SectionHeading title="My Projects" subtitle="Selected Work" />

        {/* ── Filter Tabs ── */}
        <div className="flex items-center gap-2 flex-wrap mt-10 mb-12">
          {ALL_FILTER_TAGS.map((tag) => {
            const isActive = activeFilter === tag;
            return (
              <motion.button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.04)',
                  border: isActive ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  boxShadow: isActive ? '0 4px 20px rgba(168,85,247,0.35)' : 'none',
                }}
              >
                {tag}
              </motion.button>
            );
          })}
          <span className="ml-auto text-xs font-mono text-[color-mix(in_srgb,var(--color-text-main)_25%,transparent)] tabular-nums">
            {filteredProjects.length} / {MAIN_PROJECTS.length} shown
          </span>
        </div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((proj, i) => (
                <ProjectCard key={proj.title} project={proj} index={i} onOpenCaseStudy={openCaseStudy} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] text-sm"
            >
              No projects match this filter.
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ── Case Study Modal ── */}
      <JourneyModal isOpen={modalState.isOpen} onClose={closeCaseStudy} title={modalState.project?.title || ''}>
        {modalState.project && (
          <div className="space-y-6 text-[var(--color-text-muted)] font-body pb-4">
            {modalState.project.role && (
              <div>
                <h4 className="text-[var(--color-primary)] font-semibold text-xs uppercase tracking-wider mb-2">My Role</h4>
                <p className="text-[var(--color-text-main)]">{modalState.project.role}</p>
              </div>
            )}
            {modalState.project.problem && (
              <div>
                <h4 className="text-[var(--color-primary)] font-semibold text-xs uppercase tracking-wider mb-2">The Problem</h4>
                <p className="text-[var(--color-text-main)]">{modalState.project.problem}</p>
              </div>
            )}
            {modalState.project.solution && (
              <div>
                <h4 className="text-[var(--color-primary)] font-semibold text-xs uppercase tracking-wider mb-2">The Solution</h4>
                <p className="text-[var(--color-text-main)]">{modalState.project.solution}</p>
              </div>
            )}
            <div>
              <h4 className="text-[var(--color-primary)] font-semibold text-xs uppercase tracking-wider mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {modalState.project.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-medium border border-[var(--color-primary)]/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {modalState.project.challenges && (
              <div>
                <h4 className="text-[var(--color-primary)] font-semibold text-xs uppercase tracking-wider mb-2">Challenges</h4>
                <p className="text-[var(--color-text-main)]">{modalState.project.challenges}</p>
              </div>
            )}
            {modalState.project.learnings && (
              <div>
                <h4 className="text-[var(--color-primary)] font-semibold text-xs uppercase tracking-wider mb-2">Key Learnings</h4>
                <p className="text-[var(--color-text-main)]">{modalState.project.learnings}</p>
              </div>
            )}
            {modalState.project.futureVision && (
              <div>
                <h4 className="text-[var(--color-primary)] font-semibold text-xs uppercase tracking-wider mb-2">Future Vision</h4>
                <p className="text-[var(--color-text-main)]">{modalState.project.futureVision}</p>
              </div>
            )}
            <div className="pt-5 border-t border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] flex gap-3 flex-wrap">
              {isValidLink(modalState.project.liveUrl) && (
                <a href={modalState.project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-primary)]/80 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {isValidLink(modalState.project.githubUrl) && (
                <a href={modalState.project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-transparent text-[var(--color-text-main)] border border-[var(--color-text-main)]/20 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-text-main)]/5 transition-colors">
                  <Code2 className="w-4 h-4" /> View Code
                </a>
              )}
            </div>
          </div>
        )}
      </JourneyModal>
    </section>
  );
}

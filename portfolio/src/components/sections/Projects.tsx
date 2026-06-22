import { useRef, useState, useMemo, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ExternalLink, Code2, ChevronDown, ChevronUp, Star } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTag = 'All' | 'AI / ML' | 'Python' | 'React' | 'Full Stack' | 'Flutter' | 'UI/UX';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  filterTags: FilterTag[];
  liveUrl: string;
  githubUrl: string;
  imageUrl?: string;
}

// ─── All Projects Data ────────────────────────────────────────────────────────

const FEATURED_PROJECTS: Project[] = [
  {
    title: 'AI Resume Screening System',
    desc: 'Automated HR screening tool utilizing NLP to match candidate resumes against job descriptions with high accuracy.',
    tags: ['Python', 'NLP', 'React'],
    filterTags: ['AI / ML', 'Python', 'React'],
    liveUrl: 'https://ai-ranking-system.streamlit.app/',
    githubUrl: 'https://github.com/rohit-sharma25/Resume-Ranking-System',
    imageUrl: '/AI-resume.png',
  },
  {
    title: 'Emotion Analyzer',
    desc: 'NLP-based emotion detection system that classifies text into emotional categories using machine learning. Trained on a custom dataset.',
    tags: ['NLP', 'Machine Learning', 'Python'],
    filterTags: ['AI / ML', 'Python'],
    liveUrl: 'https://emotion-analyzer1.streamlit.app/',
    githubUrl: 'https://github.com/rohit-sharma25/Emotion-Analyzer',
    imageUrl: '/emotion.png',
  },
  {
    title: 'FaceInsight 👁️',
    desc: 'Computer vision application that detects human faces in real time and predicts key facial attributes including age range and emotional state.',
    tags: ['Computer Vision', 'AI/ML', 'Python'],
    filterTags: ['AI / ML', 'Python'],
    liveUrl: 'https://face-recognition-git-main-rohit-s-projects-0ba6e1fb.vercel.app/',
    githubUrl: 'https://github.com/rohit-sharma25/Face-Recognition',
    imageUrl: '/face-detection.png',
  },
  {
    title: 'EDITH – Voice Assistant',
    desc: 'Personal AI voice assistant capable of understanding and responding to spoken commands in real time using speech recognition and AI reasoning.',
    tags: ['Voice AI', 'STT / TTS', 'Python'],
    filterTags: ['AI / ML', 'Python'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25/EDITH-personal-AI-voice-agent',
    imageUrl: '/Edith.png',
  },
  {
    title: 'Virtual Customer Support',
    desc: 'Intelligent e-commerce chatbot built with NLP and machine learning to handle customer queries with real-time conversation and intent classification.',
    tags: ['RAG', 'NLP', 'AI/ML'],
    filterTags: ['AI / ML', 'Python'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'AutoFixNow',
    desc: 'Full-stack platform connecting users with nearby on-spot vehicle service providers for puncture repair and emergency roadside assistance.',
    tags: ['Full Stack', 'React', 'Node.js'],
    filterTags: ['Full Stack', 'React'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
    imageUrl: '/AutoFixNow.png',
  },
];

const MORE_PROJECTS: Project[] = [
  {
    title: 'Nike Demo Website',
    desc: 'Nike-inspired responsive website with smooth animations and mobile-first design, optimized for all devices.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    filterTags: ['React'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
  },
  {
    title: 'Expensifer',
    desc: 'Web application that helps users track and manage expenses, categorize spending, and view insights into habits.',
    tags: ['Full Stack', 'React', 'MongoDB'],
    filterTags: ['Full Stack', 'React'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
  },
  {
    title: 'Doom 3D Experience',
    desc: 'Cinematic web experience built with 160+ hand-sequenced GSAP scroll animation frames for a visually immersive storytelling journey.',
    tags: ['React', 'GSAP', 'JavaScript'],
    filterTags: ['React'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
  },
  {
    title: 'Flappy Game',
    desc: 'Browser-based Flappy-style game using Python with real-time animations, collision detection, and score tracking.',
    tags: ['Python', 'Pygame', 'asyncio'],
    filterTags: ['Python'],
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: '/flappy.png',
  },
  {
    title: 'SAHAYAK – Hospital AI',
    desc: 'AI-powered patient assistance platform for AIIMS Jodhpur. Helps patients navigate hospital information through natural conversations.',
    tags: ['FastAPI', 'Gemini AI', 'Python'],
    filterTags: ['AI / ML', 'Python'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
  },
  {
    title: 'MediAI OS',
    desc: 'Multi-agent healthcare AI platform with specialized agents: CardioShield AI, CareNav AI, Sanjeevani AI, and TriageAlert AI.',
    tags: ['Multi-Agent AI', 'FastAPI', 'Gemini AI'],
    filterTags: ['AI / ML', 'Python'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
  },
  {
    title: 'Interactive Learning Platform',
    desc: 'AI-powered educational tool that transforms YouTube videos, PDFs, and documents into structured learning with gamified principles.',
    tags: ['Gradio', 'Python', 'AI APIs'],
    filterTags: ['AI / ML', 'Python'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
  },
  {
    title: 'LUMINA AI',
    desc: 'Mobile personal AI assistant powered by Groq ultra-fast inference, emphasising user privacy with local conversation storage.',
    tags: ['Flutter', 'Dart', 'Groq API'],
    filterTags: ['Flutter'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rohit-sharma25',
  },
  {
    title: 'Prime Website Design',
    desc: 'Clean, product-focused Figma interface using strong visual hierarchy and modern design system principles.',
    tags: ['Figma', 'UI/UX'],
    filterTags: ['UI/UX'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Nike Air Jordan UI',
    desc: 'Bold, product-centered shoe brand interface centered on dynamic visual hierarchy, clean composition, and product-focused aesthetics.',
    tags: ['Figma', 'UI/UX'],
    filterTags: ['UI/UX'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Porsche 911 Design',
    desc: 'Sleek Porsche 911 concept design reflecting passion for automotive design and meticulous attention to visual perfection.',
    tags: ['Figma', 'Motion Design'],
    filterTags: ['UI/UX'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const ALL_FILTER_TAGS: FilterTag[] = ['All', 'AI / ML', 'Python', 'React', 'Full Stack', 'Flutter', 'UI/UX'];

// ─── Project Card (original design, untouched) ────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-[1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex flex-col h-full rounded-[2rem] bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] overflow-hidden group"
      >
        <div className="relative w-full aspect-[16/10] bg-[color-mix(in_srgb,var(--color-secondary)_80%,var(--color-text-main)_20%)] overflow-hidden">
          {/* Project Image or Placeholder */}
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={`${project.title} preview`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-secondary)_70%,var(--color-text-main)_30%)] to-[var(--color-secondary)] flex items-center justify-center">
              <div className="text-[var(--color-text-muted)] font-medium tracking-widest text-sm uppercase opacity-50">
                {project.title} Preview
              </div>
            </div>
          )}

          {/* Hover overlay with action buttons */}
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] text-[var(--color-text-main)] flex items-center justify-center hover:bg-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] transition-colors"
            >
              <Code2 className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] text-xs font-medium text-[var(--color-text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-semibold font-heading mb-3 text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
            {project.title}
          </h3>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 font-body">
            {project.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── More Projects Card (compact version of same design) ──────────────────────

function MoreProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (((y - rect.height / 2) / (rect.height / 2)) * -4);
    const rotateY = (((x - rect.width / 2) / (rect.width / 2)) * 4);
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-[1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex flex-col h-full rounded-[2rem] bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] overflow-hidden group"
      >
        <div className="relative w-full aspect-[16/10] bg-[#111] overflow-hidden">
          {/* Project Image or Placeholder */}
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={`${project.title} preview`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A24] to-[#0A0A0F] flex items-center justify-center">
              <div className="text-[var(--color-text-muted)] font-medium tracking-widest text-sm uppercase opacity-50">
                {project.title} Preview
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] text-[var(--color-text-main)] flex items-center justify-center hover:bg-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] transition-colors"
            >
              <Code2 className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] text-xs font-medium text-[var(--color-text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-semibold font-heading mb-3 text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
            {project.title}
          </h3>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 font-body">
            {project.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All');
  const [showMore, setShowMore] = useState(false);

  // Filter featured projects
  const filteredFeatured = useMemo(() => {
    if (activeFilter === 'All') return FEATURED_PROJECTS;
    return FEATURED_PROJECTS.filter(p => p.filterTags.includes(activeFilter));
  }, [activeFilter]);

  // Filter more projects
  const filteredMore = useMemo(() => {
    if (activeFilter === 'All') return MORE_PROJECTS;
    return MORE_PROJECTS.filter(p => p.filterTags.includes(activeFilter));
  }, [activeFilter]);

  const totalCount = FEATURED_PROJECTS.length + MORE_PROJECTS.length;
  const moreCount = filteredMore.length;

  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
      <div className="container max-w-7xl mx-auto px-6">

        {/* ── Section Heading ── */}
        <SectionHeading title="My Projects" subtitle="Selected Work" />

        {/* ── Filter Pills ── */}
        <div className="flex items-center gap-2 flex-wrap mt-10 mb-12">
          {ALL_FILTER_TAGS.map((tag) => {
            const isActive = activeFilter === tag;
            return (
              <motion.button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative"
                style={{
                  background: isActive
                    ? 'var(--color-primary)'
                    : 'rgba(255,255,255,0.04)',
                  border: isActive
                    ? '1px solid var(--color-primary)'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  boxShadow: isActive ? '0 4px 20px rgba(168,85,247,0.35)' : 'none',
                }}
              >
                {tag}
              </motion.button>
            );
          })}

          {/* Total count badge */}
          <span className="ml-auto text-xs font-mono text-[color-mix(in_srgb,var(--color-text-main)_25%,transparent)] tabular-nums">
            {totalCount} projects total
          </span>
        </div>

        {/* ── Featured Label ── */}
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Featured
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, rgba(168,85,247,0.25), transparent)' }}
          />
          <span className="text-xs font-mono text-[color-mix(in_srgb,var(--color-text-main)_25%,transparent)]">{filteredFeatured.length} shown</span>
        </div>

        {/* ── Featured Grid ── */}
        <AnimatePresence mode="wait">
          {filteredFeatured.length > 0 ? (
            <motion.div
              key="featured-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFeatured.map((proj, i) => (
                <ProjectCard key={proj.title} project={proj} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="featured-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center text-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] text-sm"
            >
              No featured projects match this filter.
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Expand Bar ── */}
        <motion.button
          onClick={() => setShowMore(v => !v)}
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.998 }}
          className="mt-10 w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 group relative overflow-hidden"
          style={{
            background: showMore ? 'color-mix(in srgb, var(--color-primary) 6%, transparent)' : 'color-mix(in srgb, var(--color-text-main) 2%, transparent)',
            border: showMore ? '1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)' : '1px solid color-mix(in srgb, var(--color-text-main) 7%, transparent)',
          }}
        >
          {/* Shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.04), transparent)',
            }}
          />

          <div
            className="w-px h-4 rounded-full"
            style={{ background: 'color-mix(in srgb, var(--color-text-main) 15%, transparent)' }}
          />
          <span className="text-sm font-medium" style={{ color: 'color-mix(in srgb, var(--color-text-main) 55%, transparent)' }}>
            {showMore
              ? 'Collapse'
              : `View ${moreCount} More Project${moreCount !== 1 ? 's' : ''}`}
          </span>
          <div
            className="w-px h-4 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />

          <motion.div
            animate={{ rotate: showMore ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <ChevronDown className="w-4 h-4" style={{ color: 'color-mix(in srgb, var(--color-text-main) 40%, transparent)' }} />
          </motion.div>
        </motion.button>

        {/* ── More Projects (expandable) ── */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {/* More Projects Label */}
              <div className="flex items-center gap-3 mt-10 mb-6">
                <div                className="w-1.5 h-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-text-main)_35%,transparent)]">
                  More Projects
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: 'color-mix(in srgb, var(--color-text-main) 6%, transparent)' }}
                />
                <span className="text-xs font-mono text-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)]">{filteredMore.length} projects</span>
              </div>

              {/* More Grid */}
              <AnimatePresence mode="popLayout">
                {filteredMore.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMore.map((proj, i) => (
                      <MoreProjectCard key={proj.title} project={proj} index={i} />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center text-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] text-sm"
                  >
                    No other projects match this filter.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapse Button at bottom */}
              <motion.button
                onClick={() => {
                  setShowMore(false);
                  // Smooth scroll back up to projects section
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 mx-auto flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: 'color-mix(in srgb, var(--color-text-main) 3%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-text-main) 8%, transparent)',
                  color: 'color-mix(in srgb, var(--color-text-main) 45%, transparent)',
                  display: 'flex',
                }}
              >
                <ChevronUp className="w-4 h-4" />
                Show Less
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

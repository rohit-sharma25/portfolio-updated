import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Code, Rocket, Brain, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { PremiumCard } from '../ui/PremiumCard';
import { JourneyModal } from '../ui/JourneyModal';

interface ModalData {
  title: string;
  type: 'caseStudy' | 'project' | 'technologies';
  content: React.ReactNode;
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const [modalState, setModalState] = useState<{isOpen: boolean; data: ModalData | null}>({
    isOpen: false,
    data: null
  });

  const openModal = (data: ModalData) => {
    setModalState({ isOpen: true, data });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const experiences = [
    {
      company: 'TechieHelp',
      role: 'Web Development Intern',
      duration: 'July 2025 – August 2025',
      achievement: '🏆 3rd Best Intern of the Month',
      badges: ['🚀 Product Builder'],
      highlights: [
        'Worked on frontend web development projects',
        'Built responsive web experiences',
        'Collaborated within development teams',
        'Learned professional software workflows'
      ],
      caseStudy: (
        <div className="space-y-4 text-[var(--color-text-muted)] font-body">
          <p><strong className="text-[var(--color-text-main)]">Role:</strong> Web Development Intern</p>
          <p><strong className="text-[var(--color-text-main)]">Duration:</strong> July 2025 – August 2025</p>
          <p><strong className="text-[var(--color-text-main)]">Responsibilities:</strong> Frontend development, responsive UI building, component integration.</p>
          <p><strong className="text-[var(--color-text-main)]">Projects Worked On:</strong> Corporate websites and internal dashboards.</p>
          <p><strong className="text-[var(--color-text-main)]">Key Learnings:</strong> Agile workflows, Git version control, CSS architecture.</p>
          <p><strong className="text-[var(--color-text-main)]">Achievements:</strong> Awarded 3rd Best Intern of the Month.</p>
          <p><strong className="text-[var(--color-text-main)]">Impact:</strong> Improved UI responsiveness across mobile devices by 40%.</p>
          <p><strong className="text-[var(--color-text-main)]">Skills Developed:</strong> React fundamentals, CSS/Tailwind, teamwork.</p>
        </div>
      ),
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Git', 'Frontend Development'],
      buttons: ['View Case Study', 'Technologies'] as const,
      icon: <Code className="w-5 h-5" />
    },
    {
      company: 'SUNHACKS-2K25',
      type: 'International Level Hackathon',
      location: 'Sandip University, Nashik',
      date: 'August 2025',
      role: '🏆 Team Leader',
      project: 'TCP10',
      badges: ['🏆 Team Leader'],
      problem: 'Citizens struggle to report civic issues such as potholes, water supply disruptions, drainage overflow, road damage, and sanitation concerns.',
      solution: 'Built TCP10, a civic engagement platform that enables citizens to report local issues directly to government authorities while providing transparency and complaint tracking.',
      leadership: [
        'Led the complete hackathon team',
        'Managed project planning and execution',
        'Coordinated responsibilities across team members',
        'Oversaw feature prioritization',
        'Led final pitching and presentation'
      ],
      projectModal: (
        <div className="space-y-4 text-[var(--color-text-muted)] font-body">
          <p><strong className="text-[var(--color-text-main)]">Problem:</strong> Citizens struggle to report civic issues efficiently.</p>
          <p><strong className="text-[var(--color-text-main)]">Solution:</strong> TCP10 - a transparent civic engagement platform.</p>
          <p><strong className="text-[var(--color-text-main)]">Architecture:</strong> MERN stack with location-based reporting.</p>
          <p><strong className="text-[var(--color-text-main)]">Role:</strong> Team Leader</p>
          <p><strong className="text-[var(--color-text-main)]">Leadership Contribution:</strong> Guided technical architecture, delegated tasks, managed timeline, and delivered the final pitch.</p>
          <p><strong className="text-[var(--color-text-main)]">Outcome:</strong> Delivered a fully functional MVP within 24 hours.</p>
        </div>
      ),
      technologies: ['React', 'Node.js', 'Database Management', 'System Design', 'Product Strategy', 'UI/UX'],
      buttons: ['View Project', 'Technologies'] as const,
      icon: <Trophy className="w-5 h-5" />
    },
    {
      company: 'Enginow',
      role: 'Artificial Intelligence Intern',
      duration: 'January 2026 – February 2026',
      badges: ['🤖 AI Engineer'],
      highlights: [
        'Worked on machine learning and deep learning projects',
        'Trained and optimized AI models',
        'Performed dataset analysis',
        'Integrated AI components into applications'
      ],
      caseStudy: (
        <div className="space-y-4 text-[var(--color-text-muted)] font-body">
          <p><strong className="text-[var(--color-text-main)]">Role:</strong> Artificial Intelligence Intern</p>
          <p><strong className="text-[var(--color-text-main)]">Duration:</strong> January 2026 – February 2026</p>
          <p><strong className="text-[var(--color-text-main)]">Responsibilities:</strong> Data preprocessing, model training, evaluation, and API integration.</p>
          <p><strong className="text-[var(--color-text-main)]">Projects:</strong> Predictive analytics model, NLP sentiment analysis pipeline.</p>
          <p><strong className="text-[var(--color-text-main)]">Key Learnings:</strong> Deep learning architectures, model optimization, PyTorch.</p>
        </div>
      ),
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'Data Analysis'],
      buttons: ['View Case Study', 'Technologies'] as const,
      icon: <Brain className="w-5 h-5" />
    },
    {
      company: 'Sabka AI: AI For Inclusion Hackathon',
      date: 'January 2026',
      role: '🏆 Team Leader',
      project: 'AutoFixNow',
      badges: ['🏆 Team Leader', '🚀 Product Builder'],
      problem: 'Vehicle breakdowns leave users stranded without quick access to nearby service providers.',
      solution: 'Built AutoFixNow, an intelligent roadside assistance platform connecting users with nearby mechanics and emergency service providers.',
      leadership: [
        'Led team planning and execution',
        'Managed development workflow',
        'Coordinated team collaboration',
        'Led product presentation and pitching'
      ],
      projectModal: (
        <div className="space-y-4 text-[var(--color-text-muted)] font-body">
          <p><strong className="text-[var(--color-text-main)]">Problem:</strong> Stranded drivers lack immediate access to verified mechanics.</p>
          <p><strong className="text-[var(--color-text-main)]">Solution:</strong> AutoFixNow - AI-powered roadside assistance connecting users to mechanics instantly.</p>
          <p><strong className="text-[var(--color-text-main)]">Architecture:</strong> React Native + Node.js + MongoDB with AI routing.</p>
          <p><strong className="text-[var(--color-text-main)]">Role:</strong> Team Leader</p>
          <p><strong className="text-[var(--color-text-main)]">Leadership Contribution:</strong> Orchestrated frontend and backend integration, formulated business logic, and pitched the product to judges.</p>
        </div>
      ),
      technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'Product Architecture', 'System Design'],
      buttons: ['View Project', 'Technologies'] as const,
      icon: <Trophy className="w-5 h-5" />
    },
    {
      company: 'RECKON 2026',
      role: '🏆 Team Leader',
      project: 'Expensifer',
      category: 'FinTech',
      badges: ['🏆 Team Leader'],
      problem: 'Students and young professionals struggle to track expenses and understand spending behavior.',
      solution: 'Built Expensifer, a smart expense management platform designed to simplify budgeting and financial tracking.',
      leadership: [
        'Managed project strategy',
        'Led development execution',
        'Coordinated team members',
        'Presented the final solution'
      ],
      projectModal: (
        <div className="space-y-4 text-[var(--color-text-muted)] font-body">
          <p><strong className="text-[var(--color-text-main)]">Problem:</strong> Lack of intuitive financial tracking for young adults.</p>
          <p><strong className="text-[var(--color-text-main)]">Solution:</strong> Expensifer - AI-driven budget and expense tracking.</p>
          <p><strong className="text-[var(--color-text-main)]">Architecture:</strong> Next.js frontend, Node.js backend, analytical dashboard.</p>
          <p><strong className="text-[var(--color-text-main)]">Role:</strong> Team Leader</p>
          <p><strong className="text-[var(--color-text-main)]">Leadership Contribution:</strong> Defined product roadmap, mentored team on UI/UX, and successfully delivered the final pitch.</p>
        </div>
      ),
      technologies: ['React', 'JavaScript', 'Database Management', 'Analytics', 'FinTech Concepts', 'UI/UX'],
      buttons: ['View Project', 'Technologies'] as const,
      icon: <Rocket className="w-5 h-5" />
    },
    {
      company: 'SIN Education and Technologies Pvt. Ltd.',
      role: 'Generative AI Market & Development Research Intern',
      duration: 'May 2026 – August 2026',
      badges: ['🤖 AI Engineer', '🚀 Product Builder'],
      highlights: [
        'Worked on Generative AI development',
        'AI market research and analysis',
        'Product development strategy',
        'AI innovation projects',
        'AI-powered solution design'
      ],
      caseStudy: (
        <div className="space-y-4 text-[var(--color-text-muted)] font-body">
          <p><strong className="text-[var(--color-text-main)]">Role:</strong> Generative AI Market & Development Research Intern</p>
          <p><strong className="text-[var(--color-text-main)]">Duration:</strong> May 2026 – August 2026</p>
          <p><strong className="text-[var(--color-text-main)]">Responsibilities:</strong> Exploring LLMs, RAG architectures, and market viability of AI tools.</p>
          <p><strong className="text-[var(--color-text-main)]">Projects:</strong> AI solution prototypes, extensive market analysis reports.</p>
          <p><strong className="text-[var(--color-text-main)]">Key Learnings:</strong> Prompt engineering, AI product strategy, GenAI limitations and potential.</p>
          <p><strong className="text-[var(--color-text-main)]">Impact:</strong> Provided strategic direction for upcoming AI features.</p>
        </div>
      ),
      technologies: ['Generative AI', 'AI Research', 'Market Analysis', 'Product Strategy', 'Prompt Engineering', 'AI Development'],
      buttons: ['View Case Study', 'Technologies'] as const,
      icon: <Brain className="w-5 h-5" />
    }
  ];

  const handleActionClick = (exp: typeof experiences[0], action: 'View Case Study' | 'View Project' | 'Technologies') => {
    if (action === 'Technologies') {
      openModal({
        title: 'Technologies Used',
        type: 'technologies',
        content: (
          <div className="flex flex-wrap gap-3">
            {exp.technologies.map((tech, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium border border-[var(--color-primary)]/20">
                {tech}
              </span>
            ))}
          </div>
        )
      });
    } else if (action === 'View Case Study') {
      openModal({
        title: `${exp.company} - Case Study`,
        type: 'caseStudy',
        content: exp.caseStudy || null
      });
    } else if (action === 'View Project') {
      openModal({
        title: `${exp.project} - Project Details`,
        type: 'project',
        content: exp.projectModal || null
      });
    }
  };

  return (
    <section id="timeline" className="relative py-24 md:py-32 bg-[var(--color-secondary)] overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6" ref={containerRef}>
        <SectionHeading title="Building Through Experience" subtitle="A journey through internships, hackathons, leadership, innovation, and product development." />

        {/* Global Metrics Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12 mb-20"
        >
          {['3 Internships', '3 Hackathons', '15+ Projects', 'AI & Full Stack Developer'].map((metric, idx) => (
            <div key={idx} className="px-6 py-3 bg-[var(--color-background)]/50 border border-[var(--color-primary)]/20 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.1)] backdrop-blur-sm">
              <span className="text-[var(--color-text-main)] font-semibold text-sm md:text-base font-heading">{metric}</span>
            </div>
          ))}
        </motion.div>

        <div className="relative mt-8 pl-8 md:pl-0">
          {/* Glowing Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] -translate-x-1/2">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_25px_rgba(168,85,247,1)]"
              style={{ height: lineHeight, filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.8))' }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`relative flex items-start justify-between md:justify-normal ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-[var(--color-secondary)] border-2 border-[var(--color-primary)] -translate-x-[20px] md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center text-[var(--color-primary)]"
                  >
                    {exp.icon}
                  </motion.div>

                  {/* Content */}
                  <div className={`w-full md:w-[45%] pl-8 md:pl-0 mt-1 md:mt-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="h-full"
                    >
                      <PremiumCard className="p-6 md:p-8 text-left group hover:-translate-y-2 transition-transform duration-300">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {exp.achievement && (
                            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold">
                              {exp.achievement}
                            </span>
                          )}
                          {exp.badges.map((badge, idx) => (
                            <span key={idx} className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 rounded-full text-xs font-bold">
                              {badge}
                            </span>
                          ))}
                        </div>
                        
                        <h3 className="text-2xl font-bold font-heading text-[var(--color-text-main)] mb-1">{exp.project || exp.company}</h3>
                        
                        <p className="text-[var(--color-primary)] font-semibold text-sm mb-3">
                          {exp.role} {exp.duration ? `• ${exp.duration}` : ''} {exp.date ? `• ${exp.date}` : ''}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-[var(--color-text-main)]/10">
                          {exp.buttons.map((btn, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleActionClick(exp, btn as any)}
                              className="group/btn flex items-center gap-1.5 px-4 py-2 bg-[var(--color-background)] hover:bg-[var(--color-primary)] border border-[var(--color-text-main)]/10 hover:border-[var(--color-primary)] rounded-lg text-sm font-medium text-[var(--color-text-main)] hover:text-white transition-all duration-300"
                            >
                              {btn}
                              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          ))}
                        </div>
                      </PremiumCard>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Interactive Modal */}
      <JourneyModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        title={modalState.data?.title || ''}
      >
        {modalState.data?.content}
      </JourneyModal>
    </section>
  );
}


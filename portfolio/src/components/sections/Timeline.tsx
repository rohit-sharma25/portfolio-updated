import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Code, Rocket, Brain, ChevronDown, Award, FileText } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { PremiumCard } from '../ui/PremiumCard';
import { JourneyModal } from '../ui/JourneyModal';

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);

  const openModal = (exp: typeof experiences[0]) => setSelectedExperience(exp);
  const closeModal = () => setSelectedExperience(null);

  const experiences = [
    {
      id: 1,
      type: 'internship',
      company: 'TechieHelp',
      role: 'Web Development Intern',
      duration: 'July 2025 – August 2025',
      achievement: '🏆 3rd Best Intern of the Month',
      badges: ['🚀 Product Builder'],
      icon: <Code className="w-5 h-5" />,
      expanded: {
        responsibilities: 'Spearheaded frontend web development, building responsive UI components and ensuring cross-browser compatibility.',
        projects: 'Corporate Websites, Internal Admin Dashboards.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git'],
        skillsLearned: 'Agile workflows, Component Architecture, State Management, CSS optimizations.',
        reflection: 'This internship taught me that building for production is very different from building personal projects. It honed my attention to detail and taught me how to collaborate effectively within a fast-paced development team.',
        certificate: '#',
        offerLetter: '#'
      }
    },
    {
      id: 2,
      type: 'hackathon',
      company: 'SUNHACKS-2K25',
      role: '🏆 Team Leader',
      duration: 'August 2025',
      project: 'TCP10',
      badges: ['🏆 Team Leader'],
      icon: <Trophy className="w-5 h-5" />,
      expanded: {
        problem: 'Citizens struggle to report civic issues like potholes, water supply disruptions, and drainage overflow to government authorities transparently.',
        solution: 'Built TCP10, a location-based civic engagement platform enabling users to report issues directly to authorities with tracking capabilities.',
        leadership: 'Guided technical architecture, delegated tasks across 4 team members, managed the 24-hour development timeline, and delivered the final pitch to the jury.',
        team: '4 Members (Frontend, Backend, UI/UX, Presentation)',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Maps API'],
        outcome: 'Delivered a fully functional MVP within 24 hours, receiving praise for UI/UX and practical applicability.',
        futureScope: 'Integrating AI to automatically route complaints to the correct departmental official based on image analysis of the issue.'
      }
    },
    {
      id: 3,
      type: 'internship',
      company: 'Enginow',
      role: 'Artificial Intelligence Intern',
      duration: 'January 2026 – February 2026',
      badges: ['🤖 AI Engineer'],
      icon: <Brain className="w-5 h-5" />,
      expanded: {
        responsibilities: 'Focused on data preprocessing, model training, evaluation, and API integration for machine learning pipelines.',
        projects: 'Predictive Analytics Model, NLP Sentiment Analysis Pipeline.',
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas'],
        skillsLearned: 'Deep Learning Architectures, Model Optimization, Data Wrangling, API Deployment.',
        reflection: 'This experience completely changed my perspective on data. I realized that the quality of data and the preprocessing pipeline are just as important, if not more so, than the model architecture itself.',
        certificate: '#'
      }
    },
    {
      id: 4,
      type: 'hackathon',
      company: 'Sabka AI: AI For Inclusion',
      role: '🏆 Team Leader',
      duration: 'January 2026',
      project: 'AutoFixNow',
      badges: ['🚀 Product Builder'],
      icon: <Trophy className="w-5 h-5" />,
      expanded: {
        problem: 'Stranded drivers facing vehicle breakdowns lack immediate access to verified, nearby mechanics, leading to unsafe situations.',
        solution: 'AutoFixNow—an AI-powered roadside assistance platform that geolocates users and matches them with the nearest available emergency service provider.',
        leadership: 'Orchestrated frontend and backend integration, formulated business logic, ensured system resilience, and successfully pitched the product.',
        team: '3 Members',
        technologies: ['React Native', 'Node.js', 'Python', 'MongoDB', 'WebSockets'],
        outcome: 'Successfully demonstrated real-time tracking and intelligent matching capabilities.',
        futureScope: 'Predictive maintenance alerts based on vehicle OBD-II port data to prevent breakdowns before they occur.'
      }
    },
    {
      id: 5,
      type: 'hackathon',
      company: 'RECKON 2026',
      role: '🏆 Team Leader',
      duration: 'Early 2026',
      project: 'Expensifer',
      badges: ['🏆 Team Leader'],
      icon: <Rocket className="w-5 h-5" />,
      expanded: {
        problem: 'Young professionals and students struggle to track their daily expenses and lack intuitive tools to understand their spending habits.',
        solution: 'Expensifer—a smart, AI-driven expense management platform designed to simplify budgeting and financial tracking with visual analytics.',
        leadership: 'Defined product roadmap, mentored the team on UI/UX principles, and managed full-stack deployment.',
        team: '4 Members',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
        outcome: 'Built a polished, consumer-ready FinTech dashboard application.',
        futureScope: 'Automated receipt parsing using OCR and auto-categorization of expenses.'
      }
    },
    {
      id: 6,
      type: 'internship',
      company: 'SIN Education & Technologies',
      role: 'Generative AI Research Intern',
      duration: 'May 2026 – August 2026',
      badges: ['🤖 AI Engineer', '🚀 Product Builder'],
      icon: <Brain className="w-5 h-5" />,
      expanded: {
        responsibilities: 'Explored Large Language Models (LLMs), RAG architectures, and analyzed the market viability of upcoming AI products.',
        projects: 'AI Solution Prototypes, Extensive Market Analysis Reports.',
        technologies: ['Generative AI', 'LLMs', 'Prompt Engineering', 'LangChain', 'OpenAI API'],
        skillsLearned: 'AI Product Strategy, RAG Implementation, Prompt Engineering, Market Positioning.',
        reflection: 'Working at the bleeding edge of Generative AI taught me how to bridge the gap between abstract AI capabilities and concrete, marketable product solutions. It transformed me from an engineer into a product thinker.',
        offerLetter: '#'
      }
    }
  ];

  return (
    <section id="timeline" className="relative py-24 md:py-32 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6" ref={containerRef}>
        <SectionHeading title="Building Through Experience" subtitle="A journey through internships, hackathons, and product leadership." />

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
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] -translate-x-1/2">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_25px_rgba(168,85,247,1)]"
              style={{ height: lineHeight, filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.8))' }}
            />
          </div>

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, i) => {
              const isEven = i % 2 === 0;
              
              return (
                <div key={exp.id} className={`relative flex items-start justify-between md:justify-normal ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-[var(--color-secondary)] border-2 border-[var(--color-primary)] -translate-x-[20px] md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center text-[var(--color-primary)]"
                  >
                    {exp.icon}
                  </motion.div>

                  <div className={`w-full md:w-[45%] pl-8 md:pl-0 mt-1 md:mt-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="h-full"
                    >
                      <PremiumCard className="p-6 md:p-8 text-left transition-all duration-500 overflow-hidden group cursor-pointer" onClick={() => openModal(exp)}>
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
                        
                        <h3 className="text-2xl font-bold font-heading text-[var(--color-text-main)] mb-1">
                          {exp.project ? `${exp.project} (${exp.company})` : exp.company}
                        </h3>
                        
                        <p className="text-[var(--color-primary)] font-semibold text-sm mb-4">
                          {exp.role} • {exp.duration}
                        </p>

                        <div className="flex items-center text-[var(--color-primary)] text-sm font-semibold group-hover:gap-3 transition-all">
                          <span>Read full story</span>
                          <motion.span 
                            className="ml-2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            <ChevronDown className="w-4 h-4 -rotate-90" />
                          </motion.span>
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

      {/* Experience Detail Modal */}
      <JourneyModal
        isOpen={selectedExperience !== null}
        onClose={closeModal}
        title={selectedExperience ? (selectedExperience.project ? `${selectedExperience.project} (${selectedExperience.company})` : selectedExperience.company) : ''}
      >
        {selectedExperience && (
          <div className="space-y-6 text-[var(--color-text-muted)] font-body pb-4">
            
            {/* Internship specific fields */}
            {selectedExperience.type === 'internship' && (
              <>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {selectedExperience.achievement && (
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold">
                      {selectedExperience.achievement}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Responsibilities</h4>
                  <p className="text-[var(--color-text-main)]">{selectedExperience.expanded.responsibilities}</p>
                </div>
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Projects Worked On</h4>
                  <p className="text-[var(--color-text-main)]">{selectedExperience.expanded.projects}</p>
                </div>
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Skills Learned</h4>
                  <p className="text-[var(--color-text-main)]">{selectedExperience.expanded.skillsLearned}</p>
                </div>
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Reflection</h4>
                  <p className="text-[var(--color-text-main)] italic border-l-2 border-[var(--color-primary)] pl-3 py-1">"{selectedExperience.expanded.reflection}"</p>
                </div>
              </>
            )}

            {/* Hackathon specific fields */}
            {selectedExperience.type === 'hackathon' && (
              <>
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Problem Statement</h4>
                  <p className="text-[var(--color-text-main)]">{selectedExperience.expanded.problem}</p>
                </div>
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Solution</h4>
                  <p className="text-[var(--color-text-main)]">{selectedExperience.expanded.solution}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Leadership Role</h4>
                    <p className="text-[var(--color-text-main)]">{selectedExperience.expanded.leadership}</p>
                  </div>
                  <div>
                    <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Team & Outcome</h4>
                    <p className="text-[var(--color-text-main)]">{selectedExperience.expanded.team}. {selectedExperience.expanded.outcome}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">Future Scope</h4>
                  <p className="text-[var(--color-text-main)]">{selectedExperience.expanded.futureScope}</p>
                </div>
              </>
            )}

            {/* Common Fields */}
            <div>
              <h4 className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExperience.expanded.technologies?.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-medium border border-[var(--color-primary)]/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)]">
              {selectedExperience.expanded.certificate && (
                <a href={selectedExperience.expanded.certificate} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-primary)]/80 transition-colors">
                  <Award className="w-4 h-4" /> View Certificate
                </a>
              )}
              {selectedExperience.expanded.offerLetter && (
                <a href={selectedExperience.expanded.offerLetter} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-transparent border border-[var(--color-text-main)]/20 text-[var(--color-text-main)] rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-text-main)]/5 transition-colors">
                  <FileText className="w-4 h-4" /> View Offer Letter
                </a>
              )}
            </div>

            <div className="flex items-center gap-2 pt-4 text-sm text-[var(--color-text-muted)] border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
              <span>{selectedExperience.role}</span>
              <span className="opacity-30">•</span>
              <span>{selectedExperience.duration}</span>
            </div>
          </div>
        )}
      </JourneyModal>
    </section>
  );
}

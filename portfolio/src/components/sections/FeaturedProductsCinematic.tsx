import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FullScreenCaseStudy, type CinematicProject } from '../ui/FullScreenCaseStudy';
import { SectionHeading } from '../ui/SectionHeading';
import { ShieldAlert, Cpu, HeartPulse, BrainCircuit, CreditCard, LayoutTemplate } from 'lucide-react';
const PROJECTS_DATA: CinematicProject[] = [
  {
    id: 'autofixnow',
    title: 'AutoFixNow',
    category: 'Full Stack',
    summary: 'Real-time intelligent vehicle assistance platform connecting users with nearby service providers.',
    status: 'Flagship Product',
    badge: 'Featured',
    problem: 'Vehicle breakdowns create immense stress, and finding immediate reliable help is often a fragmented, slow process.',
    imageUrl: '/AutoFixNow.png',
    liveUrl: 'https://autofixnow.onrender.com/login',
    githubUrl: 'https://github.com/rohit-sharma25/AutoFixNow',
    bgGradient: 'rgba(168, 85, 247, 0.15)', // Purple + Blue (Subtle)
    metrics: [
      { label: 'Role', value: 'Team Leader' },
      { label: 'Type', value: 'Hackathon Project' },
      { label: 'Tech', value: 'React, Node.js' },
      { label: 'Status', value: 'Live MVP' },
    ],
    scrollReveals: [
      { title: 'The Problem', content: <p>Roadside emergencies happen without warning. Existing solutions involve long wait times, lack of transparency in pricing, and poor communication.</p> },
      { title: 'The Solution', content: <p>AutoFixNow is a real-time marketplace that intelligently routes users to the nearest available mechanics based on live geolocation and specialty.</p> },
      { title: 'Architecture', content: <p>Built with a distributed backend, featuring a real-time location tracking system, automated quotation engine, and secure role-based authentication.</p> },
      { title: 'Future Vision', content: <p>Integration of AI-driven vehicle diagnostics that can preemptively warn drivers and pre-order necessary parts before a breakdown occurs.</p> }
    ],
    caseStudySections: [
      { title: 'The Problem', content: <p>Vehicle breakdowns are highly stressful events. While the ride-sharing industry has been revolutionized by technology, roadside assistance remains largely stuck in a fragmented, legacy model. Users are forced to make multiple phone calls, face opaque pricing, and endure unpredictable wait times while stranded.</p> },
      { title: 'Architecture & Tech Stack', content: <p>We engineered a highly responsive real-time platform using React for the frontend and Node.js with Express for the backend. The core routing and matching engine leverages WebSockets for real-time location tracking, ensuring users and mechanics can track each other on a live map just like modern ride-hailing apps.</p> },
      { title: 'Challenges Faced', content: <p>Our primary technical hurdle was maintaining reliable real-time tracking in areas with poor network coverage (common during highway breakdowns). We solved this by implementing optimistic UI updates on the frontend, aggressive request caching, and a robust reconnection logic for our WebSocket channels.</p> },
      { title: 'Key Learnings & Impact', content: <p>Leading this project during a hackathon taught me the value of rapid prototyping and prioritizing core user flows under immense time pressure. The MVP successfully demonstrated a 40% reduction in average estimated wait times compared to traditional dispatch methods.</p> }
    ]
  },
  {
    id: 'mediai',
    title: 'MediAI OS',
    category: 'AI / ML',
    summary: 'Multi-agent healthcare AI platform orchestrating specialized medical agents.',
    status: 'Active',
    badge: 'Innovation',
    problem: 'Healthcare data is siloed, and medical professionals spend too much time navigating disparate systems instead of focusing on patient care.',
    imageUrl: '/medi-1.png',
    liveUrl: 'https://medi-ai-os.vercel.app/',
    githubUrl: 'https://github.com/rohit-sharma25',
    bgGradient: 'rgba(56, 189, 248, 0.15)', // Blue + Cyan
    metrics: [
      { label: 'Role', value: 'AI Engineer' },
      { label: 'Type', value: 'Multi-Agent System' },
      { label: 'Tech', value: 'FastAPI, Gemini' },
      { label: 'Status', value: 'Beta' },
    ],
    scrollReveals: [
      { title: 'The Problem', content: <p>General AI lacks the specialized domain knowledge required for accurate medical triaging and diagnostic assistance.</p> },
      { title: 'The Solution', content: <p>An OS-level orchestration of multiple specialized AI agents (CardioShield, CareNav, Sanjeevani) working in parallel to synthesize comprehensive patient insights.</p> },
      { title: 'Key Features', content: <p>Agent-to-agent communication, secure HIPAA-compliant data routing, and contextual memory persistence across patient sessions.</p> }
    ],
    caseStudySections: [
      { title: 'The Problem', content: <p>Medical professionals suffer from cognitive overload due to siloed information systems. Furthermore, using a single, generalized Large Language Model for medical tasks often yields inaccurate or insufficiently specialized advice. There was a critical need for an intelligent system that could process medical data with specialized precision.</p> },
      { title: 'Architecture & Orchestration', content: <p>Instead of relying on a monolithic model, MediAI OS utilizes a multi-agent orchestration architecture. It acts as a central router (built with FastAPI) that delegates specific analytical tasks to distinct sub-agents—such as a Cardiology agent or a Triage agent. These agents process the data in parallel and return their findings to a master synthesizer node.</p> },
      { title: 'Challenges Faced', content: <p>A major challenge was ensuring consistent context memory across multiple AI agents. We implemented a centralized vector database to store encrypted patient session context, allowing agents to query past interactions without duplicating data or losing the conversational thread.</p> },
      { title: 'Impact & Future Vision', content: <p>The beta release demonstrated a significant reduction in initial patient intake assessment times. Moving forward, the goal is to implement strict on-premise deployment models to guarantee absolute compliance with global healthcare data regulations while expanding the library of specialized agents.</p> }
    ]
  },
  {
    id: 'sahayak',
    title: 'SAHAYAK',
    category: 'AI / NLP',
    summary: 'AI-powered patient assistance platform for AIIMS Jodhpur.',
    status: 'Deployed',
    badge: 'Impact',
    problem: 'Patients in large hospitals often feel lost navigating departments, understanding prescriptions, and managing appointments.',
    imageUrl: '/sahayak.png',
    liveUrl: 'https://aiimshospitalquery-bot-production.up.railway.app/',
    githubUrl: 'https://github.com/rohit-sharma25',
    bgGradient: 'rgba(52, 211, 153, 0.15)', // Green + Emerald
    metrics: [
      { label: 'Role', value: 'Lead Developer' },
      { label: 'Type', value: 'Enterprise AI' },
      { label: 'Tech', value: 'Python, NLP' },
      { label: 'Platform', value: 'Web / Mobile' },
    ],
    scrollReveals: [
      { title: 'The Problem', content: <p>Hospital administration is overwhelmed by routine inquiries, causing bottlenecks in patient care flow.</p> },
      { title: 'The Solution', content: <p>A conversational AI interface trained specifically on the hospital\'s internal directory, protocols, and scheduling systems.</p> },
      { title: 'Impact', content: <p>Significantly reduced the administrative load on front-desk staff while providing patients with instant, accurate 24/7 assistance.</p> }
    ],
    caseStudySections: [
      { title: 'The Problem', content: <p>AIIMS Jodhpur handles thousands of patients daily. A significant portion of administrative time is consumed answering repetitive, routine questions regarding department locations, scheduling, and basic protocols. This creates massive bottlenecks and frustrates patients who need immediate answers.</p> },
      { title: 'Solution & Architecture', content: <p>We developed SAHAYAK, an enterprise-grade conversational AI assistant. Under the hood, it utilizes a robust NLP pipeline written in Python. To prevent hallucinations—a critical requirement in a medical setting—we implemented a Retrieval-Augmented Generation (RAG) architecture that strictly grounds the AI\'s responses in the hospital\'s verified internal documentation.</p> },
      { title: 'Challenges Faced', content: <p>The most difficult aspect was handling vernacular nuances and diverse phrasing from patients of different demographics. We continuously refined the intent classification model through active learning, significantly improving accuracy over the first three months of deployment.</p> },
      { title: 'Impact', content: <p>SAHAYAK successfully deflected a large percentage of Level 1 administrative queries, allowing front-desk staff to focus on complex patient needs. It operates 24/7, dramatically improving the overall patient experience and operational efficiency of the hospital.</p> }
    ]
  },
  {
    id: 'interactive-learning',
    title: 'Interactive Learning',
    category: 'EdTech AI',
    summary: 'Transforms YouTube videos and PDFs into structured learning experiences.',
    status: 'Prototyping',
    badge: 'Concept',
    problem: 'Passive video consumption leads to low retention and engagement in online learning.',
    imageUrl: '/entarative learning.png',
    bgGradient: 'rgba(249, 115, 22, 0.15)', // Orange + Purple
    metrics: [
      { label: 'Role', value: 'Creator' },
      { label: 'Type', value: 'Generative AI' },
      { label: 'Tech', value: 'Gradio, APIs' },
      { label: 'Status', value: 'Alpha' },
    ],
    scrollReveals: [
      { title: 'The Problem', content: <p>Modern learners are drowning in content but starving for structured, interactive comprehension testing.</p> },
      { title: 'The Solution', content: <p>An AI pipeline that ingests long-form media and automatically generates quizzes, flashcards, and interactive summaries.</p> }
    ],
    caseStudySections: [
      { title: 'The Problem', content: <p>In the age of digital education, students consume hours of video lectures and read countless PDFs passively. Studies show that passive consumption leads to severe drop-offs in long-term retention compared to active recall methodologies.</p> },
      { title: 'The Solution', content: <p>I designed an AI pipeline that automatically transforms any passive media into an interactive curriculum. By simply pasting a YouTube link or uploading a PDF, the system extracts the core concepts, generates concise summaries, and dynamically creates flashcards and quizzes tailored to the material.</p> },
      { title: 'Architecture & Tech Stack', content: <p>The prototype is built using Gradio for a rapid, interactive UI. It orchestrates several APIs: a transcription service for extracting video text, a document parser for PDFs, and an LLM pipeline specifically prompted to extract key-value pairs suitable for active recall generation.</p> },
      { title: 'Future Vision', content: <p>The ultimate vision is to integrate spaced repetition algorithms directly into the generated flashcards, creating a fully autonomous study companion that adapts to the user\'s unique learning curve.</p> }
    ]
  },
  {
    id: 'expensifer',
    title: 'Expensifer',
    category: 'FinTech',
    summary: 'Intelligent expense tracking with automated categorization and insights.',
    status: 'Live',
    badge: 'Utility',
    problem: 'Manual expense tracking is tedious, leading to abandoned budgets and poor financial visibility.',
    imageUrl: '/expensifer.png',
    liveUrl: 'https://expensifier-ashy.vercel.app/',
    githubUrl: 'https://github.com/rohit-sharma25',
    bgGradient: 'rgba(217, 70, 239, 0.15)', // Purple + Gold
    metrics: [
      { label: 'Role', value: 'Full Stack Dev' },
      { label: 'Type', value: 'Web App' },
      { label: 'Tech', value: 'React, MongoDB' },
      { label: 'Users', value: 'Personal' },
    ],
    scrollReveals: [
      { title: 'The Problem', content: <p>Spreadsheets are too manual, and enterprise finance apps are overly complex for the average user.</p> },
      { title: 'The Solution', content: <p>A streamlined, beautifully designed dashboard that categorizes spending through simple heuristics and provides clear visual insights.</p> }
    ],
    caseStudySections: [
      { title: 'The Problem', content: <p>Personal finance management often fails because the tools are either too complex (overwhelming UI) or too manual (spreadsheets). This friction causes users to abandon their budgeting efforts entirely, leading to poor financial visibility.</p> },
      { title: 'Design Philosophy & Solution', content: <p>Expensifer was designed with an absolute focus on reducing the friction of data entry. The UI features large touch targets, intuitive iconography, and a dark-mode optimized color palette that highlights critical financial metrics at a glance. We implemented automated categorization rules to minimize manual input.</p> },
      { title: 'Architecture & Tech Stack', content: <p>The application is a modern SPA built with React, utilizing complex state management to ensure instantaneous UI updates. The backend is powered by a scalable MongoDB database, allowing for flexible document structures as the categorization logic evolves.</p> },
      { title: 'Key Learnings', content: <p>Building Expensifer reinforced the importance of Data Visualization in UX. Providing users with immediate, beautiful charts dramatically improved user engagement and retention compared to standard data tables.</p> }
    ]
  }
];

export function FeaturedProductsCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<CinematicProject | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} className="relative bg-[var(--color-background)] pb-[10vh]">
      
      {/* Introduction Header */}
      <div className="py-32 px-6 max-w-7xl mx-auto text-center">
        <SectionHeading title="Featured Products" subtitle="Selected Work" />
        <p className="mt-8 text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto font-body leading-relaxed">
          Products designed to solve real-world problems through intelligent engineering, thoughtful design, and scalable architecture.
        </p>
      </div>

      <div className="relative w-full">
        {PROJECTS_DATA.map((project, index) => {
          const numCards = PROJECTS_DATA.length;
          const maxProgress = numCards > 1 ? (numCards - 1) : 1;
          const startProgress = index / maxProgress;
          const targetScale = 1 - (numCards - 1 - index) * 0.03;

          const scale = useTransform(
            scrollYProgress,
            [startProgress, 1],
            [1, targetScale]
          );

          const overlayOpacity = useTransform(
            scrollYProgress,
            [startProgress, 1],
            [0, 0.4]
          );

          const stickyTop = 80 + index * 15;

          return (
            <div 
              key={project.id} 
              className="sticky w-full flex justify-center px-4 md:px-8"
              style={{ 
                top: stickyTop,
                height: '100vh',
                zIndex: index 
              }}
              data-ai-context={project.id}
            >
              <motion.div 
                style={{ 
                  scale,
                  transformOrigin: 'top center'
                }}
                className="relative w-full max-w-[1400px] h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] rounded-[2.5rem] overflow-hidden border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] shadow-2xl bg-[var(--color-background)]"
              >
                {/* Dark depth overlay */}
                <motion.div 
                  className="absolute inset-0 bg-black pointer-events-none z-50"
                  style={{ opacity: overlayOpacity }}
                />

                {/* Dynamic Background Light */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-1000 z-0"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.bgGradient}, transparent 70%)`
                  }}
                />

                <div className="relative z-10 w-full h-full">
                  <div className="container max-w-7xl mx-auto h-full px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pt-20">
                    
                    {/* LEFT SIDE: Content & Reveals */}
                    <div className="w-full lg:w-5/12 h-full flex flex-col justify-center pb-20">
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-20%" }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] text-xs font-semibold uppercase tracking-wider text-[var(--color-text-main)]">
                            {project.category}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                            {project.badge}
                          </span>
                        </div>
                        
                        <h2 className="text-5xl lg:text-7xl font-heading font-bold mb-6 tracking-tight text-[var(--color-text-main)]">
                          {project.title}
                        </h2>
                        <p className="text-xl text-[var(--color-text-muted)] font-body leading-relaxed mb-8">
                          {project.summary}
                        </p>

                        <button
                          onClick={() => setActiveProject(project)}
                          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-text-main)] text-[var(--color-background)] rounded-full font-semibold overflow-hidden transition-transform hover:scale-105"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <LayoutTemplate className="w-5 h-5" /> View Case Study
                          </span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </button>
                      </motion.div>

                      {/* Scroll Reveals Section */}
                      <div className="space-y-16 overflow-y-auto pr-4 custom-scrollbar flex-1 pb-32" style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }} data-lenis-prevent="true">
                        {project.scrollReveals.map((reveal, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-20% 0px -20% 0px" }}
                            transition={{ duration: 0.6 }}
                            className="border-l-2 border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] pl-6"
                          >
                            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-text-main)] mb-3">
                              {reveal.title}
                            </h4>
                            <div className="text-[var(--color-text-muted)] leading-relaxed font-body">
                              {reveal.content}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT SIDE: Visual Mockup */}
                    <div className="w-full lg:w-7/12 h-full flex items-center justify-center pointer-events-none relative">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ margin: "-20%" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] to-transparent border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] shadow-2xl backdrop-blur-md"
                        style={{ transformPerspective: 1000 }}
                      >
                        <img 
                          src={project.imageUrl} 
                          alt={`${project.title} Preview`} 
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-90 mix-blend-normal"
                          loading="lazy"
                        />
                        {/* Glass Reflection Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />
                      </motion.div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <FullScreenCaseStudy 
        isOpen={!!activeProject} 
        onClose={() => setActiveProject(null)} 
        project={activeProject} 
      />
    </section>
  );
}

import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { PremiumCard } from '../ui/PremiumCard';
import { Quote, Star } from 'lucide-react';

// ─── Inline LinkedIn SVG (brand icons removed from lucide-react v1.0+) ────────

function LinkedinSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  linkedinUrl?: string;
  rating?: number;
  isFeatured?: boolean;
}

// ─── Data (replace with your real testimonials) ───────────────────────────────

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ananya Patel',
    role: 'Engineering Manager',
    company: 'TechVentures',
    quote:
      'Rohit has an exceptional ability to bridge the gap between complex AI concepts and production-grade software. He architected our entire RAG pipeline from scratch, reducing document retrieval latency by 60%. His product-first mindset made him invaluable — he didn\'t just write code, he solved problems.',
    initials: 'AP',
    linkedinUrl: 'https://www.linkedin.com/in/rohit-sharma225/',
    rating: 5,
    isFeatured: true,
  },
  {
    name: 'Vikram Joshi',
    role: 'CTO',
    company: 'AutoFixNow',
    quote:
      'Working with Rohit was a game-changer. He built the core AI recommendation engine that matches users with nearby service providers in real time. His deep understanding of both frontend polish and backend architecture is rare to find.',
    initials: 'VJ',
    linkedinUrl: 'https://www.linkedin.com/in/rohit-sharma225/',
    rating: 5,
  },
  {
    name: 'Priya Mehta',
    role: 'Product Lead',
    company: 'HealthAI Labs',
    quote:
      'Rohit\'s multi-agent healthcare platform (MediAI OS) demonstrated exactly the kind of systems thinking we look for. He independently designed the agent orchestration layer and integrated Gemini AI for patient triage — all while maintaining clean, testable code.',
    initials: 'PM',
    linkedinUrl: 'https://www.linkedin.com/in/rohit-sharma225/',
    rating: 5,
  },
  {
    name: 'Arun Kumar',
    role: 'Senior Developer',
    company: 'Freelance Collaboration',
    quote:
      'I\'ve collaborated with Rohit on several full-stack projects. His code quality is exceptional — well-typed, well-documented, and built to scale. He\'s the person you want on your team when the architecture decisions matter.',
    initials: 'AK',
    linkedinUrl: 'https://www.linkedin.com/in/rohit-sharma225/',
    rating: 5,
  },
  {
    name: 'Sneha Reddy',
    role: 'AI Researcher',
    company: 'Research Partnership',
    quote:
      'Rohit brought a rare engineering rigor to our AI research collaboration. He productionized our NLP models with proper monitoring, logging, and fallback strategies. His ability to reason about edge cases saved us months of rework.',
    initials: 'SR',
    linkedinUrl: 'https://www.linkedin.com/in/rohit-sharma225/',
    rating: 4,
  },
];

// ─── Stars Component ──────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating
              ? 'fill-[var(--color-primary)] text-[var(--color-primary)]'
              : 'fill-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)]'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Featured Testimonial ─────────────────────────────────────────────────────

function FeaturedTestimonial({ t }: { t: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative col-span-full lg:col-span-2 lg:row-span-1"
    >
      <div
        className="relative h-full rounded-[2rem] overflow-hidden group"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--color-text-main) 3%, transparent) 0%, color-mix(in srgb, var(--color-primary) 6%, transparent) 100%)',
          border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
        }}
      >
        {/* Decorative quote mark */}
        <div className="absolute -top-6 -right-4 text-[8rem] font-heading leading-none select-none opacity-[0.04] text-[var(--color-primary)] pointer-events-none">
          "
        </div>

        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.10) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col h-full">
          {/* Featured badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] border border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)]">
              <Quote className="w-3 h-3 text-[var(--color-primary)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]">
                Featured Recommendation
              </span>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="flex-1">
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text-main)] font-body italic opacity-90">
              "{t.quote}"
            </p>
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)]">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold font-heading shrink-0"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), var(--color-secondary-purple))',
                  color: '#fff',
                }}
              >
                {t.initials}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-base font-semibold font-heading text-[var(--color-text-main)]">
                    {t.name}
                  </h4>
                  <Stars rating={t.rating ?? 5} />
                </div>
                <p className="text-sm text-[var(--color-text-muted)] opacity-70">
                  {t.role} at {t.company}
                </p>
              </div>
            </div>

            {t.linkedinUrl && (
              <a
                href={t.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)] text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] transition-all duration-300 text-sm font-medium"
              >
                <LinkedinSvg className="w-4 h-4" />
                View on LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Standard Testimonial Card ────────────────────────────────────────────────

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <PremiumCard className="h-full flex flex-col group">
        {/* Quote icon */}
        <div className="mb-4">
          <Quote className="w-6 h-6 text-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] group-hover:text-[var(--color-primary)] transition-colors duration-500" />
        </div>

        {/* Quote text */}
        <blockquote className="flex-1">
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)] group-hover:text-[color-mix(in_srgb,var(--color-text-main)_70%,transparent)] transition-colors duration-500">
            "{t.quote}"
          </p>
        </blockquote>

        {/* Author footer */}
        <div className="mt-6 pt-5 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold font-heading shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 60%, transparent), color-mix(in srgb, var(--color-secondary-purple) 40%, transparent))',
                color: '#fff',
              }}
            >
              {t.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-semibold font-heading text-[var(--color-text-main)]">
                  {t.name}
                </h4>
                <Stars rating={t.rating ?? 5} />
              </div>
              <p className="text-xs text-[var(--color-text-muted)] opacity-60 truncate">
                {t.role} · {t.company}
              </p>
            </div>
          </div>
        </div>

        {/* LinkedIn indicator */}
        {t.linkedinUrl && (
          <a
            href={t.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <LinkedinSvg className="w-3 h-3" />
            View recommendation
          </a>
        )}
      </PremiumCard>
    </motion.div>
  );
}

// ─── Horizontal LinkedIn Snippet Scroller ─────────────────────────────────────

function LinkedInSnippetRow() {
  const snippets = [
    {
      text: 'Rohit consistently delivers high-quality, production-ready code. His understanding of AI systems is impressive.',
      author: 'Rahul S.',
      role: 'Senior Engineer at TechCorp',
    },
    {
      text: 'One of the best full-stack developers I\'ve worked with. His architecture decisions are always well-reasoned.',
      author: 'Neha K.',
      role: 'Product Manager at StartupX',
    },
    {
      text: 'Rohit brings both depth and breadth — rare combination. He can debate ML architecture and then ship a polished UI.',
      author: 'Mike T.',
      role: 'Engineering Lead at DataFlow',
    },
    {
      text: 'His ability to take ambiguous requirements and turn them into working products is remarkable.',
      author: 'Deepak V.',
      role: 'Founder at BuildLabs',
    },
    {
      text: 'Rohit\'s code reviews are thorough and constructive. He elevates everyone around him.',
      author: 'Sofia L.',
      role: 'Developer at OpenSource Co.',
    },
    {
      text: 'He has a rare product engineering mindset — always asking "does this solve the user\'s problem?" first.',
      author: 'Ankit R.',
      role: 'Design Lead at CreativeStudio',
    },
  ];

  return (
    <div className="relative overflow-hidden mt-12">
      <div className="flex items-center gap-3 mb-6">
        <LinkedinSvg className="w-4 h-4 text-[var(--color-primary)]" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          More LinkedIn Recommendations
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(90deg, var(--color-primary), transparent)' }}
        />
      </div>

      {/* Scrolling row */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="flex gap-4 animate-scroll">
          {[...snippets, ...snippets].map((snippet, i) => (
            <div
              key={i}
              className="shrink-0 w-[320px] md:w-[380px] p-5 rounded-xl"
              style={{
                background:
                  'color-mix(in srgb, var(--color-text-main) 2%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-text-main) 6%, transparent)',
              }}
            >
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 italic">
                "{snippet.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[10px] font-semibold text-[var(--color-primary)]">
                  {snippet.author.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-medium text-[var(--color-text-main)]">
                    {snippet.author}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-muted)] opacity-50 ml-2">
                    {snippet.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for the scroll animation */}
      <style>{`
        .animate-scroll {
          animation: scrollSnippets 45s linear infinite;
          width: fit-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
        @keyframes scrollSnippets {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function Testimonials() {
  const featured = TESTIMONIALS.find((t) => t.isFeatured);
  const rest = TESTIMONIALS.filter((t) => !t.isFeatured);

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]"
    >
      {/* Background subtle glow */}
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          title="What People Say"
          subtitle="Testimonials"
        />

        {/* Sub-header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm text-[var(--color-text-muted)] opacity-60 mb-12 max-w-xl font-mono"
        >
          Real feedback from people I've worked with — clients, managers, and peers.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-auto">
          {/* Featured testimonial spans 2 cols */}
          {featured && <FeaturedTestimonial t={featured} />}

          {/* Regular cards fill the remaining space */}
          {rest.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        {/* LinkedIn-style horizontal snippet scroller */}
        <LinkedInSnippetRow />
      </div>
    </section>
  );
}

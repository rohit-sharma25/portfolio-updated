import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Award, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

type CertCategory = 'All' | 'Hackathons' | 'Internships' | 'Courses & Certs';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: CertCategory;
  date: string;
  url: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Capture the Flags',
    issuer: 'IIT Jodhpur',
    category: 'Hackathons',
    date: 'Jan 2026',
    url: 'https://drive.google.com/file/d/1x6mK_fMqAB1gWt7Z8kgCSYIWoH-WKyth/view?usp=sharing'
  },
  {
    id: 'cert-2',
    title: 'RAG based agent',
    issuer: 'Microsoft',
    category: 'Courses & Certs',
    date: 'November 2025',
    url: 'https://drive.google.com/file/d/1nb-q6XeJjTVIq5d8BYy_t7GlnYyMskd8/view?usp=sharing'
  },
  {
    id: 'cert-3',
    title: 'Completion of C',
    issuer: 'Infosys',
    category: 'Courses & Certs',
    date: 'November 2025',
    url: 'https://drive.google.com/file/d/1cdhrJd0VSXqmWxyM5NU-ai2L5Tsw-uOY/view?usp=sharing'
  },
  {
    id: 'cert-4',
    title: 'Web Dev Internship',
    issuer: 'TechieHelp',
    category: 'Internships',
    date: 'August 2025',
    url: 'images/certificate-techi.jpg'
  },
  {
    id: 'cert-5',
    title: 'Sunhack Hackathon',
    issuer: 'Sandip University',
    category: 'Hackathons',
    date: 'August 2025',
    url: 'https://drive.google.com/file/d/1YLwceMXQ8n8NvhmY_YnJXo6S9o9Q7pad/view'
  },
  {
    id: 'cert-6',
    title: 'Completion of Front-End',
    issuer: 'JIET',
    category: 'Courses & Certs',
    date: 'June 2025',
    url: 'https://drive.google.com/file/d/1MkMq8n2t-dIXMKp2TDcKmeMa7s19cc7d/view?usp=sharing'
  },
  {
    id: 'cert-7',
    title: 'Generative AI',
    issuer: 'Google Clouds',
    category: 'Courses & Certs',
    date: 'June 2025',
    url: 'https://drive.google.com/file/d/1MkMq8n2t-dIXMKp2TDcKmeMa7s19cc7d/view?usp=sharing'
  },
  {
    id: 'cert-8',
    title: 'Cybersecurity Analyst Job',
    issuer: 'Forage',
    category: 'Internships',
    date: 'May 2025',
    url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_6qR2GjddxRkToWraJ_1743617831127_completion_certificate.pdf'
  },
  {
    id: 'cert-9',
    title: 'Accenture Development',
    issuer: 'Forage',
    category: 'Internships',
    date: 'April 2025',
    url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ovyvuqqNRQKBjNxbj/3xnZEj9kfpoQKW885_ovyvuqqNRQKBjNxbj_6qR2GjddxRkToWraJ_1743615956907_completion_certificate.pdf'
  }
];

const CATEGORIES: CertCategory[] = ['All', 'Hackathons', 'Internships', 'Courses & Certs'];

export function Certifications() {
  const [activeCategory, setActiveCategory] = useState<CertCategory>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredCerts = useMemo(() => {
    if (activeCategory === 'All') return CERTIFICATIONS;
    return CERTIFICATIONS.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="certifications" className="relative py-24 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading title="Learning Journey" subtitle="Certifications & Milestones" className="mb-0" />
          
          <div className="flex gap-2">
            <button 
              onClick={scrollLeft}
              className="p-3 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] transition-colors border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--color-text-main)]" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-3 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] transition-colors border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-[var(--color-text-main)]" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden"
              style={{
                background: activeCategory === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.03)',
                border: activeCategory === cat ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.05)',
                color: activeCategory === cat ? '#fff' : 'var(--color-text-muted)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Container (X-Axis) */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={cert.id}
                className="relative min-w-[300px] md:min-w-[360px] flex-shrink-0 snap-start group"
              >
                <div className="h-full p-6 rounded-2xl bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] transition-all duration-500 group-hover:border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] group-hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />
                  
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-background)] border border-[color-mix(in_srgb,var(--color-text-main)_15%,transparent)] flex items-center justify-center mb-6 group-hover:border-[var(--color-primary)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-500">
                      <Award className="w-6 h-6 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-500" />
                    </div>

                    <h3 className="text-xl font-semibold font-heading text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">{cert.issuer}</p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">
                      {cert.date}
                    </span>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] text-[var(--color-text-main)] rounded-lg text-sm font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> View
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCerts.length === 0 && (
            <div className="w-full py-12 text-center text-[var(--color-text-muted)] text-sm">
              No certifications found in this category.
            </div>
          )}
        </div>
      </div>
      {/* Add global hide-scrollbar style for this component specifically if not in global CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

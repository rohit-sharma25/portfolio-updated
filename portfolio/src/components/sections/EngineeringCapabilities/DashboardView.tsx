import { motion } from 'framer-motion';
import { Bot, Code2, PenTool, Server, ArrowUpRight, Activity, GitCommit, Star, Code } from 'lucide-react';
import { CAPABILITIES_DATA, CURRENT_FOCUS } from './data';
import type { CapabilityPillar } from './data';
import { useState, useEffect } from 'react';

const ICONS: Record<string, React.ReactNode> = {
  'ai-engineering': <Bot className="w-8 h-8 text-[#A855F7]" />,
  'full-stack': <Code2 className="w-8 h-8 text-[#3B82F6]" />,
  'product-design': <PenTool className="w-8 h-8 text-[#22D3EE]" />,
  'deployment-tools': <Server className="w-8 h-8 text-[#EC4899]" />
};

interface DashboardViewProps {
  onSelectCapability: (cap: CapabilityPillar) => void;
}

interface GithubStats {
  topLanguage: string;
  topRepo: { name: string; url: string; stars: number } | null;
  latestCommit: string | null;
}

export function DashboardView({ onSelectCapability }: DashboardViewProps) {
  const [githubStats, setGithubStats] = useState<GithubStats>({ topLanguage: 'Loading...', topRepo: null, latestCommit: 'Fetching...' });

  useEffect(() => {
    // Fetch live GitHub Data
    const fetchGitHubData = async () => {
      try {
        const username = 'rohit-sharma25'; // Configured username
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        if (!reposRes.ok) return;
        const repos = await reposRes.json();
        
        // Find top language
        const languages = repos.map((r: any) => r.language).filter(Boolean);
        const langCounts = languages.reduce((acc: any, lang: string) => {
          acc[lang] = (acc[lang] || 0) + 1;
          return acc;
        }, {});
        let topLang = 'TypeScript'; // Default fallback
        let max = 0;
        for (const lang in langCounts) {
          if (langCounts[lang] > max) {
            max = langCounts[lang];
            topLang = lang;
          }
        }

        // Find top repo (most stars from recent repos)
        const sortedByStars = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
        const topRepo = sortedByStars.length > 0 ? {
          name: sortedByStars[0].name,
          url: sortedByStars[0].html_url,
          stars: sortedByStars[0].stargazers_count
        } : null;

        // Fetch latest event for commit
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=5`);
        const events = await eventsRes.json();
        const pushEvent = events.find((e: any) => e.type === 'PushEvent');
        let latestCommitMsg = null;
        if (pushEvent && pushEvent.payload.commits.length > 0) {
          latestCommitMsg = pushEvent.payload.commits[0].message;
        }

        setGithubStats({
          topLanguage: topLang,
          topRepo,
          latestCommit: latestCommitMsg || 'No recent commits'
        });

      } catch (err) {
        console.error("Failed to fetch github stats", err);
        setGithubStats({ topLanguage: 'TypeScript', topRepo: null, latestCommit: 'Failed to fetch' });
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      
      {/* Pillars Grid - 8 Columns */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAPABILITIES_DATA.map((cap, index) => (
          <motion.div
            key={cap.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onSelectCapability(cap)}
            className="group relative cursor-pointer h-full"
          >
            <div className="h-full p-8 rounded-3xl bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] transition-all duration-500 overflow-hidden flex flex-col justify-between group-hover:-translate-y-1">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none" />
              
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-background)] border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500 group-hover:border-[var(--color-primary)]">
                  {ICONS[cap.id]}
                </div>
                <h3 className="text-2xl font-bold font-heading text-[var(--color-text-main)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                  {cap.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">
                  {cap.technologies.length} Technologies
                </span>
                <span className="flex items-center text-sm font-medium text-[var(--color-primary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Explore <ArrowUpRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Sidebar - 4 Columns */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* Current Focus Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 rounded-3xl bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold font-heading text-[var(--color-text-main)]">Current Focus</h3>
          </div>
          
          <ul className="space-y-6">
            <li>
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold block mb-1">Building</span>
              <span className="text-[var(--color-text-main)] font-medium">{CURRENT_FOCUS.building}</span>
            </li>
            <li>
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold block mb-1">Learning</span>
              <span className="text-[var(--color-text-main)] font-medium">{CURRENT_FOCUS.learning}</span>
            </li>
            <li>
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold block mb-1">Latest Project</span>
              <span className="text-[var(--color-text-main)] font-medium">{CURRENT_FOCUS.latest}</span>
            </li>
            <li>
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold block mb-1">Experience</span>
              <span className="text-[var(--color-text-main)] font-medium">{CURRENT_FOCUS.experience}</span>
            </li>
          </ul>
        </motion.div>

        {/* Live GitHub Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-8 rounded-3xl bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] flex-1"
        >
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 text-[var(--color-text-main)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <h3 className="text-lg font-bold font-heading text-[var(--color-text-main)]">Live GitHub</h3>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)]">
              <Code className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase block">Top Language</span>
                <span className="text-sm text-[var(--color-text-main)] font-medium truncate">{githubStats.topLanguage}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)]">
              <Star className="w-4 h-4 text-[#EAB308] shrink-0" />
              <div className="overflow-hidden w-full">
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase block">Pinned / Top Repo</span>
                {githubStats.topRepo ? (
                  <a href={githubStats.topRepo.url} target="_blank" rel="noreferrer" className="text-sm text-[var(--color-text-main)] font-medium truncate hover:text-[var(--color-primary)] hover:underline block w-full">
                    {githubStats.topRepo.name}
                  </a>
                ) : (
                  <span className="text-sm text-[var(--color-text-muted)]">Fetching...</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)]">
              <GitCommit className="w-4 h-4 text-[#22C55E] shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase block">Latest Commit</span>
                <span className="text-sm text-[var(--color-text-main)] font-medium truncate block w-full">
                  {githubStats.latestCommit}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

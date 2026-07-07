import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import 'react-github-calendar/tooltips.css';
import { SectionHeading } from '../ui/SectionHeading';
import { Star, GitFork, Users, Code2, ExternalLink, GitCommit } from 'lucide-react';

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
}

interface Repo {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface LanguageData {
  name: string;
  percentage: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Java: '#ED8B00',
  Go: '#00ADD8',
  Rust: '#DEA584',
  'C++': '#00599C',
  C: '#A8B9CC',
  Ruby: '#CC342D',
  Shell: '#89E051',
  PHP: '#777BB4',
  Swift: '#F05138',
  Kotlin: '#7F52FF',
  Dart: '#00B4AB',
  Scala: '#DC322F',
  Lua: '#000080',
  Vue: '#4FC08D',
  Svelte: '#FF3E00',
};

const GITHUB_USERNAME = 'rohit-sharma25';

export function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchGitHubData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('Failed to fetch');

        const userData: GitHubUser = await userRes.json();
        const reposData: Repo[] = await reposRes.json();

        if (!mounted) return;

        setUser(userData);

        const stars = reposData.reduce((sum, r) => sum + r.stargazers_count, 0);
        const forks = reposData.reduce((sum, r) => sum + r.forks_count, 0);
        setTotalStars(stars);
        setTotalForks(forks);

        const langMap: Record<string, number> = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });

        const total = Object.values(langMap).reduce((a, b) => a + b, 0);
        const langData: LanguageData[] = Object.entries(langMap)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / total) * 100),
            color: LANGUAGE_COLORS[name] || '#666',
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 6);

        setLanguages(langData);
      } catch {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchGitHubData();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <section className="relative py-16 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeading title="GitHub Presence" subtitle="Open Source" />
          <div className="mt-8 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !user) {
    return (
      <section className="relative py-16 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
        <div className="container max-w-7xl mx-auto px-6">
          <SectionHeading title="GitHub Presence" subtitle="Open Source" />
          <div className="mt-8 text-center text-[var(--color-text-muted)] text-sm">
            Unable to load GitHub data at this time.
          </div>
        </div>
      </section>
    );
  }

  const stats = [
    { label: 'Repos', value: user.public_repos },
    { label: 'Stars', value: totalStars },
    { label: 'Forks', value: totalForks },
    { label: 'Followers', value: user.followers },
  ];

  const compactLanguages = languages.slice(0, 5);

  return (
    <section className="relative py-20 border-t border-[rgba(255,255,255,0.05)]">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeading title="GitHub Presence" subtitle="Open Source" className="mb-8" />

        {/* Single compact bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] backdrop-blur-xl overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
              
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative shrink-0"
                >
                  <img
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] object-cover group-hover:border-[var(--color-primary)] transition-colors"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-primary)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-2 h-2 text-white" />
                  </div>
                </a>
                <div>
                  <h3 className="text-base font-semibold font-heading text-[var(--color-text-main)]">
                    {user.name || user.login}
                  </h3>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono opacity-60">
                    @{user.login}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-12 bg-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)]" />

              {/* Stats row */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {i === 0 && <Code2 className="w-3.5 h-3.5 text-[var(--color-primary)] opacity-70" />}
                      {i === 1 && <Star className="w-3.5 h-3.5 text-[var(--color-primary)] opacity-70" />}
                      {i === 2 && <GitFork className="w-3.5 h-3.5 text-[var(--color-primary)] opacity-70" />}
                      {i === 3 && <Users className="w-3.5 h-3.5 text-[var(--color-primary)] opacity-70" />}
                    </div>
                    <span className="text-sm font-semibold font-heading text-[var(--color-text-main)] tabular-nums">
                      {stat.value}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] font-mono opacity-60">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-12 bg-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)]" />

              {/* Language bars — compact */}
              {compactLanguages.length > 0 && (
                <div className="flex-1 w-full lg:w-auto min-w-0">
                  {/* Mini bar stack */}
                  <div className="flex h-2 rounded-full overflow-hidden bg-[color-mix(in_srgb,var(--color-text-main)_4%,transparent)]">
                    {compactLanguages.map((lang, i) => (
                      <motion.div
                        key={lang.name}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                        style={{ backgroundColor: lang.color }}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>
                  {/* Language labels row */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    {compactLanguages.map((lang) => (
                      <span
                        key={lang.name}
                        className="flex items-center gap-1 text-[10px] font-mono text-[var(--color-text-muted)] opacity-70"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-sm shrink-0"
                          style={{ backgroundColor: lang.color }}
                        />
                        {lang.name}
                        <span className="opacity-50">{lang.percentage}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 rounded-2xl border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] backdrop-blur-xl overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <GitCommit className="w-5 h-5 text-[var(--color-primary)]" />
              <h3 className="text-base font-semibold font-heading text-[var(--color-text-main)]">
                Yearly Contributions
              </h3>
            </div>
            <div className="flex justify-center">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                showTotalCount={false}
                showMonthLabels={true}
                colorScheme="dark"
                theme={{
                  dark: ['#1a1a2e', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
                labels={{
                  totalCount: '{{count}} contributions in the last year',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

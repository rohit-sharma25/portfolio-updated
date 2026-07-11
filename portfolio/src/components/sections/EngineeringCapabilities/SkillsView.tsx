import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    title: '💻 Programming Languages',
    skills: [
      { name: 'HTML5', icon: '/skills/html.webp' },
      { name: 'CSS3', icon: '/skills/css.webp' },
      { name: 'JavaScript', icon: '/skills/js.webp' },
      { name: 'Python', icon: '/skills/python_icon_1769839913384.png' },
      { name: 'C', icon: '/skills/C.webp' },
    ]
  },
  {
    title: '🎨 Web Development & Design',
    skills: [
      { name: 'Responsive Design', icon: '/skills/responsive.png' },
      { name: 'Portfolio Websites', icon: '/skills/portfolio.png' },
      { name: 'UI & UX', icon: '/skills/UIUX.png' },
      { name: 'Web Apps', icon: '/skills/webapps.png' },
    ]
  },
  {
    title: '🛠️ Tools & Platforms',
    skills: [
      { name: 'Git', icon: '/skills/git.png' },
      { name: 'GitHub', icon: '/skills/github.png' },
      { name: 'VS Code', icon: '/skills/vscode.png' },
      { name: 'Figma', icon: '/skills/figma.png' },
      { name: 'Replit', icon: '/skills/replit.png' },
    ]
  },
  {
    title: '🚀 Deployment Tools',
    skills: [
      { name: 'Vercel', icon: '/skills/vercel.png' },
      { name: 'Render', icon: '/skills/render.webp' },
      { name: 'Netlify', icon: '/skills/netlify.png' },
      { name: 'Streamlit', icon: '/skills/streamlit.png' },
    ]
  }
];

export function SkillsView() {
  return (
    <div className="w-full py-12">
      <div className="max-w-5xl mx-auto space-y-16">
        {SKILL_CATEGORIES.map((category, catIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-[var(--color-text-main)] mb-6 font-heading">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-primary)_5%,transparent)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-all duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors text-center">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

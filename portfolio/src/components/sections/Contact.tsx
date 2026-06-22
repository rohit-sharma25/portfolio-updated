import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { Mail, ArrowUpRight, Code2, Briefcase, Camera, Download } from 'lucide-react';

export function Contact({ resumeUrl }: { resumeUrl: string }) {
  const socials = [
    { name: 'GitHub', icon: Code2, href: 'https://github.com/rohit-sharma25' },
    { name: 'LinkedIn', icon: Briefcase, href: 'https://www.linkedin.com/in/rohit-sharma225/' },
    { name: 'Instagram', icon: Camera, href: 'https://www.instagram.com/rohiittt.s/' },
  ];

  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40">
        <div className="w-[100vw] h-[50vw] bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.15)_0%,transparent_60%)] absolute bottom-0" />
      </div>

      <div className="container relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] backdrop-blur-md mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-[var(--color-text-main)]">Available for new opportunities</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold font-heading tracking-tight text-[var(--color-text-main)]">
            Let's build <br className="hidden md:block"/> something meaningful.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-2xl mx-auto">
            {['Freelance Opportunities', 'Startup Collaborations', 'AI Projects', 'Software Development', 'Innovative Product Ideas'].map((item, i) => (
              <span key={i} className="px-4 py-2 rounded-lg bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] text-sm text-[var(--color-text-muted)]">
                {item}
              </span>
            ))}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              onClick={() => window.location.href = 'mailto:rohit.sharma.rnks@gmail.com'}
              className="bg-[var(--color-text-main)] text-[var(--color-background)] hover:opacity-90 px-8 py-5 w-full sm:w-auto text-lg"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Mail className="w-5 h-5" />
                Email Me
              </span>
            </MagneticButton>

            <a
              href={resumeUrl}
              download
              className="flex items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-text-main)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_80%,transparent)] hover:text-[var(--color-text-main)] hover:border-[color-mix(in_srgb,var(--color-text-main)_25%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] transition-all duration-300 font-medium px-8 py-5 w-full sm:w-auto text-lg"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>

            <a
              href="mailto:rohit.sharma.rnks@gmail.com?subject=Schedule%20a%20call"
              className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors py-4 font-medium group"
            >
              Schedule a call <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Social Links */}
          <div className="pt-12">
            <p className="text-sm text-[var(--color-text-muted)] font-mono tracking-wider uppercase mb-6 opacity-60">
              Find me on
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)] transition-all duration-300 backdrop-blur-sm"
                >                    <div className="w-10 h-10 rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <social.icon className="w-5 h-5 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                      {social.name}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--color-text-muted)] opacity-50 mt-0.5">
                      {social.href.replace('https://www.', '').replace('https://', '')}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 pt-12 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] flex flex-col items-center justify-center gap-8 text-center"
        >
          <div className="space-y-2">
            <h4 className="text-xl font-heading font-semibold text-[var(--color-text-main)] tracking-wide">ROHIT SHARMA</h4>
            <p className="text-[var(--color-text-muted)] text-sm flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center">
              <span>AI Engineer</span>
              <span className="hidden md:inline">•</span>
              <span>Full Stack Architect</span>
              <span className="hidden md:inline">•</span>
              <span>Building Intelligent Digital Products</span>
            </p>
          </div>
          
          <div className="flex items-center justify-between w-full mt-8">
            <p className="text-[var(--color-text-muted)] text-sm font-body opacity-60">
              © {new Date().getFullYear()} Rohit Sharma.
            </p>
            <div className="flex items-center gap-6">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

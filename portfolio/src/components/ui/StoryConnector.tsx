import { motion } from 'framer-motion';

interface StoryConnectorProps {
  text: string;
}

export function StoryConnector({ text }: StoryConnectorProps) {
  return (
    <div className="relative w-full py-16 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative z-10 px-6 text-center"
      >
        <p className="text-lg md:text-xl font-body text-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)]">
          {text}
        </p>
      </motion.div>
    </div>
  );
}

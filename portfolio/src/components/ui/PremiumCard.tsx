import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility function to merge tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  withGlow?: boolean;
}

export function PremiumCard({
  children,
  className,
  withGlow = true, // Default to true for premium interactive feel
  ...props
}: PremiumCardProps) {
  return (
    <div
      className={cn(
        'relative group overflow-hidden rounded-[1.5rem] bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] backdrop-blur-xl transition-all duration-500 hover:bg-[color-mix(in_srgb,var(--color-text-main)_4%,transparent)]',
        withGlow ? 'hover:border-[var(--color-primary)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'hover:border-[color-mix(in_srgb,var(--color-text-main)_15%,transparent)]',
        className
      )}
      {...props}
    >
      <div className="relative z-10 w-full h-full p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}

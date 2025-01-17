import { Heart, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12 bg-black/40 backdrop-blur-sm border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4">
        <p className="flex items-center justify-center gap-2 py-6">
          Built with{' '}
            <Heart size={16} className="text-red-500 fill-current" />
          and{' '}
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-cyan-400 transition-colors"
          >
            <Zap size={16} className="text-cyan-400" />
          </a>{' '}
          by Tobias Sailer
        </p>
      </div>
    </footer>
  );
}
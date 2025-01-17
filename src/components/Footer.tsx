import { Heart, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <p className="flex items-center justify-center gap-2 py-6">
          Built with <Heart size={16} className="fill-current text-red-500" />
          and{" "}
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center transition-colors hover:text-cyan-400"
          >
            <Zap size={16} className="text-cyan-400" />
          </a>{" "}
          by Tobias Sailer
        </p>
      </div>
    </footer>
  );
}

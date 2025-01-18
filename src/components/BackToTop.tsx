import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop: React.FunctionComponent = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (!showBackToTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="group fixed bottom-8 right-8 z-50 flex transform items-center gap-2 rounded-full border border-white/10 bg-gray-900 px-6 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900"
      aria-label="Zurück nach oben"
    >
      <ArrowUp
        size={28}
        className="transform transition-transform group-hover:-translate-y-1"
      />
    </button>
  );
};

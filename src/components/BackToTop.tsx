import { ArrowUp } from "lucide-react";
export const BackToTop: React.FunctionComponent<{ scrollToTop: () => void }> = (
  props
) => {
  return (
    <button
      onClick={props.scrollToTop}
      className="fixed bottom-8 right-8 bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900 z-50 flex items-center gap-2 font-semibold group border border-white/10"
      aria-label="Back to top"
    >
      <ArrowUp
        size={28}
        className="transform transition-transform group-hover:-translate-y-1"
      />
    </button>
  );
};

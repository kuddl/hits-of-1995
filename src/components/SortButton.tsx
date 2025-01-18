import { MouseEventHandler } from "react";

export const SortButton = (props: {
  handleSortClick: MouseEventHandler<HTMLButtonElement> | undefined;
  sortByVotes: boolean;
}) => {
  return (
    <button
      onClick={props.handleSortClick}
      className="ml-4 flex gap-1 rounded-full bg-gradient-to-r from-emerald-700 to-cyan-800 px-4 py-2 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-emerald-700 hover:to-cyan-600"
    >
      <span className="block">Sortierung:</span>
      <span className="block">{props.sortByVotes ? "💖" : "📊"}</span>
    </button>
  );
};

import { Search } from "lucide-react";
import type { Song } from "../types";

// Search for songs by title, artist, or album
export const FilterByTextField = (props: {
  searchTerm: string | number | readonly string[] | undefined;
  setSearchTerm: (arg0: string) => void;
  filteredSongs: Song[];
}) => {
  return (
    <div className="mb-4 flex justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="... suchen"
          value={props.searchTerm}
          onChange={(e) => props.setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
        {/* only render, when filtered */}
        {props.searchTerm && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm text-gray-400">
            {props.filteredSongs.length}{" "}
            {props.filteredSongs.length === 1 ? "Hit" : "Hits"} gefunden
          </span>
        )}
      </div>
    </div>
  );
};

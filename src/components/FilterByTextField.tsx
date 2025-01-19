import { Search } from "lucide-react";
import type { Song } from "../types";

const playlist = {
  youtube:
    "https://music.youtube.com/playlist?list=PLekD0PzqZ9kZd62W232qNdoGpg2fG_79_&si=1U6uKrjVABLucn9o",
  spotify:
    "https://open.spotify.com/playlist/57zV9M3U7iBRf81uIeQSYo?si=YqDs7XGuRVOGMJqojisdOA",
};

// Search for songs by title, artist, or album
export const FilterByTextField = (props: {
  searchTerm: string | number | readonly string[] | undefined;
  setSearchTerm: (arg0: string) => void;
  filteredSongs: Song[];
}) => {
  return (
    <div className="mb-8 flex flex-col justify-center gap-8 md:flex-row">
      {/* Filter inputs */}
      <div className="flex grow justify-center">
        <div className="relative w-full">
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
      {/* Playlist Buttons */}
      <div className="flex flex-row items-center justify-center gap-4">
        <a
          href={playlist.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded bg-[#FF0000] px-4 py-2 text-white transition hover:rotate-1 hover:scale-110 hover:bg-[#FF0000]/80"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zM9 9v6a1 1 0 0 0 1.514.857l5-3a1 1 0 0 0 0-1.714l-5-3A1 1 0 0 0 9 9"
            />
          </svg>
        </a>
        <a
          href={playlist.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded bg-[#1DB954] px-4 py-2 text-white transition hover:-rotate-1 hover:scale-110 hover:bg-[#1DB954]/80"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
              <path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527M9 15c1.5-1 4-1 5 .5M7 9c2-1 6-2 10 .5" />
            </g>
          </svg>
        </a>
      </div>
    </div>
  );
};

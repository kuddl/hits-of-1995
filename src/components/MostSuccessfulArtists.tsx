import { ChevronDown } from "lucide-react";
import type { Song } from "../types";
import { useState } from "react";

interface Artist {
  artist: string;
  count: number;
}

interface MostSuccessfulArtistsProps {
  songs: Song[];
  selectedArtist: string | null;
  onArtistClick: (artist: string) => void;
}

const SUCCESS_LIMIT_COUNT = 2;
export const MostSuccessfulArtists = ({
  songs,
  selectedArtist,
  onArtistClick,
}: MostSuccessfulArtistsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Calculate the most successful artists
  const artistSongCount: Record<string, number> = {};
  songs.forEach((song) => {
    artistSongCount[song.artist] = (artistSongCount[song.artist] || 0) + 1;
  });

  const artists: Artist[] = Object.entries(artistSongCount)
    .filter(([, count]) => count >= SUCCESS_LIMIT_COUNT)
    .map(([artist, count]) => ({ artist, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="grow rounded-lg border border-white/10 bg-gray-900/40 p-6 backdrop-blur-sm">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="font-bold text-cyan-50 sm:text-2xl">
          Künstler mit mehreren Hits{" "}
          {!!selectedArtist && !isExpanded ? (
            <span className="mt-4 text-sm text-cyan-200/60">
              (Filter aktiv)
            </span>
          ) : null}
        </h2>
        <ChevronDown
          className={`h-6 w-6 text-cyan-50 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`transition-all duration-200 ease-in-out ${
          isExpanded
            ? "mt-4 max-h-[2000px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {artists.map(({ artist, count }) => (
            <div
              onClick={() => onArtistClick(artist)}
              key={artist}
              className={`flex cursor-pointer items-center justify-between rounded-md border p-1 transition-colors ${
                artist === selectedArtist
                  ? "border-cyan-400/50 bg-white/20 shadow-lg shadow-cyan-500/20"
                  : "border-white/5 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div
                className={`font-medium ${
                  artist === selectedArtist
                    ? "text-cyan-200"
                    : "text-cyan-200/70"
                }`}
              >
                <span className="block">{artist}</span>
              </div>
              <span className="flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-1 text-sm font-bold text-white">
                {count} Hits
              </span>
            </div>
          ))}
        </div>
        <span className="mt-4 block text-sm text-cyan-200/60">
          (Klicken zum Filtern und Aufheben)
        </span>
      </div>
    </div>
  );
};

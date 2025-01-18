import type { Song } from "../types";

interface Artist {
  artist: string;
  count: number;
}

interface MostSuccessfulArtistsProps {
  songs: Song[];
  selectedArtist: string | null;
  onArtistClick: (artist: string) => void;
}

export const MostSuccessfulArtists = ({
  songs,
  selectedArtist,
  onArtistClick,
}: MostSuccessfulArtistsProps) => {
  // Calculate the most successful artists
  const artistSongCount: Record<string, number> = {};
  songs.forEach((song) => {
    artistSongCount[song.artist] = (artistSongCount[song.artist] || 0) + 1;
  });

  const artists: Artist[] = Object.entries(artistSongCount)
    .filter(([, count]) => count >= 2)
    .map(([artist, count]) => ({ artist, count }));

  return (
    <div className="mb-12 rounded-lg border border-white/10 bg-gray-900/40 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-2xl font-bold text-cyan-50">
        Künstler mit mehreren Hits
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {artists.map(({ artist, count }) => (
          <div
            onClick={() => onArtistClick(artist)}
            key={artist}
            className={`flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors ${
              artist === selectedArtist
                ? "border-cyan-400/50 bg-white/20 shadow-lg shadow-cyan-500/20"
                : "border-white/5 bg-white/5 hover:bg-white/10"
            }`}
          >
            <div
              className={`font-medium ${
                artist === selectedArtist ? "text-cyan-200" : "text-cyan-200/70"
              }`}
            >
              <span className="block">{artist}</span>
              {artist === selectedArtist && (
                <span className="block text-sm text-cyan-200/60">
                  (Klicken zum Aufheben)
                </span>
              )}
            </div>
            <span className="flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-1 text-sm font-bold text-white">
              {count} Hits
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

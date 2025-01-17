import { Music, Radio, Youtube } from "lucide-react";

interface Song {
  rank: string;
  artist: string;
  title: string;
  image: string;
}

interface SongCardProps {
  song: Song;
  votes: number;
  onVote: (rank: string) => void;
}

export function SongCard({ song, votes, onVote }: SongCardProps) {
  const getMusicLinks = (song: Song) => {
    const searchQuery = encodeURIComponent(`${song.artist} ${song.title}`);
    return {
      youtube: `https://music.youtube.com/search?q=${searchQuery}`,
      apple: `https://music.apple.com/search?term=${searchQuery}`,
      spotify: `https://open.spotify.com/search/${searchQuery}`,
    };
  };

  const links = getMusicLinks(song);

  return (
    <div className="group relative w-full max-w-[20rem] overflow-hidden rounded-lg border border-white/10 bg-gray-900/40 backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:transform">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={song.image}
          alt={`${song.title} by ${song.artist}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <button
          onClick={() => onVote(song.rank)}
          className="absolute right-2 top-2 flex transform cursor-pointer items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-blue-600"
          title="Click to vote!"
        >
          <span>♥</span>
          <span>{votes}</span>
        </button>
      </div>
      <div className="relative p-4">
        {/* Background Rank Number */}
        <div className="pointer-events-none absolute -bottom-8 -right-4 z-0 select-none text-[140px] font-black leading-none text-white/[0.1]">
          {song.rank}
        </div>

        <div className="relative z-10 mb-3 flex items-start justify-between">
          <div className="pr-3">
            <h3 className="mb-1 break-words text-lg font-bold text-cyan-50">
              {song.title}
            </h3>
            <p className="break-words text-cyan-200/70">{song.artist}</p>
          </div>
          <span className="shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-1 text-sm font-bold text-white">
            #{song.rank}
          </span>
        </div>
        <div className="relative z-10 flex justify-center gap-4 border-t border-white/5 pt-2">
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors hover:text-red-400"
            title="Listen on YouTube Music"
          >
            <Youtube size={20} />
          </a>
          <a
            href={links.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors hover:text-blue-400"
            title="Listen on Apple Music"
          >
            <Music size={20} />
          </a>
          <a
            href={links.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 transition-colors hover:text-green-400"
            title="Listen on Spotify"
          >
            <Radio size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

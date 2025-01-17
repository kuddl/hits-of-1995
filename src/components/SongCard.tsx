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
    <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 border border-white/10 w-full max-w-[20rem] relative group">
      <div className="aspect-square overflow-hidden relative">
        <img
          src={song.image}
          alt={`${song.title} by ${song.artist}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => onVote(song.rank)}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg transform transition-all duration-200 hover:scale-110 cursor-pointer flex items-center gap-1"
          title="Click to vote!"
        >
          <span>♥</span>
          <span>{votes}</span>
        </button>
      </div>
      <div className="p-4 relative">
        {/* Background Rank Number */}
        <div className="absolute -right-4 -bottom-8 text-[140px] font-black text-white/[0.1] select-none pointer-events-none leading-none z-0">
          {song.rank}
        </div>

        <div className="flex items-start justify-between mb-3 relative z-10">
          <div className="pr-3">
            <h3 className="font-bold text-lg mb-1 break-words text-cyan-50">
              {song.title}
            </h3>
            <p className="text-cyan-200/70 break-words">{song.artist}</p>
          </div>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-sm font-bold shrink-0">
            #{song.rank}
          </span>
        </div>
        <div className="flex justify-center gap-4 pt-2 border-t border-white/5 relative z-10">
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-red-400 transition-colors"
            title="Listen on YouTube Music"
          >
            <Youtube size={20} />
          </a>
          <a
            href={links.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-blue-400 transition-colors"
            title="Listen on Apple Music"
          >
            <Music size={20} />
          </a>
          <a
            href={links.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-green-400 transition-colors"
            title="Listen on Spotify"
          >
            <Radio size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

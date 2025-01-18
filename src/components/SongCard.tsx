import { Heart, Music, Radio, Youtube } from "lucide-react";
import { SVGProps } from "react";

const ArcticonsMusicbrainz = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <circle
        cx="31.966"
        cy="12.004"
        r="1.413"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <circle
        cx="37.952"
        cy="16.16"
        r="1.413"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <circle
        cx="38.117"
        cy="23.342"
        r="1.413"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <circle
        cx="38.117"
        cy="31.325"
        r="1.413"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <circle
        cx="33.123"
        cy="35.749"
        r="1.413"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <circle
        cx="30.054"
        cy="29.795"
        r="1.413"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <circle
        cx="31.052"
        cy="18.987"
        r="1.413"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></circle>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M30.221 17.844A7.14 7.14 0 0 0 26.5 14.66m1.147.496a8 8 0 0 0 3.605-1.933m6.118 4.225a11.7 11.7 0 0 0 .06 4.66m-.177 8.105s-2.834-3.453-3.458-3.952a6.2 6.2 0 0 0-3.741-1.164c-1.982.026-2.673-.873-3.553-1.561"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M31.966 25.366s2.782-2.074 4.737-2.024m-4.851 13.015c-3.215 1.827-3.073-.56-5.352-.313m3.138-4.904s-1.437 3.672-3.138 4.904"
      ></path>
      <ellipse
        cx="11.154"
        cy="32.475"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        rx="3.055"
        ry="2.078"
        transform="rotate(-23.434 11.154 32.475)"
      ></ellipse>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.07 31.751V12.876l7.43-4.612m-7.43 16.147l7.43-4.612m-7.43-.531l7.43-4.612m5-11.173l16.519 9.537v21.96L26.5 44.517z"
      ></path>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.5 44.518L4.981 34.98V13.02L21.5 3.482z"
      ></path>
    </svg>
  );
};

interface Song {
  rank: string;
  artist: string;
  title: string;
  image: string;
  album: string;
}

interface SongCardProps {
  song: Song;
  votes: number;
  onVote: (rank: string) => void;
}

export const SongCard = ({ song, votes, onVote }: SongCardProps) => {
  const getMusicLinks = (song: Song) => {
    const searchQuery = encodeURIComponent(`${song.artist} ${song.title}`);
    return {
      youtube: `https://music.youtube.com/search?q=${searchQuery}`,
      apple: `https://music.apple.com/search?term=${searchQuery}`,
      spotify: `https://open.spotify.com/search/${searchQuery}`,
      musicBrainz: `https://musicbrainz.org/search?query=${searchQuery}`,
    };
  };

  const links = getMusicLinks(song);

  return (
    <div className="group relative flex w-full max-w-[20rem] flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-gray-900/40 backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:transform">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={song.image}
          alt={`${song.title} by ${song.artist}`}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() => onVote(song.rank)}
          className="absolute right-2 top-2 flex transform cursor-pointer items-center gap-1 rounded-full bg-pink-700 px-3 py-1 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-pink-500"
          title="Click to vote!"
        >
          <span>
            <Heart />
          </span>
          <span>{votes}</span>
        </button>
      </div>
      <div className="relative z-10 mb-3 flex flex-grow items-start justify-between p-2">
        <div className="pr-3">
          <h3 className="mb-1 break-words text-lg font-bold text-cyan-50">
            {song.title}
          </h3>
          <p className="break-words text-cyan-200/70">{song.artist}</p>
          <p className="break-words text-xs text-purple-200/50">{song.album}</p>
        </div>
        <span className="shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-2 py-1 text-sm font-bold text-white">
          #{song.rank}
        </span>
      </div>
      <div className="relative p-4">
        {/* Background Rank Number */}
        <div className="pointer-events-none absolute -bottom-8 -right-4 z-0 select-none text-[140px] font-black leading-none text-white/[0.1]">
          {song.rank}
        </div>

        <div className="relative z-10 flex flex-col justify-center gap-4 border-t border-white/5 pt-2">
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 transition-colors hover:text-red-400"
            title="Listen on YouTube Music"
          >
            <Youtube size={20} />
            Youtube Music
          </a>
          <a
            href={links.apple}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 transition-colors hover:text-red-400"
            title="Listen on Apple Music"
          >
            <Music size={20} />
            Apple Music
          </a>
          <a
            href={links.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 transition-colors hover:text-red-400"
            title="Listen on Spotify"
          >
            <Radio size={20} />
            Spotify
          </a>
          <a
            href={links.musicBrainz}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/50 transition-colors hover:text-red-400"
            title="Search on MusicBrainz"
          >
            <ArcticonsMusicbrainz width={20} height={20} />
            MusicBrainz
          </a>
        </div>
      </div>
    </div>
  );
};

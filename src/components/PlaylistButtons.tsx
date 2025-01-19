const playlist = {
  youtube:
    "https://music.youtube.com/playlist?list=PLekD0PzqZ9kZd62W232qNdoGpg2fG_79_&si=1U6uKrjVABLucn9o",
  spotify:
    "https://open.spotify.com/playlist/57zV9M3U7iBRf81uIeQSYo?si=YqDs7XGuRVOGMJqojisdOA",
};

export const PlaylistButtons = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <a
        title="YouTube Playlist"
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
        title="Spotify Playlist"
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
            <path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527M9 15c1.5-1 4-1 5 .5M7 9c2-1 6-2 10 .5" />
          </g>
        </svg>
      </a>
    </div>
  );
};

import { useEffect, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { FilterByTextField } from "./components/FilterByTextField";
import { Footer } from "./components/Footer";
import { MostSuccessfulArtists } from "./components/MostSuccessfulArtists";
import { MyHeader } from "./components/MyHeader";
import { SongCard } from "./components/SongCard";
import { SortButton } from "./components/SortButton";
import { loadVotes } from "./utils/loadVotes";
import songData from "./data/songs.json";
import { supabase } from "./lib/supabase";

const playlist = {
  youtube:
    "https://music.youtube.com/playlist?list=PLekD0PzqZ9kZd62W232qNdoGpg2fG_79_&si=1U6uKrjVABLucn9o",
  spotify:
    "https://open.spotify.com/playlist/57zV9M3U7iBRf81uIeQSYo?si=YqDs7XGuRVOGMJqojisdOA",
};

function App() {
  const { songs } = songData;
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [sortByVotes, setSortByVotes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    return songs.reduce(
      (acc, song) => {
        acc[song.rank] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );
  });

  // Filter songs by search term and selected artist
  const filteredSongs = selectedArtist
    ? songs.filter((song) => song.artist === selectedArtist)
    : songs.filter(
        (song) =>
          searchTerm.length < 2 ||
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.album.toLowerCase().includes(searchTerm.toLowerCase()),
      );

  // Sort songs by votes
  const sortedSongs = sortByVotes
    ? [...filteredSongs].sort((a, b) => votes[b.rank] - votes[a.rank])
    : filteredSongs;

  useEffect(() => {
    const channel = supabase
      .channel("votes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload: any) => {
          setVotes((prev) => ({
            ...prev,
            [payload.new.song_rank]: payload.new.count,
          }));
        },
      )
      .subscribe(async () => {
        const voteMap = await loadVotes();
        setVotes((prev) => ({
          ...prev,
          ...voteMap,
        }));
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleVote = async (rank: string) => {
    const { error } = await supabase.rpc("increment_vote", {
      song_rank_param: rank,
    });
    if (error) return console.error("Error handling vote:", error);
  };

  const handleArtistClick = (artist: string) => {
    setSelectedArtist(artist === selectedArtist ? null : artist);
  };

  const handleSortClick = () => {
    setSortByVotes((isSortingByVotes) => !isSortingByVotes);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-gray-950 via-blue-950 to-purple-950 text-white">
      <BackgroundPattern />

      <div className="container relative z-10 mx-auto max-w-6xl flex-grow px-4 py-8">
        <MyHeader />

        {/* Search Field */}
        <FilterByTextField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredSongs={filteredSongs}
        />

        {/* Most Successful Artists List */}
        <div className="flex grow flex-col items-center justify-between gap-4 md:flex-row">
          <MostSuccessfulArtists
            songs={songs}
            selectedArtist={selectedArtist}
            onArtistClick={handleArtistClick}
          />

          <SortButton
            sortByVotes={sortByVotes}
            handleSortClick={handleSortClick}
          ></SortButton>
        </div>

        {filteredSongs.length === 0 ? (
          <div className="mt-12 text-center text-2xl text-gray-400">
            Keine Hits gefunden.
          </div>
        ) : (
          <div className="grid-cols mt-12 grid justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {sortedSongs.map((song) => (
              <SongCard
                key={song.rank}
                song={song}
                votes={votes[song.rank]}
                onVote={handleVote}
              />
            ))}
          </div>
        )}
      </div>

      <BackToTop />

      <Footer />
    </div>
  );
}

export default App;

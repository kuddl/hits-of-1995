import { useEffect, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { Footer } from "./components/Footer";
import { MostSuccessfulArtists } from "./components/MostSuccessfulArtists";
import { MyHeader } from "./components/MyHeader";
import { SongCard } from "./components/SongCard";
import { SortButton } from "./components/SortButton";
import { loadVotes } from "./utils/loadVotes";
import songData from "./data/songs.json";
import { supabase } from "./lib/supabase";

function App() {
  const { songs } = songData;
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>(() =>
    Object.fromEntries(songs.map((song) => [song.rank, 0])),
  );
  const [sortByVotes, setSortByVotes] = useState(false);

  const filteredSongs = selectedArtist
    ? songs.filter((song) => song.artist === selectedArtist)
    : songs;

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
        s;
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

        {/* Most Successful Artists List */}
        <div className="flex grow flex-col items-center justify-between gap-4 sm:flex-row">
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

        <div className="grid-cols mt-12 grid justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedSongs.map((song) => (
            <SongCard
              key={song.rank}
              song={song}
              votes={votes[song.rank]}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>

      <BackToTop />

      <Footer />
    </div>
  );
}

export default App;

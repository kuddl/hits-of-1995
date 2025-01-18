import { useEffect, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { Footer } from "./components/Footer";
import { MostSuccessfulArtists } from "./components/MostSuccessfulArtists";
import { MyHeader } from "./components/MyHeader";
import { SongCard } from "./components/SongCard";
import { loadVotes } from "./utils/loadVotes";
import songData from "./data/songs.json";
import { supabase } from "./lib/supabase";

function App() {
  const { songs } = songData;
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>(() =>
    Object.fromEntries(songs.map((song) => [song.rank, 0])),
  );

  const filteredSongs = selectedArtist
    ? songs.filter((song) => song.artist === selectedArtist)
    : songs;

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
        console.log("Subscription received");
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

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-gray-950 via-blue-950 to-purple-950 text-white">
      <BackgroundPattern />

      <div className="container relative z-10 mx-auto max-w-6xl flex-grow px-4 py-8">
        <MyHeader />

        {/* Most Successful Artists List */}
        <MostSuccessfulArtists
          songs={songs}
          selectedArtist={selectedArtist}
          onArtistClick={handleArtistClick}
        />

        <div className="grid-cols grid justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSongs.map((song) => (
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

import { useEffect, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { Footer } from "./components/Footer";
import { ImagePreloader } from "./components/ImagePreloader";
import { MostSuccessfulArtists } from "./components/MostSuccessfulArtists";
import { MyHeader } from "./components/MyHeader";
import { SongCard } from "./components/SongCard";
import songData from "./data/songs.json";
import { supabase } from "./lib/supabase";

function App() {
  const [votes, setVotes] = useState<Record<string, number>>(() =>
    Object.fromEntries(songData.songs.map((song) => [song.rank, 0])),
  );
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  // Calculate the most successful artists
  const artistSongCount: Record<string, number> = {};
  songData.songs.forEach((song) => {
    artistSongCount[song.artist] = (artistSongCount[song.artist] || 0) + 1;
  });

  const successfulArtists = Object.entries(artistSongCount)
    .filter(([, count]) => count >= 2)
    .map(([artist, count]) => ({ artist, count }));

  const filteredSongs = selectedArtist
    ? songData.songs.filter((song) => song.artist === selectedArtist)
    : songData.songs;
  useEffect(() => {
    const loadVotes = async () => {
      const { data, error } = await supabase
        .from("votes")
        .select("song_rank, count");

      if (error) {
        console.error("Error loading votes:", error);
        return;
      }

      const voteMap = Object.fromEntries(
        data.map((vote) => [vote.song_rank, vote.count]),
      );

      setVotes((prev) => ({
        ...prev,
        ...voteMap,
      }));
    };

    loadVotes();

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
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleVote = async (rank: string) => {
    setVotes((prev) => ({
      ...prev,
      [rank]: (prev[rank] || 0) + 1,
    }));

    try {
      const { error } = await supabase.rpc("increment_vote", {
        song_rank_param: rank,
      });

      if (error) {
        console.error("Error incrementing vote:", error);
        setVotes((prev) => ({
          ...prev,
          [rank]: (prev[rank] || 1) - 1,
        }));
      }
    } catch (error) {
      console.error("Error handling vote:", error);
      setVotes((prev) => ({
        ...prev,
        [rank]: (prev[rank] || 1) - 1,
      }));
    }
  };

  if (!imagesLoaded) {
    return <ImagePreloader onLoad={() => setImagesLoaded(true)} />;
  }

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
          artists={successfulArtists}
          selectedArtist={selectedArtist}
          onArtistClick={handleArtistClick}
        />

        <div className=":grid-cols-4 grid justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

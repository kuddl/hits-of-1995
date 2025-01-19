import { useEffect, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { Footer } from "./components/Footer";
import { MostSuccessfulArtists } from "./components/MostSuccessfulArtists";
import { MyHeader } from "./components/MyHeader";
import { Search } from "lucide-react";
import { SongCard } from "./components/SongCard";
import { SortButton } from "./components/SortButton";
import { loadVotes } from "./utils/loadVotes";
import songData from "./data/songs.json";
import { supabase } from "./lib/supabase";

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

        {/* Search Field */}
        <div className="mb-4 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by song, artist, or album"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-800 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            {/* only render, when filtered */}
            {searchTerm && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm text-gray-400">
                {filteredSongs.length}{" "}
                {filteredSongs.length === 1 ? "Hit" : "Hits"} gefunden
              </span>
            )}
          </div>
        </div>

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
        )}
      </div>

      <BackToTop />

      <Footer />
    </div>
  );
}

export default App;

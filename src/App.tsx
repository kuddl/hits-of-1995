import { loadVotes, updateVote } from "./utils/vote_functions";
import { useEffect, useState } from "react";
import { BackToTop } from "./components/BackToTop";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { FilterByTextField } from "./components/FilterByTextField";
import { Footer } from "./components/Footer";
import { MostSuccessfulArtists } from "./components/MostSuccessfulArtists";
import { MyHeader } from "./components/MyHeader";
import { PlaylistButtons } from "./components/PlaylistButtons";
import { SongCard } from "./components/SongCard";
import { SortButton } from "./components/SortButton";
import songData from "./data/songs.json";

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
    const initVoteData = async () => {
      const votes = await loadVotes();
      setVotes((prev) => ({
        ...prev,
        ...votes,
      }));
    }
    initVoteData();
  }, []);

  const handleVote = async (rank: string) => {
    const index = songs.findIndex((song) => song.rank === rank);
    if (index === -1) return;
    const newVotes = { ...votes, [rank]: votes[rank] + 1 };
    setVotes(newVotes);
    await updateVote(rank);
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

        <div className="flex grow flex-wrap items-center gap-4 text-balance">
          {/* Search Field */}
          <FilterByTextField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredSongs={filteredSongs}
          />
          <div className="flex shrink justify-end gap-4">
            {/* Sort Buttons */}
            <SortButton
              sortByVotes={sortByVotes}
              handleSortClick={handleSortClick}
            ></SortButton>

            {/* Playlist Buttons */}
            <PlaylistButtons />
          </div>
        </div>

        <div className="mt-4">
          {/* Most Successful Artists List */}
          <MostSuccessfulArtists
            songs={songs}
            selectedArtist={selectedArtist}
            onArtistClick={handleArtistClick}
          />
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

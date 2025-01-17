import React, { useState, useEffect } from 'react';
import { ArrowUp, Music2, Disc3, Mic2, Radio } from 'lucide-react';
import songData from './data/songs.json';
import { SongCard } from './components/SongCard';
import { BackgroundPattern } from './components/BackgroundPattern';
import { ImagePreloader } from './components/ImagePreloader';
import { Footer } from './components/Footer';
import { supabase } from './lib/supabase';

function App() {
  const [votes, setVotes] = useState<Record<string, number>>(() => 
    Object.fromEntries(songData.songs.map(song => [song.rank, 0]))
  );
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [bounceIcon, setBounceIcon] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadVotes = async () => {
      const { data, error } = await supabase
        .from('votes')
        .select('song_rank, count');
      
      if (error) {
        console.error('Error loading votes:', error);
        return;
      }

      const voteMap = Object.fromEntries(
        data.map(vote => [vote.song_rank, vote.count])
      );
      
      setVotes(prev => ({
        ...prev,
        ...voteMap
      }));
    };

    loadVotes();

    const channel = supabase
      .channel('votes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes'
        },
        (payload: any) => {
          setVotes(prev => ({
            ...prev,
            [payload.new.song_rank]: payload.new.count
          }));
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounceIcon(prev => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVote = async (rank: string) => {
    setVotes(prev => ({
      ...prev,
      [rank]: (prev[rank] || 0) + 1
    }));

    try {
      const { error } = await supabase.rpc('increment_vote', {
        song_rank_param: rank
      });

      if (error) {
        console.error('Error incrementing vote:', error);
        setVotes(prev => ({
          ...prev,
          [rank]: (prev[rank] || 1) - 1
        }));
      }
    } catch (error) {
      console.error('Error handling vote:', error);
      setVotes(prev => ({
        ...prev,
        [rank]: (prev[rank] || 1) - 1
      }));
    }
  };

  const handleResetVotes = async () => {
    // Reset votes in local state
    const resetVotes = Object.fromEntries(
      songData.songs.map(song => [song.rank, 0])
    );
    setVotes(resetVotes);

    try {
      // Reset votes in database
      const { error } = await supabase
        .from('votes')
        .update({ count: 0 })
        .neq('count', 0);

      if (error) {
        console.error('Error resetting votes:', error);
        // Reload the actual vote counts if there was an error
        const { data } = await supabase
          .from('votes')
          .select('song_rank, count');
        
        if (data) {
          const voteMap = Object.fromEntries(
            data.map(vote => [vote.song_rank, vote.count])
          );
          setVotes(prev => ({ ...prev, ...voteMap }));
        }
      }
    } catch (error) {
      console.error('Error handling vote reset:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const headerIcons = [
    <Music2 key="music" size={36} className="text-pink-400" />,
    <Disc3 key="disc" size={36} className="text-blue-400" />,
    <Mic2 key="mic" size={36} className="text-purple-400" />,
    <Radio key="radio" size={36} className="text-cyan-400" />
  ];

  if (!imagesLoaded) {
    return <ImagePreloader onLoad={() => setImagesLoaded(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-purple-950 text-white flex flex-col relative">
      <BackgroundPattern />
      
      <div className="container mx-auto px-4 py-8 max-w-[1900px] flex-grow relative z-10">
        <header className="text-center mb-24 relative pt-16">
          <div className="absolute inset-x-0 top-4 flex justify-center gap-12 animate-float">
            {headerIcons.map((icon, index) => (
              <div
                key={index}
                className={`transform transition-transform duration-500 ${
                  bounceIcon === index ? 'scale-125 -translate-y-2' : 'scale-100'
                }`}
              >
                {icon}
              </div>
            ))}
          </div>
          <h1 className="text-[12rem] font-black pt-20 mb-8 leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 animate-gradient-x inline-block drop-shadow-[0_0_25px_rgba(219,39,119,0.2)]">
              Hits of 1995
            </span>
          </h1>
          <p className="text-3xl font-light tracking-wider text-white/90 flex items-center justify-center gap-6">
            <span className="animate-pulse">Time Machine</span>
            <span className="text-white/30">●</span>
            <span className="animate-pulse delay-75">Top 100</span>
            <span className="text-white/30">●</span>
            <span className="animate-pulse delay-150">Nostalgia</span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {songData.songs.map((song) => (
            <SongCard
              key={song.rank}
              song={song}
              votes={votes[song.rank]}
              onVote={handleVote}
            />
          ))}
        </div>
      </div>
      
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900 z-50 flex items-center gap-2 font-semibold group border border-white/10"
          aria-label="Back to top"
        >
          <ArrowUp size={28} className="transform transition-transform group-hover:-translate-y-1" />
        </button>
      )}
      
      <Footer onResetVotes={handleResetVotes} />
    </div>
  );
}

export default App;
import { Song } from "../types";

export const getMusicLinks = (song: Song) => {
    const searchQuery = encodeURIComponent(`${song.artist} ${song.title}`);
    return {
        youtube: `https://music.youtube.com/search?q=${searchQuery}`,
        apple: `https://music.apple.com/search?term=${searchQuery}`,
        spotify: `https://open.spotify.com/search/${searchQuery}`,
        musicBrainz: `https://musicbrainz.org/artist/${song.musicBrainzId}`,
    };
};
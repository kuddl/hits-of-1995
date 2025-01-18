const fs = require("fs");
const path = require("path");
const https = require("https");

const songsFilePath = path.join(__dirname, "..", "src", "data", "songs.json");
const outputFilePath = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "songs_with_ids.json",
);

async function fetchMusicBrainzId(artist) {
  const url = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artist)}&fmt=json`;
  const options = {
    headers: {
      "User-Agent": "OneOffTest/1.0 ( your-email@example.com )",
    },
  };
  return new Promise((resolve, reject) => {
    https
      .get(url, options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            const json = JSON.parse(data);
            const artists = json.artists;
            if (artists && artists.length > 0) {
              resolve(artists[0].id);
            } else {
              resolve(null);
            }
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function updateSongsWithMusicBrainzIds() {
  const songsData = JSON.parse(fs.readFileSync(songsFilePath, "utf8"));
  const updatedSongs = [];

  for (const song of songsData.songs) {
    console.log(`💡 ~ file: fetch_musicbrainz_ids.cjs:52 ~ song:`, song.rank);
    console.log(`💡 ~ file: fetch_musicbrainz_ids.cjs:52 ~ song:`, song.artist);

    const musicBrainzId = await fetchMusicBrainzId(song.artist);
    updatedSongs.push({ ...song, musicBrainzId });
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Throttle to 1 request per second
  }

  fs.writeFileSync(
    outputFilePath,
    JSON.stringify({ songs: updatedSongs }, null, 2),
  );
  console.log(`Updated songs written to ${outputFilePath}`);
}

updateSongsWithMusicBrainzIds();

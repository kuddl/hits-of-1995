
export async function loadVotes() {
  const response = await fetch('/.netlify/functions/load-votes');
  const data = await response.json();
  const myObj = Object.fromEntries(data.map((data: { song_rank: string; count: number; }) => [data.song_rank, data.count]));

  return myObj;

}

export async function updateVote(song_rank: string) {
  const response = await fetch('/.netlify/functions/set-vote', {
    method: "POST",
    body: JSON.stringify({ song_rank }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  await response.json();
}

import { supabase } from "../lib/supabase";

export const loadVotes = async () => {
  const { data, error } = await supabase
    .from("votes")
    .select("song_rank, count");
  if (error) return console.error("Error loading votes:", error);

  return Object.fromEntries(data.map((vote) => [vote.song_rank, vote.count]));
};

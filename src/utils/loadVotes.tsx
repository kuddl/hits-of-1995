import { supabase } from "../lib/supabase";

const tableName =
  process.env.NODE_ENV === "development" ? "votes_local" : "votes";

export const loadVotes = async () => {
  const { data, error } = await supabase
    .from(tableName)
    .select("song_rank, count");
  if (error) return console.error("Error loading votes:", error);

  return Object.fromEntries(data.map((vote) => [vote.song_rank, vote.count]));
};

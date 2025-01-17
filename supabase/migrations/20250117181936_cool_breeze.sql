/*
  # Add unique constraint to votes table

  1. Changes
    - Add unique constraint on song_rank column to enable upsert operations
    - This allows the increment_vote function to work properly with ON CONFLICT
*/

-- Add unique constraint to song_rank column
ALTER TABLE votes 
ADD CONSTRAINT votes_song_rank_key UNIQUE (song_rank);
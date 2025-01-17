/*
  # Create votes table and policies

  1. New Tables
    - `votes`
      - `id` (uuid, primary key)
      - `song_rank` (text, not null) - References the song rank
      - `count` (integer, not null) - Number of votes for the song
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `votes` table
    - Add policies for:
      - Anyone can read votes
      - Authenticated users can increment votes
*/

CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_rank text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read votes"
  ON votes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update votes"
  ON votes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to handle vote updates
CREATE OR REPLACE FUNCTION increment_vote(song_rank_param text)
RETURNS votes
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  vote_record votes;
BEGIN
  INSERT INTO votes (song_rank, count)
  VALUES (song_rank_param, 1)
  ON CONFLICT (song_rank) DO UPDATE
  SET count = votes.count + 1,
      updated_at = now()
  RETURNING *
  INTO vote_record;
  
  RETURN vote_record;
END;
$$;
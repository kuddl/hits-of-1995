export interface Database {
  public: {
    Tables: {
      votes: {
        Row: {
          id: string;
          song_rank: string;
          count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          song_rank: string;
          count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          song_rank?: string;
          count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      increment_vote: {
        Args: { song_rank_param: string };
        Returns: {
          id: string;
          song_rank: string;
          count: number;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}

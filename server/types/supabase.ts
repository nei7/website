export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          id: number;
          created_at: string;
          username: string;
          data: string;
          avatar: string;
          loved: number;
        };
        Insert: {
          id: number;
          created_at: string;
          username: string;
          data: string;
          avatar: string;
          loved: number;
        };
      };

      reactions: {
        Row: {
          thumbup_count: number;
          skull_count: number;
          heart_count: number;
          post_id: string;
        };
        Insert: {
          thumbup_count: number;
          skull_count: number;
          heart_count: number;
          post_id: string;
        };
        Update: {
          thumbup_count: number;
          skull_count: number;
          heart_count: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_reactions: { Args: { postid: string } };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

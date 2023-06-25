export interface Database {
  public: {
    Tables: {
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

export type ProfilesTable = {
  Row: {
    id: string;
    name: string | null;
    email: string | null;
    created_at: string;
    updated_at: string;
    count_itineraries: number;
    is_subscribe: boolean;
  };
  Insert: {
    id: string;
    name?: string | null;
    email?: string | null;
    created_at?: string;
    updated_at?: string;
    count_itineraries?: number;
    is_subscribe?: boolean;
  };
  Update: {
    id?: string;
    name?: string | null;
    email?: string | null;
    created_at?: string;
    updated_at?: string;
    count_itineraries?: number;
    is_subscribe?: boolean;
  };
  Relationships: [];
};

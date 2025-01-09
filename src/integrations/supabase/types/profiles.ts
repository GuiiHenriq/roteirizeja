export type ProfilesTable = {
  Row: {
    id: string
    name: string | null
    created_at: string
    updated_at: string
    count_itineraries: number
  }
  Insert: {
    id: string
    name?: string | null
    created_at?: string
    updated_at?: string
    count_itineraries?: number
  }
  Update: {
    id?: string
    name?: string | null
    created_at?: string
    updated_at?: string
    count_itineraries?: number
  }
  Relationships: []
}
export type ItinerariesTable = {
  Row: {
    id: string
    user_id: string
    destination: string
    departure_date: string
    return_date: string
    interests: string | null
    itinerary_data: Json | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    user_id: string
    destination: string
    departure_date: string
    return_date: string
    interests?: string | null
    itinerary_data?: Json | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    user_id?: string
    destination?: string
    departure_date?: string
    return_date?: string
    interests?: string | null
    itinerary_data?: Json | null
    created_at?: string
    updated_at?: string
  }
  Relationships: []
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
export interface ItineraryActivity {
  Name: string;
  Description: string;
  Cost: number;
}

export interface DayActivities {
  morning: ItineraryActivity;
  afternoon: ItineraryActivity;
  evening: ItineraryActivity;
}

export interface ItineraryDay {
  day: string;
  activities: DayActivities;
}

export interface GeneratedItinerary {
  destination: string;
  dates: {
    start: string;
    end: string;
  };
  itinerary: ItineraryDay[];
}

// Type guard to ensure the data is JSON serializable
export function isJsonSerializable(value: unknown): value is Json {
  try {
    JSON.parse(JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// JSON type from Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
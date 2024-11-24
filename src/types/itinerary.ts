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
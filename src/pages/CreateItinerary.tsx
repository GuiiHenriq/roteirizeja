import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface Activity {
  time: string;
  description: string;
}

interface DayPlan {
  day: number;
  activities: Activity[];
}

interface ItineraryData {
  days: DayPlan[];
}

const CreateItinerary = () => {
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [interests, setInterests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to create an itinerary");
      return;
    }
    
    if (!destination || !departureDate || !returnDate || !interests) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-itinerary', {
        body: {
          destination,
          departureDate: format(departureDate, 'yyyy-MM-dd'),
          returnDate: format(returnDate, 'yyyy-MM-dd'),
          interests
        }
      });

      if (error) throw error;

      const itineraryResponse = data as ItineraryData;
      setItineraryData(itineraryResponse);

      // Save to database with proper type casting
      const { error: saveError } = await supabase
        .from('itineraries')
        .insert({
          user_id: user.id,
          destination,
          departure_date: format(departureDate, 'yyyy-MM-dd'),
          return_date: format(returnDate, 'yyyy-MM-dd'),
          interests,
          itinerary_data: itineraryResponse as unknown as Json
        });

      if (saveError) throw saveError;
      toast.success("Itinerary created successfully!");
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || "Failed to generate itinerary");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Your Travel Itinerary</h1>
      
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="destination" className="block text-sm font-medium">
              Destination
            </label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Departure Date</label>
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Return Date</label>
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                className="rounded-md border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="interests" className="block text-sm font-medium">
              Interests & Preferences
            </label>
            <Textarea
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="Tell us about your interests (e.g., history, food, adventure)"
              className="w-full h-32"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Itinerary...
              </>
            ) : (
              'Generate Itinerary'
            )}
          </Button>
        </form>

        {itineraryData && (
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Your Itinerary</h2>
            {itineraryData.days.map((day) => (
              <Card key={day.day} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Day {day.day}</h3>
                <div className="space-y-4">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="font-medium text-primary w-24">{activity.time}</div>
                      <div className="flex-1">{activity.description}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateItinerary;
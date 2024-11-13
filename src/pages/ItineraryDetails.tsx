import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

// Temporary mock data
const mockItinerary = {
  id: 1,
  destination: "Paris",
  image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  departureDate: new Date("2024-06-15"),
  returnDate: new Date("2024-06-22"),
  days: [
    {
      day: 1,
      activities: [
        "Morning: Visit the Eiffel Tower",
        "Afternoon: Explore the Louvre Museum",
        "Evening: Seine River Cruise",
      ],
    },
    {
      day: 2,
      activities: [
        "Morning: Notre-Dame Cathedral",
        "Afternoon: Walk through Le Marais",
        "Evening: Dinner at a local bistro",
      ],
    },
  ],
};

const ItineraryDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-64 rounded-xl overflow-hidden mb-8">
          <img
            src={mockItinerary.image}
            alt={mockItinerary.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold flex items-center mb-2">
              <MapPin className="w-6 h-6 mr-2" />
              {mockItinerary.destination}
            </h1>
            <div className="flex items-center text-white/90">
              <Calendar className="w-5 h-5 mr-2" />
              <span>
                {format(mockItinerary.departureDate, "MMM d")} -{" "}
                {format(mockItinerary.returnDate, "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {mockItinerary.days.map((day) => (
            <Card key={day.day}>
              <CardHeader>
                <h3 className="text-xl font-semibold">Day {day.day}</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {day.activities.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
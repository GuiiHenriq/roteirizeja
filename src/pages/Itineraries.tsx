import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

// Temporary mock data
const mockItineraries = [
  {
    id: 1,
    destination: "Paris",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    departureDate: new Date("2024-06-15"),
    returnDate: new Date("2024-06-22"),
  },
  {
    id: 2,
    destination: "Tokyo",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    departureDate: new Date("2024-07-10"),
    returnDate: new Date("2024-07-20"),
  },
];

const Itineraries = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Itineraries</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockItineraries.map((itinerary) => (
          <Link
            key={itinerary.id}
            to={`/itineraries/${itinerary.id}`}
            className="hover-scale"
          >
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={itinerary.image}
                  alt={itinerary.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {itinerary.destination}
                  </h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {format(itinerary.departureDate, "MMM d")} -{" "}
                    {format(itinerary.returnDate, "MMM d, yyyy")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Itineraries;
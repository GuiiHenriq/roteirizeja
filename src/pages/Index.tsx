import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const popularDestinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 pt-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Wanderlust AI</h1>
          <p className="text-muted-foreground">Good morning, Traveler!</p>
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Where do you want to go?"
          className="input-field pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Popular Destinations</h2>
          <Link to="/explore" className="text-primary flex items-center">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularDestinations.map((destination) => (
            <div key={destination.id} className="relative overflow-hidden rounded-xl hover-scale">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white font-semibold">{destination.name}</h3>
                <p className="text-white/80 text-sm">{destination.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link
        to="/create-itinerary"
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 btn-primary flex items-center justify-center gap-2 shadow-lg"
      >
        <span>Create New Itinerary</span>
      </Link>
    </div>
  );
};

export default Index;
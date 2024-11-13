import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Itinerary Genius</h1>
        {user ? (
          <Button onClick={() => signOut()} variant="outline">
            Sign Out
          </Button>
        ) : (
          <Button onClick={() => navigate("/login")} variant="outline">
            Sign In
          </Button>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Create New Itinerary</h2>
          <p className="text-muted-foreground mb-4">
            Plan your next adventure with our AI-powered itinerary generator.
          </p>
          <Button onClick={() => navigate("/create-itinerary")} className="w-full">
            Get Started
          </Button>
        </div>

        <div className="p-6 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-semibold mb-4">My Itineraries</h2>
          <p className="text-muted-foreground mb-4">
            View and manage your saved travel plans.
          </p>
          <Button onClick={() => navigate("/itineraries")} variant="outline" className="w-full">
            View All
          </Button>
        </div>

        <div className="p-6 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Popular Destinations</h2>
          <p className="text-muted-foreground mb-4">
            Explore trending locations and travel inspiration.
          </p>
          <Button onClick={() => navigate("/destinations")} variant="outline" className="w-full">
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
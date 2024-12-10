import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/sonner";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateItinerary from "./pages/CreateItinerary";
import Itineraries from "./pages/Itineraries";
import ItineraryDetails from "./pages/ItineraryDetails";
import Profile from "./pages/Profile";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-itinerary" element={<CreateItinerary />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/itineraries/:id" element={<ItineraryDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
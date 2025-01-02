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
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";
import Teste from "./pages/Teste";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teste" element={<Teste />} />

            {/* Rotas protegidas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-itinerary"
              element={
                <PrivateRoute>
                  <CreateItinerary />
                </PrivateRoute>
              }
            />
            <Route
              path="/itineraries"
              element={
                <PrivateRoute>
                  <Itineraries />
                </PrivateRoute>
              }
            />
            <Route
              path="/itineraries/:id"
              element={
                <PrivateRoute>
                  <ItineraryDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;

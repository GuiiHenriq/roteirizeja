import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import HomeHeader from "@/components/home/HomeHeader";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/home/Footer";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen text-gray-900">
      <HomeHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
import { Header } from "@/components/teste/Header";
import { Hero } from "@/components/teste/Hero";
import { Features } from "@/components/teste/Features";
import { Destinations } from "@/components/teste/Destinations";
import { Newsletter } from "@/components/teste/Newsletter";
import { Footer } from "@/components/teste/Footer";

const Teste = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Destinations />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Teste;
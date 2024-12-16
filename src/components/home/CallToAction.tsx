import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-emerald-900">
          Pronto para Sua Próxima Aventura?
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-8">
          Deixe nossa IA cuidar de tudo.
        </h3>
        <p className="text-xl mb-10">Experimente grátis agora!</p>
        <button
          onClick={() => navigate("/register")}
          className="w-full md:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-lg shadow-lg mx-auto"
        >
          Teste Totalmente Gratuito <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Clock,
  Compass,
  Star,
  Plane,
  Check,
  ChevronRight,
  Smartphone,
  Globe,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Hero from "@/components/home/Hero";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const recursosRef = useRef<HTMLElement>(null);
  const comoFuncionaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar/ocultar botão de voltar ao topo
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleGetStarted = () => {
    navigate("/register");
  };

  // Animação para os ícones
  const iconAnimation = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } }
  };

  // Animação para os cards
  const cardAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: index * 0.1 }
    }),
    hover: { y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3 } }
  };

  // Animação para os botões
  const buttonAnimation = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2, yoyo: Infinity, repeatDelay: 0.5 } }
  };

  return (
    <div className="min-h-screen text-gray-900">
      <Hero />

      {/* Proposta de Valor */}
      <section 
        className="container mx-auto px-4 py-16" 
        id="recursos" 
        aria-labelledby="value-proposition"
        ref={recursosRef}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="value-proposition" className="text-4xl font-bold mb-4 text-emerald-900">
            Viajar Nunca Foi Tão Fácil e Divertido!
          </h2>
          <p className="text-xl text-gray-600">
            Com a inteligência artificial, planejamos o roteiro ideal para você,
            economizando tempo e maximizando sua experiência.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Clock className="text-emerald-600" size={48} aria-hidden="true" />,
              title: "Planejamento Instantâneo",
              description: "Roteiros prontos em segundos.",
            },
            {
              icon: <Globe className="text-emerald-600" size={48} aria-hidden="true" />,
              title: "Totalmente Personalizado",
              description: "Cada detalhe feito para você.",
            },
            {
              icon: <Compass className="text-emerald-600" size={48} aria-hidden="true" />,
              title: "Descubra o Novo",
              description: "Sugestões exclusivas e locais escondidos.",
            },
            {
              icon: <Smartphone className="text-emerald-600" size={48} aria-hidden="true" />,
              title: "Acesse em Qualquer Lugar",
              description: "Consulte ou edite seu roteiro a qualquer momento.",
            },
          ].map((feature, index) => (
            <motion.article
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group text-center cursor-pointer"
              variants={cardAnimation}
              initial="initial"
              animate="animate"
              whileHover="hover"
              custom={index}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <motion.div 
                className="mb-6 flex justify-center"
                variants={iconAnimation}
                animate={hoveredFeature === index ? "hover" : "initial"}
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-bold text-xl mb-4 text-emerald-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.article>
          ))}
        </div>
        <div className="text-center mt-12">
          <motion.button 
            className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition flex items-center mx-auto"
            aria-label="Começar a criar seu roteiro de viagem"
            variants={buttonAnimation}
            initial="initial"
            whileHover="hover"
            onClick={handleGetStarted}
          >
            Crie Seu Roteiro Agora
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <ArrowRight className="ml-2" />
            </motion.div>
          </motion.button>
        </div>
      </section>

      {/* Planos */}
      <section className="bg-gradient-to-br from-blue-50 to-emerald-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-emerald-900">
              Escolha o Plano Perfeito Para Você
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comece gratuitamente ou desbloqueie recursos premium com nosso plano Básico
            </p>
          </motion.div>
          
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-center text-blue-800">
                    Plano Básico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-muted-foreground mb-6">
                    Compra única para criar até 10 roteiros com recursos exclusivos
                  </p>
                  <ul className="space-y-3">
                    {[
                      "10 roteiros personalizados",
                      "Suporte prioritário",
                      "Exportação em PDF",
                      "Edição de atividades",
                      "Compartilhamento com amigos",
                    ].map((benefit, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, 0]
                          }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1 + index * 0.2,
                            repeat: Infinity,
                            repeatDelay: 5
                          }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        </motion.div>
                        <span className="text-sm">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4 pt-6">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-blue-700">
                      R$ 9,90
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      (pagamento único)
                    </span>
                  </div>
                  <motion.button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGetStarted}
                  >
                    Começar Agora
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <ArrowRight className="ml-2" />
                    </motion.div>
                  </motion.button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experiência Transformadora */}
      <section className="bg-gray-50 py-16" aria-labelledby="experience">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 id="experience" className="text-4xl font-bold mb-6 text-emerald-900">
              Deixe Sua Viagem Fluir com Perfeição
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Sabemos o quanto planejar uma viagem pode ser estressante e
              demorado. Com nosso app, você tem a tranquilidade de um roteiro
              perfeito na palma da sua mão, para aproveitar cada segundo do seu
              destino.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-2xl italic text-emerald-700 font-semibold flex items-center justify-center gap-2">
                <Sparkles className="text-yellow-500" />
                "Mais momentos incríveis, menos preocupações."
                <Sparkles className="text-yellow-500" />
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Como Funciona */}
      <section 
        className="bg-gradient-to-br from-emerald-50 to-indigo-100 py-16" 
        id="como-funciona" 
        aria-labelledby="how-it-works"
        ref={comoFuncionaRef}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 id="how-it-works" className="text-4xl font-bold mb-4 text-emerald-900">
              Seu Roteiro em 3 Passos Simples
            </h2>
            <p className="text-xl text-gray-600">
              Planeje sua viagem com facilidade e rapidez
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="text-emerald-600" size={48} aria-hidden="true" />,
                title: "Preencha os Dados da Viagem",
                description: "Escolha seu destino, datas e preferências.",
              },
              {
                icon: <Plane className="text-emerald-600" size={48} aria-hidden="true" />,
                title: "Receba Sugestões da IA",
                description: "Um roteiro completo em segundos.",
              },
              {
                icon: <Star className="text-emerald-600" size={48} aria-hidden="true" />,
                title: "Aproveite ao Máximo",
                description: "Viaje sem preocupações com um plano ideal.",
              },
            ].map((step, index) => (
              <motion.article
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-emerald-100 rounded-full opacity-50" />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-emerald-100 rounded-full opacity-50" />
                <motion.div 
                  className="mb-6 flex justify-center relative z-10"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatDelay: index
                  }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="font-bold text-xl mb-4 text-emerald-900 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-600 relative z-10">{step.description}</p>
                <div className="absolute top-4 left-4 bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center font-bold text-emerald-700">
                  {index + 1}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Última CTA */}
      <section className="text-emerald py-20" aria-labelledby="cta">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 id="cta" className="text-3xl md:text-5xl font-bold emerald-to-pink-gradient-text">
              Pronto para Sua Próxima Aventura?
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
              Deixe nossa IA cuidar de tudo.
            </h3>
            <p className="text-xl mb-10">Experimente grátis agora!</p>
            <div className="flex justify-center space-x-4">
              <motion.button 
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition flex items-center"
                aria-label="Começar teste gratuito"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
              >
                Teste Totalmente Gratuito 
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <ChevronRight className="ml-2" aria-hidden="true" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Roteirize Já.<br/>Todos os direitos reservados.</p>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <a href="/login" className="text-gray-400 hover:text-white transition">Fazer login</a>
            <a href="/register" className="text-gray-400 hover:text-white transition">Criar conta</a>
            <a href="/terms" className="text-gray-400 hover:text-white transition">Termos e Condições</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
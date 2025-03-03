import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conteúdo principal */}
      <main className="flex-grow bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-emerald-900">TERMOS DE USO E POLÍTICA DE PRIVACIDADE</h1>
          <span>Atualizado em: 03/03/2025</span>
          
          <div className="bg-white mt-8 p-8 rounded-xl shadow-md space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">1. Introdução</h2>
              <p className="text-gray-700">
                Este documento estabelece os Termos de Uso e a Política de Privacidade do site Roteirize Já. 
                Ao utilizar nosso serviço, você concorda com os termos aqui estabelecidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">2. Uso do Serviço</h2>
              <p className="text-gray-700 mb-3">
                2.1. Os roteiros gerados são exclusivamente para uso pessoal do usuário e não podem ser comercializados sob nenhuma circunstância.
              </p>
              <p className="text-gray-700">
                2.2. O usuário pode compartilhar os roteiros gerados livremente, inclusive utilizando a funcionalidade de exportação em PDF presente no plano pago.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">3. Planos, Pagamento e Acesso ao Serviço</h2>
              <p className="text-gray-700 mb-3">
                3.1. O site oferece um plano gratuito e um plano pago de R$ 9,90, que permite a geração de até 10 roteiros.
              </p>
              <p className="text-gray-700 mb-3">
                3.2. Quando o limite de 10 roteiros é atingido, o usuário precisará renovar sua assinatura para continuar utilizando o serviço.
              </p>
              <p className="text-gray-700 mb-3">
                3.3. O pagamento é processado exclusivamente via Mercado Pago, e não armazenamos ou processamos dados financeiros dos usuários.
              </p>
              <p className="text-gray-700">
                3.4. O acesso ao serviço será liberado em até 2 horas após a confirmação do pagamento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">4. Política de Cancelamento e Reembolso</h2>
              <p className="text-gray-700 mb-3">
                4.1. Devido à natureza digital do serviço, não oferecemos reembolsos após a confirmação do pagamento.
              </p>
              <p className="text-gray-700 mb-3">
                4.2. Caso o serviço não seja entregue corretamente por problemas técnicos, o usuário deverá entrar em contato conosco para que um novo roteiro seja gerado sem custos adicionais.
              </p>
              <p className="text-gray-700">
                4.3. Reembolsos serão considerados apenas em situações excepcionais, mediante análise da equipe de suporte.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">5. Privacidade e Segurança</h2>
              <p className="text-gray-700 mb-3">
                5.1. Os dados de cadastro dos usuários são armazenados e criptografados em nosso banco de dados.
              </p>
              <p className="text-gray-700 mb-3">
                5.2. Não compartilhamos dados pessoais com terceiros, exceto quando necessário para processar os pagamentos.
              </p>
              <p className="text-gray-700 mb-3">
                5.3. Os dados de viagem fornecidos pelo usuário (Data de Ida, Data de Volta, Destino, Orçamento e Interesses) são compartilhados com a inteligência artificial para a geração dos roteiros personalizados.
              </p>
              <p className="text-gray-700">
                5.4. Nosso site não utiliza cookies ou ferramentas de rastreamento de terceiros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">6. Limitação de Responsabilidade</h2>
              <p className="text-gray-700 mb-3">
                6.1. Nos responsabilizamos por problemas técnicos relacionados aos roteiros gerados, garantindo a regeneração de um novo roteiro caso ocorra algum erro no itinerário.
              </p>
              <p className="text-gray-700 mb-3">
                6.2. Não nos responsabilizamos por erros decorrentes de informações incorretas fornecidas pelo usuário, como destinos ou datas erradas.
              </p>
              <p className="text-gray-700">
                6.3. O serviço é oferecido "como está", sem garantias adicionais sobre a precisão ou viabilidade dos roteiros sugeridos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">7. Contato</h2>
              <p className="text-gray-700">
                Em caso de dúvidas ou problemas, entre em contato conosco pelo e-mail de suporte disponibilizado no site.
              </p>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-700 font-medium">
                Ao utilizar nosso serviço, você declara que leu e concorda com estes Termos de Uso e Política de Privacidade.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Roteirize Já.<br/>Todos os direitos reservados.</p>
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <a href="/terms" className="text-gray-400 hover:text-white transition">Termos e Condições</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms; 
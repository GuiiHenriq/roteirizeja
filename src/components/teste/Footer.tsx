export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              className="h-6 mb-6"
              alt="Travelfy"
              src="https://c.animaapp.com/iA1lbPU9/img/travelfy-1.svg"
            />
            <p className="text-sm mb-6">
              Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus viverra ultricies.
            </p>
            <div className="flex space-x-4">
              <img className="w-8 h-8" alt="Facebook" src="https://c.animaapp.com/iA1lbPU9/img/facebook@2x.png" />
              <img className="w-8 h-8" alt="TikTok" src="https://c.animaapp.com/iA1lbPU9/img/tiktok@2x.png" />
              <img className="w-8 h-8" alt="Twitter" src="https://c.animaapp.com/iA1lbPU9/img/twitter-circled@2x.png" />
            </div>
          </div>

          {[
            {
              title: "INSTITUCIONAL",
              links: ["Sobre", "Carreiras", "Logistica", "Privacidade"],
            },
            {
              title: "CONTATO",
              links: ["Ajuda - FAQ", "Imprensa", "Afiliados"],
            },
            {
              title: "AJUDA",
              links: ["Help Center", "Midias", "Chat ao vivo"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-[var(--primriarosa)]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 text-center text-sm text-gray-600">
          Copyright © - Travelfy - Todos os direitos reservados. 2023
        </div>
      </div>
    </footer>
  );
};
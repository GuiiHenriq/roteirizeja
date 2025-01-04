export const Features = () => {
  return (
    <section className="w-full py-12 lg:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-[var(--h4-font-family)] text-center mb-12">
          Porque escolher a Travelfy?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Certificada",
              icon: "explore",
              color: "var(--primriaazul-escuro)",
            },
            {
              title: "Múltiplos Destinos",
              icon: "map",
              color: "var(--primriaroxo)",
            },
            {
              title: "+ de 5.000 clientes",
              icon: "group",
              color: "var(--primriarosa)",
            },
          ].map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: feature.color }}
              >
                <img
                  className="w-12 h-12"
                  alt={feature.title}
                  src={`https://c.animaapp.com/iA1lbPU9/img/${feature.icon}.svg`}
                />
              </div>
              <h3 className="text-xl font-[var(--h5-font-family)] mb-4">{feature.title}</h3>
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus viverra ultricies.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
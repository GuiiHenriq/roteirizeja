export const Hero = () => {
  return (
    <section className="relative w-full px-4 lg:px-8 py-12 lg:py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <img
            className="w-full max-w-lg mx-auto"
            alt="Descubra o mundo"
            src="https://c.animaapp.com/iA1lbPU9/img/descubra-o-mundo-com-a-travelfy-.png"
          />
          <p className="text-base mt-6 max-w-lg mx-auto text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur. Nulla consectetur dignissim lacus arcu tincidunt nisl dolor maecenas.
          </p>
          <button className="flex items-center justify-center space-x-2 bg-[var(--primriarosa)] text-white px-6 py-3 rounded-full mt-8 mx-auto lg:mx-0 hover:opacity-90 transition-opacity">
            <img
              className="w-6 h-6"
              alt="Travel explore"
              src="https://c.animaapp.com/iA1lbPU9/img/travel-explore-fill0-wght400-grad0-opsz48-1.svg"
            />
            <span>EXPLORAR DESTINOS</span>
          </button>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Para onde você quer ir?"
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--primriarosa)]"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[var(--primriarosa)] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              Teste Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
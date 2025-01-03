export const Newsletter = () => {
  return (
    <section className="w-full px-4 lg:px-8 py-12 lg:py-24 bg-[var(--primriarosa)]">
      <div className="max-w-4xl mx-auto text-white text-center">
        <h2 className="text-2xl lg:text-3xl font-[var(--h4-font-family)] mb-6">
          Assine nossa Newsletter e<br />
          Receba promoções incríveis!
        </h2>
        <p className="mb-8">
          Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus viverra ultricies.
        </p>
        <div className="relative max-w-xl mx-auto">
          <input
            type="email"
            placeholder="DIGITE SEU MELHOR E-MAIL"
            className="w-full px-6 py-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[var(--primriarosa)] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center space-x-2">
            <img
              className="w-4 h-4"
              alt="Email"
              src="https://c.animaapp.com/iA1lbPU9/img/outgoing-mail-fill0-wght400-grad0-opsz48-1.svg"
            />
            <span>ASSINAR</span>
          </button>
        </div>
      </div>
    </section>
  );
};
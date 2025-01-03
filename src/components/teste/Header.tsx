import { Frame } from "@/components/frame";
import { PropertyPrimRioWrapper } from "@/components/property";

export const Header = () => {
  return (
    <header className="relative w-full px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between py-4 lg:py-8">
        <img
          className="h-6 lg:h-8 mb-4 lg:mb-0"
          alt="Travelfy"
          src="https://c.animaapp.com/iA1lbPU9/img/travelfy.svg"
        />

        <nav className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-8">
          <div className="text-sm font-semibold">INICIO</div>
          <div className="text-sm">DESTINOS</div>
          <div className="text-sm">PACOTES</div>
          <div className="text-sm">CLIENTES</div>
          <div className="text-sm">CONTATO</div>
        </nav>

        <div className="mt-4 lg:mt-0 flex items-center space-x-4">
          <div className="text-sm">LOGIN</div>
          <Frame className="hidden lg:block" property1="original" />
          <PropertyPrimRioWrapper className="hidden lg:block" property1="prim-rio" />
        </div>
      </div>
    </header>
  );
};
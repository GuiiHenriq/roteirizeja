import { Frame } from "@/components/frame";

export const Header = () => {
  return (
    <header className="relative w-full px-4 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 lg:py-8">
        <img
          className="h-6 lg:h-8 mb-4 sm:mb-0"
          alt="Travelfy"
          src="https://c.animaapp.com/iA1lbPU9/img/travelfy.svg"
        />

        <div className="flex items-center space-x-4">
          <div className="text-sm text-white font-medium">ENTRAR</div>
          <Frame className="block" property1="original" />
        </div>
      </div>
    </header>
  );
};
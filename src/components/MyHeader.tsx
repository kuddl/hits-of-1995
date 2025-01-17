import { Disc3, Mic2, Music2, Radio } from "lucide-react";
import { useEffect, useState } from "react";

export const MyHeader = () => {
  const headerIcons = [
    <Music2 key="music" size={36} className="text-pink-400" />,
    <Disc3 key="disc" size={36} className="text-blue-400" />,
    <Mic2 key="mic" size={36} className="text-purple-400" />,
    <Radio key="radio" size={36} className="text-cyan-400" />,
  ];
  const [bounceIcon, setBounceIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounceIcon((prev) => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative mb-24 pt-16 text-center">
      <div className="animate-float absolute inset-x-0 top-4 flex flex-wrap justify-center gap-12">
        {headerIcons.map((icon, index) => (
          <div
            key={index}
            className={`transform transition-transform duration-500 ${
              bounceIcon === index ? "-translate-y-2 scale-125" : "scale-100"
            }`}
          >
            {icon}
          </div>
        ))}
      </div>
      <h1 className="mb-8 pt-20 text-7xl font-black leading-none md:text-[12rem]">
        <span className="animate-gradient-x inline-block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(219,39,119,0.2)]">
          Hits of 1995
        </span>
      </h1>
      <p className="animate-gradient-x flex flex-wrap items-center justify-center gap-2 bg-gradient-to-r from-emerald-300 via-blue-500 to-pink-200 bg-clip-text text-xl font-light tracking-wider text-transparent md:flex-nowrap md:gap-6 md:text-3xl">
        <span className="">Nürtingen</span>
        <span className="scale-50 text-white/30 md:scale-90">●</span>
        <span className="delay-75">Hölderin Gynmasium</span>
        <span className="scale-50 text-white/30 md:scale-90">●</span>
        <span className="delay-150">Abi 1995</span>
      </p>
    </header>
  );
};

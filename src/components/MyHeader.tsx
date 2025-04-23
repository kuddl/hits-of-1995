import { Disc3, Heart, MapPlus, MapPlusIcon, Mic2, Music2, Radio } from "lucide-react";
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
    <header className="relative mb-8 pt-16 text-center">
      <div className="flex items-center justify-between">
        <div className="animate-float  left-4 top-4 flex flex-wrap gap-8  items-center justify-center ">
          {headerIcons.map((icon, index) => (
            <div
              key={index}
              className={`transform transition-transform duration-500 ${bounceIcon === index ? "-translate-y-2 scale-125" : "scale-100"
                }`}
            >
              {icon}
            </div>
          ))}
        </div>
        <div className="right-4 top-4 shrink-0s">
          <a href="https://schulweg-of-1995.netlify.app/" className="flex items-center gap-2 text-sm font-bold">
            <MapPlusIcon className="inline text-pink-400 " />
            Schulweg of 1995
          </a>
        </div>
      </div>
      <h1 className="mb-8 pt-20 text-7xl font-black leading-none md:text-[12rem]">
        <span className="animate-gradient-x inline-block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(219,39,119,0.2)]">
          Hits of 1995
        </span>
      </h1>
      <p className="animate-gradient-x flex flex-wrap items-center justify-center gap-2 bg-gradient-to-r from-emerald-300 via-blue-500 to-pink-200 bg-clip-text text-xl font-light tracking-wider text-transparent md:flex-nowrap md:gap-6 md:text-3xl">
        <span className="">Nürtingen</span>
        <span className="scale-50 text-white/30 md:scale-90">●</span>
        <span className="delay-75">Hölderlin Gymnasium</span>
        <span className="scale-50 text-white/30 md:scale-90">●</span>
        <span className="delay-150">Abi 1995</span>
      </p>
      <p className="mx-auto mt-12 max-w-2xl text-lg text-white/80">
        Willkommen bei einer musikalischen Zeitreise ins Jahr 1995!
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-lg text-white/80">
        Hier findest du die Hits, die uns durch unser Abiturjahr begleitet
        haben.
        <a
          target="_blank"
          href="https://www.offiziellecharts.de/charts/single-jahr/for-date-1995"
          className="block text-xs underline"
        >
          Quelle: offiziellecharts.de
        </a>
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-lg text-white/80">
        Klicke einfach auf die Icons unter den Songs, um sie anzuhören, und lass
        dich von den Erinnerungen mitreißen. Mit dem{" "}
        <Heart className="inline text-pink-700" />
        -Button kannst du für deine Lieblingssongs abstimmen.
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-lg text-white/80">
        Viel Spaß beim Entdecken und Erinnern!
      </p>

    </header>
  );
};

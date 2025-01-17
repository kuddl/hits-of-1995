import  { useEffect, useState } from "react";
import { Music2, Disc3, Mic2, Radio } from "lucide-react";

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
      <header className="text-center mb-24 relative pt-16">
        <div className="absolute inset-x-0 top-4 flex justify-center gap-12 animate-float">
          {headerIcons.map((icon, index) => (
            <div
              key={index}
              className={`transform transition-transform duration-500 ${
                bounceIcon === index
                  ? "scale-125 -translate-y-2"
                  : "scale-100"
              }`}
            >
              {icon}
            </div>
          ))}
        </div>
        <h1 className="text-[12rem] font-black pt-20 mb-8 leading-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 animate-gradient-x inline-block drop-shadow-[0_0_25px_rgba(219,39,119,0.2)]">
            Hits of 1995
          </span>
        </h1>
        <p className="text-3xl font-light tracking-wider text-white/90 flex items-center justify-center gap-6">
          <span className="animate-pulse">Time Machine</span>
          <span className="text-white/30">●</span>
          <span className="animate-pulse delay-75">Top 100</span>
          <span className="text-white/30">●</span>
          <span className="animate-pulse delay-150">Nostalgia</span>
        </p>
      </header>
    );
  };
  
  
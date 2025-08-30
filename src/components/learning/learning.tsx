import type React from "react";

interface CharacterProps {
  style?: React.CSSProperties;
}

export function Character({ style }: CharacterProps) {
  return (
    <div
      style={style}
      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 hover:scale-110 transition-transform duration-300"
    >
      <img
        src="/green-owl-mascot-duolingo-style.png"
        alt="Learning mascot"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );
}

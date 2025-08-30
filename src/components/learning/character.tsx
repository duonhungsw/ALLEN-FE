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
      <div className="w-full h-full bg-[#58CC03] rounded-full flex items-center justify-center text-white text-2xl font-bold">
        🦉
      </div>
    </div>
  );
}

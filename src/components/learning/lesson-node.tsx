import type React from "react";
import { Star, Lock, Play } from "lucide-react";

interface LessonNodeProps {
  type: "completed" | "current" | "locked" | "special";
  style?: React.CSSProperties;
}

const NODE_CONFIGS = {
  completed: {
    className:
      "bg-gradient-to-br from-green-400 to-green-600 border-green-300 shadow-green-500/30",
    innerGradient: "from-green-300/20",
    icon: Star,
    iconClassName: "text-white fill-white",
  },
  current: {
    className:
      "bg-gradient-to-br from-purple-400 to-purple-600 border-purple-300 shadow-purple-500/30 animate-pulse",
    innerGradient: "from-purple-300/20",
    icon: Play,
    iconClassName: "text-white fill-white",
  },
  locked: {
    className:
      "bg-gradient-to-br from-slate-500 to-slate-700 border-slate-400 shadow-slate-700/20",
    innerGradient: "from-slate-400/10",
    icon: Lock,
    iconClassName: "text-slate-300",
  },
  special: {
    className:
      "bg-gradient-to-br from-purple-500 to-purple-700 border-purple-300 shadow-purple-500/40 animate-pulse",
    innerGradient: "from-purple-300/30",
    icon: Play,
    iconClassName: "text-white fill-white",
  },
} as const;

export function LessonNode({ type, style }: LessonNodeProps) {
  const config = NODE_CONFIGS[type];
  const Icon = config.icon;

  return (
    <div
      style={style}
      className="cursor-pointer hover:scale-105 sm:hover:scale-110 transition-all duration-300 hover:drop-shadow-xl"
    >
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 sm:border-3 md:border-4 shadow-lg relative ${config.className}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.innerGradient} to-transparent rounded-full`}
        ></div>
        <Icon
          className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 drop-shadow-sm relative z-10 ${config.iconClassName}`}
        />
      </div>
    </div>
  );
}

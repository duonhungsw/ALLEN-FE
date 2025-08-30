import React from "react";
import { Lock } from "lucide-react";
import { LearningUnit } from "@/shared/api/unit.api";

interface UnitPopupProps {
  unit: LearningUnit;
  isVisible: boolean;
  onClose: () => void;
}

export function UnitPopup({ unit, isVisible, onClose }: UnitPopupProps) {
  if (!isVisible) return null;

  const getSkillTypeLabel = (skillType: string): string => {
    switch (skillType) {
      case "Reading":
        return "Đọc hiểu";
      case "Speaking":
        return "Nói";
      case "Listening":
        return "Nghe";
      case "Writing":
        return "Viết";
      default:
        return skillType;
    }
  };

  const getDescription = (unitStepsLength: number): string => {
    return unitStepsLength === 0
      ? "Chưa có bài học nào trong unit này"
      : "Hãy hoàn thành tất cả các cấp độ phía trên để mở khóa nhé!";
  };

  return (
    <div className="absolute top-17 left-1/2 transform -translate-x-1/2 w-72 z-[9999]">
      <div className="bg-[#202E36] text-slate-200 rounded-lg p-4 shadow-2xl border-2 border-slate-600 relative">
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2
    w-0 h-0
    border-l-4 border-r-4 border-b-4 
    border-transparent border-b-white"
        ></div>

        <div className="text-slate-100 font-bold text-base mb-3 text-center">
          {unit.title}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs">Level:</span>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              {unit.level}
            </span>
          </div>

          {/* Skill Type */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs">Kỹ năng:</span>
            <span className="text-slate-200 text-xs font-medium">
              {getSkillTypeLabel(unit.skillType)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs">Bài học:</span>
            <span className="text-slate-200 text-xs font-medium">
              {unit.unitSteps.length} bài
            </span>
          </div>
        </div>

        <div className="text-slate-400 text-xs mb-4 leading-relaxed text-center">
          {getDescription(unit.unitSteps.length)}
        </div>

        <button
          className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          onClick={onClose}
        >
          <Lock className="w-3 h-3" />
          KHÓA
        </button>
      </div>
    </div>
  );
}

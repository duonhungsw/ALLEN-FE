import React, { useState } from "react";
import { LearningUnit } from "@/shared/api/unit.api";
import { motion } from "framer-motion";
import { Star, Trophy, BookOpen, Zap, Lock } from "lucide-react";

interface LessonMapProps {
  learningUnits: LearningUnit[];
}

interface LessonNodeData {
  id: string;
  type: "completed" | "current" | "locked" | "special";
  icon: any;
  label: string;
  position: { top: string; left: string };
  isSpecial?: boolean;
  isUnit?: boolean;
  isFinal?: boolean;
  unit?: LearningUnit;
  colorClass?: string;
}

function generateLessonNodes(learningUnits: LearningUnit[]): LessonNodeData[] {
  const nodes: LessonNodeData[] = [];
  let currentTop = 10;

  nodes.push({
    id: "start",
    type: "current",
    icon: Star,
    label: "BẮT ĐẦU",
    position: { top: `${currentTop}%`, left: "50%" },
    isSpecial: true,
  });
  currentTop += 8;

  learningUnits.forEach((unit, unitIndex) => {
    const unitColor = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-red-500",
    ][unitIndex % 4];

    const unitNode: LessonNodeData = {
      id: `unit-${unit.id}`,
      type: unitIndex === 0 ? "current" : "locked",
      icon:
        unit.skillType === "Reading"
          ? BookOpen
          : unit.skillType === "Speaking"
            ? Zap
            : Star,
      label: unit.title,
      position: { top: `${currentTop}%`, left: "50%" },
      unit,
      isUnit: true,
      colorClass: unitColor,
    };
    nodes.push(unitNode);

    const stepSpacing = 8;
    const offsetX = 20;
    unit.unitSteps?.forEach((step, stepIndex) => {
      const isLeft = stepIndex % 2 === 1;
      const stepNode: LessonNodeData = {
        id: `unit-${unit.id}-step-${step.id}`,
        type: "locked",
        icon: Star,
        label: step.title,
        position: {
          top: `${currentTop + (stepIndex + 1) * stepSpacing}%`,
          left: isLeft ? `${50 - offsetX}%` : `${50 + offsetX}%`,
        },
        colorClass: "bg-slate-600",
      };
      nodes.push(stepNode);
    });

    currentTop += unit.unitSteps.length * stepSpacing + 10;

    if (unitIndex < learningUnits.length - 1) {
      nodes.push({
        id: `chest-${unit.id}`,
        type: "locked",
        icon: null,
        label: "Chest",
        position: { top: `${currentTop}%`, left: "50%" },
        isSpecial: true,
        colorClass: "bg-yellow-500",
      });
      currentTop += 8;
    }
  });

  nodes.push({
    id: "final-trophy",
    type: "locked",
    icon: Trophy,
    label: "Thành tựu",
    position: { top: `${currentTop}%`, left: "50%" },
    isFinal: true,
    colorClass: "bg-yellow-500",
  });

  return nodes;
}

export function LessonMap({ learningUnits }: LessonMapProps) {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<any | null>(null);

  if (!learningUnits || learningUnits.length === 0) {
    return (
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-white mb-2">Chưa có bài học</h3>
          <p className="text-gray-400 mb-4">Hãy đợi admin thêm bài học mới</p>
        </div>
      </div>
    );
  }

  const lessonNodes = generateLessonNodes(learningUnits);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      className="relative h-screen max-w-sm sm:max-w-md md:max-w-2xl mx-auto px-4 sm:px-6 md:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onClick={() => {
        setSelectedUnit(null);
        setSelectedStep(null);
      }}
    >
      {/* Start node */}
      <div className="relative">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
          <div className="bg-slate-700 text-[#58CC03] font-extrabold text-base px-4 py-2 rounded-lg relative tracking-tight w-[100px]">
            Bắt Đầu
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-slate-700"></div>
          </div>
        </div>
        <div className="relative w-24 h-24 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 rounded-full bg-[#37464F] shadow-lg" />
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-b from-[#58CC03] to-[#46A800] border-[3px] border-[#46A800] shadow-[inset_0_4px_6px_rgba(255,255,255,0.3),0_4px_6px_rgba(0,0,0,0.3)]">
            <Star className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>

      {/* Lesson Nodes */}
      {lessonNodes.map((node) => (
        <>
          <motion.div
            key={node.id}
            variants={itemVariants}
            className="absolute"
            style={{
              top: node.position.top,
              left: node.position.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            {node.isUnit && (
              <div className="relative">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUnit(selectedUnit === node.id ? null : node.id);
                  }}
                  className="cursor-pointer relative"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-2 border-slate-500 shadow-md ${node.colorClass || "bg-slate-600"
                      }`}
                  >
                    <node.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
                  {node.unit?.unitSteps.map((step, index) => (
                    <div
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStep({
                          ...step,
                          stepIndex: index + 1,
                        });
                      }}
                      className="cursor-pointer relative"
                      style={{
                        marginLeft:
                          index === 2
                            ? "170px"
                            : index % 2 === 0
                              ? "6px"
                              : "100px",
                      }}
                    >
                      <div className="w-18 h-18 rounded-full flex items-center justify-center border-3 shadow-md bg-blue-500 border-[#37464F]">
                        <span className="text-white text-sm font-bold">
                          {step.title}
                        </span>
                      </div>

                      {selectedStep?.id === step.id && (
                        <div
                          className="absolute top-14 left-1/2 transform -translate-x-1/2 w-64 z-50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="bg-slate-800 text-slate-200 rounded-lg p-4 shadow-2xl border border-slate-600 relative">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
                            <div className="text-slate-300 font-semibold text-sm mb-2">
                              {selectedStep.title}
                            </div>
                            <div className="text-slate-400 text-xs mb-3 leading-relaxed">
                              {selectedStep.contentJson}
                            </div>
                            <button
                              onClick={() => setSelectedStep(null)}
                              className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors duration-200 cursor-pointer"
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {selectedUnit === node.id && (
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-64 z-[10]">
                    <div className="bg-slate-800 text-slate-200 rounded-lg p-4 shadow-2xl border border-slate-600 relative">
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-800"></div>
                      <div className="text-slate-300 font-semibold text-sm mb-2">
                        {node.unit?.title}
                      </div>
                      <div className="text-slate-400 text-xs mb-3 leading-relaxed">
                        Hãy hoàn thành tất cả các cấp độ phía trên để mở khóa
                        nhé!
                      </div>
                      <button className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer">
                        <Lock className="w-3 h-3" />
                        KHÓA
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      ))}
    </motion.div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flag, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useUnitSteps } from "@/hooks/learning/useLearningUnits";
import { useQuestions } from "@/hooks/learning/useQuestions";
import { UnitStep } from "@/types/learning/learningType";

interface PageProps {
  params: {
    id: string;
  };
}

interface StepNodeProps {
  step: UnitStep;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

function StepNode({
  step,
  index,
  isActive,
  isCompleted,
  onClick,
}: StepNodeProps) {
  const { data: questionsData } = useQuestions(step?.id || "");
  const questionCount = questionsData?.length || 0;

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <motion.div
        className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-2 shadow-lg ${
          isActive
            ? "bg-[#F3713B] border-[#F3713B] text-white"
            : isCompleted
            ? "bg-green-500 border-green-500 text-white"
            : "bg-white border-[#E5E7EB] text-[#6B7280]"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <span className="text-sm font-bold">{index + 1}</span>
      </motion.div>

      {/* Step Info */}
      <motion.div
        className="mt-2 text-center max-w-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      >
        <p
          className="text-xs font-medium"
          style={{ color: isActive ? "#F3713B" : "#6B7280" }}
        >
          {step?.title || "Untitled"}
        </p>
        <p className="text-xs" style={{ color: "#6B7280" }}>
          {questionCount} câu
        </p>
      </motion.div>

      {index < 4 && (
        <motion.div
          className="absolute top-6 left-28 w-10 h-0.5"
          style={{ backgroundColor: isActive ? "#F3713B" : "#E5E7EB" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
        />
      )}
    </motion.div>
  );
}

export default function CourseJourneyPage({ params }: PageProps) {
  const { data: unitSteps, isLoading, error } = useUnitSteps(params.id);
  const [selectedStep, setSelectedStep] = useState<UnitStep | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);

  const handleStepClick = (step: UnitStep) => {
    setSelectedStep(step);
    setShowQuestions(true);
  };

  const handleCloseQuestions = () => {
    setShowQuestions(false);
    setSelectedStep(null);
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F5F3EA" }}
      >
        <motion.div
          className="w-12 h-12 border-4 border-t-transparent rounded-full"
          style={{ borderColor: "#F3713B", borderTopColor: "transparent" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F5F3EA" }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-lg font-bold mb-2" style={{ color: "#142F50" }}>
            Có lỗi xảy ra khi tải dữ liệu
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Error: {error?.message || "Unknown error"}
          </div>
          <motion.button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg transition-colors text-white"
            style={{ backgroundColor: "#F3713B" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Thử lại
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const steps = unitSteps?.data || [];
  const currentStep = 0;

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#F5F3EA" }}
    >
      <div className="absolute inset-0 opacity-95">
        <img
          src="/map.png"
          alt="World Map Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        <motion.div
          className="px-6 py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/learning/course">
                <motion.div
                  className="flex items-center space-x-2 cursor-pointer"
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowLeft className="h-5 w-5" style={{ color: "#142F50" }} />
                  <span
                    className="text-lg font-medium"
                    style={{ color: "#142F50" }}
                  >
                    Quay lại Khóa học
                  </span>
                </motion.div>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Flag className="h-5 w-5" style={{ color: "#142F50" }} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#142F50" }}
            >
              Hành trình học của tôi
            </h1>
            <p className="text-base" style={{ color: "#6B7280" }}>
              Theo dõi tiến độ của bạn bằng cách kiếm điểm cho từ vựng đã học,
              video đã xem và cuộc trò chuyện với MemBot.
            </p>
          </motion.div>
        </motion.div>

        <div className="px-6 pb-8">
          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border p-8"
            style={{ borderColor: "#E5E7EB" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Course Header */}
            <div className="flex items-center mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: "#F3713B" }}
              >
                <Flag className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: "#142F50" }}>
                Người vừa mới bắt đầu
              </h2>
            </div>

            <div className="flex items-center justify-between mb-6">
              {steps.slice(0, 5).map((step: UnitStep, index: number) => (
                <StepNode
                  key={step?.id || index}
                  step={step}
                  index={index}
                  isActive={index === currentStep}
                  isCompleted={index < currentStep}
                  onClick={() => handleStepClick(step)}
                />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-base" style={{ color: "#6B7280" }}>
                Đặt nền tảng với từ vựng và các mẫu câu cơ bản để bắt đầu hành
                trình học ngoại ngữ của bạn.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {showQuestions && selectedStep && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl border max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            style={{ borderColor: "#E5E7EB" }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#F3713B" }}
                >
                  <Play className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "#142F50" }}
                  >
                    {selectedStep?.title || "Untitled"}
                  </h3>
                  <p className="text-sm" style={{ color: "#6B7280" }}>
                    Bước {selectedStep?.stepIndex || 1}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={handleCloseQuestions}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xl" style={{ color: "#6B7280" }}>
                  ×
                </span>
              </motion.button>
            </div>

            <div className="p-6">
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎯</div>
                <h4
                  className="text-lg font-bold mb-2"
                  style={{ color: "#142F50" }}
                >
                  Sẵn sàng bắt đầu?
                </h4>
                <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                  Bạn sẽ được làm {selectedStep?.title || "bài học"} với các câu
                  hỏi thú vị
                </p>
                <Link
                  href={`/learning/course/${params.id}/step/${
                    selectedStep?.id || ""
                  }`}
                >
                  <motion.button
                    className="px-6 py-3 rounded-lg text-white font-semibold"
                    style={{ backgroundColor: "#F3713B" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Bắt đầu làm bài
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

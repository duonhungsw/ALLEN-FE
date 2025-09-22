"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestions } from "@/hooks/learning/useQuestions";
import { Question } from "@/types/learning/learningType";

interface PageProps {
  params: {
    id: string;
    stepId: string;
  };
}

export default function QuestionsPage({ params }: PageProps) {
  const { data: questionsData, isLoading, error } = useQuestions(params.stepId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const questions: Question[] = questionsData || [];

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmit();
    }
  }, [timeLeft, showResult]);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.remove();
      }
    };
  }, [audio]);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct =
      userAnswer.toLowerCase().trim() ===
      currentQuestion.correctAnswer.toLowerCase().trim();

    setIsCorrect(correct);
    setShowResult(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      if (audio) {
        audio.pause();
        setAudio(null);
      }
      setIsPlaying(false);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setShowResult(false);
      setTimeLeft(30);
    }
  };

  const handleRestart = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    setIsPlaying(false);

    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
    setTimeLeft(30);
  };

  const toggleAudio = () => {
    if (!currentQuestion.contentUrl) return;

    if (isPlaying) {
      // Pause audio
      if (audio) {
        audio.pause();
      }
      setIsPlaying(false);
    } else {
      if (audio) {
        audio.play();
      } else {
        const newAudio = new Audio(currentQuestion.contentUrl);
        newAudio.addEventListener("ended", () => setIsPlaying(false));
        newAudio.addEventListener("error", () => {
          console.error("Audio playback error");
          setIsPlaying(false);
        });
        setAudio(newAudio);
        newAudio.play();
      }
      setIsPlaying(true);
    }
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

  if (!questions || questions.length === 0) {
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
          <div className="text-6xl mb-4">❓</div>
          <div className="text-lg font-bold mb-2" style={{ color: "#142F50" }}>
            Chưa có câu hỏi
          </div>
          <div className="text-sm" style={{ color: "#6B7280" }}>
            Hãy đợi admin thêm câu hỏi mới
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3EA" }}>
      {/* Header */}
      <motion.div
        className="px-6 py-4 border-b"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <Link href={`/learning/course/${params.id}/journey`}>
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
                Quay lại
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" style={{ color: "#F3713B" }} />
              <span
                className="text-lg font-bold"
                style={{ color: timeLeft <= 10 ? "#EF4444" : "#142F50" }}
              >
                {timeLeft}s
              </span>
            </div>
            <div className="text-sm" style={{ color: "#6B7280" }}>
              {currentQuestionIndex + 1} / {questions.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="mt-4 w-full rounded-full h-2"
          style={{ backgroundColor: "#E5E7EB" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div
            className="h-2 rounded-full"
            style={{ backgroundColor: "#F3713B" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>
        </motion.div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm border p-8"
            style={{ borderColor: "#E5E7EB" }}
          >
            {currentQuestion.contentUrl && (
              <motion.div
                className="mb-6 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.button
                  onClick={toggleAudio}
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "#F3713B" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" />
                  )}
                </motion.button>
              </motion.div>
            )}

            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#142F50" }}
              >
                {currentQuestion.questionText}
              </h2>
            </motion.div>
            {!showResult ? (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời của bạn..."
                  className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#F3713B] focus:ring-offset-2 focus:border-transparent"
                  style={{
                    borderColor: "#E5E7EB",
                    backgroundColor: "#FFFFFF",
                    color: "#142F50",
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
              </motion.div>
            ) : (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    <span
                      className={`text-lg font-bold ${
                        isCorrect ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {isCorrect ? "Chính xác!" : "Sai rồi!"}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#6B7280" }}>
                    Đáp án đúng:{" "}
                    <strong>{currentQuestion.correctAnswer}</strong>
                  </p>
                  {currentQuestion.explanation && (
                    <p className="text-sm mt-2" style={{ color: "#6B7280" }}>
                      {currentQuestion.explanation}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.button
                onClick={handleRestart}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors"
                style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại</span>
              </motion.button>

              <div className="flex space-x-4">
                {!showResult ? (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim()}
                    className="px-6 py-3 rounded-lg text-white font-semibold transition-colors disabled:opacity-50"
                    style={{ backgroundColor: "#F3713B" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Kiểm tra
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={isLastQuestion ? handleRestart : handleNext}
                    className="px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                    style={{ backgroundColor: "#F3713B" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLastQuestion ? "Làm lại" : "Câu tiếp theo"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        {score.total > 0 && (
          <motion.div
            className="mt-8 bg-white rounded-lg shadow-sm border p-6"
            style={{ borderColor: "#E5E7EB" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: "#142F50" }}>
              Kết quả
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#F3713B" }}
                >
                  {score.correct}
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>
                  Đúng
                </div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#142F50" }}
                >
                  {score.total}
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>
                  Tổng
                </div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#F3713B" }}
                >
                  {Math.round((score.correct / score.total) * 100)}%
                </div>
                <div className="text-sm" style={{ color: "#6B7280" }}>
                  Độ chính xác
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

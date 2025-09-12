"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuestions } from '@/hooks/learning/useQuestions';

interface QuestionPopupProps {
    isOpen: boolean;
    onClose: () => void;
    moduleType: string;
    moduleItemId: string;
    nodeTitle: string;
}

export default function QuestionPopup({
    isOpen,
    onClose,
    moduleItemId,
    nodeTitle
}: QuestionPopupProps) {
    const { data: questions, isLoading, error, refetch } = useQuestions(moduleItemId);
    const parseOptions = (optionsString: string) => {
        try {
            return JSON.parse(optionsString);
        } catch {
            return [];
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">{nodeTitle}</h2>
                                <p className="text-blue-100 mt-1">Danh sách câu hỏi</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/80 hover:text-white text-2xl transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                <span className="ml-3 text-gray-600">Đang tải câu hỏi...</span>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <div className="text-red-500 text-lg mb-2">⚠️</div>
                                <p className="text-red-600">Không thể tải danh sách câu hỏi</p>
                                <button
                                    onClick={() => refetch()}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Thử lại
                                </button>
                            </div>
                        ) : !questions || questions.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 text-4xl mb-4">📝</div>
                                <p className="text-gray-600">Chưa có câu hỏi nào</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {questions.map((question, index) => (
                                    <motion.div
                                        key={question.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-semibold text-gray-800">
                                                Câu {index + 1}: {question.questionType}
                                            </h3>
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {question.moduleType}
                                            </span>
                                        </div>

                                        <p className="text-gray-700 mb-3">{question.prompt}</p>

                                        {question.options && (
                                            <div className="mb-3">
                                                <p className="text-sm font-medium text-gray-600 mb-2">Tùy chọn:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {parseOptions(question.options).map((option: string, optIndex: number) => (
                                                        <span
                                                            key={optIndex}
                                                            className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm"
                                                        >
                                                            {option}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <p className="text-sm font-medium text-green-800 mb-1">Đáp án đúng:</p>
                                            <p className="text-green-700">{question.correctAnswer}</p>
                                        </div>

                                        {question.contentUrl && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-gray-600 mb-2">Audio:</p>
                                                <audio controls className="w-full">
                                                    <source src={question.contentUrl} type="audio/mpeg" />
                                                    Trình duyệt không hỗ trợ audio.
                                                </audio>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                Tổng cộng: {questions?.length || 0} câu hỏi
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
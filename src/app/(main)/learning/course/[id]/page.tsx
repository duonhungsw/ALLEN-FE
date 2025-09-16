"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUnitSteps } from '@/hooks/learning/useLearningUnits';
import { useQueries } from '@tanstack/react-query';
import { UnitStep } from '@/types/learningType';

interface PageProps {
    params: {
        id: string;
    };
}

function StepCard({ step, index, unitId, questionCount }: { step: UnitStep; index: number; unitId: string; questionCount: number }) {

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            whileHover={{
                y: -5,
                transition: { duration: 0.2 }
            }}
        >
            <Link href={`/learning/course/${unitId}/journey`}>
                <div className="bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-md transition-shadow"
                    style={{ borderColor: '#E5E7EB' }}>

                    <motion.div
                        className="flex items-center mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                            style={{ backgroundColor: '#F3713B' }}>
                            <Play className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold" style={{ color: '#142F50' }}>
                                {step.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs px-2 py-1 rounded-full"
                                    style={{ backgroundColor: '#E5E7EB', color: '#6B7280' }}>
                                    Bước {step.stepIndex}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                        <p className="text-sm" style={{ color: '#6B7280' }}>
                            {step.contentJson ? step.contentJson.substring(0, 100) + '...' : 'Nội dung bài học'}
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-between text-sm"
                        style={{ color: '#6B7280' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                        <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {questionCount} câu hỏi
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {Math.ceil(questionCount * 2)} phút
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                        <div className="w-full rounded-full h-2" style={{ backgroundColor: '#E5E7EB' }}>
                            <motion.div
                                className="h-2 rounded-full"
                                style={{ backgroundColor: '#F3713B' }}
                                initial={{ width: 0 }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                            ></motion.div>
                        </div>
                        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                            Tiến độ: 0%
                        </p>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function UnitStepsPage({ params }: PageProps) {
    const { data: unitSteps, isLoading, error } = useUnitSteps(params.id);
    const stepIds = unitSteps?.data?.map((step: UnitStep) => step.id) || [];
    const questionsQueries = useQueries({
        queries: stepIds.map((stepId: string) => ({
            queryKey: ["questions", stepId],
            queryFn: async () => {
                const { getQuestions } = await import('@/shared/api/question.api');
                return getQuestions(stepId);
            },
            enabled: !!stepId,
        })),
    });

    const questionsCountMap = stepIds.reduce((acc: Record<string, number>, stepId: string, index: number) => {
        const questionsData = questionsQueries[index]?.data;
        acc[stepId] = Array.isArray(questionsData) ? questionsData.length : 0;
        return acc;
    }, {});

    return (
        <div
            className="min-h-screen relative"
            style={{ backgroundColor: '#F5F3EA' }}
        >
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
                                    <ArrowLeft className="h-5 w-5" style={{ color: '#142F50' }} />
                                    <span className="text-lg font-medium" style={{ color: '#142F50' }}>
                                        Quay lại Khóa học
                                    </span>
                                </motion.div>
                            </Link>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h1
                            className="text-4xl font-bold mb-4"
                            style={{ color: '#142F50' }}
                        >
                            Danh sách bài học
                        </h1>
                        <p className="text-lg" style={{ color: '#6B7280' }}>
                            Chọn bài học để bắt đầu luyện tập
                        </p>
                    </motion.div>
                </motion.div>

                <div className="px-6 pb-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <motion.div
                                className="w-12 h-12 border-4 border-t-transparent rounded-full"
                                style={{ borderColor: '#F3713B', borderTopColor: 'transparent' }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            ></motion.div>
                        </div>
                    ) : error ? (
                        <motion.div
                            className="text-center py-12"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-lg font-bold mb-2" style={{ color: '#142F50' }}>Có lỗi xảy ra khi tải dữ liệu</div>
                            <div className="text-sm text-gray-600 mb-4">Error: {error?.message || 'Unknown error'}</div>
                            <motion.button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 rounded-lg transition-colors text-white"
                                style={{ backgroundColor: '#F3713B' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Thử lại
                            </motion.button>
                        </motion.div>
                    ) : unitSteps?.data && unitSteps.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {unitSteps.data.map((step: UnitStep, index: number) => (
                                <StepCard
                                    key={step.id}
                                    step={step}
                                    index={index}
                                    unitId={params.id}
                                    questionCount={questionsCountMap[step.id] || 0}
                                />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="text-center py-12"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-6xl mb-4">📚</div>
                            <div className="text-lg font-bold mb-2" style={{ color: '#142F50' }}>Chưa có bài học</div>
                            <div className="text-sm" style={{ color: '#6B7280' }}>Hãy đợi admin thêm bài học mới</div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
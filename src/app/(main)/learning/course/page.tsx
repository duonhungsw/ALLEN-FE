"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Flag, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLearningUnits } from '@/hooks/learning/useLearningUnits';
import { LearningUnit } from '@/types/learningType';

export default function LearningJourneyPage() {
    const { data: learningUnits, isLoading, error } = useLearningUnits();

    return (
        <div
            className="min-h-screen relative"
            style={{ backgroundColor: '#F5F3EA' }}
        >
            <div className="absolute inset-0 opacity-95">
                <Image
                    src="/map.png"
                    alt="World Map Background"
                    fill
                    className="object-cover"
                    priority
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
                            <Link href="/">
                                <motion.div
                                    className="flex items-center space-x-2 cursor-pointer"
                                    whileHover={{ x: -5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ArrowLeft className="h-5 w-5" style={{ color: '#142F50' }} />
                                    <span className="text-lg font-medium" style={{ color: '#142F50' }}>
                                        Quay lại Trang chủ
                                    </span>
                                </motion.div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Flag className="h-5 w-5" style={{ color: '#142F50' }} />
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
                            Hành trình học của tôi
                        </h1>
                        <p className="text-base" style={{ color: '#6B7280' }}>
                            Theo dõi tiến độ của bạn bằng cách kiếm điểm cho từ vựng đã học, video đã xem và cuộc trò chuyện với MemBot.
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
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {learningUnits?.data?.map((unit: LearningUnit, index: number) => (
                                <motion.div
                                    key={unit.id}
                                    className="h-full"
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
                                    <Link href={`/learning/course/${unit.id}/journey`} className="h-full block">
                                        <div className="bg-white rounded-lg shadow-sm border p-3 cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col"
                                            style={{ borderColor: '#E5E7EB' }}>
                                            <motion.div
                                                className="flex items-center mb-4"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                            >
                                                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                                                    style={{ backgroundColor: '#F3713B' }}>
                                                    <BookOpen className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold leading-tight" style={{ color: '#142F50' }}>
                                                        {unit.title.length > 50 ? unit.title.substring(0, 50) + '...' : unit.title}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        <span className="text-xs px-2 py-1 rounded-full font-medium"
                                                            style={{ backgroundColor: '#E5E7EB', color: '#6B7280' }}>
                                                            {unit.level}
                                                        </span>
                                                        <span className="text-xs px-2 py-1 rounded-full font-medium text-white"
                                                            style={{
                                                                backgroundColor: unit.skillType === 'Speaking' ? '#10B981' :
                                                                    unit.skillType === 'Reading' ? '#3B82F6' :
                                                                        unit.skillType === 'Listening' ? '#8B5CF6' :
                                                                            unit.skillType === 'Writing' ? '#F59E0B' : '#6B7280'
                                                            }}>
                                                            {unit.skillType}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                className="flex items-center text-sm"
                                                style={{ color: '#6B7280' }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                            >
                                                <div className="flex items-center">
                                                    <BookOpen className="w-4 h-4 mr-1" />
                                                    {unit.unitSteps?.length || 0} bài học
                                                </div>
                                            </motion.div>

                                            {/* Steps Progress */}
                                            <motion.div
                                                className="mt-4 flex-1 flex flex-col justify-end"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                                            >
                                                <div className="flex items-center justify-center relative space-x-2">
                                                    {[1, 2, 3, 4, 5].map((stepNumber) => (
                                                        <div key={stepNumber} className="flex items-center">
                                                            <motion.div
                                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${stepNumber === 1
                                                                    ? 'bg-[#F3713B] text-white shadow-[#F3713B]/30'
                                                                    : 'bg-white border-2 border-[#E5E7EB] text-[#6B7280] hover:border-[#F3713B]/50'
                                                                    }`}
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                    delay: 0.5 + index * 0.1 + stepNumber * 0.05
                                                                }}
                                                                whileHover={{ scale: 1.1 }}
                                                            >
                                                                {stepNumber}
                                                            </motion.div>
                                                            {stepNumber < 5 && (
                                                                <motion.div
                                                                    className="flex items-center relative"
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{
                                                                        duration: 0.3,
                                                                        delay: 0.6 + index * 0.1 + stepNumber * 0.05
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="w-5 h-1 rounded-full relative overflow-hidden"
                                                                        style={{
                                                                            background: stepNumber === 1
                                                                                ? 'linear-gradient(90deg, #F3713B 0%, #FF8A65 100%)'
                                                                                : 'linear-gradient(90deg, #E5E7EB 0%, #D1D5DB 100%)'
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className="absolute inset-0 rounded-full opacity-30"
                                                                            style={{
                                                                                background: stepNumber === 1
                                                                                    ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                                                                                    : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)'
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    <motion.div
                                                                        className="relative"
                                                                        whileHover={{ scale: 1.1 }}
                                                                        transition={{ duration: 0.2 }}
                                                                    >
                                                                        <ArrowRight
                                                                            className="w-4 h-4 relative z-10"
                                                                            style={{
                                                                                color: stepNumber === 1 ? '#F3713B' : '#9CA3AF',
                                                                                filter: stepNumber === 1
                                                                                    ? 'drop-shadow(0 2px 4px rgba(243, 113, 59, 0.3))'
                                                                                    : 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
                                                                            }}
                                                                        />
                                                                    </motion.div>
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-xs mt-2 font-medium" style={{ color: '#6B7280' }}>
                                                    Bước 1/5
                                                </p>
                                            </motion.div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

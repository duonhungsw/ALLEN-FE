"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Plus } from "lucide-react";

interface TopicHeaderProps {
    onCreateTopic: () => void;
    isCreating: boolean;
}

export default function TopicHeader({ onCreateTopic, isCreating }: TopicHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Link href="/admin">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#8B4513] hover:bg-[#F5F3EA] font-calistoga-regular"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Quay lại</span>
                        <span className="sm:hidden">Back</span>
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#8B4513] flex items-center font-calistoga-regular">
                        <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                        <span className="hidden sm:inline">Quản lý chủ đề</span>
                        <span className="sm:hidden">Chủ đề</span>
                    </h1>
                </div>
            </div>
            <Button
                className="bg-[#8B4513] hover:bg-[#A0522D] text-white w-full sm:w-auto font-calistoga-regular"
                onClick={onCreateTopic}
                disabled={isCreating}
            >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">
                    {isCreating ? "Đang tạo..." : "Thêm chủ đề"}
                </span>
                <span className="sm:hidden">
                    {isCreating ? "..." : "Thêm"}
                </span>
            </Button>
        </motion.div>
    );
}

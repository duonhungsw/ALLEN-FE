"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Folder, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CategoryHeaderProps {
    onCreateCategory: () => void;
    isCreating: boolean;
}

export default function CategoryHeader({ onCreateCategory, isCreating }: CategoryHeaderProps) {
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
                        <span className="hidden sm:inline text-[16px]">Quay lại</span>
                        <span className="sm:hidden">Back</span>
                    </Button>
                </Link>
            </div>
            <Button
                className="bg-[#f3713b] text-white w-full sm:w-auto font-bold"
                onClick={onCreateCategory}
                disabled={isCreating}
            >
                <Plus className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline text-[16px] font-roboto-regular">
                    {isCreating ? "Đang tạo..." : "Thêm danh mục"}
                </span>
                <span className="sm:hidden">
                    {isCreating ? "..." : "Thêm"}
                </span>
            </Button>
        </motion.div>
    );
}


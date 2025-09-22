"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const skillTypes = [
    { value: 'Speaking', label: 'Speaking', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'Listening', label: 'Listening', color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'Writing', label: 'Writing', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'Reading', label: 'Reading', color: 'bg-purple-100 text-purple-800 border-purple-200' },
];

interface CategoryPaginationProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onPreviousPage: () => void;
    onNextPage: () => void;
    activeSkillType: 'Speaking' | 'Listening' | 'Writing' | 'Reading';
}

export default function CategoryPagination({
    currentPage,
    totalPages,
    totalCount,
    itemsPerPage,
    onPageChange,
    onPreviousPage,
    onNextPage,
    activeSkillType,
}: CategoryPaginationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#D2B48C]/30"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-[#8B4513] text-sm font-medium font-calistoga-regular">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <span className="text-center sm:text-left">
                            Hiển thị {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalCount)} trong tổng số {totalCount} danh mục
                        </span>
                        <div className="flex items-center space-x-2">
                            <Badge className={`${skillTypes.find(s => s.value === activeSkillType)?.color} font-medium font-calistoga-regular`}>
                                {activeSkillType}
                            </Badge>
                            <span className="text-xs text-[#A0522D] font-calistoga-regular">({itemsPerPage} items/trang)</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] text-xs sm:text-sm font-calistoga-regular"
                        onClick={onPreviousPage}
                        disabled={currentPage === 1}
                    >
                        <span className="hidden sm:inline">Trước</span>
                        <span className="sm:hidden">‹</span>
                    </Button>

                    {/* Page numbers */}
                    <div className="flex space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <Button
                                    key={pageNum}
                                    size="sm"
                                    className={`text-xs sm:text-sm font-calistoga-regular ${currentPage === pageNum
                                        ? "bg-[#8B4513] hover:bg-[#A0522D] text-white"
                                        : "border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA]"
                                        }`}
                                    onClick={() => onPageChange(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] text-xs sm:text-sm font-calistoga-regular"
                        onClick={onNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <span className="hidden sm:inline">Sau</span>
                        <span className="sm:hidden">›</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

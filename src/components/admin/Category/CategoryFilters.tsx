"use client";

import { motion } from "framer-motion";
import { Search, Filter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CategoryFiltersProps {
    searchInput: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    levelFilter: string;
    onLevelFilterChange: (value: string) => void;
    selectedCategories: string[];
    onDeleteSelected: () => void;
    onResetFilters: () => void;
    isDeleting: boolean;
}

export default function CategoryFilters({
    searchInput,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    levelFilter,
    onLevelFilterChange,
    selectedCategories,
    onDeleteSelected,
    onResetFilters,
    isDeleting,
}: CategoryFiltersProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-[#D2B48C]/30"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="relative sm:col-span-2 lg:col-span-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513] w-4 h-4" />
                    <Input
                        placeholder="Tìm kiếm theo tên hoặc mô tả..."
                        value={searchInput}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] placeholder:text-[#A0522D] placeholder:font-medium text-sm sm:text-base font-calistoga-regular"
                    />
                </div>

                <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] font-medium text-sm sm:text-base font-calistoga-regular">
                        <SelectValue
                            placeholder="Tất cả trạng thái"
                            className="text-[#A0522D] font-medium"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all" className="text-[#8B4513] font-medium font-calistoga-regular">
                            Tất cả trạng thái
                        </SelectItem>
                        <SelectItem value="active" className="text-[#8B4513] font-medium font-calistoga-regular">
                            Hoạt động
                        </SelectItem>
                        <SelectItem value="inactive" className="text-[#8B4513] font-medium font-calistoga-regular">
                            Không hoạt động
                        </SelectItem>
                        <SelectItem
                            value="draft"
                            className="text-[#8B4513] font-medium font-calistoga-regular"
                        >
                            Bản nháp
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Select value={levelFilter} onValueChange={onLevelFilterChange}>
                    <SelectTrigger className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] font-medium text-sm sm:text-base font-calistoga-regular">
                        <SelectValue
                            placeholder="Tất cả cấp độ"
                            className="text-[#A0522D] font-medium"
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all" className="text-[#8B4513] font-medium font-calistoga-regular">
                            Tất cả cấp độ
                        </SelectItem>
                        <SelectItem value="A1" className="text-[#8B4513] font-medium font-calistoga-regular">
                            A1
                        </SelectItem>
                        <SelectItem value="A2" className="text-[#8B4513] font-medium font-calistoga-regular">
                            A2
                        </SelectItem>
                        <SelectItem value="B1" className="text-[#8B4513] font-medium font-calistoga-regular">
                            B1
                        </SelectItem>
                        <SelectItem value="B2" className="text-[#8B4513] font-medium font-calistoga-regular">
                            B2
                        </SelectItem>
                        <SelectItem value="C1" className="text-[#8B4513] font-medium font-calistoga-regular">
                            C1
                        </SelectItem>
                        <SelectItem value="C2" className="text-[#8B4513] font-medium font-calistoga-regular">
                            C2
                        </SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex space-x-2 sm:col-span-2 lg:col-span-1">
                    {selectedCategories.length > 0 && (
                        <Button
                            variant="destructive"
                            className="text-white w-full sm:w-auto text-sm sm:text-base font-calistoga-regular"
                            onClick={onDeleteSelected}
                            disabled={isDeleting}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">
                                {isDeleting ? "Đang xóa..." : `Xóa (${selectedCategories.length})`}
                            </span>
                            <span className="sm:hidden">
                                {isDeleting ? "..." : `Xóa ${selectedCategories.length}`}
                            </span>
                        </Button>
                    )}
                    <Button
                        className="bg-[#8B4513] hover:bg-[#A0522D] text-white w-full sm:w-auto text-sm sm:text-base font-calistoga-regular"
                        onClick={onResetFilters}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Reset</span>
                        <span className="sm:hidden">Reset</span>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}


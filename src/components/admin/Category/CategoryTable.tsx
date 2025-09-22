"use client";

import { motion } from "framer-motion";
import { Eye, Edit, Trash2, Folder, Calendar, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryType } from "@/types/admin/category";

interface Category extends CategoryType {
    description?: string;
    level?: string;
    status?: string;
    lessons?: number;
    participants?: number;
    createdAt?: string;
}

interface CategoryTableProps {
    categories: Category[];
    selectedCategories: string[];
    onSelectCategory: (categoryId: string) => void;
    onSelectAll: () => void;
    onViewCategory: (category: Category) => void;
    onEditCategory: (category: Category) => void;
    onDeleteCategory: (category: Category) => void;
    isUpdating: boolean;
    isDeleting: boolean;
}

export default function CategoryTable({
    categories,
    selectedCategories,
    onSelectCategory,
    onSelectAll,
    onViewCategory,
    onEditCategory,
    onDeleteCategory,
    isUpdating,
    isDeleting,
}: CategoryTableProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-200 font-calistoga-regular">
                        Hoạt động
                    </Badge>
                );
            case "inactive":
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-200 font-calistoga-regular">
                        Không hoạt động
                    </Badge>
                );
            case "draft":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-calistoga-regular">
                        Bản nháp
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200 font-calistoga-regular">
                        Không xác định
                    </Badge>
                );
        }
    };

    const getLevelBadge = (level: string) => {
        switch (level) {
            case "A1":
                return <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-calistoga-regular">A1</Badge>;
            case "A2":
                return <Badge className="bg-green-100 text-green-800 border-green-200 font-calistoga-regular">A2</Badge>;
            case "B1":
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-calistoga-regular">B1</Badge>;
            case "B2":
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200 font-calistoga-regular">B2</Badge>;
            case "C1":
                return <Badge className="bg-red-100 text-red-800 border-red-200 font-calistoga-regular">C1</Badge>;
            case "C2":
                return <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-calistoga-regular">C2</Badge>;
            default:
                return (
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200 font-calistoga-regular">
                        {level}
                    </Badge>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#D2B48C]/30 overflow-hidden"
        >
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#F5F3EA] border-b border-[#D2B48C]">
                        <tr>
                            <th className="px-6 py-4 text-left">
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedCategories.length === categories.length &&
                                        categories.length > 0
                                    }
                                    onChange={onSelectAll}
                                    className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                                />
                            </th>
                            <th className="px-6 py-4 text-left text-[#8B4513] font-semibold font-calistoga-regular">
                                Danh mục
                            </th>
                            <th className="px-6 py-4 text-left text-[#8B4513] font-semibold font-calistoga-regular">
                                Cấp độ
                            </th>
                            <th className="px-6 py-4 text-left text-[#8B4513] font-semibold font-calistoga-regular">
                                Trạng thái
                            </th>
                            <th className="px-6 py-4 text-left text-[#8B4513] font-semibold font-calistoga-regular">
                                Số bài học
                            </th>
                            <th className="px-6 py-4 text-left text-[#8B4513] font-semibold font-calistoga-regular">
                                Người học
                            </th>
                            <th className="px-6 py-4 text-left text-[#8B4513] font-semibold font-calistoga-regular">
                                Ngày tạo
                            </th>
                            <th className="px-6 py-4 text-left text-[#8B4513] font-semibold font-calistoga-regular">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <motion.tr
                                key={category.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="border-b border-[#D2B48C]/30 hover:bg-[#F5F3EA]/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => onSelectCategory(category.id)}
                                        className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-[#D2B48C] bg-gradient-to-r from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white font-bold text-sm">
                                            <Folder className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-[#8B4513] font-calistoga-regular">
                                                {category.name}
                                            </div>
                                            <div className="text-sm text-[#A0522D] max-w-xs truncate font-calistoga-regular">
                                                {category.description}
                                            </div>
                                            <div className="text-xs text-[#A0522D] flex items-center font-calistoga-regular">
                                                <span className="mr-1">ID:</span>
                                                {category.id}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{getLevelBadge(category.level || "")}</td>
                                <td className="px-6 py-4">{getStatusBadge(category.status || "")}</td>
                                <td className="px-6 py-4 text-[#8B4513] font-medium font-calistoga-regular">
                                    <div className="flex items-center">
                                        <BookOpen className="w-4 h-4 mr-1" />
                                        {category.lessons || 0}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#8B4513] font-medium font-calistoga-regular">
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {category.participants || 0}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-[#A0522D] font-calistoga-regular">
                                        <div className="flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {category.createdAt ? new Date(category.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-[#8B4513] hover:bg-[#F5F3EA]"
                                            onClick={() => onViewCategory(category)}
                                            title="Xem chi tiết"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-[#8B4513] hover:bg-[#F5F3EA]"
                                            onClick={() => onEditCategory(category)}
                                            disabled={isUpdating}
                                            title="Chỉnh sửa"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-600 hover:bg-red-50"
                                            onClick={() => onDeleteCategory(category)}
                                            disabled={isDeleting}
                                            title="Xóa"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-4">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white rounded-xl border border-[#D2B48C]/30 p-4 shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => onSelectCategory(category.id)}
                                    className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513] mt-1"
                                />
                                <div className="w-10 h-10 rounded-full border-2 border-[#D2B48C] bg-gradient-to-r from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white font-bold text-sm">
                                    <Folder className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-[#8B4513] hover:bg-[#F5F3EA] p-2"
                                    onClick={() => onViewCategory(category)}
                                    title="Xem chi tiết"
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-[#8B4513] hover:bg-[#F5F3EA] p-2"
                                    onClick={() => onEditCategory(category)}
                                    disabled={isUpdating}
                                    title="Chỉnh sửa"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-600 hover:bg-red-50 p-2"
                                    onClick={() => onDeleteCategory(category)}
                                    disabled={isDeleting}
                                    title="Xóa"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <h3 className="font-medium text-[#8B4513] text-lg mb-1 font-calistoga-regular">
                                {category.name}
                            </h3>
                            <p className="text-sm text-[#A0522D] mb-2 font-calistoga-regular">
                                {category.description}
                            </p>
                            <div className="text-xs text-[#A0522D] font-calistoga-regular">
                                <span className="mr-1">ID:</span>
                                {category.id}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-[#A0522D] font-calistoga-regular">Cấp độ:</span>
                                {getLevelBadge(category.level || "")}
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-[#A0522D] font-calistoga-regular">Trạng thái:</span>
                                {getStatusBadge(category.status || "")}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center text-[#8B4513] text-sm font-calistoga-regular">
                                <BookOpen className="w-4 h-4 mr-1" />
                                <span>{category.lessons || 0} bài học</span>
                            </div>
                            <div className="flex items-center text-[#8B4513] text-sm font-calistoga-regular">
                                <Users className="w-4 h-4 mr-1" />
                                <span>{category.participants || 0} người học</span>
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-[#A0522D] font-calistoga-regular">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>
                                {category.createdAt ? new Date(category.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12">
                    <Folder className="w-16 h-16 text-[#D2B48C] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[#8B4513] mb-2 font-calistoga-regular">
                        Không tìm thấy danh mục
                    </h3>
                    <p className="text-[#A0522D] font-calistoga-regular">
                        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                </div>
            )}
        </motion.div>
    );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Eye,
    Edit,
    ArrowLeft,
    Folder,
    Calendar,
    BookOpen,
    Users,
    Plus,
    Mic,
    Headphones,
    PenTool,
    BookOpen as ReadingIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminCategorys } from "@/hooks/admin/useAdminCategory";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { CategoryFilters } from "@/shared/api/admin/category.api";

const skillTypes = [
    { value: 'Speaking', label: 'Speaking', icon: Mic, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'Listening', label: 'Listening', icon: Headphones, color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'Writing', label: 'Writing', icon: PenTool, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'Reading', label: 'Reading', icon: ReadingIcon, color: 'bg-purple-100 text-purple-800 border-purple-200' },
];

export default function CategoryManagement() {
    const [activeSkillType, setActiveSkillType] = useState<'Speaking' | 'Listening' | 'Writing' | 'Reading'>('Speaking');
    const [statusFilter, setStatusFilter] = useState("all");
    const [levelFilter, setLevelFilter] = useState("all");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const { searchInput, searchTerm, setSearchInput, clearSearch } =
        useDebounceSearch({
            delay: 500,
            onSearch: () => {
                setCurrentPage(1);
            },
        });

    const filters: CategoryFilters = {
        SkillType: activeSkillType,
        Top: itemsPerPage,
        Skip: (currentPage - 1) * itemsPerPage,
        SearchText: searchTerm || undefined,
        NeedTotalCount: true,
    };

    const { data: categoriesData, isLoading } = useAdminCategorys(filters);
    const categories = categoriesData?.data || [];
    console.log("categories:", categories);
    const totalCount = categoriesData?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const paginatedCategories = categories;

    const handleSelectCategory = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSelectAll = () => {
        if (selectedCategories.length === paginatedCategories.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(paginatedCategories.map((category: any) => category.id));
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                        Hoạt động
                    </Badge>
                );
            case "inactive":
                return (
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                        Không hoạt động
                    </Badge>
                );
            case "draft":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Bản nháp
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                        Không xác định
                    </Badge>
                );
        }
    };

    const getLevelBadge = (level: string) => {
        switch (level) {
            case "A1":
                return <Badge className="bg-blue-100 text-blue-800 border-blue-200">A1</Badge>;
            case "A2":
                return <Badge className="bg-green-100 text-green-800 border-green-200">A2</Badge>;
            case "B1":
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">B1</Badge>;
            case "B2":
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200">B2</Badge>;
            case "C1":
                return <Badge className="bg-red-100 text-red-800 border-red-200">C1</Badge>;
            case "C2":
                return <Badge className="bg-purple-100 text-purple-800 border-purple-200">C2</Badge>;
            default:
                return (
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                        {level}
                    </Badge>
                );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F3EA' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
                    <p className="text-[#8B4513]">Đang tải danh mục...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
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
                            className="text-[#8B4513] hover:bg-[#F5F3EA]"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Quay lại</span>
                            <span className="sm:hidden">Back</span>
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#8B4513] flex items-center">
                            <Folder className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                            <span className="hidden sm:inline">Quản lý danh mục</span>
                            <span className="sm:hidden">Danh mục</span>
                        </h1>
                    </div>
                </div>
                <Button
                    className="bg-[#8B4513] hover:bg-[#A0522D] text-white w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Thêm danh mục</span>
                    <span className="sm:hidden">Thêm</span>
                </Button>
            </motion.div>

            {/* Skill Type Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-[#D2B48C]/30"
            >
                <Tabs value={activeSkillType} onValueChange={(value) => {
                    setActiveSkillType(value as 'Speaking' | 'Listening' | 'Writing' | 'Reading');
                    setCurrentPage(1);
                }}>
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-[#F5F3EA] border border-[#D2B48C] h-auto">
                        {skillTypes.map((skill) => {
                            const Icon = skill.icon;
                            return (
                                <TabsTrigger
                                    key={skill.value}
                                    value={skill.value}
                                    className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-[#8B4513] data-[state=active]:bg-[#8B4513] data-[state=active]:text-white p-2 sm:p-3"
                                >
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="font-medium text-xs sm:text-sm">{skill.label}</span>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                </Tabs>
            </motion.div>

            {/* Search and Filters */}
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
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="pl-10 border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] placeholder:text-[#A0522D] placeholder:font-medium text-sm sm:text-base"
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] font-medium text-sm sm:text-base">
                            <SelectValue
                                placeholder="Tất cả trạng thái"
                                className="text-[#A0522D] font-medium"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="text-[#8B4513] font-medium">
                                Tất cả trạng thái
                            </SelectItem>
                            <SelectItem value="active" className="text-[#8B4513] font-medium">
                                Hoạt động
                            </SelectItem>
                            <SelectItem value="inactive" className="text-[#8B4513] font-medium">
                                Không hoạt động
                            </SelectItem>
                            <SelectItem
                                value="draft"
                                className="text-[#8B4513] font-medium"
                            >
                                Bản nháp
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                        <SelectTrigger className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] font-medium text-sm sm:text-base">
                            <SelectValue
                                placeholder="Tất cả cấp độ"
                                className="text-[#A0522D] font-medium"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" className="text-[#8B4513] font-medium">
                                Tất cả cấp độ
                            </SelectItem>
                            <SelectItem value="A1" className="text-[#8B4513] font-medium">
                                A1
                            </SelectItem>
                            <SelectItem value="A2" className="text-[#8B4513] font-medium">
                                A2
                            </SelectItem>
                            <SelectItem value="B1" className="text-[#8B4513] font-medium">
                                B1
                            </SelectItem>
                            <SelectItem value="B2" className="text-[#8B4513] font-medium">
                                B2
                            </SelectItem>
                            <SelectItem value="C1" className="text-[#8B4513] font-medium">
                                C1
                            </SelectItem>
                            <SelectItem value="C2" className="text-[#8B4513] font-medium">
                                C2
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex space-x-2 sm:col-span-2 lg:col-span-1">
                        <Button
                            className="bg-[#8B4513] hover:bg-[#A0522D] text-white w-full sm:w-auto text-sm sm:text-base"
                            onClick={() => {
                                clearSearch();
                                setStatusFilter("all");
                                setLevelFilter("all");
                                setActiveSkillType("Speaking");
                                setCurrentPage(1);
                            }}
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Reset</span>
                            <span className="sm:hidden">Reset</span>
                        </Button>
                    </div>
                </div>
            </motion.div>

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
                                            selectedCategories.length === paginatedCategories.length &&
                                            paginatedCategories.length > 0
                                        }
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                                    />
                                </th>
                                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                                    Danh mục
                                </th>
                                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                                    Cấp độ
                                </th>
                                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                                    Số bài học
                                </th>
                                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                                    Người học
                                </th>
                                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                                    Ngày tạo
                                </th>
                                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCategories.map((category: any, index: number) => (
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
                                            onChange={() => handleSelectCategory(category.id)}
                                            className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-[#D2B48C] bg-gradient-to-r from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white font-bold text-sm">
                                                <Folder className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-[#8B4513]">
                                                    {category.name}
                                                </div>
                                                <div className="text-sm text-[#A0522D] max-w-xs truncate">
                                                    {category.description}
                                                </div>
                                                <div className="text-xs text-[#A0522D] flex items-center">
                                                    <span className="mr-1">ID:</span>
                                                    {category.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{getLevelBadge(category.level)}</td>
                                    <td className="px-6 py-4">{getStatusBadge(category.status)}</td>
                                    <td className="px-6 py-4 text-[#8B4513] font-medium">
                                        <div className="flex items-center">
                                            <BookOpen className="w-4 h-4 mr-1" />
                                            {category.lessons || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[#8B4513] font-medium">
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {category.participants || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-[#A0522D]">
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
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-[#8B4513] hover:bg-[#F5F3EA]"
                                            >
                                                <Edit className="w-4 h-4" />
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
                    {paginatedCategories.map((category: any, index: number) => (
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
                                        onChange={() => handleSelectCategory(category.id)}
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
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-[#8B4513] hover:bg-[#F5F3EA] p-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h3 className="font-medium text-[#8B4513] text-lg mb-1">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-[#A0522D] mb-2">
                                    {category.description}
                                </p>
                                <div className="text-xs text-[#A0522D]">
                                    <span className="mr-1">ID:</span>
                                    {category.id}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-[#A0522D]">Cấp độ:</span>
                                    {getLevelBadge(category.level)}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs text-[#A0522D]">Trạng thái:</span>
                                    {getStatusBadge(category.status)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="flex items-center text-[#8B4513] text-sm">
                                    <BookOpen className="w-4 h-4 mr-1" />
                                    <span>{category.lessons || 0} bài học</span>
                                </div>
                                <div className="flex items-center text-[#8B4513] text-sm">
                                    <Users className="w-4 h-4 mr-1" />
                                    <span>{category.participants || 0} người học</span>
                                </div>
                            </div>

                            <div className="flex items-center text-sm text-[#A0522D]">
                                <Calendar className="w-3 h-3 mr-1" />
                                <span>
                                    {category.createdAt ? new Date(category.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {paginatedCategories.length === 0 && (
                    <div className="text-center py-12">
                        <Folder className="w-16 h-16 text-[#D2B48C] mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-[#8B4513] mb-2">
                            Không tìm thấy danh mục
                        </h3>
                        <p className="text-[#A0522D]">
                            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Pagination */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#D2B48C]/30"
            >
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="text-[#8B4513] text-sm font-medium">
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <span className="text-center sm:text-left">
                                Hiển thị {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalCount)} trong tổng số {totalCount} danh mục
                            </span>
                            <div className="flex items-center space-x-2">
                                <Badge className={`${skillTypes.find(s => s.value === activeSkillType)?.color} font-medium`}>
                                    {activeSkillType}
                                </Badge>
                                <span className="text-xs text-[#A0522D]">({itemsPerPage} items/trang)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] text-xs sm:text-sm"
                            onClick={handlePreviousPage}
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
                                        className={`text-xs sm:text-sm ${currentPage === pageNum
                                            ? "bg-[#8B4513] hover:bg-[#A0522D] text-white"
                                            : "border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA]"
                                            }`}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] text-xs sm:text-sm"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <span className="hidden sm:inline">Sau</span>
                            <span className="sm:hidden">›</span>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

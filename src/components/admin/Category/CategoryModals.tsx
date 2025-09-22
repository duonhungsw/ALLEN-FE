"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface CategoryModalsProps {
    createModalOpen: boolean;
    onCreateModalChange: (open: boolean) => void;
    onCreateCategory: () => void;
    isCreating: boolean;
    updateModalOpen: boolean;
    onUpdateModalChange: (open: boolean) => void;
    onUpdateCategory: () => void;
    isUpdating: boolean;
    selectedCategory: any;
    deleteModalOpen: boolean;
    onDeleteModalChange: (open: boolean) => void;
    onDeleteCategory: () => void;
    isDeleting: boolean;
    categoryName: string;
    onCategoryNameChange: (value: string) => void;
    activeSkillType: 'Speaking' | 'Listening' | 'Writing' | 'Reading';
}

export default function CategoryModals({
    createModalOpen,
    onCreateModalChange,
    onCreateCategory,
    isCreating,
    updateModalOpen,
    onUpdateModalChange,
    onUpdateCategory,
    isUpdating,
    selectedCategory,
    deleteModalOpen,
    onDeleteModalChange,
    onDeleteCategory,
    isDeleting,
    categoryName,
    onCategoryNameChange,
    activeSkillType,
}: CategoryModalsProps) {
    return (
        <>
            {/* Create Category Modal */}
            <Dialog open={createModalOpen} onOpenChange={onCreateModalChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-[#8B4513] font-calistoga-regular">Tạo danh mục mới</DialogTitle>
                        <DialogDescription className="font-calistoga-regular">
                            Tạo danh mục mới cho kỹ năng <span className="font-semibold text-[#8B4513]">{activeSkillType}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="category-name" className="text-right text-[#8B4513] font-medium font-calistoga-regular">
                                Tên danh mục
                            </label>
                            <Input
                                id="category-name"
                                value={categoryName}
                                onChange={(e) => onCategoryNameChange(e.target.value)}
                                className="col-span-3 border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] font-calistoga-regular"
                                placeholder="Nhập tên danh mục..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onCreateCategory();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => onCreateModalChange(false)}
                            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] font-calistoga-regular"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={onCreateCategory}
                            disabled={!categoryName.trim() || isCreating}
                            className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-calistoga-regular"
                        >
                            {isCreating ? "Đang tạo..." : "Tạo danh mục"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Update Category Modal */}
            <Dialog open={updateModalOpen} onOpenChange={onUpdateModalChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-[#8B4513] font-calistoga-regular">Chỉnh sửa danh mục</DialogTitle>
                        <DialogDescription className="font-calistoga-regular">
                            Chỉnh sửa thông tin danh mục <span className="font-semibold text-[#8B4513]">{selectedCategory?.name}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="update-category-name" className="text-right text-[#8B4513] font-medium font-calistoga-regular">
                                Tên danh mục
                            </label>
                            <Input
                                id="update-category-name"
                                value={categoryName}
                                onChange={(e) => onCategoryNameChange(e.target.value)}
                                className="col-span-3 border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] font-calistoga-regular"
                                placeholder="Nhập tên danh mục..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onUpdateCategory();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => onUpdateModalChange(false)}
                            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] font-calistoga-regular"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={onUpdateCategory}
                            disabled={!categoryName.trim() || isUpdating}
                            className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-calistoga-regular"
                        >
                            {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Category Modal */}
            <Dialog open={deleteModalOpen} onOpenChange={onDeleteModalChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-red-600 font-calistoga-regular">Xác nhận xóa danh mục</DialogTitle>
                        <DialogDescription className="font-calistoga-regular">
                            Bạn có chắc chắn muốn xóa danh mục <span className="font-semibold text-red-600">"{selectedCategory?.name}"</span>?
                            <br />
                            <span className="text-sm text-gray-500 mt-2 block">
                                Hành động này không thể hoàn tác.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <Trash2 className="w-5 h-5 text-red-600" />
                                <span className="text-red-800 font-medium font-calistoga-regular">Cảnh báo</span>
                            </div>
                            <p className="text-red-700 text-sm mt-2 font-calistoga-regular">
                                Tất cả dữ liệu liên quan đến danh mục này sẽ bị xóa vĩnh viễn.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => onDeleteModalChange(false)}
                            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] font-calistoga-regular"
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={onDeleteCategory}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white font-calistoga-regular"
                        >
                            {isDeleting ? "Đang xóa..." : "Xóa danh mục"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Topic {
    id: string;
    topicName: string;
    topicDecription: string;
}

interface TopicModalsProps {
    // Create Modal
    createModalOpen: boolean;
    onCreateModalChange: (open: boolean) => void;
    onCreateTopic: () => void;
    isCreating: boolean;

    // Update Modal
    updateModalOpen: boolean;
    onUpdateModalChange: (open: boolean) => void;
    onUpdateTopic: () => void;
    isUpdating: boolean;
    selectedTopic: Topic | null;

    // Delete Modal
    deleteModalOpen: boolean;
    onDeleteModalChange: (open: boolean) => void;
    onDeleteTopic: () => void;
    isDeleting: boolean;

    // Form data
    topicName: string;
    onTopicNameChange: (value: string) => void;
    topicDescription: string;
    onTopicDescriptionChange: (value: string) => void;

    // Active skill type
    activeSkillType: string;
}

export default function TopicModals({
    createModalOpen,
    onCreateModalChange,
    onCreateTopic,
    isCreating,
    updateModalOpen,
    onUpdateModalChange,
    onUpdateTopic,
    isUpdating,
    selectedTopic,
    deleteModalOpen,
    onDeleteModalChange,
    onDeleteTopic,
    isDeleting,
    topicName,
    onTopicNameChange,
    topicDescription,
    onTopicDescriptionChange,
    activeSkillType
}: TopicModalsProps) {
    return (
        <>
            {/* Create Topic Modal */}
            <Dialog open={createModalOpen} onOpenChange={onCreateModalChange}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-xl flex items-center justify-center">
                                <Plus className="w-5 h-5 text-white" />
                            </div>
                            <DialogTitle className="text-xl font-bold text-[#8B4513] font-calistoga-regular">Tạo chủ đề mới</DialogTitle>
                        </div>
                        <DialogDescription className="text-[#A0522D]">
                            Tạo chủ đề mới cho kỹ năng <span className="font-semibold text-[#8B4513] font-calistoga-regular">{activeSkillType}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="topic-name" className="text-[#8B4513] font-semibold font-calistoga-regular">
                                Tên chủ đề
                            </label>
                            <Input
                                id="topic-name"
                                value={topicName}
                                onChange={(e) => onTopicNameChange(e.target.value)}
                                className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513]"
                                placeholder="Nhập tên chủ đề..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onCreateTopic();
                                    }
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="topic-description" className="text-[#8B4513] font-semibold font-calistoga-regular">
                                Mô tả chủ đề
                            </label>
                            <Textarea
                                id="topic-description"
                                value={topicDescription}
                                onChange={(e) => onTopicDescriptionChange(e.target.value)}
                                className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] min-h-[100px]"
                                placeholder="Nhập mô tả chủ đề..."
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => onCreateModalChange(false)}
                            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] font-calistoga-regular"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={onCreateTopic}
                            disabled={!topicName.trim() || isCreating}
                            className="bg-[#8B4513] hover:bg-[#A0522D] text-white"
                        >
                            {isCreating ? "Đang tạo..." : "Tạo chủ đề"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Update Topic Modal */}
            <Dialog open={updateModalOpen} onOpenChange={onUpdateModalChange}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Edit className="w-5 h-5 text-white" />
                            </div>
                            <DialogTitle className="text-xl font-bold text-[#8B4513] font-calistoga-regular">Chỉnh sửa chủ đề</DialogTitle>
                        </div>
                        <DialogDescription className="text-[#A0522D]">
                            Chỉnh sửa thông tin chủ đề <span className="font-semibold text-[#8B4513] font-calistoga-regular">{selectedTopic?.topicName}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="update-topic-name" className="text-[#8B4513] font-semibold font-calistoga-regular">
                                Tên chủ đề
                            </label>
                            <Input
                                id="update-topic-name"
                                value={topicName}
                                onChange={(e) => onTopicNameChange(e.target.value)}
                                className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513]"
                                placeholder="Nhập tên chủ đề..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onUpdateTopic();
                                    }
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="update-topic-description" className="text-[#8B4513] font-semibold font-calistoga-regular">
                                Mô tả chủ đề
                            </label>
                            <Textarea
                                id="update-topic-description"
                                value={topicDescription}
                                onChange={(e) => onTopicDescriptionChange(e.target.value)}
                                className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] min-h-[100px]"
                                placeholder="Nhập mô tả chủ đề..."
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => onUpdateModalChange(false)}
                            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] font-calistoga-regular"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={onUpdateTopic}
                            disabled={!topicName.trim() || isUpdating}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Topic Modal */}
            <Dialog open={deleteModalOpen} onOpenChange={onDeleteModalChange}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-white" />
                            </div>
                            <DialogTitle className="text-xl font-bold text-red-600">Xác nhận xóa chủ đề</DialogTitle>
                        </div>
                        <DialogDescription className="text-gray-600">
                            Bạn có chắc chắn muốn xóa chủ đề <span className="font-semibold text-red-600">"{selectedTopic?.topicName}"</span>?
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
                                <span className="text-red-800 font-medium">Cảnh báo</span>
                            </div>
                            <p className="text-red-700 text-sm mt-2">
                                Tất cả dữ liệu liên quan đến chủ đề này sẽ bị xóa vĩnh viễn.
                            </p>
                        </div>
                    </div>
                    <DialogFooter className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => onDeleteModalChange(false)}
                            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA] font-calistoga-regular"
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={onDeleteTopic}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? "Đang xóa..." : "Xóa chủ đề"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

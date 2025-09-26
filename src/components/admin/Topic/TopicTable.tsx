"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Eye, Edit, Trash2, Users, Calendar } from "lucide-react";

interface Topic {
    id: string;
    topicName: string;
    topicDecription: string;
    level: string;
    status: string;
    lessonCount: number;
    studentCount: number;
    createdAt: string;
}

interface TopicTableProps {
    topics: Topic[];
    selectedTopics: string[];
    onSelectTopic: (topicId: string) => void;
    onSelectAll: () => void;
    onViewTopic: (topic: Topic) => void;
    onEditTopic: (topic: Topic) => void;
    onDeleteTopic: (topic: Topic) => void;
    isUpdating: boolean;
    isDeleting: boolean;
}

const getLevelBadge = (level: string) => {
    const levelColors: { [key: string]: string } = {
        A1: "bg-green-100 text-green-800",
        A2: "bg-blue-100 text-blue-800",
        B1: "bg-yellow-100 text-yellow-800",
        B2: "bg-orange-100 text-orange-800",
        C1: "bg-red-100 text-red-800",
        C2: "bg-purple-100 text-purple-800",
    };
    return (
        <Badge className={levelColors[level] || "bg-gray-100 text-gray-800"}>
            {level}
        </Badge>
    );
};

const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: string } = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-red-100 text-red-800",
        draft: "bg-yellow-100 text-yellow-800",
    };
    return (
        <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
            {status === "active" ? "Hoạt động" : status === "inactive" ? "Không hoạt động" : "Bản nháp"}
        </Badge>
    );
};

export default function TopicTable({
    topics,
    selectedTopics,
    onSelectTopic,
    onSelectAll,
    onViewTopic,
    onEditTopic,
    onDeleteTopic,
    isUpdating,
    isDeleting
}: TopicTableProps) {
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
                                    checked={selectedTopics.length === topics.length && topics.length > 0}
                                    onChange={onSelectAll}
                                    className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                                />
                            </th>
                            <th className="px-6 py-4 text-left text-[#8B4513] font-semibold font-calistoga-regular">
                                Chủ đề
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
                        {topics.map((topic: Topic, index: number) => (
                            <motion.tr
                                key={topic.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="border-b border-[#D2B48C]/30 hover:bg-[#F5F3EA]/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedTopics.includes(topic.id)}
                                        onChange={() => onSelectTopic(topic.id)}
                                        className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-[#D2B48C] bg-gradient-to-r from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white font-bold text-sm">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-[#8B4513] font-calistoga-regular">
                                                {topic.topicName}
                                            </div>
                                            <div className="text-sm text-[#A0522D] max-w-xs truncate">
                                                {topic.topicDecription}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{getLevelBadge(topic.level)}</td>
                                <td className="px-6 py-4">{getStatusBadge(topic.status)}</td>
                                <td className="px-6 py-4 text-[#8B4513] font-medium font-calistoga-regular">
                                    <div className="flex items-center">
                                        <BookOpen className="w-4 h-4 mr-1" />
                                        {topic.lessonCount}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#8B4513] font-medium font-calistoga-regular">
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {topic.studentCount}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[#8B4513] font-medium font-calistoga-regular">
                                    <div className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {topic.createdAt ? new Date(topic.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-[#8B4513] hover:bg-[#F5F3EA]"
                                            title="Xem chi tiết"
                                            onClick={() => onViewTopic(topic)}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-[#8B4513] hover:bg-[#F5F3EA]"
                                            onClick={() => onEditTopic(topic)}
                                            disabled={isUpdating}
                                            title="Chỉnh sửa"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-600 hover:bg-red-50"
                                            onClick={() => onDeleteTopic(topic)}
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
                {topics.map((topic: Topic, index: number) => (
                    <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white rounded-xl border border-[#D2B48C]/30 p-4 shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={selectedTopics.includes(topic.id)}
                                    onChange={() => onSelectTopic(topic.id)}
                                    className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                                />
                                <div className="w-10 h-10 rounded-full border-2 border-[#D2B48C] bg-gradient-to-r from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white font-bold text-sm">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-[#8B4513] hover:bg-[#F5F3EA] p-2"
                                    title="Xem chi tiết"
                                    onClick={() => onViewTopic(topic)}
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-[#8B4513] hover:bg-[#F5F3EA] p-2"
                                    onClick={() => onEditTopic(topic)}
                                    disabled={isUpdating}
                                    title="Chỉnh sửa"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-600 hover:bg-red-50 p-2"
                                    onClick={() => onDeleteTopic(topic)}
                                    disabled={isDeleting}
                                    title="Xóa"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <h3 className="font-medium text-[#8B4513] text-lg mb-1 font-calistoga-regular">
                                {topic.topicName}
                            </h3>
                            <p className="text-sm text-[#A0522D] mb-2">
                                {topic.topicDecription}
                            </p>
                            <div className="flex items-center space-x-2 mb-2">
                                {getLevelBadge(topic.level)}
                                {getStatusBadge(topic.status)}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center text-[#8B4513] font-calistoga-regular">
                                <BookOpen className="w-4 h-4 mr-2" />
                                <span>{topic.lessonCount} bài học</span>
                            </div>
                            <div className="flex items-center text-[#8B4513] font-calistoga-regular">
                                <Users className="w-4 h-4 mr-2" />
                                <span>{topic.studentCount} người học</span>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-[#D2B48C]/30">
                            <div className="flex items-center text-xs text-[#A0522D]">
                                <Calendar className="w-3 h-3 mr-1" />
                                {topic.createdAt ? new Date(topic.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

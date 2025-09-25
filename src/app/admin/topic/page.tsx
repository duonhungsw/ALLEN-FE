"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import {
  useAdminTopics,
  useCreateTopic,
  useUpdateTopic,
  useDeleteTopic,
} from "@/hooks/admin/useAdminTopic";

import TopicHeader from "@/components/admin/Topic/TopicHeader";
import TopicTable from "@/components/admin/Topic/TopicTable";
import TopicPagination from "@/components/admin/Topic/TopicPagination";
import TopicModals from "@/components/admin/Topic/TopicModals";
import { TopicType } from "@/types/admin/topic";

export default function TopicManagement() {

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  const { searchInput, setSearchInput, searchTerm } = useDebounceSearch({
    delay: 500,
    onSearch: () => {
      setCurrentPage(1);
    },
  });

  const filters = {
    Top: itemsPerPage,
    Skip: (currentPage - 1) * itemsPerPage,
    SearchText: searchTerm,
    NeedTotalCount: true,
  };

  const { data: topicsData, isLoading } = useAdminTopics(filters);
  const createTopicMutation = useCreateTopic();
  const updateTopicMutation = useUpdateTopic();
  const deleteTopicMutation = useDeleteTopic();

  const topics = topicsData?.data || [];
  const totalCount = topicsData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const openCreateModal = () => {
    setTopicName("");
    setTopicDescription("");
    setCreateModalOpen(true);
  };

  const openUpdateModal = (topic: TopicType) => {
    setSelectedTopic(topic);
    setTopicName(topic.topicName || "");
    setTopicDescription(topic.topicDecription || "");
    setUpdateModalOpen(true);
  };

  const openDeleteModal = (topic: TopicType) => {
    setSelectedTopic(topic);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setCreateModalOpen(false);
    setUpdateModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedTopic(null);
    setTopicName("");
    setTopicDescription("");
  };

  // CRUD handlers
  const handleCreateTopic = async () => {
    if (!topicName.trim()) return;

    try {
      await createTopicMutation.mutateAsync({
        topicName: topicName.trim(),
        topicDecription: topicDescription.trim(),
      });
      closeModals();
    } catch (error) {
      console.error("Error creating topic:", error);
    }
  };

  const handleUpdateTopic = async () => {
    if (!topicName.trim() || !selectedTopic) return;

    try {
      await updateTopicMutation.mutateAsync({
        topicId: selectedTopic.id,
        data: {
          topicName: topicName.trim(),
          topicDecription: topicDescription.trim(),
        },
      });
      closeModals();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  const handleDeleteTopic = async () => {
    if (!selectedTopic) return;

    try {
      await deleteTopicMutation.mutateAsync(selectedTopic.id);
      closeModals();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleDeleteSelectedTopics = async () => {
    if (selectedTopics.length === 0) return;

    try {
      await Promise.all(
        selectedTopics.map((id) => deleteTopicMutation.mutateAsync(id))
      );
      setSelectedTopics([]);
    } catch (error) {
      console.error("Error deleting selected topics:", error);
    }
  };

  // Selection handlers
  const handleSelectTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTopics.length === topics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(topics.map((topic: TopicType) => topic.id));
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

  // Filter handlers
  const clearSearch = () => {
    setSearchInput("");
  };

  const handleResetFilters = () => {
    clearSearch();
    setCurrentPage(1);
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F5F3EA" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#8B4513] font-calistoga-regular">Đang tải chủ đề...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TopicHeader
        onCreateTopic={openCreateModal}
        isCreating={createTopicMutation.isPending}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#D2B48C]/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513] w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc mô tả... (tự động search)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] placeholder:text-[#A0522D] placeholder:font-medium font-calistoga-regular"
            />
          </div>

          <div className="flex space-x-2">
            {selectedTopics.length > 0 && (
              <Button
                variant="destructive"
                className="text-white font-calistoga-regular"
                onClick={handleDeleteSelectedTopics}
                disabled={deleteTopicMutation.isPending}
              >
                {deleteTopicMutation.isPending ? "Đang xóa..." : `Xóa (${selectedTopics.length})`}
              </Button>
            )}
            <Button
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white font-calistoga-regular"
              onClick={handleResetFilters}
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </motion.div>

      <TopicTable
        topics={topics}
        selectedTopics={selectedTopics}
        onSelectTopic={handleSelectTopic}
        onSelectAll={handleSelectAll}
        onViewTopic={(topic) => console.log("View topic:", topic)}
        onEditTopic={openUpdateModal}
        onDeleteTopic={openDeleteModal}
        isUpdating={updateTopicMutation.isPending}
        isDeleting={deleteTopicMutation.isPending}
      />

      {totalPages > 1 && (
        <TopicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}

      <TopicModals
        createModalOpen={createModalOpen}
        onCreateModalChange={setCreateModalOpen}
        onCreateTopic={handleCreateTopic}
        isCreating={createTopicMutation.isPending}
        updateModalOpen={updateModalOpen}
        onUpdateModalChange={setUpdateModalOpen}
        onUpdateTopic={handleUpdateTopic}
        isUpdating={updateTopicMutation.isPending}
        selectedTopic={selectedTopic}
        deleteModalOpen={deleteModalOpen}
        onDeleteModalChange={setDeleteModalOpen}
        onDeleteTopic={handleDeleteTopic}
        isDeleting={deleteTopicMutation.isPending}
        topicName={topicName}
        onTopicNameChange={setTopicName}
        topicDescription={topicDescription}
        onTopicDescriptionChange={setTopicDescription}
      />
    </div>
  );
}

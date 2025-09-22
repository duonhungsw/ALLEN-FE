"use client";

import { useState, useEffect } from "react";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import {
  useAdminTopics,
  useCreateTopic,
  useUpdateTopic,
  useDeleteTopic,
} from "@/hooks/admin/useAdminTopic";

import TopicHeader from "@/components/admin/Topic/TopicHeader";
import SkillTypeTabs from "@/components/admin/Topic/SkillTypeTabs";
import TopicFilters from "@/components/admin/Topic/TopicFilters";
import TopicTable from "@/components/admin/Topic/TopicTable";
import TopicPagination from "@/components/admin/Topic/TopicPagination";
import TopicModals from "@/components/admin/Topic/TopicModals";
import { TopicType } from "@/types/admin/topic";

export default function TopicManagement() {
  const [activeSkillType, setActiveSkillType] = useState<
    "Speaking" | "Listening" | "Writing" | "Reading"
  >("Speaking");
  const [statusFilter, setStatusFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  const { searchInput, setSearchInput, searchTerm } = useDebounceSearch({
    delay: 500,
  });

  const filters = {
    SkillType: activeSkillType,
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
    setStatusFilter("all");
    setLevelFilter("all");
    setActiveSkillType("Speaking");
    setCurrentPage(1);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSkillType, searchTerm, statusFilter, levelFilter]);

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

      <SkillTypeTabs
        activeSkillType={activeSkillType}
        onSkillTypeChange={(value) => {
          setActiveSkillType(value);
          setCurrentPage(1);
        }}
      />

      <TopicFilters
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        levelFilter={levelFilter}
        onLevelFilterChange={setLevelFilter}
        selectedTopics={selectedTopics}
        onDeleteSelected={handleDeleteSelectedTopics}
        onResetFilters={handleResetFilters}
        isDeleting={deleteTopicMutation.isPending}
      />

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
        activeSkillType={activeSkillType}
      />
    </div>
  );
}

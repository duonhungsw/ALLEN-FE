"use client";

import { useState, useEffect } from "react";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import {
    useAdminCategorys,
    useCreateCategory,
    useUpdateCategory,
    useDeleteCategory
} from "@/hooks/admin/useAdminCategory";
import { CategoryFilters as CategoryFiltersType } from "@/shared/api/admin/category.api";
import CategoryHeader from "@/components/admin/Category/CategoryHeader";
import SkillTypeTabs from "@/components/admin/Category/SkillTypeTabs";
import CategoryFilters from "@/components/admin/Category/CategoryFilters";
import CategoryTable from "@/components/admin/Category/CategoryTable";
import CategoryPagination from "@/components/admin/Category/CategoryPagination";
import CategoryModals from "@/components/admin/Category/CategoryModals";
import { CategoryType } from "@/types/admin/category";

export default function CategoryManagement() {
    const [activeSkillType, setActiveSkillType] = useState<
        "Speaking" | "Listening" | "Writing" | "Reading"
    >("Speaking");
    const [statusFilter, setStatusFilter] = useState("all");
    const [levelFilter, setLevelFilter] = useState("all");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [categoryName, setCategoryName] = useState("");
    const { searchInput, setSearchInput, searchTerm } = useDebounceSearch({
        delay: 200,
    });

    const filters: CategoryFiltersType = {
        SkillType: activeSkillType,
        Top: itemsPerPage,
        Skip: (currentPage - 1) * itemsPerPage,
        SearchText: searchTerm,
        NeedTotalCount: true,
    };

    const { data: categoriesData, isLoading } = useAdminCategorys(filters);
    const createCategoryMutation = useCreateCategory();
    const updateCategoryMutation = useUpdateCategory();
    const deleteCategoryMutation = useDeleteCategory();

    const categories = categoriesData?.data || [];
    const totalCount = categoriesData?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const openCreateModal = () => {
        setCategoryName("");
        setCreateModalOpen(true);
    };

    const openUpdateModal = (category: CategoryType) => {
        setSelectedCategory(category);
        setCategoryName(category.name);
        setUpdateModalOpen(true);
    };

    const openDeleteModal = (category: CategoryType) => {
        setSelectedCategory(category);
        setDeleteModalOpen(true);
    };

    const closeModals = () => {
        setCreateModalOpen(false);
        setUpdateModalOpen(false);
        setDeleteModalOpen(false);
        setSelectedCategory(null);
        setCategoryName("");
    };

    // CRUD handlers
    const handleCreateCategory = async () => {
        if (!categoryName.trim()) return;

        try {
            await createCategoryMutation.mutateAsync({
                name: categoryName.trim(),
                skillType: activeSkillType
            });
            closeModals();
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const handleUpdateCategory = async () => {
        if (!categoryName.trim() || !selectedCategory) return;

        try {
            await updateCategoryMutation.mutateAsync({
                categoryId: selectedCategory.id,
                data: {
                    name: categoryName.trim(),
                    skillType: activeSkillType
                }
            });
            closeModals();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategory) return;

        try {
            await deleteCategoryMutation.mutateAsync(selectedCategory.id);
            closeModals();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleDeleteSelectedCategories = async () => {
        if (selectedCategories.length === 0) return;

        try {
            await Promise.all(
                selectedCategories.map((id) => deleteCategoryMutation.mutateAsync(id))
            );
            setSelectedCategories([]);
        } catch (error) {
            console.error("Error deleting selected categories:", error);
        }
    };

    // Selection handlers
    const handleSelectCategory = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSelectAll = () => {
        if (selectedCategories.length === categories.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(categories.map((category: CategoryType) => category.id));
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
                    <p className="text-[#8B4513] font-calistoga-regular">Đang tải danh mục...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <CategoryHeader
                onCreateCategory={openCreateModal}
                isCreating={createCategoryMutation.isPending}
            />

            <SkillTypeTabs
                activeSkillType={activeSkillType}
                onSkillTypeChange={(value) => {
                    setActiveSkillType(value);
                    setCurrentPage(1);
                }}
            />

            <CategoryFilters
                searchInput={searchInput}
                onSearchChange={setSearchInput}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                levelFilter={levelFilter}
                onLevelFilterChange={setLevelFilter}
                selectedCategories={selectedCategories}
                onDeleteSelected={handleDeleteSelectedCategories}
                onResetFilters={handleResetFilters}
                isDeleting={deleteCategoryMutation.isPending}
            />

            <CategoryTable
                categories={categories}
                selectedCategories={selectedCategories}
                onSelectCategory={handleSelectCategory}
                onSelectAll={handleSelectAll}
                onViewCategory={(category) => console.log("View category:", category)}
                onEditCategory={openUpdateModal}
                onDeleteCategory={openDeleteModal}
                isUpdating={updateCategoryMutation.isPending}
                isDeleting={deleteCategoryMutation.isPending}
            />

            {totalPages > 1 && (
                <CategoryPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCount={totalCount}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onPreviousPage={handlePreviousPage}
                    onNextPage={handleNextPage}
                    activeSkillType={activeSkillType}
                />
            )}

            <CategoryModals
                createModalOpen={createModalOpen}
                onCreateModalChange={setCreateModalOpen}
                onCreateCategory={handleCreateCategory}
                isCreating={createCategoryMutation.isPending}
                updateModalOpen={updateModalOpen}
                onUpdateModalChange={setUpdateModalOpen}
                onUpdateCategory={handleUpdateCategory}
                isUpdating={updateCategoryMutation.isPending}
                selectedCategory={selectedCategory}
                deleteModalOpen={deleteModalOpen}
                onDeleteModalChange={setDeleteModalOpen}
                onDeleteCategory={handleDeleteCategory}
                isDeleting={deleteCategoryMutation.isPending}
                categoryName={categoryName}
                onCategoryNameChange={setCategoryName}
                activeSkillType={activeSkillType}
            />
        </div>
    );
}

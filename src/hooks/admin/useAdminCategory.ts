import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllCategorys, 
  DeleteCategory, 
  CreateCategory, 
  UpdateCategory, 
  getCategoryById,
  CategoryFilters 
} from "@/shared/api/admin/category.api";
import { toast } from "sonner";

export const useAdminCategorys = (filters: CategoryFilters) => {
  return useQuery({
    queryKey: ["admin-category", filters],
    queryFn: () => getAllCategorys(filters),
    enabled: true,
  });
};

export const useCategoryById = (categoryId: string) => {
  return useQuery({
    queryKey: ["admin-category", categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: !!categoryId,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-category"] });
      toast.success("Create category successfully");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: { name: string; skillType: string } }) =>
      UpdateCategory(categoryId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-category"] });
      queryClient.invalidateQueries({ queryKey: ["admin-category", variables.categoryId] });
      toast.success("Update category successfully");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-category"] });
      toast.success("Delete category successfully");
    },
  });
};


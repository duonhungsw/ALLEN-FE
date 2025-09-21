import { useQuery } from "@tanstack/react-query";
import { getAllCategorys, CategoryFilters } from "@/shared/api/admin/category.api";

export const useAdminCategorys = (filters: CategoryFilters) => {
  return useQuery({
    queryKey: ["admin-category", filters],
    queryFn: () => getAllCategorys(filters),
    enabled: true,
  });
};


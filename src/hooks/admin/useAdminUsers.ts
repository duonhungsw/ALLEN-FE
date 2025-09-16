import { useQuery } from "@tanstack/react-query";
import { getAllUsers, UserFilters } from "@/shared/api/admin.api";

export const useAdminUsers = (filters: UserFilters = {}) => {
  return useQuery({
    queryKey: ["admin-users", filters],
    queryFn: () => getAllUsers(filters),
  });
};
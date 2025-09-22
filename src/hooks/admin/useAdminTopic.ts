import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllTopics, 
  DeleteTopic, 
  CreateTopic, 
  UpdateTopic, 
  getTopicById,
  TopicFilters 
} from "@/shared/api/admin/topic.api";
import { toast } from "sonner";

export const useAdminTopics = (filters: TopicFilters) => {
  return useQuery({
    queryKey: ["admin-topic", filters],
    queryFn: () => getAllTopics(filters),
    enabled: true,
  });
};

export const useTopicById = (topicId: string) => {
  return useQuery({
    queryKey: ["admin-topic", topicId],
    queryFn: () => getTopicById(topicId),
    enabled: !!topicId,
  });
};

export const useCreateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-topic"] });
      toast.success("Tạo topic thành công!");
    },
  });
};

export const useUpdateTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ topicId, data }: { topicId: string; data: { topicName: string; topicDecription: string } }) =>
      UpdateTopic(topicId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-topic"] });
      queryClient.invalidateQueries({ queryKey: ["admin-topic", variables.topicId] });
      toast.success("Cập nhật topic thành công!");
    },
  });
};

export const useDeleteTopic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-topic"] });
      toast.success("Xóa topic thành công!");
    },
  });
};
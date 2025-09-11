import { useHasMounted } from "@/hooks/useHasMounted";
import { useQuery, UseQueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPostsPaging, createPost, fetchComment, fetchCommentReply } from "@/shared/api/community.api";
import { PagingParams, PagingResponse, ApiPost, CreatePostPayload } from "@/types/posType";

export const useCommunity = (
  params: PagingParams,
  options?: Omit<
    UseQueryOptions<PagingResponse<ApiPost>, Error, PagingResponse<ApiPost>>,
    "queryKey" | "queryFn"
  >
) => {
  const hasMounted = useHasMounted();
  return useQuery<PagingResponse<ApiPost>, Error>({
    queryKey: ["posts", params],
    queryFn: () => fetchPostsPaging(params),
    enabled: hasMounted && typeof params?.page === "number" && typeof params?.size === "number",
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...(options || {}),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useFetchComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentID: string) => fetchComment(commentID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useFetchReplyComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentID: string) => fetchCommentReply(commentID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
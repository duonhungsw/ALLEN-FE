import { useHasMounted } from "@/hooks/useHasMounted";
import { useQuery, UseQueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostsPaging, createPost, getComment, getCommentReply } from "@/shared/api/community/community.api";
import { PagingParams, PagingResponse, ApiPost, CreatePostPayload } from "@/types/postType";

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
    queryFn: () => getPostsPaging(params),
    enabled: hasMounted && typeof params?.page === "number" && typeof params?.size === "number",
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
    mutationFn: (commentID: string) => getComment(commentID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useFetchReplyComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentID: string) => getCommentReply(commentID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
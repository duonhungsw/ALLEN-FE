import { useHasMounted } from "@/hooks/useHasMounted";
import { useQuery, UseQueryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostsPaging, createPost, getComment, getCommentReply, postComment, deleteComment, updateComment, postReaction, getPostById, getReactionByUser, getReaction } from "@/shared/api/community/community.api";
import { PagingParams, PagingResponse, ApiPost, CreatePostPayload, UpdateCommentPayload, reactionByUserPayload } from "@/types/postType";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/ErrorHandle";

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

export const useGetPostById = () => {
  return useMutation({
    mutationFn: getPostById,
    onSuccess: () => {
      toast.success('get post by ID successfully');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
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

export const usePostComment = () => {
  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      toast.success('Create comment successfully');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: (payload: UpdateCommentPayload) => updateComment(payload),
    onSuccess: () => {
      toast.success('Update comment successfully');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success('Delete comment successfully');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};

export const useGetReaction = () => {
  return useMutation({
    mutationFn: getReaction,
    // onSuccess: () => {
    //   toast.success('get reaction successfully');
    // },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};

export const useGetReactionByUser= () => {
  return useMutation({
    mutationFn: (payload: reactionByUserPayload) => getReactionByUser(payload),
    onSuccess: () => {
      toast.success('get reaction by user successfully');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};

export const usePostReaction = () => {
  return useMutation({
    mutationFn: postReaction,
    onSuccess: () => {
      toast.success('Send reaction successfully');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};


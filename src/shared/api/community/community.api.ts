import api from "@/shared/api/index";
import { APP_URL } from "@/shared/constants/apiConstants";
import { ReactionType } from "@/types/emunType";
import { CreatePostPayload, PagingParams, reactionByUserPayload, UpdateCommentPayload } from "@/types/postType";

export const getPostsPaging = async (params: PagingParams) => {
  const queryParams = {
    Skip: params.page ?? 0,
    Top: params.size ?? 10,
    SearchText: params.search ?? "",
    NeedTotalCount: true,
    Privacy: params.privacy ?? "Public",
    OrderBy: params.sort ?? "CreateAt",
  };

  const response = await api.get(`${APP_URL}/posts/paging`, {
    params: queryParams,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const apiData = response.data;

  return {
    data: apiData?.data ?? [],
    total: apiData?.totalCount ?? 0,
    page: params.page,
    size: params.size,
  };
};

export const getPostById = async (postId: string) => {
  const response = await api.get(`${APP_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const createPost = async (payload: CreatePostPayload) => {
  const formData = new FormData();
  formData.append("UserId", payload.usesId);
  formData.append("Content", payload.content);
  formData.append("Privacy", payload.privacy);
  console.log(payload.images);

  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((file) => {
      formData.append("Images", file);
    });
  }
  const response = await api.post(`${APP_URL}/posts`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getComment = async (commentID: string) => {
  const response = await api.get(`${APP_URL}/comments/root/${commentID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const getCommentReply = async (commentID: string) => {
  const response = await api.get(`${APP_URL}/comments/replies/${commentID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const postComment = async (data: {
  objectId: string;
  userId: string;
  commentParentId?: string;
  content: string;
}) => {
  const response = await api.post(`${APP_URL}/comments`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const updateComment = async ({ commentId, data }: UpdateCommentPayload) => {
  const response = await api.patch(`${APP_URL}/comments/${commentId}`, {data}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const deleteComment = async (commentId: string) => {
  const response = await api.delete(`${APP_URL}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const getReaction = async (postId: string) => {
  const response = await api.get(`${APP_URL}/reactions/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const getReactionByUser = async ({postId, userId}: reactionByUserPayload) => {
  const response = await api.get(`${APP_URL}/reactions/${postId}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const postReaction = async (data: {
  objectId: string;
  reactionType?: ReactionType;
}) => {
  const response = await api.post(`${APP_URL}/reactions`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

import api from "./index";
import { APP_URL } from "../constants/apiConstants";
import { ApiPost, CreatePostPayload, PagingParams, PagingResponse } from "@/types/posType";

export const fetchPostsPaging = async (
  params: PagingParams
): Promise<PagingResponse<ApiPost>> => {
  const queryParams: Record<string, string | number | boolean> = {
    // Backend expects these exact names/casing (per Postman screenshot):
    Skip: params.page ?? 0 ,          // zero-based offset
    Top: params.size ?? 10,           // page size
    SearchText: params.search ?? "",
    NeedTotalCount: true,
    Privacy: params.privacy ?? "Public",
    OrderBy: params.sort ?? "CreateAt",
  };
  // Optionally pass category/sort if provided and supported by backend
  if (params.category) queryParams.Category = params.category;
  if (params.sort) queryParams.OrderBy = params.sort;
  // Some backends require explicit privacy filter; default to Public
  if (!('privacy' in queryParams)) queryParams.privacy = 'Public';

  const response = await api.get(`${APP_URL}/posts/paging`, {
    params: queryParams,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const apiData = response.data;

  return {
    data: response.data.data,
    total: apiData?.totalCount ?? 0,
    page: params.page,
    size: params.size,
  };
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

export const fetchComment = async (commentID: string) => {
  const response = await api.get(`${APP_URL}/comments/root/${commentID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const fetchCommentReply = async (commentID: string) => {
  const response = await api.get(`${APP_URL}/comments/replies/${commentID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

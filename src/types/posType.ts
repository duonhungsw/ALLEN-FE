import { Privacy } from "./emunType";

export interface PagingParams {
  page: number; // zero-based offset mapped to Skip
  size: number; // mapped to Top
  search?: string; // mapped to SearchText
  category?: string | null;
  sort?: string; // mapped to OrderBy
  privacy: Privacy;
}

export interface PagingResponse<TData> {
  data: TData[];
  total: number;
  page: number;
  size: number;
  [key: string]: unknown;
}

export type ApiPost = {
  id: string
  userName: string
  userAvatar: string
  content: string
  medias: string[]
  createdAt: string
  totalReaction?: number
  totalComment?: number
  privacy?: Privacy
  lever?: string
}

export type CreatePostPayload = {
  usesId: string;
  content: string;
  privacy: Privacy;
  medias?: string[];
  category?: string;
};

export interface Comment {
  id: string
  objectId: string
  userId: string
  userAvatar: string
  userName: string
  content: string
  commentParentId: string
  replyToUserName: string
  replyCount: 0
  totalReaction: 0
  createdAt: string
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
  role?: string;
}

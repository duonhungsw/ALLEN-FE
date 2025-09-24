import { Privacy } from "./emunType";

export interface PagingParams {
  page: number; 
  size: number;
  search?: string;
  category?: string | null;
  sort?: string;
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
  userId: string
  userName: string
  userAvatar: string
  content: string
  medias: string[]
  createdAt: string
  totalReaction?: number
  totalComment?: number
  privacy?: Privacy
  lever?: string
  reactions?: any
}

export type CreatePostPayload = {
  usesId: string;
  content: string;
  privacy: Privacy;
  images?: File[];
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
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
}

export interface Reaction {
  type: string;
  emoji: string;
  label: string;
  color: string;
}

export interface UpdateCommentPayload {
  commentId: string;
  data: {
    userId: string;
    content: string;
  };
}

export const reactions: Reaction[] = [
  { type: "Like", emoji: "👍", label: "Thích", color: "text-blue-600" },
  { type: "Love", emoji: "❤️", label: "Yêu thích", color: "text-red-600" },
  { type: "Haha", emoji: "😂", label: "Haha", color: "text-yellow-600" },
  { type: "Wow", emoji: "😮", label: "Wow", color: "text-orange-600" },
  { type: "Sad", emoji: "😢", label: "Buồn", color: "text-yellow-700" },
  { type: "Angry", emoji: "😡", label: "Phẫn nộ", color: "text-red-700" },
]

export interface reactionByUserPayload {
  postId: string,
  userId: string
}

export interface dataReaction{
  id: string,
  objectId: string,
  objectType: string,
  userId: string,
  userName: string,
  reactionType: string
}

export interface ReactionSummary extends Reaction {
  count: number
}
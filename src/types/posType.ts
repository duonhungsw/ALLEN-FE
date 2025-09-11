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

// export interface CommunityPost {
//   id: string;
//   author: {
//     name: string;
//     avatar: string;
//     level?: string;
//     points?: number;
//   };
//   content: string;
//   images?: string[];
//   timestamp?: string;
//   likes?: number;
//   comments?: number;
//   shares?: number;
//   category?: string;
//   privacy?: string;
//   reactions: {
//     like: number
//     love: number
//     wow: number
//   }
// }

export type ApiPost = {
  id: string
  userName: string
  userAvatar: string | null
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

// export interface Comment {
//   id: string
//   author: {
//     name: string
//     avatar: string
//   }
//   content: string
//   timestamp: string
//   likes: number
//   replies?: Comment[]
//   reactions: {
//     like: number
//     love: number
//     wow: number
//   }
// }

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
import api from "./index";
import { APP_URL } from "../constants/apiConstants";

export interface UserFilters {
  Top?: number;
  Skip?: number;
  SearchText?: string;
  OrderType?: number;
  OrderBy?: string;
  NeedTotalCount?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  joinDate: string;
  lastActive: string;
  totalLessons: number;
  picture?: string;
  avatar?: string;
}

export interface UsersResponse {
  data: User[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const getAllUsers = async (filters: UserFilters = {}): Promise<UsersResponse> => {
  const params = new URLSearchParams();
  
  if (filters.Top) params.append('Top', filters.Top.toString());
  if (filters.Skip) params.append('Skip', filters.Skip.toString());
  if (filters.SearchText) params.append('SearchText', filters.SearchText);
  if (filters.OrderType !== undefined) params.append('OrderType', filters.OrderType.toString());
  if (filters.OrderBy) params.append('OrderBy', filters.OrderBy);
  if (filters.NeedTotalCount !== undefined) params.append('NeedTotalCount', filters.NeedTotalCount.toString());

  const response = await api.get(`${APP_URL}/users/paging?${params.toString()}`);
  console.log("11",response.data);
  
  return response.data;
};
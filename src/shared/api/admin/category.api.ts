import api from "../index";
import { APP_URL } from "../../constants/apiConstants";

export interface CategoryFilters {
  SkillType: 'Speaking' | 'Listening' | 'Writing' | 'Reading';
  Top?: number;
  Skip?: number;
  SearchText?: string;
  OrderType?: number;
  OrderBy?: string;
  NeedTotalCount?: boolean;
}

export interface CategoryResponse {
  data: any[];
  totalCount?: number;
}

export const getAllCategorys = async (filters: CategoryFilters): Promise<CategoryResponse> => {
  const params: any = {};
  params.SkillType = filters.SkillType;
  if (filters?.Top) params['QueryInfo.Top'] = filters.Top;
  if (filters?.Skip) params['QueryInfo.Skip'] = filters.Skip;
  if (filters?.SearchText) params['QueryInfo.SearchText'] = filters.SearchText;
  if (filters?.OrderType) params['QueryInfo.OrderType'] = filters.OrderType;
  if (filters?.OrderBy) params['QueryInfo.OrderBy'] = filters.OrderBy;
  if (filters?.NeedTotalCount !== undefined) params['QueryInfo.NeedTotalCount'] = filters.NeedTotalCount;

  const response = await api.get(`${APP_URL}/categories`, {
    params
  });
  
  return response.data;
}

export const DeleteCategory = async (categoryId: string) => {
  const response = await api.delete(`${APP_URL}/categories/${categoryId}`);
  return response.data;
}

export const CreateCategory = async (data: { name: string; skillType: string;}) => {
  const response = await api.post(`${APP_URL}/categories`, data);
  return response.data;
}
export const UpdateCategory = async (categoryId: string, data: { name: string; skillType: string;}) => {
  const response = await api.patch(`${APP_URL}/categories/${categoryId}`, data);
  return response.data;
}

export const getCategoryById = async (categoryId: string) => {
  const response = await api.get(`${APP_URL}/categories/${categoryId}`);
  return response.data;
}
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
  // SkillType là bắt buộc
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
import api from "../index";
import { APP_URL } from "../../constants/apiConstants";

export interface TopicFilters {
    SkillType: 'Speaking' | 'Listening' | 'Writing' | 'Reading';    
    Top?: number;
    Skip?: number;
    SearchText?: string;
    OrderType?: number;
    OrderBy?: string;
    NeedTotalCount?: boolean;
}   

export interface TopicResponse {
    data: any[];
    totalCount?: number;
}           

export const getAllTopics = async (filters: TopicFilters): Promise<TopicResponse> => {
    const params: any = {};
    params.SkillType = filters.SkillType;
    if (filters?.Top) params['QueryInfo.Top'] = filters.Top;
    if (filters?.Skip) params['QueryInfo.Skip'] = filters.Skip;
    if (filters?.SearchText) params['QueryInfo.SearchText'] = filters.SearchText;
    if (filters?.OrderType) params['QueryInfo.OrderType'] = filters.OrderType;
    if (filters?.OrderBy) params['QueryInfo.OrderBy'] = filters.OrderBy;
    if (filters?.NeedTotalCount !== undefined) params['QueryInfo.NeedTotalCount'] = filters.NeedTotalCount;

    const response = await api.get(`${APP_URL}/topics`, {
        params
    });
    
    return response.data;
}

export const DeleteTopic = async (topicId: string) => {
    const response = await api.delete(`${APP_URL}/topics/${topicId}`);
    return response.data;
}

export const CreateTopic = async (data: { topicName: string; topicDecription: string;}) => {
    const response = await api.post(`${APP_URL}/topics`, data);
    return response.data;
}

export const UpdateTopic = async (topicId: string, data: { topicName: string; topicDecription: string;}) => {
    const response = await api.put(`${APP_URL}/topics/${topicId}`, data);
    return response.data;
}

export const getTopicById = async (topicId: string) => {
    const response = await api.get(`${APP_URL}/topics/${topicId}`);
    return response.data;
}
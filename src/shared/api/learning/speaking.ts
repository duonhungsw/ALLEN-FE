import api from "../index";
import { APP_URL } from "../../constants/apiConstants";
import { LearningSkillResponse } from "../.././../types/learningType";

export interface LearningSkillPayload {
  skillType: string;
  Top?: string;
  Skip?: string;
  SearchText?: string;
  OrderType?: string;
  OrderBy?: string;
  NeedTotalCount?: string;
}

export const getLearningSkill = async (payload: LearningSkillPayload): Promise<LearningSkillResponse> => {
  const response = await api.get(`${APP_URL}/learningunits/skilltype`, {
    params: payload,
  });
  return response.data;
};

export const getTranscript = async (learningUnitId: string) => {
  const response = await api.get(`${APP_URL}/speakings/${learningUnitId}/learningunit`)
  return response.data
}

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('File', file);
  const response = await api.post(`${APP_URL}/speakings/upload-file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const transcribeStream = async (file: File) => {
  const formData = new FormData();
  formData.append('File', file);
  const response = await api.post(`${APP_URL}/speakings/transcribe/stream`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
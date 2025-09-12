import api from "../index";
import { APP_URL } from "../../constants/apiConstants";

export interface LearningSkillPayload {
  skillType: string;
  Top?: string;
  Skip?: string;
  SearchText?: string;
  OrderType?: string;
  OrderBy?: string;
  NeedTotalCount?: string;
}

export const getLearningSkill = async (payload: LearningSkillPayload) => {
  const response = await api.get(`${APP_URL}/learningunits/skilltype`, {
    params: payload,
  });  
  return response.data;
};

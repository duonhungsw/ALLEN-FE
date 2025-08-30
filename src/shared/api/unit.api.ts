import api from "./index";
import { APP_URL } from "../constants/apiConstants";

export interface UnitStep {
  id: string;
  stepIndex: number;
  title: string;
  contentJson: string;
}

export interface LearningUnit {
  id: string;
  title: string;
  level: string;
  skillType: string;
  unitSteps: UnitStep[];
}

export interface LearningUnitsResponse {
  data: LearningUnit[];
}

export const getAllLearningUnits = async () => {
  try {
    const response = await api.get(`${APP_URL}/learningunits`, {
      params: {
        skip: 0,
        top: 10,
        needTotalCount: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getAllUnit = async (payload: any) => {
  const response = await api.post(`${APP_URL}/learningunits`, payload);
  return response.data;
};

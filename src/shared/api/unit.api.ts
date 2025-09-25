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

export interface LearningUnitPayload {
  skip?: number;
  top?: number;
  needTotalCount?: boolean;
  skillType?: string;
  level?: string;
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


export const getAllUnit = async (payload: LearningUnitPayload) => {
  const response = await api.post(`${APP_URL}/learningunits`, payload);
  return response.data;
};

export const getUnitSteps = async (unitId: string) => {
  try {
    const response = await api.get(`${APP_URL}/unitsteps/${unitId}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getUnitStepQuestions = async (unitStepId: string) => {
  try {
    const response = await api.get(`${APP_URL}/unitsteps/${unitStepId}/questions`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

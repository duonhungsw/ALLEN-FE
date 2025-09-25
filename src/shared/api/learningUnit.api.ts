import api from "./index";
import { APP_URL } from "@/shared/constants/apiConstants";


export const getAllLearningUnits = async () => {
    const response = await api.get(`${APP_URL}/learningunits`, {
      params: {
        skip: 0,
        top: 10,
        needTotalCount: true,
      },
    });
    return response.data;
}

export const getLearningUnitById = async (unitId: string) => {
    const response = await api.get(`${APP_URL}/learningunits/${unitId}`);
    return response.data;
};

export const createLearningUnit = async (payload: { categoryId: string; title: string; level : string;skillType: string }) => {
    const response = await api.post(`${APP_URL}/learningunits`, payload);
    return response.data;
};

export const deleteLearningUnit = async (unitId: string) => {
    const response = await api.delete(`${APP_URL}/learningunits/${unitId}`);
    return response.data;
}

export const updateLearningUnit = async (unitId: string, payload: { categoryId: string; title: string; level : string;skillType: string }) => {
    const response = await api.put(`${APP_URL}/learningunits/${unitId}`, payload);
    return response.data;
}
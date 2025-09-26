import api from "./index";
import { QuestionResponse } from "@/types/learning/learningType";
import { APP_URL } from "@/shared/constants/apiConstants";

export const getQuestions = async (moduleItemId: string) => {
  const response = await api.get<QuestionResponse>(`${APP_URL}/questions/UnitStep/${moduleItemId}`);
  return response.data.data;
};

export const createQuestion = async (payload: { moduleItemId: string; content: string; answers: { content: string; isCorrect: boolean }[] }) => {
  const response = await api.post(`${APP_URL}/questions`, payload);
  return response.data;
};

export const updateQuestion = async (questionId: string, payload: { content: string; answers: { content: string; isCorrect: boolean }[] }) => {
  const response = await api.patch(`${APP_URL}/questions/${questionId}`, payload);
  return response.data;
}

export const deleteQuestion = async (questionId: string) => {
  const response = await api.delete(`${APP_URL}/questions/${questionId}`);
  return response.data;
}
import api from "./index";
import { QuestionResponse } from "@/types/learningType";
import { APP_URL } from "@/shared/constants/apiConstants";

export const getQuestions = async (moduleItemId: string) => {
  const response = await api.get<QuestionResponse>(`${APP_URL}/questions/UnitStep/${moduleItemId}`);
  return response.data.data;
};

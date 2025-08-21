import api from "./index";
import { APP_URL } from "../constants/apiConstants";

export const getPost = async () => {
  const response = await api.get(`${APP_URL}/posts/paging`);
  return response.data;
};
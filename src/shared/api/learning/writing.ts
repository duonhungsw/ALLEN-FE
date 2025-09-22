import api from "../index";
import { APP_URL } from "../../constants/apiConstants";
import { UpdateWritingType ,createWritingType , summitWritingType } from "@/types/learning/writing";

export const getWritingById = async (writingId: string) => {
  const response = await api.get(`${APP_URL}/writings/${writingId}`)
  return response.data
}

export const updateWriting = async (writingId: string,  data : UpdateWritingType) => {
    const response = await api.patch(`${APP_URL}/writings/${writingId}`, data)
    return response.data
}

export const createWriting = async (data : createWritingType) => {
    const response = await api.post(`${APP_URL}/writings`, data)
    return response.data
}

export const deleteWriting = async (writingId: string) => {
    const response = await api.delete(`${APP_URL}/writings/${writingId}`)
    return response.data
}

export const summitWriting = async (data: summitWritingType) => {
    const response = await api.post(`${APP_URL}/writings/submit` ,data)
    return response.data
}
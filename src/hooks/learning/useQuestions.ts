import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/shared/api/question.api";

export const useQuestions = ( moduleItemId: string) => {
  return useQuery({
    queryKey: ["questions", moduleItemId],
    queryFn: async () => {
      const data = await getQuestions(moduleItemId);
      return data;
    },
  });
};
//moduleItemId
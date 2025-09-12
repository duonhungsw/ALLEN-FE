import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/shared/api/question.api";
import { getLearningSkill, LearningSkillPayload } from "@/shared/api/learning/speaking";

export const useQuestions = (moduleItemId: string) => {
  return useQuery({
    queryKey: ["questions", moduleItemId],
    queryFn: async () => {
      const data = await getQuestions(moduleItemId);
      return data;
    },
  });
};

export const useLearnings = (payload: LearningSkillPayload) => {
  return useQuery({
    queryKey: ["learnings", payload],
    queryFn: async () => {
      const data = await getLearningSkill(payload);
      return data;
    },
    enabled: !!payload.skillType,
  });
};
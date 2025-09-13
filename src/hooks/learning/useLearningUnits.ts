import { useQuery } from "@tanstack/react-query";
import { getAllLearningUnits, getUnitSteps, getUnitStepQuestions } from "@/shared/api/unit.api";
import { getLearningSkill } from "@/shared/api/learning/speaking";
import { LearningUnitsResponse, UnitStepsResponse, UnitStepQuestionsResponse } from "@/types/learningType";

export const useLearningUnits = () => {
  return useQuery<LearningUnitsResponse>({
    queryKey: ["learning-units"],
    queryFn: async () => {
      const data = await getAllLearningUnits();
      return data;
    },
  });
};

export const useLearningSkill = () => {
  return useQuery({
    queryKey: ["learning-skill", "speaking"],
    queryFn: async () => {
      const data = await getLearningSkill({ skillType: "speaking" });
      return data;
    },
  });
};

export const useUnitSteps = (unitId: string) => {
  return useQuery<UnitStepsResponse>({
    queryKey: ["unit-steps", unitId],
    queryFn: async () => {
      const data = await getUnitSteps(unitId);
      return data;
    },
    enabled: !!unitId,
  });
};

export const useUnitStepQuestions = (unitStepId: string) => {
  return useQuery<UnitStepQuestionsResponse>({
    queryKey: ["unit-step-questions", unitStepId],
    queryFn: async () => {
      const data = await getUnitStepQuestions(unitStepId);
      return data;
    },
    enabled: !!unitStepId,
  });
};

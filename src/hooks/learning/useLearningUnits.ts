import { useQuery } from "@tanstack/react-query";
import { getAllLearningUnits, getUnitSteps, getUnitStepQuestions } from "@/shared/api/unit.api";
import { getLearningSkill } from "@/shared/api/learning/speaking";
import { LearningUnitsResponse, UnitStepsResponse, UnitStepQuestionsResponse, LearningSkillResponse } from "@/types/learning/learningType";

export const useLearningUnits = () => {
  return useQuery<LearningUnitsResponse>({
    queryKey: ["learning-units"],
    queryFn: async () => {
      const data = await getAllLearningUnits();
      return data;
    },
  });
};

export const useLearningSkill = (skillType: string) => {
  return useQuery<LearningSkillResponse>({
    queryKey: ["learning-skill", skillType],
    queryFn: async () => {
      const data = await getLearningSkill({ skillType });
      return data;
    },
    enabled: !!skillType,
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

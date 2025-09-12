import { useQuery } from "@tanstack/react-query";
import { getAllLearningUnits } from "@/shared/api/unit.api";
import { getLearningSkill } from "@/shared/api/learning/speaking";

export const useLearningUnits = () => {
  return useQuery({
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

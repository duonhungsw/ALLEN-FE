import { useQuery } from "@tanstack/react-query";
import { getAllLearningUnits } from "@/shared/api/unit.api";

export const useLearningUnits = () => {
  return useQuery({
    queryKey: ["learning-units"],
    queryFn: async () => {
      const data = await getAllLearningUnits();
      return data;
    },
  });
};

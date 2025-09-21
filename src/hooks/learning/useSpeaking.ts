import { useQuery } from "@tanstack/react-query";
import { getTranscript } from "@/shared/api/learning/speaking";

export const useSpeaking = (learningUnitId: string) => {
  return useQuery({
    queryKey: ["speaking", learningUnitId],
    queryFn: () => getTranscript(learningUnitId),
    enabled: !!learningUnitId,
  });
};

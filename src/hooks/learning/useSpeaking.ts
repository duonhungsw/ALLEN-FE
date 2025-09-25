import { useQuery, useMutation } from "@tanstack/react-query";
import { getTranscript } from "@/shared/api/learning/speaking";
import { summitTextSpeaking } from "@/shared/api/learning/speaking";

export const useSpeaking = (learningUnitId: string) => {
  const transcriptQuery = useQuery({
    queryKey: ["speaking", learningUnitId],
    queryFn: () => getTranscript(learningUnitId),
    enabled: !!learningUnitId,
  });

  const submitSpeakingMutation = useMutation({
    mutationFn: summitTextSpeaking,
  });

  return {
    ...transcriptQuery,
    submitSpeaking: submitSpeakingMutation.mutateAsync,
    isSubmitting: submitSpeakingMutation.isPending,
  };
};

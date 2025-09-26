import { useQuery } from "@tanstack/react-query";
import { getWritingByLearningUnitId, summitWritingStream } from "@/shared/api/learning/writing";

export const useWriting = (learningUnitId: string) => {
    const writingQuery = useQuery({
        queryKey: ["writing", learningUnitId],
        queryFn: () => getWritingByLearningUnitId(learningUnitId),
        enabled: !!learningUnitId,
    });

    return {
        ...writingQuery,
        submitWriting: summitWritingStream,
    };
};

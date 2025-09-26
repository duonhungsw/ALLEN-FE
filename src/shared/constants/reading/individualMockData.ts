import { Exercise } from "@/providers/auth/types/readingType"

export const individualExercise: Exercise = {
  id: "1",
  title: "The Benefits of Reading",
  passage: `Reading is one of the most beneficial activities for the human mind. It not only provides entertainment and knowledge but also offers numerous cognitive benefits that can improve our daily lives.

First, reading enhances vocabulary and language skills. When we read regularly, we encounter new words and phrases in context, which helps us understand their meanings naturally. This exposure to diverse vocabulary strengthens our communication abilities and makes us more articulate speakers and writers.

Second, reading improves concentration and focus. In our digital age, where distractions are everywhere, reading requires sustained attention. This practice of focusing on a single task for extended periods helps train our minds to concentrate better in other areas of life.

Finally, reading reduces stress and promotes relaxation. Studies have shown that reading can lower heart rate and reduce muscle tension, making it an effective way to unwind after a busy day. The act of immersing ourselves in a good book provides an escape from daily worries and concerns.`,
  questions: [
    {
      id: "1",
      type: "multiple-choice",
      question: "According to the passage, reading helps improve:",
      options: [
        "A) Only entertainment value",
        "B) Vocabulary and language skills",
        "C) Physical strength",
        "D) Mathematical abilities",
      ],
      correctAnswers: ["B"],
      explanations: ["The passage clearly states that reading enhances vocabulary and language skills."],
    },
    {
      id: "2",
      type: "multiple-choice",
      question: "The passage suggests that reading can help with concentration because:",
      options: [
        "A) It requires sustained attention",
        "B) It is always entertaining",
        "C) It is easy to do",
        "D) It doesn't require thinking",
      ],
      correctAnswers: ["A"],
      explanations: ["The passage mentions that reading requires sustained attention, which helps train concentration."],
    },
    {
      id: "3",
      type: "true-false",
      question: "Reading can reduce stress according to the passage.",
      options: ["True", "False", "Not Given"],
      correctAnswers: ["True"],
      explanations: ["The passage explicitly states that reading reduces stress and promotes relaxation."],
    },
    {
      id: "4",
      type: "multiple-choice",
      question: "Which of the following is NOT mentioned as a benefit of reading?",
      options: ["A) Improved vocabulary", "B) Better concentration", "C) Stress reduction", "D) Enhanced memory"],
      correctAnswers: ["D"],
      explanations: ["Enhanced memory is not mentioned in the passage as a benefit of reading."],
    },
    {
      id: "5",
      type: "multiple-choice",
      question: "The passage implies that in our digital age:",
      options: [
        "A) Reading is becoming obsolete",
        "B) Distractions are everywhere",
        "C) Books are no longer popular",
        "D) Technology replaces reading",
      ],
      correctAnswers: ["B"],
      explanations: ["The passage mentions that in our digital age, distractions are everywhere."],
    },
  ],
  image: "/placeholder.svg?height=200&width=300&text=Reading",
  category: "Education",
  level: "Intermediate",
  duration: 15,
  description: "Lợi ích của việc đọc sách",
  completed: false,
  score: null,
}

import { Exercise } from "@/providers/auth/types/readingType"

export const filterExercises = (
  exercises: Exercise[],
  searchTerm: string,
  selectedCategory: string,
  selectedLevel: string
): Exercise[] => {
  return exercises.filter((exercise) => {
    const matchesSearch =
      searchTerm === "" ||
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (exercise.description && exercise.description.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || exercise.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })
}

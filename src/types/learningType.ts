export interface Category {
    id: number
    name: string
    description: string
    icon: string
    lessons: number
    level: string
    difficulty: string
    duration: string
    completed?: boolean
    score?: number
}

export interface Topic {
    id: number
    title: string
    description: string
    difficulty: string
    duration: string
    questions?: number
    completed: boolean
    score?: number | null
    participants?: number | null
    image?: string
    rating?: number | null
    lastScore?: number | null
}

export interface Exercise {
    id: string
    title: string
    level: string
    duration: string
    sentences?: number
    blanks?: number
    difficulty: string
    description: string
    completed: boolean
    score?: number | null
}

export interface FilterOptions {
    searchTerm: string
    selectedLevel: string
}

export type FilterFunction<T> = (items: T[], options: FilterOptions) => T[]

export const filterCategories: FilterFunction<Category> = (categories, { searchTerm, selectedLevel }) => {
    if (!categories || !Array.isArray(categories)) {
        return []
    }
    
    return categories.filter((category) => {
        const matchesSearch =
            searchTerm === "" ||
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesLevel = selectedLevel === "all" || category.level === selectedLevel

        return matchesSearch && matchesLevel
    })
}

export const filterTopics: FilterFunction<Topic> = (topics, { searchTerm, selectedLevel }) => {
    if (!topics || !Array.isArray(topics)) {
        return []
    }
    
    return topics.filter((topic) => {
        const matchesSearch =
            searchTerm === "" ||
            topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            topic.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesLevel = selectedLevel === "all" || topic.difficulty === selectedLevel

        return matchesSearch && matchesLevel
    })
}

export const filterExercises: FilterFunction<Exercise> = (exercises, { searchTerm, selectedLevel }) => {
    if (!exercises || !Array.isArray(exercises)) {
        return []
    }
    
    return exercises.filter((exercise) => {
        const matchesSearch =
            searchTerm === "" ||
            exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesLevel = selectedLevel === "all" || exercise.difficulty === selectedLevel

        return matchesSearch && matchesLevel
    })
}

export interface Question {
    id: string;
    moduleType?: string;
    questionType?: string;
    moduleItemId?: string;
    chart?: string | null;
    prompt?: string;
    questionText?: string;
    options: string | string[];
    correctAnswer: string;
    contentUrl?: string | null;
    explanation?: string;
}

export interface QuestionResponse {
    data: Question[];
    totalCount: number;
}

export interface UnitStep {
    id: string;
    stepIndex: number;
    title: string;
    contentJson: string;
}

export interface LearningUnit {
    id: string;
    title: string;
    level: string;
    skillType: string;
    unitSteps: UnitStep[];
}

export interface LearningUnitsResponse {
    data: LearningUnit[];
}

export interface UnitStepsResponse {
    data: UnitStep[];
}

export interface UnitStepQuestionsResponse {
    data: Question[];
}

export interface LearningSkillData {
    id: string;
    title: string;
    level: string;
    skillType: string;
    unitSteps?: UnitStep[];
}

export interface LearningSkillResponse {
    data: LearningSkillData[];
}

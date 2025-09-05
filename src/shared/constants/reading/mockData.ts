import { Exercise } from "@/providers/auth/types/readingType"

export const exercise = {
  id: "1",
  title: "Twin Study: Two of a Kind",
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-co0gVHIA3VSBeADn29dwPrLvY7Xz9M.png",
  passage: `A. The scientific study of twins goes back to the late 19th century, when Francis Galton, an early geneticist, realized that they came in two varieties: identical twins born from one egg and non-identical twins that had come from two. That insight turned out to be key, although it was not until 1924 that it was used to formulate what is known as the twin rule of pathology, and twin studies really got going.

B. The twin rule of pathology states that any heritable disease will be more concordant (that is, more likely to be jointly present or absent) in identical twins than in non-identical twins-and, in turn, will be more concordant in non-identical twins than in non-siblings. Early work, for example, showed that the statistical correlation of skin-mole counts between identical twins was 0.4, while non-identical twins had a correlation of only 0.2.

C. Twin research has shown that whether or not someone takes up smoking is determined mainly by environmental factors, but once he does so, how much he smokes is largely down to his genes. And while a person's religion is clearly a matter of upbringing, how religious he is seems to be at least partly genetic.`,
  questions: [
    {
      id: "1",
      type: "matching" as const,
      question: "Which paragraph contains the following information?",
      options: [
        "Mentioned research conducted in Ohio",
        "Medical contribution to the researches for twins",
        "Research situation under life threatening conditions",
        "Data of similarities of identical twins",
        "Reasons that make one study unconvincing",
      ],
      correctAnswers: ["A", "B", "C", "B", "C"],
      explanations: [
        "Đoạn A đề cập đến nghiên cứu của Francis Galton về cặp song sinh, đây là nghiên cứu y khoa đầu tiên.",
        "Đoạn B nói về quy tắc bệnh lý học của cặp song sinh, đây là đóng góp y khoa quan trọng.",
        "Đoạn C thảo luận về các yếu tố môi trường ảnh hưởng đến hành vi, có thể bao gồm các tình huống đe dọa cuộc sống.",
        "Đoạn B cung cấp dữ liệu cụ thể về mối tương quan giữa các cặp song sinh giống hệt nhau (0.4 vs 0.2).",
        "Đoạn C đưa ra lý do tại sao một số nghiên cứu có thể không thuyết phục do yếu tố môi trường.",
      ],
    },
  ],
}

// Mock data for full articles
export const fullArticles: Exercise[] = [
  {
    id: "1",
    title: "Twin Study: Two of a Kind",
    category: "Science",
    level: "Advanced",
    duration: 45,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-co0gVHIA3VSBeADn29dwPrLvY7Xz9M.png",
    description: "Nghiên cứu về cặp song sinh và di truyền học",
    passage: "A. The scientific study of twins goes back to the late 19th century...",
    questions: [],
    completed: true,
    score: 85,
  },
  {
    id: "2",
    title: "A Brief Introduction to Pepper",
    category: "Science",
    level: "Intermediate",
    duration: 30,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j8vXiQfzWhLRMglg0wYcIk4UBDllyD.png",
    description: "Tìm hiểu về loại gia vị phổ biến",
    passage: "Pepper is one of the most widely used spices in the world...",
    questions: [],
    completed: false,
    score: null,
  },
  {
    id: "3",
    title: "Climate Change and Its Effects",
    category: "Environment",
    level: "Advanced",
    duration: 50,
    image: "/placeholder.svg?height=200&width=300&text=Climate",
    description: "Tác động của biến đổi khí hậu",
    passage: "Climate change is one of the most pressing issues of our time...",
    questions: [],
    completed: false,
    score: null,
  },
]

// Mock data for individual passages
export const individualPassages: Exercise[] = [
  {
    id: "1",
    title: "The Benefits of Reading",
    category: "Education",
    level: "Intermediate",
    duration: 15,
    image: "/placeholder.svg?height=200&width=300&text=Reading",
    description: "Lợi ích của việc đọc sách",
    passage: "Reading is one of the most beneficial activities for personal development...",
    questions: [],
    completed: true,
    score: 92,
  },
  {
    id: "2",
    title: "Modern Technology",
    category: "Technology",
    level: "Beginner",
    duration: 10,
    image: "/placeholder.svg?height=200&width=300&text=Tech",
    description: "Công nghệ hiện đại trong cuộc sống",
    passage: "Technology has revolutionized the way we live, work, and communicate...",
    questions: [],
    completed: false,
    score: null,
  },
  {
    id: "3",
    title: "Healthy Lifestyle",
    category: "Health",
    level: "Intermediate",
    duration: 12,
    image: "/placeholder.svg?height=200&width=300&text=Health",
    description: "Lối sống lành mạnh",
    passage: "Maintaining a healthy lifestyle is essential for overall well-being...",
    questions: [],
    completed: false,
    score: null,
  },
]

// Filter options
export const categories = ["all", "Science", "Environment", "Education", "Technology", "Health", "History"]
export const levels = ["all", "Beginner", "Intermediate", "Advanced"]


export const mockVocabulary = [
  { word: "pepper", meaning: "hạt tiêu", ipa: "/&#39;pepər/", example: "I like to add black pepper to my pasta for extra flavor." },
  { word: "genus", meaning: "giống (trong phân loại sinh học)", ipa: "/&#39;dʒi:nəs/", example: "The genus of the pepper plant is called Piper." },
  { word: "botanical", meaning: "thuộc về thực vật", ipa: "/bə&#39;tænɪkəl/", example: "The botanical garden has a wide variety of plants." },
]
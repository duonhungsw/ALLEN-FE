"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, Brain, Target, TrendingUp, BookOpen } from "lucide-react"

export default function SystematicReviewPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [studyPlan, setStudyPlan] = useState<{
    overview: string;
    weeklyFocus: string;
    dailyPlans: {
      day: number;
      theme: string;
      activities: {
        activity: string;
        duration: string;
        description: string;
        priority: string;
      }[];
    }[];
    tips: string[];
  } | null>(null)
  const [userProfile] = useState({
    level: "Intermediate",
    weakAreas: ["Pronunciation", "Advanced Grammar"],
    strengths: ["Basic Vocabulary", "Reading Comprehension"],
    studyTime: 30, // minutes per day
    goals: ["Business English", "IELTS Preparation"],
  })

  const generateStudyPlan = async () => {
    setIsGenerating(true)

    try {

      // Mock response (in real implementation, this would call Gemini API)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

      const mockResponse = {
        overview:
          "Kế hoạch học tập 7 ngày tập trung vào cải thiện phát âm và ngữ pháp nâng cao, đồng thời duy trì các kỹ năng mạnh hiện có.",
        weeklyFocus: "Phát âm và Ngữ pháp nâng cao",
        dailyPlans: [
          {
            day: 1,
            theme: "Pronunciation Fundamentals",
            activities: [
              {
                activity: "Luyện phát âm âm /θ/ và /ð/",
                duration: "10 phút",
                description: "Sử dụng mirror technique và ghi âm để so sánh",
                priority: "high",
              },
              {
                activity: "Đọc to bài báo ngắn",
                duration: "15 phút",
                description: "Tập trung vào intonation và stress patterns",
                priority: "high",
              },
              {
                activity: "Ôn tập từ vựng business",
                duration: "5 phút",
                description: "Flashcards với 20 từ vựng kinh doanh",
                priority: "medium",
              },
            ],
          },
          {
            day: 2,
            theme: "Advanced Grammar - Conditionals",
            activities: [
              {
                activity: "Học câu điều kiện loại 2 và 3",
                duration: "15 phút",
                description: "Xem video giải thích và làm bài tập",
                priority: "high",
              },
              {
                activity: "Viết 5 câu điều kiện",
                duration: "10 phút",
                description: "Áp dụng vào tình huống thực tế",
                priority: "high",
              },
              {
                activity: "Đọc hiểu bài báo",
                duration: "5 phút",
                description: "Duy trì kỹ năng đọc hiểu",
                priority: "low",
              },
            ],
          },
          {
            day: 3,
            theme: "Pronunciation + Vocabulary",
            activities: [
              {
                activity: "Luyện phát âm từ vựng IELTS",
                duration: "12 phút",
                description: "50 từ vựng IELTS thường gặp",
                priority: "high",
              },
              {
                activity: "Shadowing technique",
                duration: "10 phút",
                description: "Nghe và nhắc lại đoạn hội thoại",
                priority: "high",
              },
              {
                activity: "Grammar review",
                duration: "8 phút",
                description: "Ôn lại câu điều kiện đã học",
                priority: "medium",
              },
            ],
          },
          {
            day: 4,
            theme: "Advanced Grammar - Passive Voice",
            activities: [
              {
                activity: "Học câu bị động nâng cao",
                duration: "15 phút",
                description: "Passive voice với modal verbs",
                priority: "high",
              },
              {
                activity: "Chuyển đổi câu chủ động/bị động",
                duration: "10 phút",
                description: "Thực hành với 20 câu",
                priority: "high",
              },
              {
                activity: "Pronunciation practice",
                duration: "5 phút",
                description: "Ôn lại âm đã học",
                priority: "medium",
              },
            ],
          },
          {
            day: 5,
            theme: "Integrated Skills Practice",
            activities: [
              {
                activity: "IELTS Speaking practice",
                duration: "15 phút",
                description: "Part 2: Describe a business you admire",
                priority: "high",
              },
              {
                activity: "Business email writing",
                duration: "10 phút",
                description: "Viết email xin lỗi khách hàng",
                priority: "high",
              },
              {
                activity: "Vocabulary review",
                duration: "5 phút",
                description: "Ôn tập từ vựng tuần này",
                priority: "medium",
              },
            ],
          },
          {
            day: 6,
            theme: "Review and Assessment",
            activities: [
              {
                activity: "Grammar quiz",
                duration: "10 phút",
                description: "Test kiến thức ngữ pháp đã học",
                priority: "high",
              },
              {
                activity: "Pronunciation assessment",
                duration: "10 phút",
                description: "Ghi âm và tự đánh giá",
                priority: "high",
              },
              {
                activity: "Plan next week",
                duration: "10 phút",
                description: "Đánh giá tiến bộ và lên kế hoạch",
                priority: "medium",
              },
            ],
          },
          {
            day: 7,
            theme: "Practical Application",
            activities: [
              {
                activity: "Mock business presentation",
                duration: "20 phút",
                description: "Thuyết trình 5 phút về chủ đề tự chọn",
                priority: "high",
              },
              {
                activity: "Free conversation practice",
                duration: "10 phút",
                description: "Nói chuyện tự do với AI hoặc partner",
                priority: "medium",
              },
            ],
          },
        ],
        tips: [
          "Ghi âm bản thân mỗi ngày để theo dõi tiến bộ phát âm",
          "Sử dụng từ vựng mới trong câu của riêng bạn",
          "Đặt mục tiêu nhỏ hàng ngày thay vì mục tiêu lớn hàng tuần",
          "Kết hợp học tập với sở thích (xem phim, đọc sách tiếng Anh)",
          "Đừng ngại mắc lỗi - đó là cách học hiệu quả nhất",
        ],
      }

      setStudyPlan(mockResponse)
    } catch (error) {
      console.error("Error generating study plan:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Cao"
      case "medium":
        return "Trung bình"
      case "low":
        return "Thấp"
      default:
        return "Không xác định"
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/vocabulary">
            <Button variant="ghost" size="sm" className="mr-4 text-white hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Ôn tập có hệ thống</h1>
            <p className="text-gray-300">Kế hoạch học tập cá nhân hóa được tạo bởi AI</p>
          </div>
        </div>

        {!studyPlan ? (
          <div className="space-y-6">
            <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Brain className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                  Hồ sơ học tập của bạn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Trình độ hiện tại</h4>
                    <Badge className="bg-blue-500">{userProfile.level}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Thời gian học mỗi ngày</h4>
                    <p className="text-gray-300">{userProfile.studyTime} phút</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Điểm yếu cần cải thiện</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.weakAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-red-400 border-red-500">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Điểm mạnh</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.strengths.map((strength, index) => (
                        <Badge key={index} variant="outline" className="text-green-400 border-green-500">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-2 text-white">Mục tiêu học tập</h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.goals.map((goal, index) => (
                        <Badge key={index} className="bg-purple-500">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Plan */}
            <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#93D333' }}>
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Tạo kế hoạch học tập cá nhân</h3>
                  <p className="text-gray-300 max-w-md mx-auto">
                    AI sẽ phân tích hồ sơ của bạn và tạo ra kế hoạch học tập 7 ngày phù hợp với trình độ và mục tiêu của
                    bạn.
                  </p>
                  <Button
                    onClick={generateStudyPlan}
                    disabled={isGenerating}
                    className="text-white"
                    size="lg"
                    style={{ backgroundColor: '#93D333' }}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Đang tạo kế hoạch...
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4 mr-2" />
                        Tạo kế hoạch học tập
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Study Plan Display */
          <div className="space-y-6">
            {/* Plan Overview */}
            <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                  Kế hoạch học tập 7 ngày
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Tổng quan</h4>
                    <p className="text-gray-300">{studyPlan.overview}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Trọng tâm tuần này</h4>
                    <Badge className="bg-blue-500 text-lg px-3 py-1">{studyPlan.weeklyFocus}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studyPlan.dailyPlans.map((day, index: number) => (
                <Card key={index} style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      <span>
                        Ngày {day.day}: {day.theme}
                      </span>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {day.activities.reduce(
                          (total: number, activity) => total + Number.parseInt(activity.duration),
                          0,
                        )}{" "}
                        phút
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.activities.map((activity, actIndex: number) => (
                        <div key={actIndex} className="border rounded-lg p-3" style={{ backgroundColor: '#2a3a3f', borderColor: '#93D333' }}>
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-white">{activity.activity}</h5>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(activity.priority)}>
                                {getPriorityText(activity.priority)}
                              </Badge>
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {activity.duration}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tips */}
            <Card style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BookOpen className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                  Mẹo học tập hiệu quả
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studyPlan.tips.map((tip: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg" style={{ backgroundColor: '#2a3a3f' }}>
                      <div className="flex-shrink-0 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#93D333' }}>
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-300">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setStudyPlan(null)} variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                Tạo kế hoạch mới
              </Button>
              <Button className="text-white" style={{ backgroundColor: '#93D333' }}>Bắt đầu học theo kế hoạch</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Star, BookOpen, Clock, Target } from "lucide-react"
import { Exercise } from "@/types/learningType"

export default function ListeningPage() {
    const [selectedTab, setSelectedTab] = useState("dictation")

    const dictationExercises: Exercise[] = [
        {
            id: "daily-conversation",
            title: "Daily Conversation",
            level: "Beginner",
            duration: "15 phút",
            sentences: 5,
            difficulty: "Dễ",
            description: "Các cuộc hội thoại hàng ngày cơ bản",
            completed: true,
            score: 85,
        },
        {
            id: "business-english",
            title: "Business English",
            level: "Intermediate",
            duration: "20 phút",
            sentences: 8,
            difficulty: "Trung bình",
            description: "Tiếng Anh trong môi trường công sở",
            completed: true,
            score: 92,
        },
        {
            id: "academic-listening",
            title: "Academic Listening",
            level: "Advanced",
            duration: "25 phút",
            sentences: 10,
            difficulty: "Khó",
            description: "Nghe hiểu nội dung học thuật",
            completed: false,
            score: null,
        },
        {
            id: "travel-conversations",
            title: "Travel Conversations",
            level: "Beginner",
            duration: "18 phút",
            sentences: 6,
            difficulty: "Dễ",
            description: "Hội thoại khi đi du lịch",
            completed: false,
            score: null,
        },
        {
            id: "news-listening",
            title: "News Listening",
            level: "Advanced",
            duration: "30 phút",
            sentences: 12,
            difficulty: "Khó",
            description: "Nghe tin tức và báo chí",
            completed: false,
            score: null,
        },
        {
            id: "interview-skills",
            title: "Interview Skills",
            level: "Intermediate",
            duration: "22 phút",
            sentences: 9,
            difficulty: "Trung bình",
            description: "Kỹ năng phỏng vấn xin việc",
            completed: false,
            score: null,
        },
    ]

    const fillInExercises: Exercise[] = [
        {
            id: "travel-planning",
            title: "Travel Planning",
            level: "Beginner",
            duration: "12 phút",
            blanks: 8,
            difficulty: "Dễ",
            description: "Lên kế hoạch du lịch",
            completed: true,
            score: 75,
        },
        {
            id: "shopping-mall",
            title: "Shopping Mall",
            level: "Beginner",
            duration: "15 phút",
            blanks: 10,
            difficulty: "Dễ",
            description: "Mua sắm tại trung tâm thương mại",
            completed: false,
            score: null,
        },
        {
            id: "university-lecture",
            title: "University Lecture",
            level: "Intermediate",
            duration: "20 phút",
            blanks: 15,
            difficulty: "Trung bình",
            description: "Bài giảng tại đại học",
            completed: false,
            score: null,
        },
        {
            id: "business-meeting",
            title: "Business Meeting",
            level: "Advanced",
            duration: "25 phút",
            blanks: 20,
            difficulty: "Khó",
            description: "Cuộc họp kinh doanh",
            completed: false,
            score: null,
        },
        {
            id: "restaurant-order",
            title: "Restaurant Order",
            level: "Beginner",
            duration: "10 phút",
            blanks: 6,
            difficulty: "Dễ",
            description: "Đặt món tại nhà hàng",
            completed: false,
            score: null,
        },
        {
            id: "job-interview",
            title: "Job Interview",
            level: "Intermediate",
            duration: "18 phút",
            blanks: 12,
            difficulty: "Trung bình",
            description: "Phỏng vấn xin việc",
            completed: false,
            score: null,
        },
    ]

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Beginner":
            case "Dễ":
                return "text-white"
            case "Intermediate":
            case "Trung bình":
                return "text-white"
            case "Advanced":
            case "Khó":
                return "text-white"
            default:
                return "text-white"
        }
    }

    const getLevelBgColor = (level: string) => {
        switch (level) {
            case "Beginner":
            case "Dễ":
                return "#93D333"
            case "Intermediate":
            case "Trung bình":
                return "#93D333"
            case "Advanced":
            case "Khó":
                return "#6B7280"
            default:
                return "#93D333"
        }
    }

    const renderExerciseCard = (exercise: any, type: string) => (
        <Card key={exercise.id} className="hover:shadow-lg transition-all duration-300 border-0 h-full flex flex-col" style={{ backgroundColor: '#1a2a2f' }}>
            <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-2">{exercise.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge className={`${getLevelColor(exercise.difficulty)} text-xs`} style={{ backgroundColor: getLevelBgColor(exercise.difficulty) }}>
                            {exercise.difficulty}
                        </Badge>
                        {exercise.completed && (
                            <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                                Hoàn thành
                            </Badge>
                        )}
                    </div>
                    <p className="text-gray-300 mb-3 text-sm line-clamp-2">{exercise.description}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                        <span className="flex items-center">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {exercise.duration}
                        </span>
                        {type === "fill-in" && <span className="flex items-center">
                            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {exercise.blanks} chỗ trống
                        </span>}
                        {type === "dictation" && <span className="flex items-center">
                            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {exercise.sentences} câu
                        </span>}
                        {exercise.score && (
                            <span className="text-white font-medium flex items-center">
                                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" style={{ color: '#93D333' }} />
                                {exercise.score}%
                            </span>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    <Link href={`/learning/listening/${type === "fill-in" ? "fill-in/" : ""}${exercise.id}`}>
                        <Button className="w-full text-white border-0 hover:opacity-90 cursor-pointer text-sm sm:text-base" style={{ backgroundColor: '#93D333' }}>
                            <Play className="h-4 w-4 mr-2" />
                            {exercise.completed ? "Làm lại" : "Bắt đầu"}
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
            <div className="px-4 sm:px-6 py-6 sm:py-8" style={{ backgroundColor: '#141F23' }}>
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#93D333' }}>
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">Listening Practice</h1>
                            <p className="text-gray-300 text-sm sm:text-base">Luyện nghe và chép chính tả tiếng Anh</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#93D333' }}>
                                <Target className="h-5 w-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-xl md:text-2xl font-bold text-white">12 bài tập</div>
                                <div className="text-sm text-gray-300">Tổng số bài luyện tập</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 rounded-lg border" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#93D333' }}>
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-xl md:text-2xl font-bold text-white">Từ 10-30 phút</div>
                                <div className="text-sm text-gray-300">Thời gian mỗi bài</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 rounded-lg border sm:col-span-2 lg:col-span-1" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#93D333' }}>
                                <Play className="h-5 w-5 text-white" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-xl md:text-2xl font-bold text-white">Audio + Text</div>
                                <div className="text-sm text-gray-300">Hình thức luyện tập</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid w-full grid-cols-2 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                        <TabsTrigger
                            value="dictation"
                            className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300 text-sm sm:text-base"
                        >
                            Chép chính tả
                        </TabsTrigger>
                        <TabsTrigger
                            value="fill-in"
                            className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300 text-sm sm:text-base"
                        >
                            Điền từ
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dictation" className="mt-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-white">Bài tập chép chính tả</h2>
                            <p className="text-gray-300">Nghe và gõ lại toàn bộ nội dung bạn nghe được</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {dictationExercises.map((exercise) => renderExerciseCard(exercise, "dictation"))}
                        </div>
                    </TabsContent>

                    <TabsContent value="fill-in" className="mt-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-white">Bài tập điền từ</h2>
                            <p className="text-gray-300">Nghe và điền từ còn thiếu vào chỗ trống</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {fillInExercises.map((exercise) => renderExerciseCard(exercise, "fill-in"))}
                        </div>
                    </TabsContent>
                </Tabs>

                <Card className="mt-8 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                    <CardHeader>
                        <CardTitle className="flex items-center text-white">
                            <Target className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                            Mẹo luyện nghe hiệu quả
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="font-semibold text-white text-sm sm:text-base">🎧 Chép chính tả:</h4>
                                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                                    <li>• Nghe kỹ từng từ, không vội vàng</li>
                                    <li>• Có thể nghe lại nhiều lần</li>
                                    <li>• Chú ý dấu câu và viết hoa</li>
                                    <li>• Tập trung vào từ khóa chính</li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-white text-sm sm:text-base">📝 Điền từ:</h4>
                                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                                    <li>• Đọc trước toàn bộ đoạn văn</li>
                                    <li>• Dự đoán từ loại cần điền</li>
                                    <li>• Sử dụng gợi ý khi cần thiết</li>
                                    <li>• Nghe kỹ ngữ cảnh xung quanh</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
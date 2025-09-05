"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MessageCircle, Volume2, Star, TrendingUp, Search, Users, Clock, BookOpen, Target } from "lucide-react"
import { Category, Topic, filterCategories, filterTopics } from "@/types/learningType"

export default function SpeakingPage() {
    const [selectedTab, setSelectedTab] = useState("pronunciation")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("all")

    const pronunciationCategories: Category[] = [
        {
            id: 1,
            name: "Daily Conversation",
            description: "Hội thoại hàng ngày",
            icon: "💬",
            lessons: 12,
            level: "Beginner",
            difficulty: "Dễ",
            duration: "15 phút",
        },
        {
            id: 2,
            name: "Business English",
            description: "Tiếng Anh thương mại",
            icon: "💼",
            lessons: 15,
            level: "Advanced",
            difficulty: "Khó",
            duration: "25 phút",
        },
        {
            id: 3,
            name: "Travel & Tourism",
            description: "Du lịch và khách sạn",
            icon: "✈️",
            lessons: 10,
            level: "Intermediate",
            difficulty: "Trung bình",
            duration: "20 phút",
        },
        {
            id: 4,
            name: "Academic English",
            description: "Tiếng Anh học thuật",
            icon: "🎓",
            lessons: 18,
            level: "Advanced",
            difficulty: "Khó",
            duration: "30 phút",
        },
        {
            id: 5,
            name: "IELTS Speaking",
            description: "Luyện thi IELTS Speaking",
            icon: "📝",
            lessons: 20,
            level: "Advanced",
            difficulty: "Khó",
            duration: "35 phút",
        },
        {
            id: 6,
            name: "Pronunciation Basics",
            description: "Phát âm cơ bản",
            icon: "🔤",
            lessons: 8,
            level: "Beginner",
            difficulty: "Dễ",
            duration: "12 phút",
        },
    ]

    const conversationTopics: Topic[] = [
        {
            id: 1,
            title: "Job Interview Practice",
            description: "Luyện tập phỏng vấn xin việc với AI",
            duration: "10-15 phút",
            difficulty: "Trung bình",
            participants: 156,
            rating: 4.8,
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3H15NOYIwhyEpWzwWxdy2ztFp2sOcW.png",
            completed: true,
            lastScore: 82,
        },
        {
            id: 2,
            title: "Restaurant Conversation",
            description: "Hội thoại tại nhà hàng",
            duration: "5-8 phút",
            difficulty: "Dễ",
            participants: 234,
            rating: 4.9,
            image: "/placeholder.svg?height=200&width=300&text=Restaurant",
            completed: true,
            lastScore: 90,
        },
        {
            id: 3,
            title: "Travel Planning",
            description: "Lên kế hoạch du lịch",
            duration: "8-12 phút",
            difficulty: "Trung bình",
            participants: 189,
            rating: 4.7,
            image: "/placeholder.svg?height=200&width=300&text=Travel",
            completed: false,
            lastScore: null,
        },
        {
            id: 4,
            title: "Business Meeting",
            description: "Cuộc họp kinh doanh",
            duration: "15-20 phút",
            difficulty: "Khó",
            participants: 98,
            rating: 4.6,
            image: "/placeholder.svg?height=200&width=300&text=Business",
            completed: false,
            lastScore: null,
        },
        {
            id: 5,
            title: "Daily Chat",
            description: "Trò chuyện hàng ngày",
            duration: "6-10 phút",
            difficulty: "Dễ",
            participants: 312,
            rating: 4.9,
            image: "/placeholder.svg?height=200&width=300&text=Chat",
            completed: false,
            lastScore: null,
        },
        {
            id: 6,
            title: "Academic Discussion",
            description: "Thảo luận học thuật",
            duration: "12-18 phút",
            difficulty: "Khó",
            participants: 87,
            rating: 4.5,
            image: "/placeholder.svg?height=200&width=300&text=Academic",
            completed: false,
            lastScore: null,
        },
    ]

    const levels = ["all", "Beginner", "Intermediate", "Advanced"]

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Dễ":
                return "text-white"
            case "Trung bình":
                return "text-white"
            case "Khó":
                return "text-white"
            default:
                return "text-white"
        }
    }

    const getDifficultyBgColor = (difficulty: string) => {
        switch (difficulty) {
            case "Dễ":
                return "#93D333"
            case "Trung bình":
                return "#93D333"
            case "Khó":
                return "#93D333"
            default:
                return "#93D333"
        }
    }

    const filteredCategories = filterCategories(pronunciationCategories, { searchTerm, selectedLevel })
    const filteredTopics = filterTopics(conversationTopics, { searchTerm, selectedLevel })

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
            <div className="px-6 py-8" style={{ backgroundColor: '#141F23' }}>
                <div className="container mx-auto">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#93D333' }}>
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Speaking Practice</h1>
                            <p className="text-gray-300">Cải thiện phát âm và kỹ năng giao tiếp với AI</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#93D333' }}>
                                <Mic className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">45 phút</div>
                                <div className="text-sm text-gray-300">Luyện nói</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 rounded-lg border" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#93D333' }}>
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">83%</div>
                                <div className="text-sm text-gray-300">Độ chính xác</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 rounded-lg border" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#93D333' }}>
                                <MessageCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">12</div>
                                <div className="text-sm text-gray-300">Cuộc hội thoại</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 rounded-lg border" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#93D333' }}>
                                <Star className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">4.8</div>
                                <div className="text-sm text-gray-300">Đánh giá TB</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <Card className="mb-6 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Search className="h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Tìm kiếm bài luyện nói..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                                />
                            </div>
                            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                                    <SelectValue placeholder="Chọn cấp độ" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-600">
                                    {levels.map((level) => (
                                        <SelectItem key={level} value={level} className="text-white hover:bg-gray-700">
                                            {level === "all" ? "Tất cả cấp độ" : level}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid w-full grid-cols-2 border-0 mb-8" style={{ backgroundColor: '#1a2a2f' }}>
                        <TabsTrigger
                            value="pronunciation"
                            className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
                        >
                            <Volume2 className="h-5 w-5 mr-2" />
                            Luyện phát âm
                        </TabsTrigger>
                        <TabsTrigger
                            value="conversation"
                            className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300"
                        >
                            <MessageCircle className="h-5 w-5 mr-2" />
                            Hội thoại AI
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pronunciation" className="mt-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-3 text-white">Chọn chủ đề luyện phát âm</h2>
                            <p className="text-gray-300">Chọn một chủ đề để bắt đầu luyện phát âm với các bài học có cấu trúc</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCategories.map((category) => (
                                <Link key={category.id} href={`/learning/speaking/pronunciation/category/${category.id}`}>
                                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0" style={{ backgroundColor: '#1a2a2f' }}>
                                        <CardContent className="p-6">
                                            <div className="text-center">
                                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto" style={{ backgroundColor: '#93D333' }}>
                                                    {category.icon}
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 text-white">{category.name}</h3>
                                                <p className="text-gray-300 mb-4">{category.description}</p>

                                                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                                    <span className="flex items-center">
                                                        <Volume2 className="h-4 w-4 mr-1" />
                                                        {category.lessons} bài
                                                    </span>
                                                    <Badge className={getDifficultyColor(category.difficulty)} style={{ backgroundColor: getDifficultyBgColor(category.difficulty) }}>
                                                        {category.difficulty}
                                                    </Badge>
                                                </div>

                                                <div className="text-sm text-gray-400 mb-4">
                                                    <Clock className="h-4 w-4 inline mr-1" />
                                                    {category.duration}
                                                </div>

                                                <Button className="w-full text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }}>
                                                    Bắt đầu luyện tập
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="conversation" className="mt-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-3 text-white">Hội thoại với AI</h2>
                            <p className="text-gray-300">Thực hành giao tiếp thực tế với AI trong các tình huống khác nhau</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTopics.map((topic) => (
                                <Card key={topic.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden border-0" style={{ backgroundColor: '#1a2a2f' }}>
                                    <div className="relative">
                                        <img
                                            src={topic.image || "/placeholder.svg"}
                                            alt={topic.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <Badge className={getDifficultyColor(topic.difficulty)} style={{ backgroundColor: getDifficultyBgColor(topic.difficulty) }}>
                                                {topic.difficulty}
                                            </Badge>
                                        </div>
                                        {topic.completed && (
                                            <div className="absolute top-4 left-4">
                                                <Badge variant="outline" className="text-green-400 border-green-400 bg-transparent">
                                                    Đã thử
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold mb-2 text-white">{topic.title}</h3>
                                        <p className="text-gray-300 mb-4">{topic.description}</p>

                                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-400">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {topic.duration}
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                {topic.participants}
                                            </div>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 mr-1" style={{ color: '#93D333' }} />
                                                {topic.rating}/5.0
                                            </div>
                                            {topic.lastScore && (
                                                <div className="flex items-center">
                                                    <TrendingUp className="h-4 w-4 mr-1" style={{ color: '#93D333' }} />
                                                    {topic.lastScore}%
                                                </div>
                                            )}
                                        </div>

                                        <Link href={`/learning/speaking/conversation/${topic.id}`}>
                                            <Button className="w-full text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }}>
                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                {topic.completed ? "Thử lại" : "Bắt đầu hội thoại"}
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <Card className="mt-12 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                    <CardHeader>
                        <CardTitle className="text-2xl text-white flex items-center">
                            <Target className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                            Mẹo luyện nói hiệu quả
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg flex items-center text-white">
                                    <Volume2 className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                                    Luyện phát âm
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#93D333' }}>
                                            <span className="text-white text-sm font-bold">1</span>
                                        </div>
                                        <p className="text-gray-300">Nghe kỹ âm mẫu trước khi nói và lặp lại nhiều lần</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#93D333' }}>
                                            <span className="text-white text-sm font-bold">2</span>
                                        </div>
                                        <p className="text-gray-300">Nói chậm và rõ ràng, tập trung vào từng âm</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#93D333' }}>
                                            <span className="text-white text-sm font-bold">3</span>
                                        </div>
                                        <p className="text-gray-300">Chú ý đến trọng âm và ngữ điệu của câu</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg flex items-center text-white">
                                    <MessageCircle className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                                    Hội thoại AI
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#93D333' }}>
                                            <span className="text-white text-sm font-bold">1</span>
                                        </div>
                                        <p className="text-gray-300">Đừng ngại mắc lỗi, AI sẽ giúp bạn cải thiện</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#93D333' }}>
                                            <span className="text-white text-sm font-bold">2</span>
                                        </div>
                                        <p className="text-gray-300">Trả lời tự nhiên như nói chuyện thật</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#93D333' }}>
                                            <span className="text-white text-sm font-bold">3</span>
                                        </div>
                                        <p className="text-gray-300">Lắng nghe phản hồi và áp dụng gợi ý</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

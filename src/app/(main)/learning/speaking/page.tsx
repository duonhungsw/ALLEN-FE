"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Volume2, Star, TrendingUp, Search, Users, Clock, Target } from "lucide-react"
import { Category, Topic, filterCategories, filterTopics, LearningSkillData } from "@/types/learningType"
import { useLearningSkill } from "@/hooks/learning/useLearningUnits"
import { motion } from "framer-motion";

export default function SpeakingPage() {
    const [selectedTab, setSelectedTab] = useState("pronunciation")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("all")

    const { data: speakingData, isLoading, error } = useLearningSkill("speaking");

    const pronunciationCategories: Category[] = speakingData?.data?.map((item: LearningSkillData, index: number) => ({
        id: parseInt(item.id) || index + 1,
        name: item.title || "Speaking Practice",
        description: `Luyện tập ${item.skillType} - Level ${item.level}`,
        icon: "💬",
        lessons: item.unitSteps?.length || 0,
        level: item.level || "Beginner",
        difficulty: item.level === "A1" ? "Dễ" : item.level === "A2" ? "Trung bình" : "Khó",
        duration: "15 phút",
    })) || [];

    const conversationTopics: Topic[] = speakingData?.data?.map((item: LearningSkillData, index: number) => ({
        id: parseInt(item.id) || index + 1,
        title: item.title || "Speaking Practice",
        description: `Luyện tập ${item.skillType} - Level ${item.level}`,
        duration: "10-15 phút",
        difficulty: item.level === "A1" ? "Dễ" : item.level === "A2" ? "Trung bình" : "Khó",
        participants: Math.floor(Math.random() * 200) + 50,
        rating: 4.5 + Math.random() * 0.5,
        image: "/placeholder.svg?height=200&width=300&text=Speaking",
        completed: false,
        lastScore: null,
    })) || []

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

    const filteredCategories = filterCategories(pronunciationCategories || [], { searchTerm, selectedLevel })
    const filteredTopics = filterTopics(conversationTopics || [], { searchTerm, selectedLevel })

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F5F3EA' }}>
            <div className="container mx-auto px-6 py-8">
                <Card className="mb-6 border-0 shadow-sm" style={{ backgroundColor: '#F5F3EA', border: '1px solid #E5E7EB' }}>
                    <CardContent className="p-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Search className="h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Tìm kiếm bài luyện nói..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-64 bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                />
                            </div>
                            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                <SelectTrigger className="w-48 bg-white border-gray-300 text-gray-900">
                                    <SelectValue placeholder="Chọn cấp độ" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                    {levels.map((level) => (
                                        <SelectItem key={level} value={level} className="text-gray-900 hover:bg-gray-100">
                                            {level === "all" ? "Tất cả cấp độ" : level}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid w-full grid-cols-2 border mb-8" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                        <TabsTrigger
                            value="pronunciation"
                            className="data-[state=active]:bg-[#F3713B] data-[state=active]:text-white text-gray-600"
                        >
                            <Volume2 className="h-5 w-5 mr-2" />
                            Luyện phát âm
                        </TabsTrigger>
                        <TabsTrigger
                            value="conversation"
                            className="data-[state=active]:bg-[#F3713B] data-[state=active]:text-white text-gray-600"
                        >
                            <MessageCircle className="h-5 w-5 mr-2" />
                            Hội thoại AI
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pronunciation" className="mt-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-3" style={{ color: '#142F50' }}>Chọn chủ đề luyện phát âm</h2>
                            <p className="text-gray-600">Chọn một chủ đề để bắt đầu luyện phát âm với các bài học có cấu trúc</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <Card key={index} className="border animate-pulse shadow-sm" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                                        <CardContent className="p-6">
                                            <div className="text-center">
                                                <div className="w-16 h-16 rounded-full bg-gray-200 mb-4 mx-auto"></div>
                                                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                                <div className="h-10 bg-gray-200 rounded"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : error ? (
                                // Error state
                                <div className="col-span-full text-center py-8">
                                    <p className="text-red-400 mb-4">Có lỗi khi tải dữ liệu</p>
                                    <Button
                                        onClick={() => window.location.reload()}
                                        style={{ backgroundColor: '#F3713B' }}
                                        className="text-white"
                                    >
                                        Thử lại
                                    </Button>
                                </div>
                            ) : (
                                filteredCategories.map((category, index) => (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            ease: "easeOut"
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link href={`/learning/speaking/pronunciation/category/${category.id}`}>
                                            <Card className="cursor-pointer border overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                                                <CardContent className="p-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                                        className="text-center"
                                                    >
                                                        <motion.div
                                                            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto"
                                                            style={{ backgroundColor: '#F3713B' }}
                                                            whileHover={{
                                                                rotate: 360,
                                                                transition: { duration: 0.6 }
                                                            }}
                                                        >
                                                            {category.icon}
                                                        </motion.div>
                                                        <h3 className="text-xl font-bold mb-2" style={{ color: '#142F50' }}>{category.name}</h3>
                                                        <p className="text-gray-600 mb-4">{category.description}</p>

                                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                            <span className="flex items-center">
                                                                <Volume2 className="h-4 w-4 mr-1" />
                                                                {category.lessons} bài
                                                            </span>
                                                            <Badge className={getDifficultyColor(category.difficulty)} style={{ backgroundColor: getDifficultyBgColor(category.difficulty) }}>
                                                                {category.difficulty}
                                                            </Badge>
                                                        </div>

                                                        <div className="text-sm text-gray-500 mb-4">
                                                            <Clock className="h-4 w-4 inline mr-1" />
                                                            {category.duration}
                                                        </div>

                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button className="w-full text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }}>
                                                                Bắt đầu luyện tập
                                                            </Button>
                                                        </motion.div>
                                                    </motion.div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="conversation" className="mt-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-3" style={{ color: '#142F50' }}>Hội thoại với AI</h2>
                            <p className="text-gray-600">Thực hành giao tiếp thực tế với AI trong các tình huống khác nhau</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoading ? (
                                // Loading skeleton cho conversation topics
                                Array.from({ length: 6 }).map((_, index) => (
                                    <Card key={index} className="border animate-pulse overflow-hidden shadow-sm" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                                        <div className="w-full h-48 bg-gray-200"></div>
                                        <CardContent className="p-6">
                                            <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="h-10 bg-gray-200 rounded"></div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : error ? (
                                // Error state
                                <div className="col-span-full text-center py-8">
                                    <p className="text-red-400 mb-4">Có lỗi khi tải dữ liệu</p>
                                    <Button
                                        onClick={() => window.location.reload()}
                                        style={{ backgroundColor: '#F3713B' }}
                                        className="text-white"
                                    >
                                        Thử lại
                                    </Button>
                                </div>
                            ) : filteredTopics.length === 0 ? (
                                // Empty state
                                <div className="col-span-full text-center py-8">
                                    <p className="text-gray-400 mb-4">Không có bài học nào</p>
                                </div>
                            ) : (
                                filteredTopics.map((topic, index) => (
                                    <motion.div
                                        key={topic.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            ease: "easeOut"
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Card className="overflow-hidden border cursor-pointer shadow-sm hover:shadow-md transition-shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                                            <motion.div
                                                className="relative"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <img
                                                    src={topic.image || "/placeholder.svg"}
                                                    alt={topic.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <motion.div
                                                    className="absolute top-4 right-4"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <Badge className={getDifficultyColor(topic.difficulty)} style={{ backgroundColor: getDifficultyBgColor(topic.difficulty) }}>
                                                        {topic.difficulty}
                                                    </Badge>
                                                </motion.div>
                                                {topic.completed && (
                                                    <motion.div
                                                        className="absolute top-4 left-4"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.4 }}
                                                    >
                                                        <Badge variant="outline" className="text-green-400 border-green-400 bg-transparent">
                                                            Đã thử
                                                        </Badge>
                                                    </motion.div>
                                                )}
                                            </motion.div>

                                            <CardContent className="p-6">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <h3 className="text-xl font-bold mb-2" style={{ color: '#142F50' }}>{topic.title}</h3>
                                                    <p className="text-gray-600 mb-4">{topic.description}</p>

                                                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            {topic.duration}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Users className="h-4 w-4 mr-1" />
                                                            {topic.participants}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 mr-1" style={{ color: '#F3713B' }} />
                                                            {topic.rating}/5.0
                                                        </div>
                                                        {topic.lastScore && (
                                                            <div className="flex items-center">
                                                                <TrendingUp className="h-4 w-4 mr-1" style={{ color: '#F3713B' }} />
                                                                {topic.lastScore}%
                                                            </div>
                                                        )}
                                                    </div>

                                                    <Link href={`/learning/speaking/conversation/${topic.id}`}>
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button className="w-full text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }}>
                                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                                {topic.completed ? "Thử lại" : "Bắt đầu hội thoại"}
                                                            </Button>
                                                        </motion.div>
                                                    </Link>
                                                </motion.div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>

                <Card className="mt-12 border shadow-sm" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center" style={{ color: '#142F50' }}>
                            <Target className="h-5 w-5 mr-2" style={{ color: '#F3713B' }} />
                            Mẹo luyện nói hiệu quả
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg flex items-center" style={{ color: '#142F50' }}>
                                    <Volume2 className="h-5 w-5 mr-2" style={{ color: '#F3713B' }} />
                                    Luyện phát âm
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3713B' }}>
                                            <span className="text-white text-sm font-bold">1</span>
                                        </div>
                                        <p className="text-gray-600">Nghe kỹ âm mẫu trước khi nói và lặp lại nhiều lần</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3713B' }}>
                                            <span className="text-white text-sm font-bold">2</span>
                                        </div>
                                        <p className="text-gray-600">Nói chậm và rõ ràng, tập trung vào từng âm</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3713B' }}>
                                            <span className="text-white text-sm font-bold">3</span>
                                        </div>
                                        <p className="text-gray-600">Chú ý đến trọng âm và ngữ điệu của câu</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg flex items-center" style={{ color: '#142F50' }}>
                                    <MessageCircle className="h-5 w-5 mr-2" style={{ color: '#F3713B' }} />
                                    Hội thoại AI
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3713B' }}>
                                            <span className="text-white text-sm font-bold">1</span>
                                        </div>
                                        <p className="text-gray-600">Đừng ngại mắc lỗi, AI sẽ giúp bạn cải thiện</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3713B' }}>
                                            <span className="text-white text-sm font-bold">2</span>
                                        </div>
                                        <p className="text-gray-600">Trả lời tự nhiên như nói chuyện thật</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#F3713B' }}>
                                            <span className="text-white text-sm font-bold">3</span>
                                        </div>
                                        <p className="text-gray-600">Lắng nghe phản hồi và áp dụng gợi ý</p>
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

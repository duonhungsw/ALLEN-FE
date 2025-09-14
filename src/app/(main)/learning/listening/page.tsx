"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Target, Search, Volume2 } from "lucide-react"
import { Exercise, LearningSkillData } from "@/types/learningType"
import { motion } from "framer-motion"
import { useLearningSkill } from "@/hooks/learning/useLearningUnits"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ListeningPage() {
    const [selectedTab, setSelectedTab] = useState("dictation")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("all")

    const { data: listeningData, isLoading, error } = useLearningSkill("listening");

    const dictationExercises: Exercise[] = listeningData?.data?.map((item: LearningSkillData, index: number) => ({
        id: item.id || `dictation-${index + 1}`,
        title: item.title || "Listening Practice",
        level: item.level === "A1" ? "Beginner" : item.level === "A2" ? "Intermediate" : "Advanced",
        duration: "15 phút",
        sentences: item.unitSteps?.length || 5,
        difficulty: item.level === "A1" ? "Dễ" : item.level === "A2" ? "Trung bình" : "Khó",
        description: `Luyện tập ${item.skillType} - Level ${item.level}`,
        completed: false,
        score: null,
    })) || []

    const fillInExercises: Exercise[] = listeningData?.data?.map((item: LearningSkillData, index: number) => ({
        id: item.id || `fill-in-${index + 1}`,
        title: item.title || "Listening Fill-in Practice",
        level: item.level === "A1" ? "Beginner" : item.level === "A2" ? "Intermediate" : "Advanced",
        duration: "15 phút",
        blanks: item.unitSteps?.length || 10,
        difficulty: item.level === "A1" ? "Dễ" : item.level === "A2" ? "Trung bình" : "Khó",
        description: `Luyện tập ${item.skillType} - Level ${item.level}`,
        completed: false,
        score: null,
    })) || []

    const levels = ["all", "Beginner", "Intermediate", "Advanced"]

    const filteredDictationExercises = (dictationExercises || []).filter(exercise => {
        const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesLevel = selectedLevel === "all" || exercise.level === selectedLevel
        return matchesSearch && matchesLevel
    })

    const filteredFillInExercises = (fillInExercises || []).filter(exercise => {
        const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesLevel = selectedLevel === "all" || exercise.level === selectedLevel
        return matchesSearch && matchesLevel
    })

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
                return "#10B981"
            case "Intermediate":
            case "Trung bình":
                return "#F59E0B"
            case "Advanced":
            case "Khó":
                return "#EF4444"
            default:
                return "#10B981"
        }
    }

    const renderExerciseCard = (exercise: Exercise, type: string, index: number) => (
        <motion.div
            key={exercise.id}
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
            <Link href={`/learning/listening/${type === "fill-in" ? "fill-in/" : ""}${exercise.id}`}>
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
                                💬
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#142F50' }}>{exercise.title}</h3>
                            <p className="text-gray-600 mb-4">{exercise.description}</p>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span className="flex items-center">
                                    <Volume2 className="h-4 w-4 mr-1" />
                                    {type === "fill-in" ? exercise.blanks : exercise.sentences} {type === "fill-in" ? "chỗ trống" : "câu"}
                                </span>
                                <Badge className={getLevelColor(exercise.difficulty)} style={{ backgroundColor: getLevelBgColor(exercise.difficulty) }}>
                                    {exercise.difficulty}
                                </Badge>
                            </div>

                            <div className="text-sm text-gray-500 mb-4">
                                <Clock className="h-4 w-4 inline mr-1" />
                                {exercise.duration}
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
    )

    return (
        <div className="min-h-screen bg-[#F5F3EA]">
            <div className="container mx-auto px-6 py-8">
                <Card className="mb-6 border-0 shadow-sm bg-[#F5F3EA] border border-gray-200">
                    <CardContent className="p-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Search className="h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Tìm kiếm bài luyện nghe..."
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

                <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                        <TabsList className="grid w-full grid-cols-2 border mb-8 bg-white border-gray-200">
                            <TabsTrigger
                                value="dictation"
                                className="data-[state=active]:bg-[#F3713B] data-[state=active]:text-white text-gray-600"
                            >
                                <Volume2 className="h-5 w-5 mr-2" />
                                Chép chính tả
                            </TabsTrigger>
                            <TabsTrigger
                                value="fill-in"
                                className="data-[state=active]:bg-[#F3713B] data-[state=active]:text-white text-gray-600"
                            >
                                <BookOpen className="h-5 w-5 mr-2" />
                                Điền từ
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="dictation" className="mt-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-3 text-[#142F50]">Chọn chủ đề luyện nghe</h2>
                                <p className="text-gray-600">Chọn một chủ đề để bắt đầu luyện nghe với các bài học có cấu trúc</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {isLoading ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <Card key={index} className="border animate-pulse shadow-sm bg-white border-gray-200">
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
                                    <div className="col-span-full text-center py-8">
                                        <p className="text-red-400 mb-4">Có lỗi khi tải dữ liệu</p>
                                        <Button
                                            onClick={() => window.location.reload()}
                                            className="text-white bg-[#F3713B]"
                                        >
                                            Thử lại
                                        </Button>
                                    </div>
                                ) : (
                                    filteredDictationExercises.map((exercise, index) => renderExerciseCard(exercise, "dictation", index))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="fill-in" className="mt-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-3 text-[#142F50]">Chọn chủ đề luyện nghe</h2>
                                <p className="text-gray-600">Chọn một chủ đề để bắt đầu luyện nghe với các bài học có cấu trúc</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {isLoading ? (
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <Card key={index} className="border animate-pulse shadow-sm bg-white border-gray-200">
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
                                    <div className="col-span-full text-center py-8">
                                        <p className="text-red-400 mb-4">Có lỗi khi tải dữ liệu</p>
                                        <Button
                                            onClick={() => window.location.reload()}
                                            className="text-white bg-[#F3713B]"
                                        >
                                            Thử lại
                                        </Button>
                                    </div>
                                ) : (
                                    filteredFillInExercises.map((exercise, index) => renderExerciseCard(exercise, "fill-in", index))
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                    >
                        <Card className="mt-8 border-0 shadow-sm bg-white border-gray-200">
                            <CardHeader>
                                <CardTitle className="flex items-center text-[#142F50]">
                                    <Target className="h-5 w-5 mr-2 text-[#F3713B]" />
                                    Mẹo luyện nghe hiệu quả
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-sm sm:text-base text-[#142F50]">🎧 Chép chính tả:</h4>
                                        <ul className="space-y-2 text-xs sm:text-sm text-[#6B7280]">
                                            <li>• Nghe kỹ từng từ, không vội vàng</li>
                                            <li>• Có thể nghe lại nhiều lần</li>
                                            <li>• Chú ý dấu câu và viết hoa</li>
                                            <li>• Tập trung vào từ khóa chính</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-sm sm:text-base" style={{ color: '#142F50' }}>📝 Điền từ:</h4>
                                        <ul className="space-y-2 text-xs sm:text-sm text-[#6B7280]">
                                            <li>• Đọc trước toàn bộ đoạn văn</li>
                                            <li>• Dự đoán từ loại cần điền</li>
                                            <li>• Sử dụng gợi ý khi cần thiết</li>
                                            <li>• Nghe kỹ ngữ cảnh xung quanh</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
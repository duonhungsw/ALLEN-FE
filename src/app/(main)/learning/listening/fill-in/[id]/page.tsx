"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Check, X, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

export default function FillInPage({ params }: { params: { id: string } }) {
    const [currentBlank, setCurrentBlank] = useState(0)
    const [userAnswers, setUserAnswers] = useState<string[]>([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [playCount, setPlayCount] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [results, setResults] = useState<Array<{ correct: boolean; userAnswer: string; correctAnswer: string }>>([])
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(true)
    const [showHint, setShowHint] = useState(false)

    const exercise = {
        id: params.id,
        title: "Travel Planning",
        text: "I'm planning a trip to ___1___ next month. I need to book a ___2___ and find a good ___3___. The weather should be ___4___ during that time. I'm excited to try the local ___5___ and visit famous ___6___. I'll also need to exchange some ___7___ and learn basic ___8___ phrases.",
        blanks: [
            { id: 1, correctAnswer: "Japan", hint: "Một quốc gia ở châu Á" },
            { id: 2, correctAnswer: "flight", hint: "Phương tiện di chuyển bằng đường hàng không" },
            { id: 3, correctAnswer: "hotel", hint: "Nơi ở khi đi du lịch" },
            { id: 4, correctAnswer: "pleasant", hint: "Tính từ mô tả thời tiết dễ chịu" },
            { id: 5, correctAnswer: "food", hint: "Đồ ăn địa phương" },
            { id: 6, correctAnswer: "landmarks", hint: "Những địa điểm nổi tiếng" },
            { id: 7, correctAnswer: "money", hint: "Tiền tệ" },
            { id: 8, correctAnswer: "Japanese", hint: "Ngôn ngữ của người Nhật" }
        ],
        audio: "/audio/travel-planning.mp3",
        translation: "Tôi đang lên kế hoạch cho chuyến đi đến Nhật Bản vào tháng tới. Tôi cần đặt vé máy bay và tìm một khách sạn tốt. Thời tiết sẽ dễ chịu trong thời gian đó. Tôi rất hào hứng được thử đồ ăn địa phương và thăm những địa danh nổi tiếng. Tôi cũng cần đổi tiền và học một số cụm từ tiếng Nhật cơ bản."
    }

    useEffect(() => {
        setUserAnswers(new Array(exercise.blanks.length).fill(""))
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isActive) {
            interval = setInterval(() => {
                setTimer((timer) => timer + 1)
            }, 1000)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timer])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const playAudio = () => {
        setIsPlaying(true)
        setPlayCount((prev) => prev + 1)

        setTimeout(() => {
            setIsPlaying(false)
        }, 3000)
    }

    const checkAnswer = () => {
        const currentBlankData = exercise.blanks[currentBlank]
        const userAnswer = userAnswers[currentBlank]?.toLowerCase().trim()
        const isCorrect = userAnswer === currentBlankData.correctAnswer.toLowerCase()

        const result = {
            correct: isCorrect,
            userAnswer: userAnswers[currentBlank] || "",
            correctAnswer: currentBlankData.correctAnswer,
        }

        setResults((prev) => [...prev, result])
        setShowResult(true)
    }

    const nextBlank = () => {
        if (currentBlank < exercise.blanks.length - 1) {
            setCurrentBlank((prev) => prev + 1)
            setShowResult(false)
            setPlayCount(0)
            setShowHint(false)
        } else {
            setIsActive(false)
        }
    }

    const resetBlank = () => {
        const newAnswers = [...userAnswers]
        newAnswers[currentBlank] = ""
        setUserAnswers(newAnswers)
        setShowResult(false)
        setPlayCount(0)
        setShowHint(false)
    }

    const handleAnswerChange = (value: string) => {
        const newAnswers = [...userAnswers]
        newAnswers[currentBlank] = value
        setUserAnswers(newAnswers)
    }

    const progress = ((currentBlank + 1) / exercise.blanks.length) * 100
    const currentBlankData = exercise.blanks[currentBlank]

    if (results.length === exercise.blanks.length) {
        const correctCount = results.filter((r) => r.correct).length
        const accuracy = Math.round((correctCount / results.length) * 100)

        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F3EA]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <Card className="w-full max-w-2xl border shadow-lg bg-white border-gray-200">
                        <CardContent className="p-8">
                            <motion.div
                                className="text-center mb-8"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h2 className="text-2xl font-bold mb-4 text-[#F3713B]">Hoàn thành bài tập!</h2>
                                <motion.div
                                    className="text-6xl mb-4"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                                >
                                    🎉
                                </motion.div>
                                <motion.div
                                    className="grid grid-cols-3 gap-4 mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <motion.div
                                        className="text-center"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="text-2xl font-bold text-[#F3713B]">{correctCount}</div>
                                        <div className="text-sm text-[#6B7280]">Từ đúng</div>
                                    </motion.div>
                                    <motion.div
                                        className="text-center"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="text-2xl font-bold text-red-500">{results.length - correctCount}</div>
                                        <div className="text-sm text-[#6B7280]">Từ sai</div>
                                    </motion.div>
                                    <motion.div
                                        className="text-center"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="text-2xl font-bold text-[#142F50]">{accuracy}%</div>
                                        <div className="text-sm text-[#6B7280]">Độ chính xác</div>
                                    </motion.div>
                                </motion.div>
                                <motion.div
                                    className="mb-6 text-[#6B7280]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    Thời gian: {formatTime(timer)}
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="space-y-4 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 }}
                            >
                                <h3 className="text-lg font-semibold text-[#142F50]">Chi tiết kết quả:</h3>
                                {results.map((result, index) => (
                                    <motion.div
                                        key={index}
                                        className={`p-4 rounded-lg border-l-4 ${result.correct ? "border-green-500" : "border-red-500"
                                            }`}
                                        style={{ backgroundColor: '#FFFFFF' }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center mb-2">
                                            {result.correct ? (
                                                <Check className="h-5 w-5 mr-2 text-[#F3713B]" />
                                            ) : (
                                                <X className="h-5 w-5 text-red-500 mr-2" />
                                            )}
                                            <span className="font-semibold text-[#142F50]">Chỗ trống {index + 1}</span>
                                        </div>
                                        <div className="text-sm space-y-1">
                                            <div className="text-[#6B7280]">
                                                <strong>Đáp án đúng:</strong> {result.correctAnswer}
                                            </div>
                                            {!result.correct && (
                                                <div className="text-[#6B7280]">
                                                    <strong>Câu trả lời của bạn:</strong> {result.userAnswer}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                className="flex space-x-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                            >
                                <Link href="/learning/listening" className="flex-1">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            Quay lại danh sách
                                        </Button>
                                    </motion.div>
                                </Link>
                                <motion.div
                                    className="flex-1"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button className="w-full text-white border-0 hover:opacity-90 cursor-pointer bg-[#F3713B]" onClick={() => window.location.reload()}>
                                        Làm lại
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F5F3EA]">
            <motion.div
                className="px-6 py-4 bg-[#F5F3EA]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/learning/listening">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100 cursor-pointer">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Quay lại
                                </Button>
                            </motion.div>
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <h1 className="text-xl font-bold text-[#142F50]">{exercise.title}</h1>
                            <p className="text-sm text-[#6B7280]">
                                Điền từ - Chỗ trống {currentBlank + 1}/{exercise.blanks.length}
                            </p>
                        </motion.div>
                    </div>
                    <motion.div
                        className="text-lg font-mono text-white px-3 py-1 rounded bg-[#F3713B]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        {formatTime(timer)}
                    </motion.div>
                </div>
            </motion.div>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-[#142F50]">Tiến độ</span>
                        <span className="text-sm text-[#6B7280]">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Card className="border shadow-sm bg-white border-gray-200">
                                <CardContent className="p-8">
                                    <div className="text-center">
                                        <motion.div
                                            className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#F3713B]"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5, delay: 1.0, type: "spring", stiffness: 200 }}
                                            whileHover={{ rotate: 360 }}
                                        >
                                            <Volume2 className="h-16 w-16 text-white" />
                                        </motion.div>

                                        <motion.h3
                                            className="text-lg font-semibold mb-4 text-[#142F50]"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 1.2 }}
                                        >
                                            Nghe và điền từ
                                        </motion.h3>

                                        <motion.div
                                            className="flex justify-center space-x-4 mb-6"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 1.4 }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button onClick={playAudio} disabled={isPlaying} className="text-white border-0 hover:opacity-90 cursor-pointer bg-[#93D333]">
                                                    {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                                                    {isPlaying ? "Đang phát..." : "Phát âm thanh"}
                                                </Button>
                                            </motion.div>

                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button variant="outline" onClick={resetBlank} className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer bg-blue-400">
                                                    <RotateCcw className="h-5 w-5 mr-1" />
                                                    Làm lại
                                                </Button>
                                            </motion.div>
                                        </motion.div>

                                        <motion.div
                                            className="text-sm text-[#6B7280]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 1.6 }}
                                        >
                                            Đã nghe: {playCount} lần
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Card className="border shadow-sm bg-white border-gray-200">
                                <CardContent className="p-8">
                                    <motion.h3
                                        className="text-lg font-semibold mb-4 text-[#142F50]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 1.0 }}
                                    >
                                        Điền từ vào chỗ trống
                                    </motion.h3>

                                    <motion.div
                                        className="space-y-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 1.2 }}
                                    >
                                        <div className="p-4 rounded-lg border bg-[#F5F3EA] border-[#F3713B]">
                                            <p className="text-[#142F50] text-sm mb-2 font-semibold">Chỗ trống {currentBlank + 1}:</p>
                                            <p className="text-[#6B7280] text-sm">{currentBlankData.hint}</p>
                                        </div>

                                        <Input
                                            value={userAnswers[currentBlank] || ""}
                                            onChange={(e) => handleAnswerChange(e.target.value)}
                                            placeholder="Nhập từ cần điền..."
                                            className="text-lg p-4 bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                            disabled={showResult}
                                            onKeyPress={(e) => e.key === "Enter" && !showResult && checkAnswer()}
                                        />

                                        {!showResult ? (
                                            <div className="flex space-x-2">
                                                <motion.div
                                                    className="flex-1"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        onClick={checkAnswer}
                                                        disabled={!userAnswers[currentBlank]?.trim()}
                                                        className="w-full text-white border-0 hover:opacity-90 cursor-pointer bg-[#93D333]"
                                                    >
                                                        Kiểm tra
                                                    </Button>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        onClick={() => setShowHint(!showHint)}
                                                        variant="outline"
                                                        className="border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer bg-amber-300"
                                                    >
                                                        <Lightbulb className="h-4 w-4 mr-1" />
                                                        Gợi ý
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        ) : (
                                            <motion.div
                                                className="space-y-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <motion.div
                                                    className={`p-4 rounded-lg ${results[currentBlank]?.correct
                                                        ? "border border-green-500"
                                                        : "border border-red-500"
                                                        }`}
                                                    style={{ backgroundColor: '#FFFFFF' }}
                                                    initial={{ scale: 0.9 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="flex items-center mb-2">
                                                        {results[currentBlank]?.correct ? (
                                                            <Check className="h-5 w-5 text-green-600 mr-2" />
                                                        ) : (
                                                            <X className="h-5 w-5 text-red-600 mr-2" />
                                                        )}
                                                        <span className="font-semibold text-[#142F50]">
                                                            {results[currentBlank]?.correct ? "Chính xác!" : "Chưa đúng"}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-2 text-sm">
                                                        <div className="text-[#6B7280]">
                                                            <strong>Đáp án đúng:</strong> {currentBlankData.correctAnswer}
                                                        </div>
                                                        {!results[currentBlank]?.correct && (
                                                            <div className="text-[#6B7280]">
                                                                <strong>Câu trả lời của bạn:</strong> {userAnswers[currentBlank]}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button onClick={nextBlank} className="w-full text-white border-0 hover:opacity-90 cursor-pointer bg-[#F3713B]">
                                                        {currentBlank < exercise.blanks.length - 1 ? "Chỗ trống tiếp theo" : "Hoàn thành"}
                                                    </Button>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                    >
                        <Card className="mt-8 border shadow-sm bg-white border-gray-200">
                            <CardContent className="p-6">
                                <motion.h3
                                    className="text-lg font-semibold mb-4 text-[#142F50]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 1.2 }}
                                >
                                    Đoạn văn
                                </motion.h3>
                                <div className="p-4 rounded-lg bg-[#F5F3EA]">
                                    <p className="text-[#142F50] leading-relaxed">
                                        {exercise.text.split(/(___\d+___)/).map((part, index) => {
                                            if (part.match(/___\d+___/)) {
                                                const blankNumber = parseInt(part.replace(/___/g, ''))
                                                const isCurrentBlank = blankNumber === currentBlank + 1
                                                const userAnswer = userAnswers[blankNumber - 1]
                                                const isCompleted = results[blankNumber - 1]

                                                return (
                                                    <span
                                                        key={index}
                                                        className={`inline-block mx-1 px-2 py-1 rounded ${isCurrentBlank ? 'bg-[#F3713B] text-white' :
                                                            isCompleted ? (results[blankNumber - 1].correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white') :
                                                                'bg-gray-300 text-gray-700'
                                                            }`}
                                                    >
                                                        {isCompleted ? results[blankNumber - 1].correctAnswer : userAnswer || part}
                                                    </span>
                                                )
                                            }
                                            return part
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                    >
                        <Card className="mt-8 border shadow-sm bg-white border-gray-200">
                            <CardContent className="p-6">
                                <motion.h3
                                    className="text-lg font-semibold mb-6 text-[#142F50]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 1.4 }}
                                >
                                    Danh sách chỗ trống
                                </motion.h3>
                                <div className="flex gap-3 justify-center">
                                    {exercise.blanks.map((_, index) => {
                                        const isCurrent = index === currentBlank
                                        const isCompleted = results[index]
                                        const isCorrect = results[index]?.correct

                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Button
                                                    size="sm"
                                                    className={`
                                                        w-12 h-12 rounded-lg font-semibold text-lg
                                                        transition-all duration-200
                                                        ${isCurrent
                                                            ? 'bg-[#F3713B] text-white shadow-lg'
                                                            : isCompleted
                                                                ? isCorrect
                                                                    ? 'bg-green-50 border-2 border-green-500 text-green-700 hover:bg-green-100'
                                                                    : 'bg-red-50 border-2 border-red-500 text-red-700 hover:bg-red-100'
                                                                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                                                        }
                                                    `}
                                                    onClick={() => {
                                                        if (index <= results.length) {
                                                            setCurrentBlank(index)
                                                            setShowResult(false)
                                                            setPlayCount(0)
                                                            setShowHint(false)
                                                        }
                                                    }}
                                                >
                                                    {index + 1}
                                                </Button>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

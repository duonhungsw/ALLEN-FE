"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Check, X, Lightbulb } from "lucide-react"

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
    const audioRef = useRef<HTMLAudioElement>(null)

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
            <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#141F23' }}>
                <Card className="w-full max-w-2xl border-0" style={{ backgroundColor: '#1a2a2f' }}>
                    <CardContent className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-4" style={{ color: '#93D333' }}>Hoàn thành bài tập!</h2>
                            <div className="text-6xl mb-4">🎉</div>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold" style={{ color: '#93D333' }}>{correctCount}</div>
                                    <div className="text-sm text-gray-300">Từ đúng</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-400">{results.length - correctCount}</div>
                                    <div className="text-sm text-gray-300">Từ sai</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">{accuracy}%</div>
                                    <div className="text-sm text-gray-300">Độ chính xác</div>
                                </div>
                            </div>
                            <div className="text-gray-300 mb-6">Thời gian: {formatTime(timer)}</div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h3 className="text-lg font-semibold text-white">Chi tiết kết quả:</h3>
                            {results.map((result, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border-l-4 ${result.correct ? "border-green-500" : "border-red-500"
                                        }`}
                                    style={{ backgroundColor: '#1a2a2f' }}
                                >
                                    <div className="flex items-center mb-2">
                                        {result.correct ? (
                                            <Check className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
                                        ) : (
                                            <X className="h-5 w-5 text-red-400 mr-2" />
                                        )}
                                        <span className="font-semibold text-white">Chỗ trống {index + 1}</span>
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <div className="text-white">
                                            <strong>Đáp án đúng:</strong> {result.correctAnswer}
                                        </div>
                                        {!result.correct && (
                                            <div className="text-white">
                                                <strong>Câu trả lời của bạn:</strong> {result.userAnswer}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex space-x-4">
                            <Link href="/learning/listening" className="flex-1">
                                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700 cursor-pointer">
                                    Quay lại danh sách
                                </Button>
                            </Link>
                            <Button className="flex-1 text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }} onClick={() => window.location.reload()}>
                                Làm lại
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
            <div className="px-6 py-4" style={{ backgroundColor: '#141F23' }}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/learning/listening">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 cursor-pointer">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Quay lại
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-white">{exercise.title}</h1>
                            <p className="text-sm text-gray-300">
                                Điền từ - Chỗ trống {currentBlank + 1}/{exercise.blanks.length}
                            </p>
                        </div>
                    </div>
                    <div className="text-lg font-mono text-white px-3 py-1 rounded" style={{ backgroundColor: '#93D333' }}>{formatTime(timer)}</div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white">Tiến độ</span>
                        <span className="text-sm text-gray-300">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#93D333' }}>
                                        <Volume2 className="h-16 w-16 text-white" />
                                    </div>

                                    <h3 className="text-lg font-semibold mb-4 text-white">Nghe và điền từ</h3>

                                    <div className="flex justify-center space-x-4 mb-6">
                                        <Button onClick={playAudio} disabled={isPlaying} className="text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }}>
                                            {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                                            {isPlaying ? "Đang phát..." : "Phát âm thanh"}
                                        </Button>

                                        <Button variant="outline" onClick={resetBlank} className="border-gray-600 text-white hover:bg-gray-700 cursor-pointer">
                                            <RotateCcw className="h-5 w-5 mr-2" />
                                            Làm lại
                                        </Button>
                                    </div>

                                    <div className="text-sm text-gray-300">Đã nghe: {playCount} lần</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
                            <CardContent className="p-8">
                                <h3 className="text-lg font-semibold mb-4 text-white">Điền từ vào chỗ trống</h3>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg border" style={{ backgroundColor: '#141F23', borderColor: '#93D333' }}>
                                        <p className="text-white text-sm mb-2">Chỗ trống {currentBlank + 1}:</p>
                                        <p className="text-gray-300 text-sm">{currentBlankData.hint}</p>
                                    </div>

                                    <Input
                                        value={userAnswers[currentBlank] || ""}
                                        onChange={(e) => handleAnswerChange(e.target.value)}
                                        placeholder="Nhập từ cần điền..."
                                        className="text-lg p-4 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                                        disabled={showResult}
                                        onKeyPress={(e) => e.key === "Enter" && !showResult && checkAnswer()}
                                    />

                                    {!showResult ? (
                                        <div className="flex space-x-2">
                                            <Button
                                                onClick={checkAnswer}
                                                disabled={!userAnswers[currentBlank]?.trim()}
                                                className="flex-1 text-white border-0 hover:opacity-90 cursor-pointer"
                                                style={{ backgroundColor: '#93D333' }}
                                            >
                                                Kiểm tra
                                            </Button>
                                            <Button
                                                onClick={() => setShowHint(!showHint)}
                                                variant="outline"
                                                className="border-gray-600 text-white hover:bg-gray-700 cursor-pointer"
                                            >
                                                <Lightbulb className="h-4 w-4 mr-2" />
                                                Gợi ý
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div
                                                className={`p-4 rounded-lg ${results[currentBlank]?.correct
                                                    ? "border border-green-500"
                                                    : "border border-red-500"
                                                    }`}
                                                style={{ backgroundColor: '#1a2a2f' }}
                                            >
                                                <div className="flex items-center mb-2">
                                                    {results[currentBlank]?.correct ? (
                                                        <Check className="h-5 w-5 text-green-400 mr-2" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-red-400 mr-2" />
                                                    )}
                                                    <span className="font-semibold text-white">
                                                        {results[currentBlank]?.correct ? "Chính xác!" : "Chưa đúng"}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="text-white">
                                                        <strong>Đáp án đúng:</strong> {currentBlankData.correctAnswer}
                                                    </div>
                                                    {!results[currentBlank]?.correct && (
                                                        <div className="text-white">
                                                            <strong>Câu trả lời của bạn:</strong> {userAnswers[currentBlank]}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <Button onClick={nextBlank} className="w-full text-white border-0 hover:opacity-90 cursor-pointer" style={{ backgroundColor: '#93D333' }}>
                                                {currentBlank < exercise.blanks.length - 1 ? "Chỗ trống tiếp theo" : "Hoàn thành"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Đoạn văn</h3>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#141F23' }}>
                                <p className="text-white leading-relaxed">
                                    {exercise.text.split(/(___\d+___)/).map((part, index) => {
                                        if (part.match(/___\d+___/)) {
                                            const blankNumber = parseInt(part.replace(/___/g, ''))
                                            const isCurrentBlank = blankNumber === currentBlank + 1
                                            const userAnswer = userAnswers[blankNumber - 1]
                                            const isCompleted = results[blankNumber - 1]

                                            return (
                                                <span
                                                    key={index}
                                                    className={`inline-block mx-1 px-2 py-1 rounded ${isCurrentBlank ? 'bg-yellow-500 text-black' :
                                                        isCompleted ? (results[blankNumber - 1].correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white') :
                                                            'bg-gray-600 text-white'
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

                    <Card className="mt-8 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Danh sách chỗ trống</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {exercise.blanks.map((_, index) => (
                                    <Button
                                        key={index}
                                        variant={index === currentBlank ? "default" : "outline"}
                                        size="sm"
                                        className={`${results[index]
                                            ? results[index].correct
                                                ? "text-white border-green-500"
                                                : "text-white border-red-500"
                                            : "text-white border-gray-600"
                                            }`}
                                        style={{
                                            backgroundColor: index === currentBlank ? '#93D333' :
                                                results[index] ? (results[index].correct ? '#1a2a2f' : '#1a2a2f') : '#1a2a2f'
                                        }}
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
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

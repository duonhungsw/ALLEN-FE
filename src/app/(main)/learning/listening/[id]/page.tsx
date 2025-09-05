"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Check, X } from "lucide-react"

export default function ListeningPage({ params }: { params: { id: string } }) {
    const [currentSentence, setCurrentSentence] = useState(0)
    const [userInput, setUserInput] = useState("")
    const [isPlaying, setIsPlaying] = useState(false)
    const [playCount, setPlayCount] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [results, setResults] = useState<Array<{ correct: boolean; userAnswer: string; correctAnswer: string }>>([])
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(true)
    const audioRef = useRef<HTMLAudioElement>(null)

    const exercise = {
        id: params.id,
        title: "Daily Conversation",
        sentences: [
            {
                text: "Good morning! How are you doing today?",
                audio: "/audio/sentence1.mp3",
                translation: "Chào buổi sáng! Hôm nay bạn thế nào?",
            },
            {
                text: "I'm doing well, thank you for asking.",
                audio: "/audio/sentence2.mp3",
                translation: "Tôi khỏe, cảm ơn bạn đã hỏi.",
            },
            {
                text: "Would you like to have coffee with me?",
                audio: "/audio/sentence3.mp3",
                translation: "Bạn có muốn uống cà phê với tôi không?",
            },
            {
                text: "That sounds great! What time works for you?",
                audio: "/audio/sentence4.mp3",
                translation: "Nghe hay đấy! Mấy giờ thì tiện cho bạn?",
            },
            {
                text: "How about three o'clock this afternoon?",
                audio: "/audio/sentence5.mp3",
                translation: "3 giờ chiều nay thì sao?",
            },
        ],
    }

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
        }, 2000)
    }

    const checkAnswer = () => {
        const currentSentenceData = exercise.sentences[currentSentence]
        const isCorrect = userInput.toLowerCase().trim() === currentSentenceData.text.toLowerCase()

        const result = {
            correct: isCorrect,
            userAnswer: userInput,
            correctAnswer: currentSentenceData.text,
        }

        setResults((prev) => [...prev, result])
        setShowResult(true)
    }

    const nextSentence = () => {
        if (currentSentence < exercise.sentences.length - 1) {
            setCurrentSentence((prev) => prev + 1)
            setUserInput("")
            setShowResult(false)
            setPlayCount(0)
        } else {
            setIsActive(false)
        }
    }

    const resetSentence = () => {
        setUserInput("")
        setShowResult(false)
        setPlayCount(0)
    }

    const progress = ((currentSentence + 1) / exercise.sentences.length) * 100
    const currentSentenceData = exercise.sentences[currentSentence]

    if (results.length === exercise.sentences.length) {
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
                                    <div className="text-sm text-gray-300">Câu đúng</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-400">{results.length - correctCount}</div>
                                    <div className="text-sm text-gray-300">Câu sai</div>
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
                                        <span className="font-semibold text-white">Câu {index + 1}</span>
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
                                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700">
                                    Quay lại danh sách
                                </Button>
                            </Link>
                            <Button className="flex-1 text-white border-0 hover:opacity-90" style={{ backgroundColor: '#93D333' }} onClick={() => window.location.reload()}>
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
                            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Quay lại
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-white">{exercise.title}</h1>
                            <p className="text-sm text-gray-300">
                                Chép chính tả - Câu {currentSentence + 1}/{exercise.sentences.length}
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

                                    <h3 className="text-lg font-semibold mb-4 text-white">Nghe và viết lại câu</h3>

                                    <div className="flex justify-center space-x-4 mb-6">
                                        <Button onClick={playAudio} disabled={isPlaying} className="text-white border-0 hover:opacity-90" style={{ backgroundColor: '#93D333' }}>
                                            {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                                            {isPlaying ? "Đang phát..." : "Phát âm thanh"}
                                        </Button>

                                        <Button variant="outline" onClick={resetSentence} className="border-gray-600 text-white hover:bg-gray-700">
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
                                <h3 className="text-lg font-semibold mb-4 text-white">Nhập câu bạn nghe được</h3>

                                <div className="space-y-4">
                                    <Input
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Gõ câu bạn nghe được..."
                                        className="text-lg p-4 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                                        disabled={showResult}
                                        onKeyPress={(e) => e.key === "Enter" && !showResult && checkAnswer()}
                                    />

                                    {!showResult ? (
                                        <Button
                                            onClick={checkAnswer}
                                            disabled={!userInput.trim()}
                                            className="w-full text-white border-0 hover:opacity-90"
                                            style={{ backgroundColor: '#93D333' }}
                                        >
                                            Kiểm tra
                                        </Button>
                                    ) : (
                                        <div className="space-y-4">
                                            <div
                                                className={`p-4 rounded-lg ${results[currentSentence]?.correct
                                                    ? "border border-green-500"
                                                    : "border border-red-500"
                                                    }`}
                                                style={{ backgroundColor: results[currentSentence]?.correct ? '#1a2a2f' : '#1a2a2f' }}
                                            >
                                                <div className="flex items-center mb-2">
                                                    {results[currentSentence]?.correct ? (
                                                        <Check className="h-5 w-5 text-green-600 mr-2" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-red-600 mr-2" />
                                                    )}
                                                    <span className="font-semibold text-white">
                                                        {results[currentSentence]?.correct ? "Chính xác!" : "Chưa đúng"}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="text-white">
                                                        <strong>Đáp án đúng:</strong> {currentSentenceData.text}
                                                    </div>
                                                    <div className="text-white">
                                                        <strong>Nghĩa:</strong> {currentSentenceData.translation}
                                                    </div>
                                                    {!results[currentSentence]?.correct && (
                                                        <div className="text-white">
                                                            <strong>Câu trả lời của bạn:</strong> {userInput}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <Button onClick={nextSentence} className="w-full text-white border-0 hover:opacity-90" style={{ backgroundColor: '#93D333' }}>
                                                {currentSentence < exercise.sentences.length - 1 ? "Câu tiếp theo" : "Hoàn thành"}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Danh sách câu</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {exercise.sentences.map((_, index) => (
                                    <Button
                                        key={index}
                                        variant={index === currentSentence ? "default" : "outline"}
                                        size="sm"
                                        className={`${results[index]
                                            ? results[index].correct
                                                ? "text-white border-green-500"
                                                : "text-white border-red-500"
                                            : "text-white border-gray-600"
                                            }`}
                                        style={{
                                            backgroundColor: index === currentSentence ? '#93D333' :
                                                results[index] ? (results[index].correct ? '#1a2a2f' : '#1a2a2f') : '#1a2a2f'
                                        }}
                                        onClick={() => {
                                            if (index <= results.length) {
                                                setCurrentSentence(index)
                                                setUserInput("")
                                                setShowResult(false)
                                                setPlayCount(0)
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
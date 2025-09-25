"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mic, MicOff, Volume2, Send, User, Bot } from "lucide-react"

export default function ConversationPage({ params }: { params: { id: string } }) {
    const [showSetup, setShowSetup] = useState(true)
    const [prompt, setPrompt] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [conversation, setConversation] = useState<Array<{ role: string; message: string; timestamp: string }>>([])
    const [timeLeft, setTimeLeft] = useState(180)
    const [isActive, setIsActive] = useState(false)
    const [currentMessage, setCurrentMessage] = useState("")
    const [isListening, setIsListening] = useState(false)

    const conversationData = {
        "1": {
            title: "Job Interview Practice",
            description: "Luyện tập phỏng vấn xin việc với AI",
            image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3H15NOYIwhyEpWzwWxdy2ztFp2sOcW.png",
            defaultPrompt:
                "Tôi là lập trình viên, tôi muốn thực hiện 1 cuộc phỏng vấn liên quan tới Backend developer ngôn ngữ C#, .NET Framework. Hãy đóng vai nhà tuyển dụng và phỏng vấn tôi.",
        },
    }

    const currentTopic = conversationData[params.id as keyof typeof conversationData]

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setIsActive(false)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timeLeft])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const startConversation = () => {
        if (!prompt.trim()) return

        setShowSetup(false)
        setIsActive(true)

        const initialMessage = {
            role: "ai",
            message:
                "Xin chào! Tôi là nhà tuyển dụng hôm nay. Trước tiên, bạn có thể giới thiệu về bản thân và kinh nghiệm làm việc với C# và .NET Framework không?",
            timestamp: new Date().toLocaleTimeString(),
        }

        setConversation([initialMessage])
    }

    const handleVoiceInput = () => {
        if (!isRecording) {
            setIsRecording(true)
            setIsListening(true)
            if ("webkitSpeechRecognition" in window) {
                const recognition = new (window as any).webkitSpeechRecognition()
                recognition.continuous = false
                recognition.interimResults = false
                recognition.lang = "en-US"

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript
                    setCurrentMessage(transcript)
                    setIsRecording(false)
                    setIsListening(false)
                }

                recognition.onerror = () => {
                    setIsRecording(false)
                    setIsListening(false)
                }

                recognition.start()
            }
        } else {
            setIsRecording(false)
            setIsListening(false)
        }
    }

    const sendMessage = () => {
        if (!currentMessage.trim()) return

        const userMessage = {
            role: "user",
            message: currentMessage,
            timestamp: new Date().toLocaleTimeString(),
        }

        setConversation((prev) => [...prev, userMessage])
        setCurrentMessage("")

        setTimeout(() => {
            const aiResponses = [
                "Rất tốt! Bạn có thể chia sẻ về một dự án cụ thể mà bạn đã làm với .NET Framework không?",
                "Thú vị! Bạn đã gặp những thách thức gì khi làm việc với C# và giải quyết như thế nào?",
                "Tuyệt vời! Bạn có kinh nghiệm với Entity Framework hay các ORM khác không?",
                "Cảm ơn bạn đã chia sẻ. Cuối cùng, bạn có câu hỏi nào về công ty hay vị trí này không?",
            ]

            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

            const aiMessage = {
                role: "ai",
                message: randomResponse,
                timestamp: new Date().toLocaleTimeString(),
            }

            setConversation((prev) => [...prev, aiMessage])
        }, 1500)
    }

    if (showSetup) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F3EA]">
                <Card className="w-full max-w-2xl border-0 bg-white">
                    <CardContent className="p-8">
                        <div className="text-center mb-8">
                            <img
                                src={currentTopic?.image || "/placeholder.svg"}
                                alt={currentTopic?.title}
                                className="w-64 h-48 mx-auto rounded-lg mb-6 object-cover"
                            />
                            <h1 className="text-2xl font-bold mb-2 text-slate-800">Gặp người bạn mới trong buổi tiệc</h1>
                            <h2 className="text-xl mb-4 text-slate-700">Trò chuyện với AI - Làm Nhiệm Vụ</h2>
                            <p className="text-slate-600 mb-6">
                                Robert là người bạn mới gặp trong một buổi tiệc. Bạn muốn làm quen và giới thiệu bản thân. Bạn và Robert
                                đừng nói chuyện bên cạnh bàn tiệc nhỏ. 🍸
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-slate-800">Nhiệm vụ</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-lime-500">
                                        <span className="text-white text-sm">🎯</span>
                                    </div>
                                    <span className="text-slate-700">Hãy chia sẻ tên của bạn.</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-lime-500">
                                        <span className="text-white text-sm">🎯</span>
                                    </div>
                                    <span className="text-slate-700">Cho người bạn mới biết bạn đến từ đâu.</span>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-lime-500">
                                        <span className="text-white text-sm">🎯</span>
                                    </div>
                                    <span className="text-slate-700">Chia sẻ nghề nghiệp của bạn.</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <Button
                                className="flex-1 text-white border-0 hover:opacity-90 text-lg py-3 cursor-pointer bg-lime-500"
                                onClick={() => {
                                    setPrompt(currentTopic?.defaultPrompt || "")
                                    startConversation()
                                }}
                            >
                                Bắt đầu bài học
                            </Button>
                            <Button variant="outline" className="flex-1 text-lg py-3 border-slate-200 text-slate-700 hover:bg-lime-50 cursor-pointer">
                                Lịch sử trò chuyện
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen text-slate-800 bg-[#F5F3EA]">
            <div className="px-6 py-4 bg-[#F5F3EA]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/learning/speaking">
                            <Button variant="outline" size="sm" className="text-slate-700 hover:text-slate-800 border-slate-200 hover:bg-lime-50 cursor-pointer">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Quay lại
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">Làm nhiệm vụ cùng AI</h1>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <span>✅ 0/3</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="px-3 py-1 rounded-full font-mono text-white bg-lime-500">⏱️ {formatTime(timeLeft)}</div>
                    </div>
                </div>
            </div>

            <div className="flex h-[calc(100vh-80px)]">
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        <div className="text-center mb-6">
                            <h2 className="text-lg font-semibold mb-2 text-slate-800">Tình huống</h2>
                            <p className="text-slate-700">
                                Robert là người bạn mới gặp trong một buổi tiệc. Bạn muốn làm quen và giới thiệu bản thân. Bạn và Robert
                                đừng nói chuyện bên cạnh bàn tiệc nhỏ. 🍸
                            </p>
                        </div>

                        <div className="space-y-4">
                            {conversation.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`flex items-start space-x-3 max-w-xs ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.role === "user" ? "text-white bg-lime-500" : "bg-slate-400"}`}
                                        >
                                            {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg ${msg.role === "user" ? "text-white bg-lime-500" : "bg-white text-slate-800 border border-slate-200"}`}
                                        >
                                            <p>{msg.message}</p>
                                            <p className="text-xs text-slate-500 mt-1">{msg.timestamp}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {conversation.length > 0 && (
                            <div className="flex justify-center">
                                <div className="rounded-lg p-4 flex items-center space-x-3 bg-white border border-slate-200">
                                    <img src="/placeholder.svg?height=40&width=40" alt="Robert" className="w-10 h-10 rounded-full" />
                                    <div className="flex-1">
                                        <p className="text-slate-800">Hi! My name is Robert. What is your name?</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button size="sm" className="text-white border-0 hover:opacity-90 cursor-pointer bg-lime-500">
                                            <Volume2 className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="border-slate-200 text-slate-700 hover:bg-lime-50 cursor-pointer">
                                            🔄
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t p-6 bg-white border-slate-200">
                        <div className="flex items-center space-x-4">
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-slate-200 text-slate-700 hover:bg-lime-50 bg-transparent cursor-pointer"
                            >
                                💬
                            </Button>

                            <Button
                                className={`w-16 h-16 rounded-full cursor-pointer ${isRecording ? "animate-pulse" : ""} ${isRecording ? 'bg-red-500' : 'bg-lime-500'}`}
                                onClick={handleVoiceInput}
                            >
                                {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                className="border-slate-200 text-slate-700 hover:bg-lime-50 bg-transparent cursor-pointer"
                            >
                                💡
                            </Button>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-slate-600">{isRecording ? "Đang nghe..." : "Nhấn Enter"}</p>
                        </div>

                        {currentMessage && (
                            <div className="mt-4 p-3 rounded-lg bg-white border border-slate-200">
                                <p className="text-slate-800">{currentMessage}</p>
                                <div className="flex justify-end mt-2">
                                    <Button size="sm" onClick={sendMessage} className="text-white border-0 hover:opacity-90 cursor-pointer bg-lime-500">
                                        <Send className="h-4 w-4 mr-1" />
                                        Gửi
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-80 border-l p-6 bg-white border-slate-200">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800">Nhiệm vụ</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-400">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <span className="text-slate-700">Hãy chia sẻ tên của bạn.</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-400">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <span className="text-slate-700">Cho người bạn mới biết bạn đến từ đâu.</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-400">
                                <span className="text-white text-sm">✓</span>
                            </div>
                            <span className="text-slate-700">Chia sẻ nghề nghiệp của bạn.</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="font-semibold mb-3 text-slate-800">Gợi ý</h4>
                        <div className="space-y-2 text-sm text-slate-600">
                            <p>• Nói chậm và rõ ràng</p>
                            <p>• Sử dụng câu đơn giản</p>
                            <p>• Đừng ngại lặp lại</p>
                            <p>• Tự tin và tự nhiên</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

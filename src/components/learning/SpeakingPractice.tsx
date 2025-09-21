"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
    Play,
    Pause,
    Volume2,
    Mic,
    MicOff,
    RotateCcw,
    Settings,
    Share2,
    Clock,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSpeaking } from "@/hooks/learning/useSpeaking"

// Web Speech API types
declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

interface SpeakingPracticeProps {
    learningUnitId: string
}

export default function SpeakingPractice({ learningUnitId }: SpeakingPracticeProps) {
    const { data: speakingData, isLoading, error } = useSpeaking(learningUnitId)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [autoPause, setAutoPause] = useState(true)
    const [largeVideo, setLargeVideo] = useState(false)
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [activeTab, setActiveTab] = useState("transcript")

    const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null)
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null)
    const [voiceToText, setVoiceToText] = useState<string>('')

    const audioRef = useRef<HTMLAudioElement>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const recordedAudioRef = useRef<HTMLAudioElement>(null)
    const recognitionRef = useRef<any>(null)
    const streamRef = useRef<MediaStream | null>(null)

    const transcripts = speakingData?.media?.transcripts?.data || []
    const currentTranscript = transcripts[currentTranscriptIndex]

    // Initialize Web Speech API
    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.interimResults = true
            recognitionRef.current.lang = 'en-US'

            recognitionRef.current.onresult = (event: any) => {
                let finalTranscript = ''
                let interimTranscript = ''

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript
                    } else {
                        interimTranscript += transcript
                    }
                }

                const newText = voiceToText + finalTranscript + interimTranscript
                setVoiceToText(newText)

                // Log ra console để xem
                console.log('🎤 Voice to Text:', newText)
                console.log('📝 Final transcript:', finalTranscript)
                console.log('⏳ Interim transcript:', interimTranscript)
            }

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error)
            }
        }
    }, [voiceToText])

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current

            const updateTime = () => setCurrentTime(audio.currentTime)
            const updateDuration = () => setDuration(audio.duration)

            audio.addEventListener('timeupdate', updateTime)
            audio.addEventListener('loadedmetadata', updateDuration)

            return () => {
                audio.removeEventListener('timeupdate', updateTime)
                audio.removeEventListener('loadedmetadata', updateDuration)
            }
        }
    }, [speakingData])

    useEffect(() => {
        if (autoPause && currentTranscript) {
            const audio = audioRef.current
            if (audio && currentTime >= currentTranscript.endTime) {
                audio.pause()
                setIsPlaying(false)
            }
        }
    }, [currentTime, currentTranscript, autoPause])

    const togglePlayPause = () => {
        const audio = audioRef.current
        if (audio) {
            if (isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleSeek = (time: number) => {
        const audio = audioRef.current
        if (audio) {
            audio.currentTime = time
            setCurrentTime(time)
        }
    }

    const goToTranscript = (index: number) => {
        if (transcripts[index]) {
            setCurrentTranscriptIndex(index)
            handleSeek(transcripts[index].startTime)
        }
    }

    const nextTranscript = () => {
        if (currentTranscriptIndex < transcripts.length - 1) {
            goToTranscript(currentTranscriptIndex + 1)
        }
    }

    const prevTranscript = () => {
        if (currentTranscriptIndex > 0) {
            goToTranscript(currentTranscriptIndex - 1)
        }
    }

    const startRecording = async () => {
        try {
            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            streamRef.current = stream

            // Setup MediaRecorder for audio recording
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            })
            mediaRecorderRef.current = mediaRecorder

            const audioChunks: BlobPart[] = []

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data)
                }
            }

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
                const audioUrl = URL.createObjectURL(audioBlob)

                setRecordedAudioBlob(audioBlob)
                setRecordedAudioUrl(audioUrl)

                console.log('🎵 Audio recorded:', audioBlob)
                console.log('🔗 Audio URL:', audioUrl)
            }

            // Start recording
            mediaRecorder.start()

            // Start speech recognition
            if (recognitionRef.current) {
                recognitionRef.current.start()
            }

            // Reset voice to text
            setVoiceToText('')
            setIsRecording(true)

            console.log('🎤 Recording started!')
        } catch (error) {
            console.error('Error accessing microphone:', error)
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop()
        }

        if (recognitionRef.current) {
            recognitionRef.current.stop()
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
        }

        setIsRecording(false)
        console.log('🛑 Recording stopped!')
        console.log('📝 Final voice to text:', voiceToText)
    }

    const playRecordedAudio = () => {
        if (recordedAudioRef.current && recordedAudioUrl) {
            recordedAudioRef.current.src = recordedAudioUrl
            recordedAudioRef.current.play()
            console.log('▶️ Playing recorded audio:', recordedAudioUrl)
        } else {
            console.log('❌ No recorded audio to play')
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F3EA' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F3713B] mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải bài học...</p>
                </div>
            </div>
        )
    }

    if (error || !speakingData) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F3EA' }}>
                <div className="text-center">
                    <p className="text-red-500 mb-4">Có lỗi khi tải dữ liệu</p>
                    <Button
                        onClick={() => window.location.reload()}
                        style={{ backgroundColor: '#F3713B' }}
                        className="text-white"
                    >
                        Thử lại
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F5F3EA' }}>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Topics</span>
                            <span>&gt;</span>
                            <span>Movie short clip</span>
                            <span>&gt;</span>
                            <span className="truncate max-w-xs">{speakingData.media.title}</span>
                            <Badge variant="outline" className="ml-2">A2</Badge>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(currentTime)}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                            Phím tắt
                        </Button>
                        <Button variant="ghost" size="sm">
                            Ẩn transcript
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Video/Audio Player */}
                        <Card className="border-0 shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
                            <CardContent className="p-6">
                                <div className="text-center">
                                    <div className="mb-6">
                                        <audio
                                            ref={audioRef}
                                            src={speakingData.media.sourceUrl}
                                            onEnded={() => setIsPlaying(false)}
                                        />

                                        {/* Play Button */}
                                        <motion.div
                                            className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center cursor-pointer"
                                            style={{ backgroundColor: '#F3713B' }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={togglePlayPause}
                                        >
                                            {isPlaying ? (
                                                <Pause className="h-12 w-12 text-white" />
                                            ) : (
                                                <Play className="h-12 w-12 text-white ml-1" />
                                            )}
                                        </motion.div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <Progress
                                                value={(currentTime / duration) * 100}
                                                className="h-2 mb-2"
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect()
                                                    const clickX = e.clientX - rect.left
                                                    const percentage = clickX / rect.width
                                                    handleSeek(percentage * duration)
                                                }}
                                            />
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>{formatTime(currentTime)}</span>
                                                <span>{formatTime(duration)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Media Info */}
                                    <h2 className="text-xl font-bold mb-2" style={{ color: '#142F50' }}>
                                        {speakingData.media.title}
                                    </h2>

                                    {/* External Link */}
                                    <Button variant="outline" className="mb-6">
                                        <Volume2 className="h-4 w-4 mr-2" />
                                        Xem trên YouTube
                                    </Button>

                                    {/* Controls */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-center space-x-4">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={autoPause}
                                                    onChange={(e) => setAutoPause(e.target.checked)}
                                                    className="rounded"
                                                />
                                                <span className="text-sm">Tự động dừng</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={largeVideo}
                                                    onChange={(e) => setLargeVideo(e.target.checked)}
                                                    className="rounded"
                                                />
                                                <span className="text-sm">Video kích thước lớn</span>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-center space-x-4">
                                            <Button
                                                onClick={togglePlayPause}
                                                style={{ backgroundColor: '#93D333' }}
                                                className="text-white"
                                            >
                                                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                                {isPlaying ? 'Tạm dừng' : 'Bắt đầu'}
                                            </Button>

                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm">{playbackSpeed}x</span>
                                                <Button variant="outline" size="sm">
                                                    <Settings className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Current Transcript */}
                        {currentTranscript && (
                            <Card className="border-0 shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        <h3 className="text-lg font-bold" style={{ color: '#142F50' }}>
                                            {currentTranscript.contentEN}
                                        </h3>

                                        {currentTranscript.ipa && currentTranscript.ipa !== "null" && (
                                            <p className="text-gray-600 font-mono">
                                                {currentTranscript.ipa}
                                            </p>
                                        )}

                                        <div className="flex justify-center space-x-4">
                                            <Button
                                                variant="outline"
                                                onClick={playRecordedAudio}
                                                disabled={!recordedAudioUrl}
                                            >
                                                <RotateCcw className="h-4 w-4 mr-2" />
                                                Phát lại ghi âm
                                            </Button>

                                            <Button
                                                onClick={isRecording ? stopRecording : startRecording}
                                                style={{ backgroundColor: isRecording ? '#ef4444' : '#93D333' }}
                                                className="text-white"
                                            >
                                                {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                                                {isRecording ? 'Dừng ghi âm' : 'Ghi âm'}
                                            </Button>
                                        </div>

                                        {/* Voice to Text Display */}
                                        {voiceToText && (
                                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                                <h4 className="font-bold mb-2 text-left text-blue-800">🎤 Voice to Text:</h4>
                                                <p className="text-left text-blue-700">{voiceToText}</p>
                                            </div>
                                        )}

                                        {/* Recorded Audio Player */}
                                        {recordedAudioUrl && (
                                            <div className="mt-4">
                                                <h4 className="font-bold mb-2 text-left">🎵 Audio đã ghi:</h4>
                                                <audio
                                                    ref={recordedAudioRef}
                                                    src={recordedAudioUrl}
                                                    controls
                                                    className="w-full"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
                            <CardContent className="p-6">
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList className="grid w-full grid-cols-3 mb-4">
                                        <TabsTrigger value="transcript">Bản chép</TabsTrigger>
                                        <TabsTrigger value="ipa">IPA</TabsTrigger>
                                        <TabsTrigger value="trans">Trans</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="transcript" className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Progress value={(currentTranscriptIndex + 1) / transcripts.length * 100} className="w-24 h-2" />
                                                <span className="text-sm text-gray-500">
                                                    {currentTranscriptIndex + 1}/{transcripts.length}
                                                </span>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                <Share2 className="h-4 w-4 mr-2" />
                                                Chia sẻ
                                            </Button>
                                        </div>

                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            <AnimatePresence>
                                                {transcripts.map((transcript: any, index: number) => (
                                                    <motion.div
                                                        key={transcript.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        className={`p-4 rounded-lg cursor-pointer transition-all ${index === currentTranscriptIndex
                                                            ? 'bg-[#F3713B] text-white'
                                                            : 'bg-gray-50 hover:bg-gray-100'
                                                            }`}
                                                        onClick={() => goToTranscript(index)}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <span className="text-sm font-bold">#{index + 1}</span>
                                                                    <span className="text-xs opacity-75">
                                                                        {formatTime(transcript.startTime)} - {formatTime(transcript.endTime)}
                                                                    </span>
                                                                </div>
                                                                <p className="font-medium mb-1">{transcript.contentEN}</p>
                                                                <p className={`text-sm ${index === currentTranscriptIndex ? 'text-white/80' : 'text-gray-600'}`}>
                                                                    {transcript.contentVN}
                                                                </p>
                                                            </div>
                                                            <div className="flex space-x-1 ml-2">
                                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                                    <Settings className="h-3 w-3" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                                    <Volume2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex justify-between">
                                            <Button
                                                variant="outline"
                                                onClick={prevTranscript}
                                                disabled={currentTranscriptIndex === 0}
                                            >
                                                <ChevronLeft className="h-4 w-4 mr-2" />
                                                Trước
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={nextTranscript}
                                                disabled={currentTranscriptIndex === transcripts.length - 1}
                                            >
                                                Sau
                                                <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="ipa">
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {transcripts.map((transcript: any, index: number) => (
                                                <div key={transcript.id} className="p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <span className="text-sm font-bold">#{index + 1}</span>
                                                    </div>
                                                    <p className="font-mono text-sm">
                                                        {transcript.ipa && transcript.ipa !== "null" ? transcript.ipa : "Chưa có IPA"}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="trans">
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {transcripts.map((transcript: any, index: number) => (
                                                <div key={transcript.id} className="p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <span className="text-sm font-bold">#{index + 1}</span>
                                                    </div>
                                                    <p className="text-sm">{transcript.contentVN}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

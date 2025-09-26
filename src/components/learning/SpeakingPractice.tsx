"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
    ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpeaking } from "@/hooks/learning/useSpeaking";

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

interface SpeakingPracticeProps {
    learningUnitId: string;
}

export default function SpeakingPractice({
    learningUnitId,
}: SpeakingPracticeProps) {
    const { data: speakingData, isLoading, error, submitSpeaking, isSubmitting } = useSpeaking(learningUnitId);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [autoPause, setAutoPause] = useState(true);
    const [largeVideo, setLargeVideo] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [activeTab, setActiveTab] = useState("transcript");
    const [wasPlayingBeforeRecord, setWasPlayingBeforeRecord] = useState(false);
    const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);

    const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
    const [voiceToText, setVoiceToText] = useState<string>("");
    const [isChecking, setIsChecking] = useState(false);
    const [submitResult, setSubmitResult] = useState<{
        highlighted: string;
        accuracy: number;
        message: string;
    } | null>(null);

    const audioRef = useRef<HTMLAudioElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedAudioRef = useRef<HTMLAudioElement>(null);
    const recognitionRef = useRef<any>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const transcripts = speakingData?.media?.transcripts?.data || [];
    const currentTranscript = transcripts[currentTranscriptIndex];

    // Initialize Web Speech API
    useEffect(() => {
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
            const SpeechRecognition =
                window.webkitSpeechRecognition || window.SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onresult = (event: any) => {
                let finalTranscript = "";
                let interimTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                const newText = voiceToText + finalTranscript + interimTranscript;
                setVoiceToText(newText);

                console.log("🎤 Voice to Text:", newText);
                console.log("📝 Final transcript:", finalTranscript);
                console.log("⏳ Interim transcript:", interimTranscript);
            };
        }
    }, [voiceToText]);

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;

            const updateTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => setDuration(audio.duration);

            audio.addEventListener("timeupdate", updateTime);
            audio.addEventListener("loadedmetadata", updateDuration);

            return () => {
                audio.removeEventListener("timeupdate", updateTime);
                audio.removeEventListener("loadedmetadata", updateDuration);
            };
        }
    }, [speakingData]);

    useEffect(() => {
        if (autoPause && currentTranscript) {
            const audio = audioRef.current;
            if (audio && currentTime >= currentTranscript.endTime) {
                audio.pause();
                setIsPlaying(false);
            }
        }
    }, [currentTime, currentTranscript, autoPause]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (time: number) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = time;
            setCurrentTime(time);
        }
    };

    const goToTranscript = (index: number) => {
        if (transcripts[index]) {
            // Reset state for next question
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch { }
            }
            setIsRecording(false);
            setVoiceToText("");
            setSubmitResult(null);
            setRecordedAudioUrl(null);
            setCurrentTranscriptIndex(index);
            handleSeek(transcripts[index].startTime);
        }
    };

    const nextTranscript = () => {
        if (currentTranscriptIndex < transcripts.length - 1) {
            goToTranscript(currentTranscriptIndex + 1);
        }
    };

    const prevTranscript = () => {
        if (currentTranscriptIndex > 0) {
            goToTranscript(currentTranscriptIndex - 1);
        }
    };

    const getSupportedMimeType = () => {
        const candidates = [
            "audio/webm;codecs=opus",
            "audio/webm",
            "audio/mp4;codecs=aac",
            "audio/mp4",
            "audio/mpeg",
        ];
        for (const t of candidates) {
            if (typeof MediaRecorder !== "undefined" && (MediaRecorder as any).isTypeSupported?.(t)) return t;
        }
        return undefined;
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // Setup MediaRecorder for audio recording
            const mimeType = getSupportedMimeType();
            const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
            mediaRecorderRef.current = mediaRecorder;

            const audioChunks: BlobPart[] = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const type = mediaRecorder.mimeType || "audio/webm";
                const audioBlob = new Blob(audioChunks, { type });
                const audioUrl = URL.createObjectURL(audioBlob);

                setRecordedAudioBlob(audioBlob);
                setRecordedAudioUrl(audioUrl);

                console.log("🎵 Audio recorded:", audioBlob);
                console.log("🔗 Audio URL:", audioUrl);
            };
            mediaRecorder.start();
            if (recognitionRef.current) {
                recognitionRef.current.start();
            }
            setVoiceToText("");
            setIsRecording(true);

            console.log("🎤 Recording started!");
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = async () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state === "recording"
        ) {
            mediaRecorderRef.current.stop();
        }

        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }

        setIsRecording(false);
        console.log("Recording stopped!");
        console.log("Final voice to text:", voiceToText);

        if (currentTranscript?.id && voiceToText.trim()) {
            try {
                setIsChecking(true);
                const res: any = await submitSpeaking({
                    transcriptId: String(currentTranscript.id),
                    text: voiceToText,
                });

                const highlighted = res?.data?.highlighted ?? "";
                const accuracy = res?.data?.accuracy ?? 0;
                const message = res?.message ?? "";
                setSubmitResult({ highlighted, accuracy, message });
            } catch (err) {
                console.error("Submit speaking failed", err);
                setSubmitResult({ highlighted: "", accuracy: 0, message: "Error" });
            } finally {
                setIsChecking(false);
            }
        }
    };

    const playRecordedAudio = () => {
        if (recordedAudioRef.current && recordedAudioUrl) {
            const el = recordedAudioRef.current;
            el.pause();
            el.src = recordedAudioUrl;
            try { el.load(); } catch { }
            el.currentTime = 0;
            el.play();
            console.log("▶️ Playing recorded audio:", recordedAudioUrl);
        } else {
            console.log(" No recorded audio to play");
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    if (isLoading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: "#F5F3EA" }}
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F3713B] mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải bài học...</p>
                </div>
            </div>
        );
    }

    if (error || !speakingData) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: "#F5F3EA" }}
            >
                <div className="text-center">
                    <p className="text-red-500 mb-4">Có lỗi khi tải dữ liệu</p>
                    <Button
                        onClick={() => window.location.reload()}
                        style={{ backgroundColor: "#F3713B" }}
                        className="text-white"
                    >
                        Thử lại
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F5F3EA" }}>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-slate-700 hover:text-slate-800 bg-[#FF9966] border-slate-200 hover:bg-lime-50"
                            onClick={() => window.history.back()}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="truncate max-w-xs text-xl text-slate-800 font-calistoga-regular">
                                {speakingData.media.title}
                            </span>
                            <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300">
                                A2
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(currentTime)}</span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-slate-700 bg-[#FF9966] hover:text-slate-800 border-slate-200 hover:bg-lime-50 font-inter-medium"
                        >
                            Phím tắt
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-slate-700 bg-[#FF9966] hover:text-slate-800 border-slate-200 hover:bg-lime-50"
                        >
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
                        <Card
                            className="border-0 shadow-sm"
                            style={{ backgroundColor: "#FFFFFF" }}
                        >
                            <CardContent className="p-3">
                                <div className="text-center">
                                    <div className="mb-6">
                                        <audio
                                            ref={audioRef}
                                            src={speakingData.media.sourceUrl}
                                            onEnded={() => setIsPlaying(false)}
                                        />

                                        <motion.div
                                            className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center cursor-pointer"
                                            style={{ backgroundColor: "#F3713B" }}
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

                                        <div className="mb-4">
                                            <Progress
                                                value={(currentTime / duration) * 100}
                                                className="h-2 mb-2"
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    const clickX = e.clientX - rect.left;
                                                    const percentage = clickX / rect.width;
                                                    handleSeek(percentage * duration);
                                                }}
                                            />
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>{formatTime(currentTime)}</span>
                                                <span>{formatTime(duration)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold mb-2 text-slate-800">
                                        {speakingData.media.title}
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-center space-x-4">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={autoPause}
                                                    onChange={(e) => setAutoPause(e.target.checked)}
                                                    className="rounded"
                                                />
                                                <span className="text-sm text-slate-700">
                                                    Tự động dừng
                                                </span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={largeVideo}
                                                    onChange={(e) => setLargeVideo(e.target.checked)}
                                                    className="rounded"
                                                />
                                                <span className="text-sm text-slate-700">
                                                    Video kích thước lớn
                                                </span>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-center space-x-4">
                                            <Button
                                                onClick={togglePlayPause}
                                                style={{ backgroundColor: "#66CCA0" }}
                                                className="text-white"
                                            >
                                                {isPlaying ? (
                                                    <Pause className="h-4 w-4 mr-2" />
                                                ) : (
                                                    <Play className="h-4 w-4 mr-2" />
                                                )}
                                                {isPlaying ? "Tạm dừng" : "Bắt đầu"}
                                            </Button>

                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-black">{playbackSpeed}x</span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-[#FFFFF] hover:text-slate-800 border-slate-200 hover:bg-lime-50"
                                                >
                                                    <Settings className="h-4 w-4 bg-[#FFFFF]" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Current Transcript */}
                        {currentTranscript && (
                            <Card
                                className="border-0 shadow-sm"
                                style={{ backgroundColor: "#FFFFFF" }}
                            >
                                <CardContent className="p-6">
                                    <div className="text-center space-y-4">
                                        {isChecking && (
                                            <div className="mt-6 p-3 rounded-md bg-yellow-50 text-yellow-800 text-sm inline-flex items-center gap-2">
                                                <span className="animate-pulse">●</span> Đang chấm điểm...
                                            </div>
                                        )}

                                        {voiceToText && submitResult && (() => {
                                            const accuracy = Math.round(submitResult.accuracy || 0);
                                            const msg = submitResult.message || "";
                                            const hasNotCorrect = /not\s*correct/i.test(msg);
                                            const hasCorrect = /\bcorrect\b/i.test(msg) && !hasNotCorrect;
                                            const isCorrect = hasCorrect ? true : (hasNotCorrect ? false : accuracy >= 60);
                                            return (
                                                <div className={`mt-6 p-4 rounded-lg border ${isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}>
                                                    <h4 className={`font-bold mb-2 text-left ${isCorrect ? "text-green-900" : "text-red-900"}`}>Kết quả</h4>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className={`mb-2 text-sm ${isCorrect ? "text-green-800" : "text-red-800"}`}>Bạn đã nói:</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {voiceToText.split(/\s+/).map((w, i) => (
                                                                    <span key={i} className={`px-2 py-1 rounded-md border text-sm ${isCorrect ? "bg-white text-green-900 border-green-200" : "bg-white text-red-900 border-red-200"}`}>
                                                                        {w}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="shrink-0 text-center">
                                                            <div className={`text-3xl font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>{accuracy}</div>
                                                            <div className={`${isCorrect ? "text-green-700" : "text-red-700"} text-xs`}>điểm</div>
                                                        </div>
                                                    </div>
                                                    {submitResult.message && (
                                                        <div className={`mt-3 text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>{submitResult.message}</div>
                                                    )}
                                                </div>
                                            );
                                        })()}

                                        {voiceToText && (
                                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                                <h4 className="font-bold mb-2 text-left text-blue-900">
                                                    🎤 Voice to Text:
                                                </h4>
                                                <p className="text-left text-blue-800">{voiceToText}</p>
                                            </div>
                                        )}

                                        {recordedAudioUrl && (
                                            <div className="mt-4 hidden">
                                                <h4
                                                    className="font-bold mb-2 text-left cursor-pointer select-none hover:underline hidden"
                                                    onClick={playRecordedAudio}
                                                >
                                                    🎵 Audio đã ghi:
                                                </h4>
                                                <audio
                                                    ref={recordedAudioRef}
                                                    src={recordedAudioUrl}
                                                    controls
                                                    className="w-full hidden"
                                                />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-bold text-slate-800">
                                            {currentTranscript.contentEN}
                                        </h3>

                                        {currentTranscript.ipa &&
                                            currentTranscript.ipa !== "null" && (
                                                <p className="text-slate-600 font-mono">
                                                    {currentTranscript.ipa}
                                                </p>
                                            )}

                                        <div className="flex justify-center space-x-4">
                                            <Button
                                                variant="outline"
                                                onClick={playRecordedAudio}
                                                disabled={!recordedAudioUrl}
                                                className="text-[#FFFFfF] hover:text-slate-800 border-slate-200 hover:bg-lime-50"
                                            >
                                                <RotateCcw className="h-4 w-4 mr-2 text-[#FFFFF]" />
                                                Phát lại ghi âm
                                            </Button>

                                            <Button
                                                onClick={isRecording ? stopRecording : startRecording}
                                                style={{
                                                    backgroundColor: isRecording ? "#ef4444" : "#66CCA0",
                                                }}
                                                className="text-white"
                                            >
                                                {isRecording ? (
                                                    <MicOff className="h-4 w-4 mr-2" />
                                                ) : (
                                                    <Mic className="h-4 w-4 mr-2" />
                                                )}
                                                {isRecording ? (isSubmitting || isChecking ? "Đang chấm..." : "Dừng ghi âm") : "Ghi âm"}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card
                            className="border-0 shadow-sm"
                            style={{ backgroundColor: "#FFFFFF" }}
                        >
                            <CardContent className="p-6">
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList className="grid w-full grid-cols-3 mb-4">
                                        <TabsTrigger value="transcript" className="bg-[#FF9966]">
                                            Bản chép
                                        </TabsTrigger>
                                        <TabsTrigger value="ipa" className="bg-[#FF9966]">
                                            IPA
                                        </TabsTrigger>
                                        <TabsTrigger value="trans" className="bg-[#FF9966]">
                                            Trans
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="transcript" className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Progress
                                                    value={
                                                        ((currentTranscriptIndex + 1) /
                                                            transcripts.length) *
                                                        100
                                                    }
                                                    className="w-24 h-2"
                                                />
                                                <span className="text-sm text-slate-600">
                                                    {currentTranscriptIndex + 1}/{transcripts.length}
                                                </span>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-[#FFFFfF] hover:text-slate-800 border-slate-200 hover:bg-lime-50"
                                            >
                                                <Share2 className="h-4 w-4 mr-2 text-[#FFFFfF]" />
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
                                                        className={`p-4 rounded-lg cursor-pointer transition-all border-gray-600 border-[1px] border-solid ${index === currentTranscriptIndex
                                                            ? "bg-[#F3713B] text-white"
                                                            : "bg-gray-100 hover:bg-gray-100"
                                                            }`}
                                                        onClick={() => goToTranscript(index)}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center space-x-2 mb-2 text-[#000000]">
                                                                    <span className="text-sm font-bold">
                                                                        #{index + 1}
                                                                    </span>
                                                                    <span className="text-xs opacity-75">
                                                                        {formatTime(transcript.startTime)} -{" "}
                                                                        {formatTime(transcript.endTime)}
                                                                    </span>
                                                                </div>
                                                                <p className="font-medium mb-1">
                                                                    {transcript.contentEN}
                                                                </p>
                                                                <p
                                                                    className={`text-sm italic ${index === currentTranscriptIndex
                                                                        ? "text-white/80"
                                                                        : "text-slate-700"
                                                                        }`}
                                                                >
                                                                    {transcript.contentVN}
                                                                </p>
                                                            </div>
                                                            <div className="flex space-x-1 ml-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0 text-slate-700 hover:text-slate-800 border-[#00000] bg-[#FFFF] hover:bg-lime-50"
                                                                >
                                                                    <Settings className="h-3 w-3" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0 text-slate-700 hover:text-slate-800 border-[#00000] hover:bg-lime-50 bg-[#FFFF]"
                                                                >
                                                                    <Volume2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>

                                        <div className="flex justify-between">
                                            <Button
                                                variant="outline"
                                                onClick={prevTranscript}
                                                disabled={currentTranscriptIndex === 0}
                                                className="text-[#FFFFfF] hover:text-slate-800 border-slate-200 hover:bg-lime-50"
                                            >
                                                <ChevronLeft className="h-4 w-4 mr-2" />
                                                Trước
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={nextTranscript}
                                                disabled={
                                                    currentTranscriptIndex === transcripts.length - 1
                                                }
                                                className="text-[#FFFFfF] hover:text-slate-800 border-slate-200 hover:bg-lime-50"
                                            >
                                                Sau
                                                <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="ipa">
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {transcripts.map((transcript: any, index: number) => (
                                                <div
                                                    key={transcript.id}
                                                    className="p-4 bg-gray-100 border-[1px] border-solid border-gray-500 rounded-lg"
                                                >
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <span className="text-sm font-bold text-black">
                                                            #{index + 1}
                                                        </span>
                                                    </div>
                                                    <p className="font-mono text-black text-sm">
                                                        {transcript.ipa && transcript.ipa !== "null"
                                                            ? transcript.ipa
                                                            : "Chưa có IPA"}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="trans">
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {transcripts.map((transcript: any, index: number) => (
                                                <div
                                                    key={transcript.id}
                                                    className="p-4 bg-gray-50 rounded-lg border-[1px] border-solid border-gray-300"
                                                >
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <span className="text-sm font-bold text-black">
                                                            #{index + 1}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-black">{transcript.contentVN}</p>
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
    );
}

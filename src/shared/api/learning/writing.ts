import api from "../index";
import { APP_URL } from "../../constants/apiConstants";
import { UpdateWritingType, createWritingType, summitWritingType, summitWritingStreamType, StreamResponse } from "@/types/learning/writing";

export const getWritingById = async (writingId: string) => {
    const response = await api.get(`${APP_URL}/writings/${writingId}`)
    return response.data
}

export const getWritingByLearningUnitId = async (learningUnitId: string) => {
    const response = await api.get(
        `${APP_URL}/writings/${learningUnitId}/learningUnit`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    )

    return response.data
}


export const updateWriting = async (writingId: string, data: UpdateWritingType) => {
    const response = await api.patch(`${APP_URL}/writings/${writingId}`, data)
    return response.data
}

export const createWriting = async (data: createWritingType) => {
    const response = await api.post(`${APP_URL}/writings`, data)
    return response.data
}

export const deleteWriting = async (writingId: string) => {
    const response = await api.delete(`${APP_URL}/writings/${writingId}`)
    return response.data
}

export const summitWriting = async (data: summitWritingType) => {
    const response = await api.post(`${APP_URL}/writings/submit`, data)
    return response.data
}

export const summitWritingStream = async (
    data: summitWritingStreamType,
    onFeedback: (feedback: string) => void,
    onScore: (score: { Point: number; IsCorrect: boolean }) => void,
    onComplete: () => void,
    onError: (error: string) => void
) => {
    try {
        const response = await fetch(
            `${APP_URL}/writings/submit-stream`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(data),
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        if (!response.body) {
            throw new Error("No response body")
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ""
        let corrected = ""
        let suggested = ""
        let comment = ""
        let section = "corrected"

        const renderFeedback = () => {
            let feedbackText = ""

            if (corrected.trim().length > 0) {
                feedbackText += `**Corrected sentence:** ${corrected.trim().replace(/\s+/g, " ")}\n\n`
            }
            if (suggested.trim().length > 0) {
                feedbackText += `**Suggested improvements:**\n${suggested.trim().replace(/\s+/g, " ").replace(/ ?- /g, "\n- ")}\n\n`
            }
            if (comment.trim().length > 0) {
                feedbackText += `**Comments:**\n${comment.trim().replace(/\s+/g, " ")}\n`
            }
            onFeedback(feedbackText)
        }

        const processBuffer = () => {
            let nlIndex
            while ((nlIndex = buffer.indexOf("\n")) >= 0) {
                let chunk = buffer.substring(0, nlIndex)
                buffer = buffer.substring(nlIndex + 1)

                chunk = chunk.trim()
                if (!chunk) continue

                try {
                    const parsedJson = JSON.parse(chunk)
                    if ("Point" in parsedJson && "IsCorrect" in parsedJson) {
                        onScore(parsedJson)
                        continue
                    }
                } catch { }

                if (chunk === "[END]") {
                    onComplete()
                    return
                }

                if (/^Corrected sentence[:\- ]*/i.test(chunk)) {
                    section = "corrected"
                    const content = chunk.replace(/^Corrected sentence[:\- ]*/i, "").trim()
                    if (content) corrected += content + " "
                    renderFeedback()
                    continue
                } else if (/Suggested improvements/i.test(chunk)) {
                    section = "suggested"
                    continue
                } else if (/Comments/i.test(chunk)) {
                    section = "comment"
                    continue
                }

                if (section === "corrected") corrected += chunk + " "
                else if (section === "suggested") suggested += chunk + " "
                else if (section === "comment") comment += chunk + " "

                renderFeedback()
            }
        }

        const read = () => {
            reader.read().then(({ done, value }) => {
                if (done) {
                    onComplete()
                    return
                }
                buffer += decoder.decode(value, { stream: true })
                processBuffer()
                read()
            })
        }

        read()
    } catch (error) {
        console.error("Error submitting:", error)
        onError("Error occurred while processing your submission.")
    }
}
import { useState, useEffect, useRef, useCallback } from "react"

export function useTimer() {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [finalTime, setFinalTime] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  const formatTimeWithHours = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  const stopTimer = useCallback(() => {
    setIsActive(false)
    setFinalTime(timer)
  }, [timer])

  const resetTimer = useCallback(() => {
    setTimer(0)
    setFinalTime(null)
    setIsActive(true)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsActive(false)
  }, [])

  const resumeTimer = useCallback(() => {
    setIsActive(true)
  }, [])

  const getCurrentTime = useCallback(() => {
    return timer
  }, [timer])

  const getFinalTime = useCallback(() => {
    return finalTime || timer
  }, [finalTime, timer])

  return {
    timer,
    isActive,
    finalTime,
    setIsActive,
    formatTime,
    formatTimeWithHours,
    stopTimer,
    resetTimer,
    pauseTimer,
    resumeTimer,
    getCurrentTime,
    getFinalTime,
  }
}

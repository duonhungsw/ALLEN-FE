"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CreatePost() {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsLoading(true)
    try {
      // TODO: Call API to create post
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setContent("")
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mb-6 w-3xl">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[80px] resize-none border-none shadow-none focus-visible:ring-0 p-0 text-lg placeholder:text-gray-500"
              />
              <div className="flex justify-between items-center mt-3 pt-3 border-t">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" type="button">
                    📷 Photo
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    😊 Feeling
                  </Button>
                </div>
                <Button type="submit" disabled={!content.trim() || isLoading} className="px-6">
                  {isLoading ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

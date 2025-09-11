"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePostModal } from "@/components/community/CreatePostModal"
import { FAQSidebar } from "@/components/community/FAQSidebar"
import { PostCard } from "@/components/community/PostCard"
import { RankingSidebar } from "@/components/community/RankingSidebar"
import { Search, TrendingUp } from "lucide-react"
import { useCommunity } from "@/hooks/auth/useCommunity"
import { ApiPost } from "@/types/posType"
import { Privacy } from "@/types/emunType"

export default function CommunityPage() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: postsPaging } = useCommunity(
    {
      page: 0,
      size: 10,
      search: searchQuery || undefined,
      privacy: Privacy.Public,
    },
    {
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
    }
  )
  

  const [posts, setPosts] = useState<ApiPost[]>([])

  const handleSearchPost = () => {
    const value = searchInputRef.current ? searchInputRef.current.value : searchTerm
    setSearchTerm(value)
    setSearchQuery(value)
  }

  useEffect(() => {
    if (postsPaging?.data) {
      setPosts(postsPaging.data as ApiPost[])
    }
  }, [postsPaging])

  const addNewPost = (newPost: ApiPost) => {
    setPosts([newPost, ...posts])
  }

if(postsPaging){
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#141F23' }}>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - FAQ & Categories */}
          <div className="lg:col-span-1">
            <FAQSidebar onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Cộng đồng</h1>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400"
                  onClick={handleSearchPost}
                  />
                  <Input
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearchPost() }}
                    ref={searchInputRef}
                    className="pl-10 w-64 bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
              <CardContent className="p-4">
                <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
                  <TabsList className="grid w-full grid-cols-4 border-0" style={{ backgroundColor: '#1a2a2f' }}>
                    <TabsTrigger value="all" className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300">Tất cả</TabsTrigger>
                    <TabsTrigger value="favorites" className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300">Yêu thích</TabsTrigger>
                    <TabsTrigger value="following" className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300">Quan tâm</TabsTrigger>
                    <TabsTrigger value="trending" className="data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Xu hướng
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Create Post */}
            <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="flex-1 justify-start text-gray-300 border-[#93D333] bg-[#1a2a2f] hover:opacity-90"
                    onClick={() => setIsCreatePostOpen(true)}
                  >
                    Bạn đang nghĩ gì?
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-4">
              {postsPaging.data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Rankings */}
          <div className="lg:col-span-1">
            <RankingSidebar />
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPostCreated={addNewPost}
      />
    </div>
  )
}
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePostModal } from "./components/CreatePostModal"
import { FAQSidebar } from "./components/FAQSidebar"
import { PostCard } from "./components/PostCard"
import { RankingSidebar } from "./components/RankingSidebar"
import { Search, TrendingUp } from "lucide-react"

export default function CommunityPage() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Minh Anh",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Intermediate",
        points: 1250,
      },
      content:
        "Mình vừa hoàn thành khóa học Business English! Cảm thấy tự tin hơn rất nhiều khi nói chuyện với khách hàng nước ngoài. Cảm ơn các bạn đã động viên mình trong suốt quá trình học 💪",
      images: ["/placeholder.svg?height=300&width=400&text=Certificate"],
      timestamp: "2 giờ trước",
      likes: 24,
      comments: 8,
      shares: 3,
      category: "Học tập",
      privacy: "public",
      reactions: {
        like: 15,
        love: 6,
        wow: 3,
      },
    },
    {
      id: 2,
      author: {
        name: "Thu Hà",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Advanced",
        points: 2100,
      },
      content:
        "Chia sẻ một tip nhỏ: Khi học từ vựng mới, hãy tạo câu ví dụ của riêng mình thay vì chỉ học thuộc lòng định nghĩa. Cách này giúp mình nhớ lâu hơn rất nhiều! 📚✨",
      images: [
        "/placeholder.svg?height=200&width=300&text=Vocabulary+Tips",
        "/placeholder.svg?height=200&width=300&text=Example+Sentences",
      ],
      timestamp: "5 giờ trước",
      likes: 38,
      comments: 12,
      shares: 8,
      category: "Mẹo học",
      privacy: "public",
      reactions: {
        like: 20,
        love: 12,
        wow: 6,
      },
    },
    {
      id: 3,
      author: {
        name: "Hoàng Nam",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Beginner",
        points: 450,
      },
      content:
        "Mình đang gặp khó khăn với phát âm âm 'th'. Có ai có mẹo gì không ạ? Mình đã thử nhiều cách rồi nhưng vẫn chưa chuẩn 😅",
      timestamp: "1 ngày trước",
      likes: 12,
      comments: 15,
      shares: 2,
      category: "Hỏi đáp",
      privacy: "public",
      reactions: {
        like: 8,
        love: 2,
        wow: 2,
      },
    },
  ])

  const addNewPost = (newPost: any) => {
    setPosts([newPost, ...posts])
  }

  const filteredPosts = posts.filter((post) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "favorites" && post.likes > 20) ||
      (selectedFilter === "following" && ["Minh Anh", "Thu Hà"].includes(post.author.name))

    const matchesSearch =
      searchTerm === "" ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = !selectedCategory || post.category === selectedCategory

    return matchesFilter && matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-50">
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
              <h1 className="text-2xl font-bold text-slate-900">Cộng đồng</h1>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
                    <TabsTrigger value="following">Quan tâm</TabsTrigger>
                    <TabsTrigger value="trending">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Xu hướng
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Create Post */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="flex-1 justify-start text-slate-500 bg-slate-100 hover:bg-slate-200"
                    onClick={() => setIsCreatePostOpen(true)}
                  >
                    Bạn đang nghĩ gì?
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
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

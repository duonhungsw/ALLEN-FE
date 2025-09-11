"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy } from "lucide-react"
import { useTranslations } from "next-intl"

export function RankingSidebar() {
  const tRanking = useTranslations("RankingSidebar")
  const rankings = {
    week: [
      { rank: 1, name: "Nguyễn Phú...", points: 6375, avatar: "/placeholder.svg?height=40&width=40", badge: "🥇" },
      { rank: 2, name: "shin", points: 4440, avatar: "/placeholder.svg?height=40&width=40", badge: "🥈" },
      { rank: 3, name: "Biết bơi tự ng...", points: 4440, avatar: "/placeholder.svg?height=40&width=40", badge: "🥉" },
      { rank: 4, name: ":))", points: 3485, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 5, name: "Khanh Khanh KaKa", points: 3285, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 6, name: "Tralaieto Tralala", points: 3120, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 7, name: "明菜", points: 2870, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 8, name: "yeununu💕", points: 2175, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 9, name: "Nho Nho hay quao", points: 2075, avatar: "/placeholder.svg?height=40&width=40" },
      { rank: 10, name: "na bé <3", points: 1910, avatar: "/placeholder.svg?height=40&width=40" },
    ],
    month: [
      { rank: 1, name: "Minh Anh", points: 12450, avatar: "/placeholder.svg?height=40&width=40", badge: "🥇" },
      { rank: 2, name: "Thu Hà", points: 11200, avatar: "/placeholder.svg?height=40&width=40", badge: "🥈" },
      { rank: 3, name: "Hoàng Nam", points: 9800, avatar: "/placeholder.svg?height=40&width=40", badge: "🥉" },
    ],
    year: [
      { rank: 1, name: "Master User", points: 45600, avatar: "/placeholder.svg?height=40&width=40", badge: "🥇" },
      { rank: 2, name: "Pro Learner", points: 42300, avatar: "/placeholder.svg?height=40&width=40", badge: "🥈" },
      { rank: 3, name: "English Expert", points: 38900, avatar: "/placeholder.svg?height=40&width=40", badge: "🥉" },
    ],
  }

  return (
    <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-white">
          <Trophy className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
          {tRanking("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="grid w-full grid-cols-3 border-0" style={{ backgroundColor: '#1a2a2f' }}>
            <TabsTrigger value="week" className="text-xs data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300">
              {tRanking("periods.week")}
            </TabsTrigger>
            <TabsTrigger value="month" className="text-xs data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300">
              {tRanking("periods.month")}
            </TabsTrigger>
            <TabsTrigger value="year" className="text-xs data-[state=active]:bg-[#93D333] data-[state=active]:text-white text-gray-300">
              {tRanking("periods.year")}
            </TabsTrigger>
          </TabsList>

          {Object.entries(rankings).map(([period, users]) => (
            <TabsContent key={period} value={period} className="mt-4">
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.rank} className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {user.badge ? (
                        <span className="text-lg">{user.badge}</span>
                      ) : (
                        <span className="text-sm font-bold text-gray-400">{user.rank}</span>
                      )}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.points.toLocaleString()} {tRanking("points")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Current User Rank */}
        <div className="mt-6 p-3 rounded-lg border" style={{ borderColor: '#93D333', backgroundColor: '#0f1619' }}>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white" style={{ backgroundColor: '#93D333' }}>
              15
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{tRanking("you")}</p>
              <p className="text-xs text-gray-400">1,250 {tRanking("points")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

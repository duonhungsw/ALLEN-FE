"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { HelpCircle, Hash, Search } from "lucide-react"
import { useState } from "react"
import { useTranslations } from "next-intl"

interface FAQ {
  id: string
  question: string
  views: number
  category: string
}

interface Category {
  name: string
  icon: string
  count: number
}

interface FAQSidebarProps {
  onCategorySelect: (category: string | null) => void
  selectedCategory: string | null
}

export function FAQSidebar({ onCategorySelect, selectedCategory }: FAQSidebarProps) {
  const [searchFAQ, setSearchFAQ] = useState("")
  const tFAQSidebar = useTranslations("FAQSidebar");

  const faqs: FAQ[] = [
    { id: "1", question: "DÙNG APP LỖI PHẢI LÀM SAO?", views: 847, category: tFAQSidebar("categoryNames.question") },
    { id: "2", question: "Cách học từ vựng hiệu quả nhất?", views: 339, category: tFAQSidebar("categoryNames.tips") },
    { id: "3", question: "Có ai ăn trưa chưa", views: 208, category: tFAQSidebar("categoryNames.sharing") },
    { id: "4", question: "Có ai vào zoom nữa ko", views: 156, category: tFAQSidebar("categoryNames.study") },
    { id: "5", question: "Buồn nhất là khi", views: 98, category: tFAQSidebar("categoryNames.motivation") },
  ]

  const categories: Category[] = [
    { name: tFAQSidebar("categoryNames.study"), icon: "📚", count: 234 },
    { name: tFAQSidebar("categoryNames.tips"), icon: "💡", count: 189 },
    { name: tFAQSidebar("categoryNames.question"), icon: "❓", count: 156 },
    { name: tFAQSidebar("categoryNames.sharing"), icon: "💬", count: 143 },
    { name: tFAQSidebar("categoryNames.motivation"), icon: "💪", count: 128 },
    { name: tFAQSidebar("categoryNames.grammar"), icon: "📝", count: 167 },
    { name: tFAQSidebar("categoryNames.pronunciation"), icon: "🗣️", count: 98 },
    { name: tFAQSidebar("categoryNames.ielts"), icon: "🎯", count: 89 },
    { name: tFAQSidebar("categoryNames.toeic"), icon: "📊", count: 145 },
    { name: tFAQSidebar("categoryNames.business"), icon: "💼", count: 76 },
  ]

  const filteredFAQs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchFAQ.toLowerCase()))

  const handleFAQClick = (faq: FAQ) => {
    // Navigate to the specific post
    onCategorySelect(faq.category)
  }

  return (
    <div className="space-y-4">
      {/* FAQ Section */}
      <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg text-white">
            <HelpCircle className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
            {tFAQSidebar("frequentQuestions")}
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={tFAQSidebar("searchPlaceholder")}
              value={searchFAQ}
              onChange={(e) => setSearchFAQ(e.target.value)}
              className="pl-10 bg-[#1a2a2f] border-[#93D333] text-white placeholder:text-gray-400"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {filteredFAQs.map((faq, index) => (
            <Button
              key={faq.id}
              variant="ghost"
              className="w-full justify-start text-left h-auto p-2 text-gray-300 hover:bg-white/10"
              onClick={() => handleFAQClick(faq)}
            >
              <div className="w-full">
                <div className="flex items-start space-x-2">
                  <span className="text-sm font-medium text-gray-400">{index + 1}.</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white line-clamp-2">{faq.question}</p>
                    <p className="text-xs text-gray-400 mt-1">{faq.views} {tFAQSidebar("views")}</p>
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card className="border-0" style={{ backgroundColor: '#1a2a2f' }}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg text-white">
            <Hash className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
            {tFAQSidebar("categories")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "ghost"}
            className="w-full justify-between text-left h-auto p-2 hover:bg-white/10 text-gray-300"
            onClick={() => onCategorySelect(null)}
          >
            <div className="flex items-center space-x-2">
              <span>🌟</span>
              <span className="text-sm">{tFAQSidebar("all")}</span>
            </div>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "ghost"}
              className="w-full justify-between text-left h-auto p-2 hover:bg-white/10 text-gray-300"
              onClick={() => onCategorySelect(category.name)}
            >
              <div className="flex items-center space-x-2">
                <span>{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </div>
              <Badge variant="outline" className="text-xs border-[#93D333] text-gray-300">
                {category.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

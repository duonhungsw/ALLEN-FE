import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

interface FiltersSectionProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  selectedLevel: string
  setSelectedLevel: (value: string) => void
  categories: string[]
  levels: string[]
}

export default function FiltersSection({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  categories,
  levels,
}: FiltersSectionProps) {
  const tFiltersSection = useTranslations("Reading.FiltersSection")
  return (
    <Card className="mb-6" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4" style={{ color: '#93D333' }} />
            <Input
              placeholder={tFiltersSection("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder={tFiltersSection("selectCategory")} />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-gray-600">
                  {category === "all" ?  tFiltersSection("allCategories") : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder={tFiltersSection("selectLevel")} />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {levels.map((level) => (
                <SelectItem key={level} value={level} className="text-white hover:bg-gray-600">
                  {level === "all" ? tFiltersSection("allLevels") : level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

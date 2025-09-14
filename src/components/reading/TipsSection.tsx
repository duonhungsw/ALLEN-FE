import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Target } from "lucide-react"
import { useTranslations } from "next-intl"

export default function TipsSection() {
  const tTipsSection = useTranslations("Reading.TipsSection")
  return (
    <Card className="mt-8" style={{ backgroundColor: '#1a2a2f', borderColor: '#93D333' }}>
      <CardHeader>
        <CardTitle className="text-white">{tTipsSection("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center text-white">
              <BookOpen className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
              {tTipsSection("full.title")}
            </h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• {tTipsSection("full.tip1")}</li>
              <li>• {tTipsSection("full.tip2")}</li>
              <li>• {tTipsSection("full.tip3")}</li>
              <li>• {tTipsSection("full.tip4")}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center text-white">
              <Target className="h-5 w-5 mr-2" style={{ color: '#93D333' }} />
              {tTipsSection("single.title")}
            </h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• {tTipsSection("single.tip1")}</li>
              <li>• {tTipsSection("single.tip2")}</li>
              <li>• {tTipsSection("single.tip3")}</li>
              <li>• {tTipsSection("single.tip4")}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

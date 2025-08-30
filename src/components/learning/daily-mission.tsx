import { Card } from "./ui/card";
import { Zap } from "lucide-react";

export function DailyMission() {
  return (
    <Card className="bg-slate-800 border-slate-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium">Nhiệm vụ hàng ngày</h3>
        <span className="text-blue-400 text-sm cursor-pointer hover:underline">
          XEM TẤT CẢ
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm">Kiếm 10 KN</p>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
          <p className="text-slate-400 text-xs mt-1">0 / 10</p>
        </div>
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">🎁</span>
        </div>
      </div>
    </Card>
  );
}

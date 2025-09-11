"use client";

import React, { useState } from "react";
import { LessonMap } from "@/components/learning/lesson-map";
import { DailyMission } from "@/components/learning/daily-mission";
import { Card, CardContent } from "@/components/learning/ui/card";
import { Gem, Crown, Heart } from "lucide-react";
import { useLearningUnits } from "@/hooks/learning/useLearningUnits";
import QuestionPopup from "@/components/learning/QuestionPopup";

const TopBarStats = () => (
  <div className="flex items-center space-x-4 mb-6">
    <div className="flex items-center space-x-2">
      <Gem size={20} className="text-gray-400" />
      <span className="text-sm font-semibold text-white">0</span>
    </div>
    <div className="flex items-center space-x-2">
      <Crown size={20} className="text-blue-500" />
      <span className="text-sm font-semibold text-white">500</span>
    </div>
    <div className="flex items-center space-x-2">
      <Heart size={20} className="text-red-500" />
      <span className="text-sm font-semibold text-white">5</span>
    </div>
  </div>
);

export default function LearningDashboard() {
  const { data: learningUnits, isLoading, error } = useLearningUnits();

  const [popupState, setPopupState] = useState({
    isOpen: false,
    moduleType: '',
    moduleItemId: '',
    nodeTitle: ''
  });

  const handleNodeClick = (moduleType: string, moduleItemId: string, nodeTitle: string) => {
    setPopupState({
      isOpen: true,
      moduleType,
      moduleItemId,
      nodeTitle
    });
  };

  const handleClosePopup = () => {
    setPopupState({
      isOpen: false,
      moduleType: '',
      moduleItemId: '',
      nodeTitle: ''
    });
  };

  return (
    <div className="bg-[#132024] min-h-screen text-white flex-1">
      <div className="flex flex-col">
        <div className="p-6">
          <div className="flex justify-end mb-6">
            <TopBarStats />
          </div>
          <div className="mb-8">
            <DailyMission />
          </div>
          <div className="mb-2">
            <Card className="">
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-red-400">
                    <div className="text-lg font-bold mb-2">Có lỗi xảy ra khi tải dữ liệu</div>
                    <div className="text-sm text-gray-400 mb-4">Error: {error?.message || 'Unknown error'}</div>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Thử lại
                    </button>
                  </div>
                ) : (
                  <LessonMap
                    learningUnits={learningUnits?.data || []}
                    onNodeClick={handleNodeClick}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <QuestionPopup
        isOpen={popupState.isOpen}
        onClose={handleClosePopup}
        moduleType={popupState.moduleType}
        moduleItemId={popupState.moduleItemId}
        nodeTitle={popupState.nodeTitle}
      />
    </div>
  );
}

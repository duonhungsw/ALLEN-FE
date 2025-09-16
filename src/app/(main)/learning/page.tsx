"use client";

import React, { useState } from "react";
import { LessonMap } from "@/components/learning/lesson-map";
import { DailyMission } from "@/components/learning/daily-mission";
import { Card, CardContent } from "@/components/learning/ui/card";
import { Gem, Crown, Heart } from "lucide-react";
import { useLearningUnits } from "@/hooks/learning/useLearningUnits";
import QuestionPopup from "@/components/learning/QuestionPopup";
import { motion } from "framer-motion";

const TopBarStats = () => (
  <motion.div
    className="flex items-center space-x-4 mb-6"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Gem size={20} style={{ color: '#F3713B' }} />
      <span className="text-sm font-semibold" style={{ color: '#142F50' }}>0</span>
    </motion.div>
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Crown size={20} style={{ color: '#F3713B' }} />
      <span className="text-sm font-semibold" style={{ color: '#142F50' }}>500</span>
    </motion.div>
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Heart size={20} style={{ color: '#F3713B' }} />
      <span className="text-sm font-semibold" style={{ color: '#142F50' }}>5</span>
    </motion.div>
  </motion.div>
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
    <div className="min-h-screen flex-1" style={{ backgroundColor: '#F5F3EA' }}>
      <div className="flex flex-col">
        <div className="p-6">
          <div className="flex justify-end mb-6">
            <TopBarStats />
          </div>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <DailyMission />
          </motion.div>
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border shadow-sm" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <motion.div
                      className="w-12 h-12 border-4 border-t-transparent rounded-full"
                      style={{ borderColor: '#F3713B', borderTopColor: 'transparent' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    ></motion.div>
                  </div>
                ) : error ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-lg font-bold mb-2" style={{ color: '#142F50' }}>Có lỗi xảy ra khi tải dữ liệu</div>
                    <div className="text-sm text-gray-600 mb-4">Error: {error?.message || 'Unknown error'}</div>
                    <motion.button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 rounded-lg transition-colors text-white"
                      style={{ backgroundColor: '#F3713B' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Thử lại
                    </motion.button>
                  </motion.div>
                ) : (
                  <LessonMap
                    learningUnits={learningUnits?.data || []}
                    onNodeClick={handleNodeClick}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
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

import { Card } from "./ui/card";
import { Zap, Gift } from "lucide-react";
import { motion } from "framer-motion";

export function DailyMission() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="border shadow-sm p-4" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
        <div className="flex items-center justify-between mb-3">
          <motion.h3
            className="font-medium"
            style={{ color: '#142F50' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Nhiệm vụ hàng ngày
          </motion.h3>
          <motion.span
            className="text-sm cursor-pointer hover:underline"
            style={{ color: '#F3713B' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            XEM TẤT CẢ
          </motion.span>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#F3713B' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex-1">
            <motion.p
              className="text-sm"
              style={{ color: '#142F50' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Kiếm 10 KN
            </motion.p>
            <div className="w-full rounded-full h-2 mt-1" style={{ backgroundColor: '#E5E7EB' }}>
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: '#F3713B' }}
                initial={{ width: 0 }}
                animate={{ width: "0%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              ></motion.div>
            </div>
            <motion.p
              className="text-xs mt-1"
              style={{ color: '#6B7280' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              0 / 10
            </motion.p>
          </div>
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#F3713B' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 }
            }}
          >
            <Gift className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <motion.button
            className="w-full py-2 px-4 rounded-lg text-white font-medium"
            style={{ backgroundColor: '#F3713B' }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 12px rgba(243, 113, 59, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Bắt Đầu
          </motion.button>
        </motion.div>
      </Card>
    </motion.div>
  );
}

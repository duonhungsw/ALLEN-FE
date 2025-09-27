"use client";

import { motion } from "framer-motion";
import { Users, Shield, BarChart3, Settings, UserCheck, UserX, Activity, User } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const adminFeatures = [
        {
            id: "users",
            title: "Quản lý người dùng",
            description: "Xem danh sách, tìm kiếm và quản lý người dùng",
            icon: Users,
            href: "/admin/users",
            color: "from-[#8B4513] to-[#A0522D]",
            stats: "1,234 người dùng"
        },
        {
            id: "moderation",
            title: "Kiểm duyệt nội dung",
            description: "Duyệt và quản lý nội dung cộng đồng",
            icon: Shield,
            href: "/admin/moderation",
            color: "from-[#CD853F] to-[#DEB887]",
            stats: "45 bài viết chờ duyệt"
        },
        {
            id: "analytics",
            title: "Thống kê & Báo cáo",
            description: "Xem thống kê hoạt động và báo cáo chi tiết",
            icon: BarChart3,
            href: "/admin/analytics",
            color: "from-[#D2691E] to-[#F4A460]",
            stats: "98.5% uptime"
        },
        {
            id: "settings",
            title: "Cài đặt hệ thống",
            description: "Cấu hình và quản lý hệ thống",
            icon: Settings,
            href: "/admin/settings",
            color: "from-[#BC8F8F] to-[#D2B48C]",
            stats: "Hệ thống ổn định"
        }
    ];

    const quickActions = [
        {
            id: "ban-user",
            title: "Cấm người dùng",
            icon: UserX,
            color: "bg-red-500 hover:bg-red-600",
            description: "Cấm người dùng vi phạm"
        },
        {
            id: "approve-user",
            title: "Phê duyệt người dùng",
            icon: UserCheck,
            color: "bg-green-500 hover:bg-green-600",
            description: "Phê duyệt đăng ký mới"
        },
        {
            id: "view-activity",
            title: "Xem hoạt động",
            icon: Activity,
            color: "bg-blue-500 hover:bg-blue-600",
            description: "Theo dõi hoạt động hệ thống"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center mr-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-[#8B4513]">
                            Bảng điều khiển Admin
                        </h1>
                        <p className="text-[#A0522D] text-lg font-medium">
                            Quản lý và giám sát hệ thống học tiếng Anh
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#D2B48C]/30"
            >
                <h2 className="text-2xl font-semibold text-[#D2B48C] mb-6">Hành động nhanh</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <motion.button
                            key={action.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`${action.color} text-white p-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg`}
                        >
                            <action.icon className="w-8 h-8 mx-auto mb-2" />
                            <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                            <p className="text-sm opacity-90">{action.description}</p>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Main Features */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {adminFeatures.map((feature, index) => (
                    <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group"
                    >
                        <Link href={feature.href}>
                            <div className={`${index % 2 === 0 ? 'bg-white/90' : 'bg-[#F8F6F0]/90'} backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#D2B48C]/30 hover:shadow-xl transition-all duration-300 h-full`}>
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-[#8B4513] mb-2 group-hover:text-[#A0522D] transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-[#A0522D] mb-4 leading-relaxed font-medium">
                                    {feature.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#CD853F] font-semibold">
                                        {feature.stats}
                                    </span>
                                    <div className="w-8 h-8 bg-[#F5F3EA] rounded-full flex items-center justify-center group-hover:bg-[#E8E0D0] transition-colors">
                                        <div className="w-2 h-2 bg-[#8B4513] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Stats Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#D2B48C]/30"
            >
                <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Tổng quan hệ thống</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: "Tổng người dùng", value: "1,234", color: "text-[#8B4513]" },
                        { label: "Hoạt động hôm nay", value: "567", color: "text-[#A0522D]" },
                        { label: "Bài học hoàn thành", value: "8,901", color: "text-[#CD853F]" },
                        { label: "Tỷ lệ hài lòng", value: "98.5%", color: "text-[#D2691E]" }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                            className="text-center"
                        >
                            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                                {stat.value}
                            </div>
                            <div className="text-[#A0522D] text-sm font-semibold">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

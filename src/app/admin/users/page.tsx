"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  Edit,
  ArrowLeft,
  Users,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { UserFilters } from "@/shared/api/admin/user.api";

export default function UsersManagement() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { searchInput, searchTerm, setSearchInput, clearSearch } =
    useDebounceSearch({
      delay: 500,
      onSearch: () => {
        setCurrentPage(1);
      },
    });

  const filters: UserFilters = {
    Top: itemsPerPage,
    Skip: (currentPage - 1) * itemsPerPage,
    SearchText: searchTerm || undefined,
    NeedTotalCount: true,
  };

  const { data: usersData, error } = useAdminUsers(filters);
  const users = usersData?.data || [];
  const totalCount = usersData?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const filteredUsers = users;

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Hoạt động
          </Badge>
        );
      case "banned":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Bị cấm
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Chờ duyệt
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Không xác định
          </Badge>
        );
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Premium":
        return <Badge className="bg-[#8B4513] text-white">Premium</Badge>;
      case "User":
        return <Badge className="bg-[#CD853F] text-white">Người dùng</Badge>;
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            {role}
          </Badge>
        );
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Có lỗi xảy ra khi tải dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#8B4513] hover:bg-[#F5F3EA]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#8B4513] flex items-center">
              <Users className="w-8 h-8 mr-3" />
              Quản lý người dùng
            </h1>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#D2B48C]/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513] w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc email... (tự động search)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] placeholder:text-[#A0522D] placeholder:font-medium"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] font-medium">
              <SelectValue
                placeholder="Tất cả trạng thái"
                className="text-[#A0522D] font-medium"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-[#8B4513] font-medium">
                Tất cả trạng thái
              </SelectItem>
              <SelectItem value="active" className="text-[#8B4513] font-medium">
                Hoạt động
              </SelectItem>
              <SelectItem value="banned" className="text-[#8B4513] font-medium">
                Bị cấm
              </SelectItem>
              <SelectItem
                value="pending"
                className="text-[#8B4513] font-medium"
              >
                Chờ duyệt
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="border-[#D2B48C] focus:border-[#8B4513] focus:ring-[#8B4513] text-[#8B4513] font-medium">
              <SelectValue
                placeholder="Tất cả vai trò"
                className="text-[#A0522D] font-medium"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-[#8B4513] font-medium">
                Tất cả vai trò
              </SelectItem>
              <SelectItem value="user" className="text-[#8B4513] font-medium">
                Người dùng
              </SelectItem>
              <SelectItem
                value="premium"
                className="text-[#8B4513] font-medium"
              >
                Premium
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white"
              onClick={() => {
                clearSearch();
                setStatusFilter("all");
                setRoleFilter("all");
                setCurrentPage(1);
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#D2B48C]/30 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F3EA] border-b border-[#D2B48C]">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                  />
                </th>
                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                  Người dùng
                </th>
                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                  Bài học
                </th>
                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                  Hoạt động cuối
                </th>
                <th className="px-6 py-4 text-left text-[#8B4513] font-semibold">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-b border-[#D2B48C]/30 hover:bg-[#F5F3EA]/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 text-[#8B4513] border-[#D2B48C] rounded focus:ring-[#8B4513]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {user.picture ? (
                          <Image
                            src={user.picture}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full border-2 border-[#D2B48C] object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget
                                .nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.style.display = "flex";
                              }
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-10 h-10 rounded-full border-2 border-[#D2B48C] bg-gradient-to-r from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white font-bold text-sm ${
                            user.picture ? "hidden" : "flex"
                          }`}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-[#8B4513]">
                          {user.name}
                        </div>
                        <div className="text-sm text-[#A0522D] flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-[#A0522D] flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 text-[#8B4513] font-medium">
                    {user.totalLessons}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#A0522D]">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(user.lastActive).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#8B4513] hover:bg-[#F5F3EA]"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#8B4513] hover:bg-[#F5F3EA]"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-[#D2B48C] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#8B4513] mb-2">
              Không tìm thấy người dùng
            </h3>
            <p className="text-[#A0522D]">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-[#D2B48C]/30"
      >
        <div className="text-[#8B4513] text-sm font-medium">
          Hiển thị {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalCount)} trong tổng số{" "}
          {totalCount} người dùng (7 items/trang)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA]"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Trước
          </Button>

          {/* Page numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  size="sm"
                  className={`${
                    currentPage === pageNum
                      ? "bg-[#8B4513] hover:bg-[#A0522D] text-white"
                      : "border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA]"
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-[#D2B48C] text-[#8B4513] hover:bg-[#F5F3EA]"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Sau
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

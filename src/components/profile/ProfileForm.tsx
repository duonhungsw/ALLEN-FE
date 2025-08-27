"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { UserInfo } from "@/providers/auth/types/authType";
import CustomAvatar from "./CustomAvatar";

interface ProfileFormProps {
  data?: UserInfo | null;
  isEdit: boolean;
  isUpdating: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: (values: Partial<UserInfo>, avatarFile?: File | null) => void;
}

type FormValues = {
  name: string;
  email: string;
  phone: string;
  birthDay: string;
  picture: string;
};

const ProfileForm = ({
  data,
  isEdit,
  isUpdating,
  onCancel,
  onEdit,
  onSubmit,
}: ProfileFormProps) => {
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDay: "",
      picture: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        picture: data.picture || "",
        birthDay: data.birthDay
          ? dayjs(data.birthDay).format("YYYY-MM-DD")
          : "",
      });
    }
  }, [data, reset]);

  const handleAvatarChange = (file: File) => {
    setSelectedAvatarFile(file);
  };

  const handleFormSubmit = (values: FormValues) => {
    const updateData = {
      name: values.name,
      phone: values.phone,
      birthDay: values.birthDay,
      picture: values.picture,
    };
    onSubmit(updateData, selectedAvatarFile);
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            🎓 Student Profile
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your learning journey and personal information
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-8 text-center">
              <CustomAvatar
                avatar={data?.picture}
                isEdit={isEdit}
                onAvatarChange={handleAvatarChange}
                isUploading={isUpdating}
              />

              <div className="mt-6">
                {isEdit ? (
                  <div className="space-y-2">
                    <p className="text-sm text-blue-600 font-medium">
                      ✨ Chế độ chỉnh sửa - Click vào avatar để thay đổi ảnh
                    </p>
                    <p className="text-xs text-gray-500">
                      Định dạng: JPG, PNG, GIF (Tối đa 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Ảnh đại diện của bạn
                    </p>
                    <p className="text-xs text-gray-500">
                      Click nút &quot;Edit Profile&quot; để chỉnh sửa
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-blue-500">👤</span>
                Personal Information
                {isEdit && (
                  <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    ✏️ Chế độ chỉnh sửa
                  </span>
                )}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-blue-500">📝</span>
                    Full Name
                    {isEdit && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    disabled={!isEdit}
                    placeholder={
                      isEdit ? "Nhập tên đầy đủ của bạn" : "Tên đầy đủ"
                    }
                    {...register("name", {
                      required: isEdit ? "Tên là bắt buộc" : false,
                    })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 placeholder:text-gray-400 ${isEdit
                      ? "border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 hover:border-blue-300 bg-white text-gray-800"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-blue-500">📧</span>
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    placeholder="your.email@example.com"
                    {...register("email")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500">
                    Email không thể thay đổi
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-blue-500">📱</span>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    disabled={!isEdit}
                    placeholder={
                      isEdit ? "Nhập số điện thoại" : "Số điện thoại"
                    }
                    {...register("phone")}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 placeholder:text-gray-400 ${isEdit
                      ? "border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 hover:border-blue-300 bg-white text-gray-800"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-blue-500">🎂</span>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    disabled={!isEdit}
                    {...register("birthDay")}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${isEdit
                      ? "border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 hover:border-blue-300 bg-white text-gray-800"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-100">
              {!isEdit ? (
                <button
                  type="button"
                  onClick={onEdit}
                  disabled={isUpdating}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>✏️</span>
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>❌</span>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium shadow-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>{isUpdating ? "⏳" : "💾"}</span>
                    {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;

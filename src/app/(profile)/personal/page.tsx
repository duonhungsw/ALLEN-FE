"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/auth/useProfile";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ChangePassForm from "@/components/profile/ChangePassForm";
import { useHasMounted } from "@/hooks/useHasMounted";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data, isLoading, error } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const [activeTab, setActiveTab] = useState("profile");
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Đang tải thông tin...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleSubmitUpdateProfile = async (values: any) => {
    updateProfile(values);
    setIsEdit(false);
    toast.success("Cập nhật profile thành công");
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const renderBody = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileInfo();
      case "password":
        return <ChangePassForm />;
      default:
        return null;
    }
  };

  const renderProfileInfo = () => {
    if (isLoading) {
      return (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Đang tải thông tin...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8 text-center text-red-600">
          <p>Có lỗi xảy ra khi tải thông tin profile</p>
        </div>
      );
    }

    const profileData = data
      ? {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        picture: data.picture || "",
        birthDay: data.birthDay || "",
      }
      : null;

    return (
      <ProfileForm
        data={profileData}
        isEdit={isEdit}
        isUpdating={isUpdating}
        onCancel={handleCancel}
        onEdit={handleEdit}
        onSubmit={handleSubmitUpdateProfile}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="order-2 lg:order-1">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="order-1 lg:order-2 flex-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {renderBody()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

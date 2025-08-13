"use client";

import { toast } from "sonner";
import { useState } from "react";
import { updateUserProfile } from "@/shared/api/user.api";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ChangePassForm from "@/components/profile/ChangePassForm";
import { getStorageData } from "@/shared/store";
import { parseJwt } from "@/utils/jwt";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleSubmitUpdateProfile = async (values: any, avatarFile?: File | null) => {
    const token = getStorageData('accessToken');
    let userId = "";

    if (token) {
      try {
        const decoded = parseJwt(token);
        userId = decoded?.Id || "";
      } catch (error) {
        console.error("Error parsing JWT:", error);
      }
    }

    if (!userId) {
      toast.error("User ID not found");
      return;
    }

    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("birthDay", values.birthDay);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      await updateUserProfile(userId, formData);

      setIsEdit(false);
      toast.success("Profile updated successfully");

      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
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
    return (
      <ProfileForm
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

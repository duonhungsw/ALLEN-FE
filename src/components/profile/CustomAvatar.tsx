import Image from "next/image";
import { useState, useRef } from "react";

interface Props {
  avatar?: string;
  isEdit?: boolean;
  onAvatarChange: (file: File) => void;
  isUploading?: boolean;
}

const CustomAvatar = ({
  avatar,
  isEdit,
  onAvatarChange,
  isUploading,
}: Props) => {
  const [previewImage, setPreviewImage] = useState<string>(avatar || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;


    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Chỉ chấp nhận file JPG, PNG, GIF!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    onAvatarChange(file);
  };

  const handleAvatarClick = () => {
    if (isEdit && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onClick={handleAvatarClick}
        className={`relative md:w-[180px] md:h-[180px] w-[150px] h-[150px] rounded-full overflow-hidden border-4 transition-all duration-200 ${isEdit
          ? "cursor-pointer border-blue-400 hover:border-blue-500 hover:shadow-xl hover:scale-105"
          : "border-gray-200"
          }`}
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt="User Avatar"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <span className="md:text-[120px] text-[80px] text-gray-400">
              👤
            </span>
          </div>
        )}

        {isEdit && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="text-center text-white">
              <div className="text-2xl mb-2">📷</div>
              <div className="text-sm font-medium">Click để thay đổi</div>
              <div className="text-xs opacity-80">JPG, PNG, GIF (Max 5MB)</div>
            </div>
          </div>
        )}
      </div>

      {isEdit && !isUploading && (
        <div className="absolute -bottom-2 -right-2">
          <div className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200 hover:scale-110">
            <span className="text-white text-lg">📷</span>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="absolute -bottom-2 -right-2">
          <div className="flex items-center justify-center bg-blue-500 rounded-full p-3 shadow-lg">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default CustomAvatar;

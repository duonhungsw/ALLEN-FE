import { useState, useRef, useEffect } from "react";

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
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ensure client-side rendering to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setPreviewImage(avatar || "");
  }, [avatar]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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

  // Show loading state during SSR to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="relative inline-block">
        <div className="relative md:w-[180px] md:h-[180px] w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-gray-200 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
          <div className="animate-pulse w-full h-full bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <div
        onClick={handleAvatarClick}
        className={`relative md:w-[180px] md:h-[180px] w-[150px] h-[150px] rounded-full overflow-hidden border-4 border-gray-200 transition-all duration-200 ${isEdit ? "cursor-pointer hover:border-blue-400 hover:shadow-lg" : ""
          }`}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="User Avatar"
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
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <span className="text-white text-sm font-medium">
              📷 Click to change
            </span>
          </div>
        )}
      </div>

      {isEdit && !isUploading && (
        <div className="absolute bottom-0 right-2 cursor-pointer">
          <div className="flex items-center justify-center bg-[#4178a7] rounded-full p-2">
            <span className="text-white text-xl">📷</span>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="absolute bottom-0 right-2">
          <div className="flex items-center justify-center bg-[#4178a7] rounded-full p-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default CustomAvatar;

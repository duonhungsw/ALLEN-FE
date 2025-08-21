"use client";

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileSidebar = ({ activeTab, setActiveTab }: ProfileSidebarProps) => {
  const menuItems = [
    {
      key: "profile",
      icon: "👤",
      label: "Profile Information",
      description: "Manage your personal details",
    },
    {
      key: "password",
      icon: "🔒",
      label: "Security Settings",
      description: "Change your password",
    },
  ];

  return (
    <div className="w-full lg:w-72 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="mb-6 text-center lg:text-left">
        <h2 className="text-xl font-bold text-gray-800 mb-2">🎯 Quick Menu</h2>
        <p className="text-sm text-gray-600">Navigate through your profile settings</p>
      </div>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                activeTab === item.key
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "text-gray-700 hover:bg-gray-50 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-2xl transition-transform duration-200 ${
                  activeTab === item.key ? "animate-pulse" : "group-hover:scale-110"
                }`}>
                  {item.icon}
                </span>
                <div className="flex-1">
                  <div className={`font-semibold text-sm ${
                    activeTab === item.key ? "text-white" : "text-gray-800"
                  }`}>
                    {item.label}
                  </div>
                  <div className={`text-xs ${
                    activeTab === item.key ? "text-blue-100" : "text-gray-500"
                  }`}>
                    {item.description}
                  </div>
                </div>
                {activeTab === item.key && (
                  <span className="text-white text-sm">▶️</span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="text-center">
          <div className="text-2xl mb-2">🎓</div>
          <h3 className="font-semibold text-gray-800 text-sm mb-1">Learning Progress</h3>
          <p className="text-xs text-gray-600">Track your English learning journey</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;

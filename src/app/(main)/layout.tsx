"use client";

import React, { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/auth/useAuth';
// import NavBar from '@/components/common/NavBar';
import { Sidebar } from '@/components/common/SideBar';
// import { useLogout } from "@/hooks/auth/useLogout";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const { loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" >
      {/* <NavBar/> */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="flex h-screen bg-slate-50">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </main>
    </div>
  );
};

export default HomeLayout;

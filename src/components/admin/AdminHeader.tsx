"use client";

import { useLogout } from "@/hooks/auth/useLogin";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
    const { mutate: doLogout, isPending } = useLogout();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
                <div className="flex items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Bảng điều khiển Admin</h2>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Admin</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => doLogout()}
                        disabled={isPending}
                        className="text-gray-600 hover:text-red-600"
                    >
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
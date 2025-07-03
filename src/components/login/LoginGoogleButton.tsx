"use client";

import { getGoogleLoginUrl } from "@/shared/api/auth.api";

interface LoginGoogleButtonProps {
    clientId: string;
}

export default function LoginGoogleButton({ clientId }: LoginGoogleButtonProps) {
    const handleLoginWithGoogle = () => {
        const callbackUrl = `${window.location.origin}/auth/callback`;
        const googleLoginUrl = getGoogleLoginUrl(callbackUrl);
        window.location.href = googleLoginUrl;
    };

    return (
        <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 mb-2 bg-white hover:bg-gray-100 transition font-semibold text-gray-700 shadow-sm"
        >
            <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
                <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.8 2.69 14.09l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z" />
                    <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.6C43.91 37.36 46.1 31.45 46.1 24.55z" />
                    <path fill="#FBBC05" d="M9.67 28.29c-1.13-3.36-1.13-6.93 0-10.29l-7.98-6.2C-1.13 17.09-1.13 30.91 1.69 37.91l7.98-6.2z" />
                    <path fill="#EA4335" d="M24 46c6.13 0 11.64-2.36 15.85-6.45l-7.19-5.6c-2.01 1.35-4.6 2.15-7.66 2.15-6.38 0-11.87-3.59-14.33-8.79l-7.98 6.2C6.73 42.2 14.82 48 24 48z" />
                    <path fill="none" d="M0 0h48v48H0z" />
                </g>
            </svg>
            Đăng nhập với Google
        </button>
    );
} 
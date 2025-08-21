'use client';

import { useForm } from "react-hook-form";
import { useForgotPassword } from "@/hooks/auth/useChangePass";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ForgotPasswordForm {
    email: string;
}

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { mutate: forgotPassword, isPending } = useForgotPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordForm>({
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: ForgotPasswordForm) => {
        forgotPassword(data, {
            onSuccess: () => {
                toast.success("Link reset mật khẩu đã được gửi đến email của bạn!");
                // Chuyển đến trang reset password
                router.push("/reset-password");
            },
        });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Gradient Background */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-purple-800 to-blue-600 items-center justify-center">
                <div className="text-center text-white">
                    <div className="w-20 h-20 bg-purple-200/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Quên Mật Khẩu?</h1>
                    <p className="text-xl mb-8">Đừng lo lắng, chúng tôi sẽ giúp bạn</p>
                    <div className="space-y-3 text-left max-w-md mx-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>Gửi link reset qua email</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>Đặt lại mật khẩu mới</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span>Đăng nhập với mật khẩu mới</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Quên Mật Khẩu
                        </h2>
                        <p className="text-gray-400">
                            Nhập email của bạn để nhận link reset mật khẩu
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email là bắt buộc",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Email không hợp lệ",
                                    },
                                })}
                                placeholder="Nhập email của bạn"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <span>Gửi Link Reset</span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Nhớ mật khẩu?{" "}
                            <Link
                                href="/login"
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

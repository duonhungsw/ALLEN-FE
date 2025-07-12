import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/context/QueryClientProvider";
import ReduxProvider from "@/context/ReduxProvider";
import AuthHydration from "@/context/AuthHydration";
import { Toaster } from "sonner";
import Navbar from "@/components/common/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Allen - Learn Anything",
  description: "Allen - Learn Anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>
          <QueryClientProvider>
            <AuthHydration />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              {/* <Footer /> */}
            </div>
          </QueryClientProvider>
        </ReduxProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

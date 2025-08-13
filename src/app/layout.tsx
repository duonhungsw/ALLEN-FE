import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/context/QueryClientProvider";
import ReduxProvider from "@/context/ReduxProvider";
import AuthHydration from "@/context/AuthHydration";
import { Toaster } from "sonner";
import NavBar from "@/components/common/NavBar/NavBar";
import { ThemeProvider } from "@/context/ThemeContext";
import { I18nProvider } from "@/context/I18nProvider";
// import Footer from "@/components/common/Footer/Footer";

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
        <I18nProvider>
          <ThemeProvider>
            <ReduxProvider>
              <QueryClientProvider>
                <AuthHydration />
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <main className="flex-1">{children}</main>
                </div>
              </QueryClientProvider>
            </ReduxProvider>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

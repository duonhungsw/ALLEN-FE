import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/context/QueryClientProvider";
import ReduxProvider from "@/context/ReduxProvider";
import AuthHydration from "@/context/AuthHydration";
import { Toaster } from "sonner";
import NavBar from "@/components/common/NavBar";
import { ThemeProvider } from "@/context/ThemeContext";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ReduxProvider>
              <QueryClientProvider>
                <AuthHydration />
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <main className="flex-1">{children}</main>
                  {/* <Footer /> */}
                </div>
              </QueryClientProvider>
            </ReduxProvider>
            <Toaster richColors position="bottom-right" />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

// import { useProfile } from "@/hooks/auth/useProfile";
// import Image from "next/image";
// import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from 'react-i18next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function Home() {
  // const { data: user, formatted } = useProfile();

  const { customColors } = useTheme();
  const { t } = useTranslation();

  console.log("111", customColors.bodyBg);

  return (
    // <div
    //   className={`relative min-h-screen w-full ${customColors.bodyBg} flex items-center justify-center p-4 transition-colors duration-500`}
    // >
    //   <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-5 dark:opacity-20"></div>

    //   <motion.div
    //     initial={{ opacity: 0, y: -20, scale: 0.95 }}
    //     animate={{ opacity: 1, y: 0, scale: 1 }}
    //     transition={{ duration: 0.5, ease: "easeOut" }}
    //     className="relative z-10 w-full max-w-md p-8 text-center bg-white/70 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl"
    //   >
    //     <div className="mb-6">
    //       <Image
    //         src={
    //           typeof user?.avatarUrl === "string" && user.avatarUrl
    //             ? user.avatarUrl
    //             : `https://avatar.vercel.sh/${user?.username ?? "default"}.svg`
    //         }
    //         alt={formatted?.name || "User Avatar"}
    //         width={96}
    //         height={96}
    //         className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
    //       />
    //     </div>
    //     <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
    //       Hello world,{" "}
    //       <span className="text-blue-600 dark:text-blue-400">
    //         {formatted?.name || "Users111"}
    //       </span>
    //     </h1>
    //     <p className="text-gray-600 dark:text-gray-300 mb-8">
    //       I great to see you again. Le get learning!
    //     </p>
    //   </motion.div>
    // </div>
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t("Master English")}
              <span className="text-blue-600"> {t("Fluently")}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("Learn English with interactive lessons, personalized practice, and real-world conversations. Join millions of learners achieving fluency every day.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                {t("Start Free Trial")}
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                {t("Take Level Test")}
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("Why Learn With Us?")}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("Discover the features that make our platform the most effective way to learn English.")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <CardTitle>{t("Interactive Conversations")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t("Practice speaking with AI tutors and real native speakers. Build confidence through natural conversations.")}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <CardTitle>{t("Personalized Learning")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t("Adaptive lessons that adjust to your pace and learning style. Track progress with detailed analytics.")}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <CardTitle>{t("Comprehensive Curriculum")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {t("From beginner to advanced levels. Grammar, vocabulary, pronunciation, and cultural context all included.")}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gray-900 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("Ready to Speak English Confidently?")}</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("Join over 10 million learners who have improved their English skills with our proven method.")}
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              {t("Start Learning Today")}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

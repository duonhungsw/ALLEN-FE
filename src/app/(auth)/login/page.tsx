"use client";

import LoginForm from "@/components/login/LoginForm";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useEffect } from "react";
import GoogleIcon from "@p/svg/google.svg";
import { useActivateAccount } from "@/hooks/auth/useActiveAccount";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";
import { sendGoogleUserToBackend } from "@/shared/api/auth.api";
import { parseJwt } from "@/utils/jwt";
import { setCookie } from "@/utils/cookies";
import { setStorageData } from "@/shared/store";
import * as THREE from "three";
import CoffeeModel from "../../../models/Coffee";
import { Canvas, useFrame } from "@react-three/fiber";
import Triangle from "@/models/Triangle";
import DodecahedronModel from "@/models/Dodecahedron";
import BookModel from "@/models/BookModel";
import StickyNote from "@/models/StickyNote";
import Pencil1 from "@/models/Pencil1";
import RuleModel from "@/models/Rule";
import Link from "next/link";
import { OrbitControls } from "@react-three/drei";

interface RotatingModelProps {
  ModelComponent: any;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

function RotatingModel({
  ModelComponent,
  position,
  rotation,
  scale,
}: RotatingModelProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      ref.current.rotation.x += 0.002;
    }
  });

  return (
    <ModelComponent
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations();
  const { mutate: activateAccount } = useActivateAccount();
  const { data: session } = useSession();
  const handleLoginWithGoogle = () => {
    signIn("google");
  };

  useEffect(() => {
    if (session && "idToken" in session && session.idToken) {
      (async () => {
        try {
          if (!session.idToken) {
            throw new Error("No idToken found in session");
          }
          const backendData = await sendGoogleUserToBackend({
            idToken: session.idToken as string,
          });
          const userInfo = parseJwt(backendData.accessToken);
          setStorageData("accessToken", backendData.accessToken);
          setStorageData("refreshToken", backendData.refreshToken);
          setCookie("user", JSON.stringify(userInfo), 30);
          setCookie("accessToken", backendData.accessToken, 30);
          setCookie("refreshToken", backendData.refreshToken, 30);
          router.push("/");
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [session, router]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const activateToken = searchParams.get("activateToken");
    if (activateToken) {
      activateAccount(activateToken);
      router.replace("/login");
    }
  }, []);

  return (
    <div className="relative flex justify-center items-center w-full h-screen bg-[#131F24] to-indigo-900">
      <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <pointLight position={[-2, 2, 2]} intensity={5} />

          <RotatingModel
            ModelComponent={CoffeeModel}
            position={[-5, 3, -2]}
            rotation={[1.5, 0.8, -0.5]}
            scale={[0.004, 0.004, 0.004]}
          />
          <RotatingModel
            ModelComponent={DodecahedronModel}
            position={[3, 3, -2]}
            rotation={[2.2, 1.2, -0.8]}
            scale={[0.005, 0.005, 0.005]}
          />
          <RotatingModel
            ModelComponent={BookModel}
            position={[6, -3, -1]}
            rotation={[0.5, 1.5, -0.3]}
            scale={[0.002, 0.002, 0.004]}
          />
          <RotatingModel
            ModelComponent={StickyNote}
            position={[-6, 0, 0]}
            rotation={[0.3, 0.8, 0.2]}
            scale={[0.009, 0.009, 0.009]}
          />
          <RotatingModel
            ModelComponent={Pencil1}
            position={[5, -1.5, -0.8]}
            rotation={[0.3, 1.8, -0.6]}
            scale={[0.004, 0.004, 0.004]}
          />
          <RotatingModel
            ModelComponent={RuleModel}
            position={[4, -2.5, -1.5]}
            rotation={[0.4, 1.2, -0.4]}
            scale={[0.004, 0.004, 0.004]}
          />

          <RotatingModel
            ModelComponent={CoffeeModel}
            position={[-5, 1, -1.5]}
            rotation={[0.8, 1.5, -0.3]}
            scale={[0.003, 0.003, 0.003]}
          />
          <RotatingModel
            ModelComponent={DodecahedronModel}
            position={[6, 1, -1.5]}
            rotation={[1.2, 0.8, -0.6]}
            scale={[0.004, 0.004, 0.004]}
          />
          <RotatingModel
            ModelComponent={BookModel}
            position={[-7, -3, -2]}
            rotation={[0.03, 2.8, -1.9]}
            scale={[0.005, 0.005, 0.005]}
          />
          <RotatingModel
            ModelComponent={StickyNote}
            position={[5, -1, -2]}
            rotation={[0.1, 0.2, 0.2]}
            scale={[0.01, 0.009, 0.009]}
          />
          <RotatingModel
            ModelComponent={Pencil1}
            position={[-7, 2, -1]}
            rotation={[0.6, 1.2, -0.5]}
            scale={[0.003, 0.003, 0.003]}
          />
          <RotatingModel
            ModelComponent={RuleModel}
            position={[8, 2, -1]}
            rotation={[0.9, 0.7, -0.3]}
            scale={[0.003, 0.003, 0.003]}
          />

          <RotatingModel
            ModelComponent={CoffeeModel}
            position={[-4, 0, -0.5]}
            rotation={[1.1, 1.3, -0.2]}
            scale={[0.002, 0.002, 0.002]}
          />
          <RotatingModel
            ModelComponent={DodecahedronModel}
            position={[4, 0, -0.5]}
            rotation={[0.7, 1.6, -0.4]}
            scale={[0.003, 0.003, 0.003]}
          />
          <RotatingModel
            ModelComponent={BookModel}
            position={[8, 4, -1.5]}
            rotation={[0.4, 1.1, -0.6]}
            scale={[0.004, 0.004, 0.004]}
          />
          <RotatingModel
            ModelComponent={StickyNote}
            position={[-5, 4, -1.8]}
            rotation={[0.5, 0.8, 0.3]}
            scale={[0.03, 0.03, 0.03]}
          />
          <RotatingModel
            ModelComponent={Pencil1}
            position={[2, 4, -1.8]}
            rotation={[0.8, 1.4, -0.7]}
            scale={[0.002, 0.002, 0.002]}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
          <RotatingModel
            ModelComponent={Triangle}
            position={[5, 2.5, -1]}
            rotation={[1.8, 1.0, -0.7]}
            scale={[0.008, 0.008, 0.008]}
          />
        </Canvas>
      </div>
      <div className="absolute flex flex-col justify-center items-center p-8 lg:p-12 pointer-events-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-3xl shadow-2xl bg-gradient-to-br from-white/95 via-blue-50/90 to-indigo-50/95 backdrop-blur-sm border border-white/30 w-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-primaryDark">
            {t("auth.welcomeBack")}
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            {t("auth.signInto")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <LoginForm />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                {t("auth.or")}
              </span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            type="button"
            onClick={handleLoginWithGoogle}
            className="flex cursor-pointer text-gray-700 dark:text-gray-200 items-center justify-center w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 py-3 px-6 font-semibold bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md mb-6"
          >
            <Image
              src={GoogleIcon}
              alt="Google Icon"
              width={20}
              height={20}
              className="mr-3"
            />
            {t("auth.continueWithGoogle")}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-8 space-y-4"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t("auth.dontHaveAccount")}{" "}
              <Link
                href="/register"
                className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold hover:underline transition-colors"
              >
                {t("auth.signUp")}
              </Link>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {t("auth.agreeTerms")}{" "}
              <a
                className="underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                href="#"
              >
                {t("auth.termsPrivacy")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

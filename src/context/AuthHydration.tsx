"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/providers/auth/reducer/authSlice";
import { getCookie } from "@/utils/cookies";
import { parseJwt } from "@/utils/jwt";

export default function AuthHydration() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    try {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        const userInfo = parseJwt(accessToken);
        dispatch(setUser(userInfo));
      }
    } catch (e) {
      console.error("Failed to hydrate user from cookie", e);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return null;
}

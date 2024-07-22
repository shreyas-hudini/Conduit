"use client";
import useAuth from "../utlis/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component) {
  return (props) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    useEffect(() => {
      if (!isAuthenticated && typeof window !== "undefined") {
        router.replace("/");
      }
    }, [router, isAuthenticated]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
}

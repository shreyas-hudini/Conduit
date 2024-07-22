"use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

const useAuth = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter();
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     localStorage.getItem("token")

  //   }
  // }, [router]);

  if (typeof window !== undefined) {
    return !!localStorage.getItem("token");
  }
};

export default useAuth;

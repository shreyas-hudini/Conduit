"use client";
import React from "react";
import withAuth from "../withAuth";
import { useRouter } from "next/navigation";
import "./profile.css";

function Settings() {
  const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <button className="log-out" onClick={logOut}>
      Log Out
    </button>
  );
}

export default withAuth(Settings);

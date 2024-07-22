"use client";

import Navbar from "../components/Home/Navbar";
import Form from "./components/Signup";
import withAuth from "../components/withAuth";

function signIn() {
  return (
    <>
      <Navbar />
      <Form />
    </>
  );
}

export default signIn;

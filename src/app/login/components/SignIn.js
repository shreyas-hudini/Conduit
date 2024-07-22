// // import React from 'react'
// import { useState } from "react";
// import axios from "axios";
// import { z } from "zod";
// import "./signIn.css";
// import { Router, useRouter } from "next/router";

// const mySchema = z.object({
//   email: z.coerce.string().email().min(5),
//   password: z.string().min(4),
// });

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const validator = (userData) => {
//     try {
//       mySchema.parse(userData);
//       return { success: true, errors: [] };
//     } catch (error) {
//       return { success: false, errors: error.errors };
//     }
//   };

//   const handleApiError = (error) => {
//     let errMsgs = [];

//     for (const key in error) {
//       errMsgs.push(key + " " + error[key]);
//     }
//     setError(errMsgs);
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     const validationResult = validator({ email, password });

//     if (!validationResult.success) {
//       const zodErr = validationResult.errors.map((err) => err.message);
//       setError(zodErr);
//     }

//     try {
//       const userDetails = { email, password };
//       const userApi = "https://api.realworld.io/api/users/login";

//       const response = await axios.post(
//         userApi,
//         { user: { ...userDetails } },
//         { header: "Content-Type: application/json" }
//       );
//       localStorage.setItem("token", userDetails.dat.user.token);
//       router.push("/");
//     } catch (error) {
//       let err = error.response.data.errors;
//       handleApiError(err);
//     }
//   };

"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./signIn.css";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    // const userDetails = { email, password };
    const userData = "https://api.realworld.io/api/users/login";

    try {
      const userDetails = await axios.post(
        userData,
        {
          user: {
            email: email,
            password: password,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", userDetails.data.user.token);
      router.push("/");
    } catch (err) {
      setError(error.message || "Invalid Usernam or Password");
      console.log(err, "error");
    }
  };

  return (
    <>
      <div className="signIn-form">
        <h1 id="signIn-heading">Sign In</h1>
        <p>Need an Account?</p>
        {/* {!!error.length && (
          <div>
            <ul>
              {error.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        )} */}
        <form className="form-sign-in" onSubmit={handleSignIn}>
          <input
            class="form-control form-control-lg"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            class="form-control form-control-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="sign-btn" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}

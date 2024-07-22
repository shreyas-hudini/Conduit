"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import "../../login/components/signIn.css";
// import { headers } from "next/headers";
// for validation use zod

const mySchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.coerce.string().email().min(5),
  password: z.string().min(4),
});

export default function signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validator = (userData) => {
    try {
      mySchema.parse(userData);
      return { success: true, errors: [] };
    } catch (error) {
      console.log(error.errors, "error");
      return { success: false, errors: error.errors };
    }
  };

  const handleApiError = (error) => {
    let errMsgs = [];

    for (const key in error) {
      errMsgs.push(key + " " + error[key]);
    }
    console.log(errMsgs, "error");
    setError(errMsgs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validator({ username, email, password });

    if (!validationResult.success) {
      const zodErr = validationResult.errors.map((err) => err.message);
      setError(zodErr);
    }

    try {
      const userDetails = { username, email, password };

      const usersApi = "https://api.realworld.io/api/users";

      const response = await axios.post(
        usersApi,
        { user: { ...userDetails } },
        { header: "Content-Type: application/json" }
      );
    } catch (error) {
      let err = error.response.data.errors;
      handleApiError(err);
    }
  };

  return (
    <>
      <div className="signIn-form">
        <h1 id="signIn-heading">SignUp</h1>
        <p>Have an Account?</p>
        {!!error.length && (
          <div className="err-handling">
            <ul>
              {error.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form className="form-sign-in" onSubmit={handleSubmit}>
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
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
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}

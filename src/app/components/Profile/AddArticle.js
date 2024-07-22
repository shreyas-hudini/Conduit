import React, { useState } from "react";
import Navbar from "../Home/Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./profile.css";
import withAuth from "../withAuth";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([""]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log("innnnn");
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token, "token");
    try {
      const articleDetails = { title, description, body, tags };
      const articleData = await axios.post(
        "https://api.realworld.io/api/articles",
        { article: { ...articleDetails } },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(articleData, "ari");
      setTitle("");
      setDescription("");
      setBody("");
      setTags("");
      //   setTimeout(() => {
      //     router.push("/");
      //   }, 1000);
      console.log(articleData);
    } catch (error) {
      setError(error, "Failed to add article details");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="article-title"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            type="text"
            id="article-desc"
            placeholder="What's this article about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <textarea
            id="article-body"
            placeholder="Write your article(in markdown)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <input
            id="article-tags"
            type="text"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          ></input>
          <div className="btn-div">
            <button className="submit-article">Publish Article</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default withAuth(AddArticle);

"use client";
import React from "react";
import Navbar from "../../components/Home/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getDate } from "../../components/Home/Feeds";
import "./style.css";

function page({ params }) {
  const eachArticleApi = `https://api.realworld.io/api/articles/${params.slug}`;
  const [fetchedArticle, setArticle] = useState({});
  const [fetchStatus, setStatus] = useState(false);

  async function fetchEachArticle() {
    const eachArticlePromises = await fetch(eachArticleApi);
    const eachArticle = await eachArticlePromises.json();
    setArticle(eachArticle.article);
    setStatus(true);
  }

  useEffect(() => {
    fetchEachArticle();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      {fetchStatus ? (
        <>
          <div className="article-each-fetched">
            <h1>{fetchedArticle.title}</h1>
            <Image
              src={fetchedArticle.author.image}
              width={20}
              height={20}
              alt=""
            />
            <h2>{fetchedArticle.author.username}</h2>
            <p>{getDate(fetchedArticle.createdAt)}</p>
            <span className="likes-count">
              &#10084; Favorite Post
              {fetchedArticle.favoritesCount}
            </span>
          </div>
          <div>
            <p>{fetchedArticle.body}</p>
            <ul className="tag-each-fetched">
              {fetchedArticle.tagList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>Loading...</p>
          </div>
        </>
      )}
    </>
  );
}

export default page;

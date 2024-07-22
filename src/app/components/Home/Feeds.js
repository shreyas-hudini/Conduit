"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesAndTags } from "../../store/slice";
import "./home.css";
import Link from "next/link";
import Image from "next/image";

export const getDate = (date) => {
  const createdDate = new Date(date);
  return createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function globalFeeds() {
  const dispatch = useDispatch();

  const articlesRedux = useSelector(({ articles }) => articles.article);
  const statusRedux = useSelector((state) => state.articles.status);
  const errorRedux = useSelector((state) => state.articles.error);
  const tagsRedux = useSelector((state) => state.articles.tags);
  const pageNationCount = useSelector(
    (state) => state.articles.pageNationCount
  );

  console.log(tagsRedux, "tagsRedux");

  useEffect(() => {
    // fetchFeeds();
    dispatch(getArticlesAndTags());
    // fetchTags();
  }, []);

  // console.log(statusRedux);
  if (statusRedux === "loading") {
    return (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "rgb(255, 255, 255)",
        }}
      >
        <g>
          <circle
            strokeDasharray="56.548667764616276 20.84955592153876"
            r="12"
            strokeWidth="2"
            stroke="#5cb85c"
            fill="none"
            cy="50"
            cx="50"
          >
            <animateTransform
              keyTimes="0;1"
              values="0 50 50;360 50 50"
              dur="1s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            />
          </circle>
          <g />
        </g>
      </svg>
    );
  }

  function getPages(count) {
    const pageInfo = [];
    let item = 1;
    for (let i = 0; i <= count; i += 10) {
      pageInfo.push({ offset: i, item: item });
      item++;
    }
    return pageInfo;
  }

  const handleOnClick = async (e, off) => {
    dispatch(getArticlesAndTags(off));

    const getButton = document.getElementsByClassName("page-nation");
    for (let i of getButton) {
      i.style.background = "#fff";
      i.style.color = "#fff";
    }
    e.target.style.background = "#5cb85c";
    e.target.style.color = "#fff";
  };

  return (
    <>
      <section className="feeds-and-tags">
        <div className="global-feeds">
          <h1 className="global-feeds-heading">Global Feeds</h1>
          <ul>
            {articlesRedux.map((item, index) => (
              <li key={index}>
                <div className="article-card">
                  <div className="author-profile">
                    <Image
                      src={item.author.image}
                      className="profile-img"
                      width={30}
                      height={30}
                      alt=""
                    />
                    <div className="author-username-date">
                      <h3>{item.author.username}</h3>
                      <span className="created-date">
                        {getDate(item.createdAt)}
                      </span>
                    </div>
                    <div className="fav-count">
                      <span className="likes-count">
                        &#10084;
                        {item.favoritesCount}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/Articles/${encodeURIComponent(item.slug)}`}
                    className="article-link"
                  >
                    <h1 className="article-heading">{item.title}</h1>
                    <p>{item.description}</p>
                    {/* <p>{item.body}</p> */}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="side-bar">
          <h2>Popular Tags</h2>
          <ul>
            {tagsRedux
              ? tagsRedux.map((tag) => (
                  <li className="tags-fetched" key={tag}>
                    {tag}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </section>
      <section className="page-nation">
        {getPages(pageNationCount).map(({ offset, item }) => (
          <button key={item} onClick={(event) => handleOnClick(event, offset)}>
            {item}
          </button>
        ))}
      </section>
    </>
  );
}

export default globalFeeds;

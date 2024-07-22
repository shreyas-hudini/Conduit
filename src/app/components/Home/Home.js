import React from "react";
import "./home.css";
import Feeds from "./Feeds";

function Home() {
  return (
    <>
      <div class="container-header">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
      <div>
        <Feeds />
      </div>
    </>
  );
}

export default Home;

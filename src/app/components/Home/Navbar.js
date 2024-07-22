// import React from "react";
// "use server";
import Link from "next/link";
import "./home.css";
import useAuth from "@/app/utlis/session";
import Image from "next/image";

function Navbar() {
  const authentication = useAuth();
  const username = localStorage.getItem("username");
  // console.log({ authentication });
  // localStorage.clear();
  return (
    <div className="all">
      <nav className="navbar">
        <div className="container">
          <Link className="nav-bar" href="/">
            conduit
          </Link>
          <ul className="nav-link-list">
            {authentication ? (
              <>
                <li>
                  <Link class="nav-link active" href="/" aria-current="page">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    class="nav-link active"
                    href="/AddArticle"
                    aria-current="page"
                  >
                    <Image
                      width="18"
                      height="18"
                      src="https://img.icons8.com/material-outlined/24/edit-property.png"
                      alt="edit-property"
                    />
                    New Article
                  </Link>
                </li>
                <li>
                  <Link
                    class="nav-link active"
                    href="/Settings"
                    aria-current="page"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link class="nav-link active" href="/" aria-current="page">
                    {username} Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link class="nav-link active" href="/" aria-current="page">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    class="nav-link active"
                    href="/login"
                    aria-current="page"
                  >
                    SignIn
                  </Link>
                </li>
                <li>
                  <Link
                    class="nav-link active"
                    href="/signup"
                    aria-current="page"
                  >
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

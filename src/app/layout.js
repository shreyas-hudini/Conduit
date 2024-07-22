// "use client";

import { Inter } from "next/font/google";
import "./globals.css";
// import { Provider } from "react-redux";
// import store from "./lib/store";

import StoreProvider from "./storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Conduit",
  description: "Main Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Provider store={store}>{children}</Provider> */}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

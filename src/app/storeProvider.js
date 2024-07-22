"use client";
// import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store/store";

//this is check is the code is runing on server or client

export default function StoreProvider({ children }) {
  //   const storeRef = useRef();
  if (typeof window !== undefined) {
    // Create the store instance the first time this renders
    return <Provider store={makeStore()}>{children}</Provider>;
    // storeRef.current = makeStore();
  }
}

import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./slice";

// create reducers and import herer

// export default configureStore({
//   reducer: {
//     articles: articlesSlice,
//   },
// });

export const makeStore = () => {
  return configureStore({
    reducer: {
      articles: articlesSlice,
    },
  });
};

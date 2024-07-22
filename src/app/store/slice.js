// "use client";

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const articleApi =
  "https://api.realworld.io/api/articles?offset=${offset}limit=10";
const tagApi = "https://api.realworld.io/api/tags";

// here we will be using promise all
// promise require api to in []
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
const tem = [articleApi, tagApi];

// we will fecth all artiles using createAync
export const getArticlesAndTags = createAsyncThunk(
  "articles/fetchData",
  async (offset = 0) => {
    const data = await Promise.all(
      tem.map(async (v) => {
        const t = token
          ? await fetch(v, {
              headers: { Authorization: `Token ${token}` },
            })
          : await fetch(v, {
              headers: {},
            });
        const res = await t.json();
        return res;
      })
    );

    return data;
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    article: [],
    status: "loading",
    error: null,
    tags: [],
    pageNationCount: 0,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(getArticles, (state, action) => {
      //   state.status = "loading";
      //   // state.status =
      // })
      .addCase(getArticlesAndTags.fulfilled, (state, action) => {
        console.log(action.payload, "km");
        state.status = "succeeded";
        state.article = state.article.concat(action.payload[0].articles);
        state.tags = action.payload[1].tags;
        state.pageNationCount = action.payload[0].articlesCount;
      })
      .addCase(getArticlesAndTags.rejected, (state, action) => [
        (state.status = "failed"),
        (state.error = action.error.message),
      ]);
  },
});

export default articlesSlice.reducer;

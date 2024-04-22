import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/user/authSlice";
import blogsSliceReducer from "../features/blogs/blogsSlice";
import commentsSliceReducer from "../features/comments/commentsSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSliceReducer,
        blog:blogsSliceReducer,
        comment:commentsSliceReducer
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(apiSlice.middleware),
});


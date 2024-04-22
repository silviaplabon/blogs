import { apiSlice } from "../api/apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (data) => {
        if (data.category) {
          return `/blogs/?userId=${data.userId}&category=${data.category}&page=${data.page}&limit=${data.limit}`;
        } else {
          return `/blogs/?userId=${data.userId}&page=${data.page}&limit=${data.limit}`;
        }
      },
      keepUnusedDataFor: 600,
      providedTags: ["BlogsByUser"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getAllBlogsByTabs: builder.query({
      query: (data) => {
        if (data.category) {
          return `/blogs/tabs/${data.tabName}?category=${data.category}&page=${data.page}&limit=${data.limit}`;
        } else {
          return `/blogs/tabs/${data.tabName}?page=${data.page}&limit=${data.limit}`;
        }
      },
      keepUnusedDataFor: 600,
      providedTags: ["BlogsByTabs"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getRandomBlogs: builder.query({
      query: (data) => {
        if (data.category) {
          return `/blogs/randomBlogs?category=${encodeURIComponent(
            data.category
          )}`;
        } else {
          return "/blogs/randomBlogs";
        }
      },
      keepUnusedDataFor: 600,
      providedTags: ["BlogsByRando"],
      transformResponse: (response) => {
        return response.data;
      },
    }),

    getSpecificBlog: builder.query({
      query: (blogId) => `/blogs/${blogId}`,
      providesTags: (result, error, arg) => [{ type: "Blog", id: arg }],
      transformResponse: (response) => {
        console.log(response.data, "response");
        return response.data;
      },
    }),
    getBlogComments: builder.query({
      query: (blogId) => `/blogs/comments/${blogId}`,
      providesTags: (result, error, arg) => [{ type: "Comments", id: arg }],
      transformResponse: (response) => {
        console.log(response.data, "response");
        return response.data;
      },
    }),
    addBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result, ":result");
        } catch (err) {
          console.log(err);
        }
      },
      invalidatedTags: ["BlogsByUser"],
    }),
    updateABlog: builder.mutation({
      query: (data) => ({
        url: "/blogs/:id",
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result, ":result");
        } catch (err) {
          console.log(err);
        }
      },
      invalidatedTags: ["BlogsByUser"],
    }),
    addAReview: builder.mutation({
      query: (data) => ({
        url: `/blogs/${data.blogId}/reviews`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result, ":result");
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addAReaction: builder.mutation({
      query: (data) => ({
        url: `/blogs/${data.blogId}/reactions`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result, ":result");
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addAComment: builder.mutation({
      query: (data) => ({
        url: `/blogs/${data.blogId}/addAComment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result, ":result");
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteAComment: builder.mutation({
      query: (data) => ({
        url: `/blogs/${data.commentId}/deleteAComment`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Comments"],

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result, ":result");
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateAComment: builder.mutation({
      query: (data) => ({
        url: `/blogs/${data.commentId}/editAComment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result, ":result");
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetAllBlogsByTabsQuery,
  useGetRandomBlogsQuery,
  useGetSpecificBlogQuery,
  useAddBlogMutation,
  useAddAReviewMutation,
  useAddAReactionMutation,
  useUpdateABlogMutation,
  useAddACommentMutation,
  useGetBlogCommentsQuery,
  useDeleteACommentMutation,
  useUpdateACommentMutation
} = blogsApi;

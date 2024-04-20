import { apiSlice } from "../api/apiSlice";


export const blogsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlogs:builder.query({
            query:()=>"/blogs",keepUnusedDataFor:600,providedTags:['Blogs'],
            transformResponse: (response) => {
                console.log(response.data,"response")
                return response.data
            },
        }),
        getSpecificBlog:builder.query({ 
            query:(blogId)=>`/blogs/${blogId}`,providedTags:(result,error,arg)=>[{'type':'Blog',id:arg}],
            transformResponse: (response) => {
                console.log(response.data,"response")
                return response.data
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
                    console.log(result,":result")
                
                } catch (err) {
                    console.log(err)
                }
            },
            invalidatedTags:['Blogs']
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
                console.log(result,":result")
            
            } catch (err) {
                console.log(err)
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
                console.log(result,":result")
            
            } catch (err) {
                console.log(err)
            }
        },
       }),
      
    }),
});

export const { useGetAllBlogsQuery,useGetSpecificBlogQuery,useAddBlogMutation,useAddAReviewMutation,useAddAReactionMutation} = blogsApi;
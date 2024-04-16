import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       
        login: builder.mutation({
            query: (data) => ({
                url: "/users/login",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result.data.data.accessToken,'result@@@@@@')
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.data.accessToken,
                            user: result.data.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.data.accessToken,
                            user: result.data.data.user,
                        })
                    );
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/users/",
                method: "POST",
                body: data,
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result.data.data.accessToken,'result@@@@@@')
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.data.accessToken,
                            user: result.data.data.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.data.accessToken,
                            user: result.data.data.user,
                        })
                    );
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

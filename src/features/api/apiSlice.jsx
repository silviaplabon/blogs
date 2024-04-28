import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../user/authSlice";
const baseQuery = fetchBaseQuery({
    
    baseUrl:" https://86a3-103-47-103-9.ngrok-free.app",
    prepareHeaders: async (headers, { getState }) => {
        const token = getState()?.auth?.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result?.error?.status === 401) {
            api.dispatch(userLoggedOut());
            localStorage.clear();
        }
        return result; 
    },
    tagTypes: [],
    endpoints: () => ({}),
}); 


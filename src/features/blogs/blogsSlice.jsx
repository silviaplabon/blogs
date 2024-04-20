import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    selectedCalegory:{value:"",label:''}
};

const BlogSlice = createSlice({
    name: "blog", 
    initialState,
    reducers: {
         AddUserSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload.selectedCategory;
        }
    },
});

export const {AddUserSelectedCategory } = BlogSlice.actions;
export default BlogSlice.reducer;

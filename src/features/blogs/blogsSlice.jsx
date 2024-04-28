import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    selectedCategory:{value:"",label:''},
    title:''
};

const BlogSlice = createSlice({
    name: "blog", 
    initialState,
    reducers: {
         AddUserSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload.selectedCategory;
        },
        AddSearchText:(state,action)=>{
             state.title=action.payload.title;
        }
    },
});

export const {AddUserSelectedCategory,AddSearchText } = BlogSlice.actions;
export default BlogSlice.reducer;

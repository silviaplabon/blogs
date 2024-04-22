import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    executingCommentId:'',
    comment:{}
};

const CommentsSlice = createSlice({
    name: "comments", 
    initialState,
    reducers: {
        addExecutingCommentId: (state, action) => {
            state.executingCommentId = action.payload.executingCommentId;
            state.comment=action.payload.comment;
        }
    },
});

export const {addExecutingCommentId } =CommentsSlice.actions;
export default CommentsSlice.reducer;

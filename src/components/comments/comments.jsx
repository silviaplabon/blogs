import React from 'react';
import { useGetBlogCommentsQuery } from '../../features/blogs/blogsApiSlice';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Comment from './comment';

const Comments = ({blogId}) => {
    const {data:commentsData,isLoading:isLoading,refetch}=useGetBlogCommentsQuery(blogId);

    return (
        <List sx={{ width: '100%', color:'white'}}>
            {commentsData && commentsData.comments &&
                Object.keys(commentsData.comments).map(commentKey => (
                <Comment key={commentKey} data={commentsData?.comments[commentKey]}></Comment>
                ))
            }
      </List>
    );
};

export default Comments;
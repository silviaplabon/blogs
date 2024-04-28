import React, { useEffect, useState } from "react";
import { useDeleteACommentMutation, useGetBlogCommentsQuery, useUpdateACommentMutation } from "../../features/blogs/blogsApiSlice";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {  makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addExecutingCommentId } from "../../features/comments/commentsSlice";
import { FaEdit, FaReply, FaTrash } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GiClick } from "react-icons/gi";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CgCross } from "react-icons/cg";
import { ImCross } from "react-icons/im";

const useStyles = makeStyles(() => ({
    notchedOutline:{
      color:'white'
    },

    input: {
      padding: "0.35rem",
      fontSize: "0.875rem",
     
     color:'white',
      width:'100%',
      '& .MuiFormControl-root': {
        width:'100%!important'
      }
    },
   
    formControlRoot:{
      width:'100%!important'
    }
    
  }));
const Comment = ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
        
    const [deleteAComment, { isLoading, isError, isSuccess }] = useDeleteACommentMutation();  
    const [updateAComment, { isLoading:isUpdateCommentLoading, isError:isUpdatedCommentError, isSuccess:isUpdateCommentSuccess}] = useUpdateACommentMutation();  

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const [isEditing, setIsEditing] = useState(false);
    const [commentText, setCommentText] = useState(data?.commentText || '');
    const handleClose = (typeOfOp) => {
        if(typeOfOp=='delete'){
            deleteAComment({commentId:data._id})
        }else if(typeOfOp=='edit'){
            setIsEditing(true)
        }
        setAnchorEl(null);
    };
    const convertToMessengerTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const currentDate = new Date();
        const diffInSeconds = Math.floor((currentDate - messageDate) / 1000);
      
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const formattedDateTime = messageDate.toLocaleString('en-US', options);
      
        if (diffInSeconds < 60) {
          return `Just now`;
        } else {
          const minutes = Math.floor(diffInSeconds / 60);
          return `${formattedDateTime}`;
        } 
      };
      
    const dispatch=useDispatch()

    const handleReply=()=>{
        dispatch(addExecutingCommentId({executingCommentId:data._id,comment:data}))
    }


  useEffect(()=>{
    setIsEditing(false);
  },[isUpdateCommentSuccess])

  const handleUpdateAComment=()=>{
    updateAComment({commentId:data._id,commentText:commentText})
  }

  const classes = useStyles();
  
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ color: "white!important" }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={data?.author?.profileImage} />
        </ListItemAvatar>
        {
            isEditing?
            <TextField
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              autoFocus  
              classes={{ root: classes.formControlRoot }}
             
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white', 
                },
                '& .MuiInputBase-input': {
                  caretColor: 'black',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                  borderRadius:'25px'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', 
                },
              }}
    
            />:
            <ListItemText
            sx={{ color: "white" }}
            primary={data?.author?.name}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="white"
              >
                {data?.commentText}
              </Typography>
            }
          />
        }
      {
        isEditing &&<Box display="flex" alignItems="center">
            <Typography sx={{marginLeft:'10px',marginTop:'20px'}}>
        <GiClick size="25" onClick={()=>handleUpdateAComment()} >CLICK</GiClick>
            </Typography>
            <Typography sx={{marginLeft:'10px',marginTop:'20px'}}>
        <ImCross size="20" onClick={()=>setIsEditing(false)}></ImCross>
            </Typography>
    
        </Box>
      }
       
         <Divider  color="white" sx={{color:'white'}}/>
      </ListItem>
      <Box sx={{marginLeft:'20px', "&:hover .dotVertical": {
        display: 'block',
    },}} display="flex" justifyContent="space-between"> 
         <Box display="flex">
            <FaReply  onClick={()=>handleReply()} ></FaReply>
            <Typography sx={{marginLeft:'20px'}}>{data?.updatedAt?convertToMessengerTimestamp(data.updatedAt):""}</Typography>
         </Box>
        <Box sx={{display:'none'}} className="dotVertical">
            <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
            <HiOutlineDotsVertical sx={{ marginLeft: 'auto' }}  ></HiOutlineDotsVertical>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>handleClose('delete')}><Box display="flex" alignItems="center">
        <FaTrash></FaTrash> <Typography sx={{marginLeft:'20px'}} >Delete</Typography>
            </Box>
            </MenuItem>
        <MenuItem onClick={()=>handleClose('edit')}><Box display="flex" alignItems="center">
        <FaEdit></FaEdit> <Typography sx={{marginLeft:'20px'}}>Edit</Typography>
            </Box></MenuItem>
      </Menu>

        </Box>
      </Box>
   
       {data?.children &&
                Object.keys(data.children).map(commentKey => (
                    <Box sx={{marginLeft:'30px'}}>
                        <Comment key={commentKey} data={data.children[commentKey]}></Comment>
                    </Box>
                ))
            }
    </>
  );
};

export default Comment;

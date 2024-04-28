/* eslint-disable react/prop-types */
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
// import { useSelector } from "react-redux";

import { MdPunchClock} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FcRatings } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { Edit } from "@mui/icons-material";
import { MdFavorite } from "react-icons/md";
import { useEffect, useState } from "react";
import { CiRead } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useDeleteABlogMutation } from "../../../features/blogs/blogsApiSlice";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const VerticalCard = ({ blog,height}) => {
  const navigate = useNavigate();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [reactionCount,setReactionCount]=useState(0);
  const userData=useSelector(state=>state.auth.user);
  const [deleteBlog, { isLoading, isError, isSuccess }] = useDeleteABlogMutation();

  useEffect(()=>{
      const filteredReactions=blog.reactions?.filter(blog=>blog.reaction);
      setReactionCount(filteredReactions.length)
  },[blog])

  const handleDeleteBlog=()=>{
    deleteBlog({_id:blog?._id})
  }
  return (
    <Box sx={{ position: "relative",width:'100%'}} className="mt-1" >
      <Grid container>
        <CardMedia
          component="img"
          height={height}
          onClick={()=> navigate(`/blogs/${blog?._id}`)}
          image={blog?.featuredImage?blog.featuredImage:"https://hqd.mah.mybluehost.me/themes/dreamla/travel/wp-content/uploads/2019/07/alexandre-chambon-115386-unsplash-960x750.jpg"}  alt={blog?.title}
        />
        

        <CardContent sx={{paddingX:0,width:'100%'}}>
          <Button
            variant="outlined"
            mb={1}
            sx={{ borderRadius: "20px!important" }}
          >
            {blog?.category}
          </Button>

          <Typography variant="h6" mt={1} sx={{fontSize:'16px'}} onClick={()=> navigate(`/blogs/${blog?._id}`)}>
            {blog?.title}
          </Typography>
          
          <Box display="flex" justifyContent="space-between" mt="1">
            <Typography variant="body1">
               <MdPunchClock  ></MdPunchClock>{blog?.createdTime ?new Date(blog?.createdTime ).toLocaleDateString(undefined,options):''}
            </Typography>
            <Typography  display="flex" alignItems="center">
              { blog?.readCount &&<>
                 <CiRead size="25" color="gray"></CiRead>{blog?.readCount} 
               </> 
              }
            </Typography>
           
{
  userData?._id==blog?.userId &&<>
   <Typography  display="flex" alignItems="center">
              <CiEdit  size="25" onClick={()=> navigate(`/blogs/edit/${blog?._id}`)}/>
            </Typography>
            <FaTrash onClick={()=>handleDeleteBlog()}></FaTrash>
  </>  
}
            
           
                <Typography display="flex" alignItems="center">{
            reactionCount>0 &&<>
               <MdFavorite color="red" size="25"></MdFavorite>{reactionCount}</>
             }
             </Typography>
        
            </Box>
        </CardContent>
      
      </Grid>
    </Box>
  );
};

export default VerticalCard;

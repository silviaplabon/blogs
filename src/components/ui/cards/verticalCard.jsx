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

// eslint-disable-next-line react/prop-types
const VerticalCard = ({ blog,height}) => {
  // const data = useSelector((state) => state.carts);
  console.log(blog,"DATA");
  const navigate = useNavigate();
  console.log(height)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Box sx={{ position: "relative"}} className="mt-1" onClick={()=> navigate(`/blogs/${blog?._id}`)}>
      <Grid container>
        <CardMedia
          component="img"
          height={height}
          image={blog?.featuredImage?blog.featuredImage:"https://hqd.mah.mybluehost.me/themes/dreamla/travel/wp-content/uploads/2019/07/alexandre-chambon-115386-unsplash-960x750.jpg"}  alt={blog?.title}
        />

        <CardContent sx={{paddingX:0}}>
          <Button
            variant="contained"
            mb={1}
            sx={{ borderRadius: "20px!important" }}
          >
            {blog?.category}
          </Button>

          <Typography variant="h6" mt={1} sx={{fontSize:'16px'}}>
            {blog?.title}
          </Typography>
          
          <Box display="flex" justifyContent="space-between" mt="1">
            <Typography variant="body1">
            <MdPunchClock></MdPunchClock>{blog?.createdTime ?new Date(blog?.createdTime ).toLocaleDateString(undefined,options):''}
          </Typography>
        
             <FcRatings></FcRatings>12
             <CiEdit sx={{marginLeft:'10px'}} onClick={()=> navigate(`/blogs/edit/${blog?._id}`)}/>
            <MdFavorite></MdFavorite>
        
            </Box>
        </CardContent>
      
      </Grid>
    </Box>
  );
};

export default VerticalCard;

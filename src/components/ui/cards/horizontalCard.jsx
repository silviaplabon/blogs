/* eslint-disable react/prop-types */
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, Grid } from "@mui/material";
import {makeStyles } from '@material-ui/core';
import { MdPunchClock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FcRatings } from "react-icons/fc";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  multiLineEllipsis: {

    overflow: "hidden",
    textOverflow: "ellipsis",
    "-webkit-line-clamp": "4!important",
    "-webkit-box-orient": "vertical",
    textWrap:"noWrap",
    whiteSpace: 'normal',
    height: 'auto',
    maxHeight: 'calc(1.2em * 4)', 
    lineHeight: '1.2em', 
  }
});

// eslint-disable-next-line react/prop-types
const HorizontalCard = ({ blog,isMinifiedVersion,height}) => {
  const navigate = useNavigate();
  const [reactionCount,setReactionCount]=useState(0)
  const classes = useStyles();
  useEffect(()=>{
      const filteredReactions=blog.reactions?.filter(blog=>blog.reaction);
      setReactionCount(filteredReactions.length)
  },[blog])

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Box sx={{ position: "relative" }} className="mt-1"  onClick={()=> navigate(`/blogs/${blog?._id}`)}>
      <Grid container>
        <Box
          sx={{
            display: isMinifiedVersion?"none":'flex',
            alignItems:'center',
            position: "absolute",
            bottom: 0,
            left: 0,
            marginLeft: "-30px",
            background: "none",
            transformOrigin: "0 0",
            transform: "rotate(270deg)",
            color: "white",
          }}
        >
          <MdPunchClock></MdPunchClock>{blog?.createdTime ?new Date(blog?.createdTime ).toLocaleDateString(undefined,options):''}
          <Typography sx={{ border: "1px solid white",width:'100px',height:'0px',marginLeft:'10px' }}></Typography>
        </Box>

        <Grid item xs={12} md={4}>
          <CardMedia
            component="img"
            height={height}
            image={blog?.featuredImage?blog.featuredImage:"https://hqd.mah.mybluehost.me/themes/dreamla/travel/wp-content/uploads/2019/07/alexandre-chambon-115386-unsplash-960x750.jpg"}
              alt={blog?.title}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent sx={{paddingY:0,marginY:0,paddingRight:0}}>
            <Box sx={{ display:isMinifiedVersion?'none':'flex' }}>
              <Avatar
                alt="Remy Sharp"
                src={blog?.profileImage}
              />
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontSize: "13px",
                  color: "#61b0e4",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                By {blog?.userName}
              </Typography>
            </Box>
            <Typography variant="h5" mt={isMinifiedVersion?0:1} sx={{fontSize:isMinifiedVersion?'12px':'16px'}}>
             {blog?.title}
            </Typography>
            <Typography variant="body2" mt={1} className={classes.multiLineEllipsis} sx={{ display:!isMinifiedVersion?' "-webkit-box"':'none',}}>
              {blog.shortDescription}
            </Typography>
            <Box display="flex">
            <Typography variant="body1" mt={1}>
          </Typography>
          {/* <Typography variant="body1" mt={1} sx={{marginLeft:'10px'}}>
             <FcRatings></FcRatings>12
          </Typography> */}

            </Box>
            {
              !isMinifiedVersion && 
          <Button
            variant="outlined"
            mb={1}
            sx={{ borderRadius: "20px!important" }}
          >
            {blog?.category}
          </Button>
            }
          </CardContent>

          <CardActions
            disableSpacing
            sx={{
              display: isMinifiedVersion?'none':'flex',
              justifyContent: "space-between",
              marginLeft: "10px",
            }}
          >
            <Box>CONTINUE READING</Box>
          </CardActions>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HorizontalCard;

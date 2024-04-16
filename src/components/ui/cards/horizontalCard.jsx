/* eslint-disable react/prop-types */
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Grid } from "@mui/material";
import {makeStyles } from '@material-ui/core';
import { MdPunchClock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
  // const data = useSelector((state) => state.carts);
  const navigate = useNavigate();
  const classes = useStyles();
  // console.log(data);

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
            color: "black",
          }}
        >
          <Typography > July 31,2019 </Typography>
          <Typography sx={{ border: "1px solid black",width:'100px',height:'0px',marginLeft:'10px' }}></Typography>
        </Box>

        <Grid items xs={12} md={4}>
          <CardMedia
            component="img"
            height={height}
            image={blog?.featuredImage?blog.featuredImage:"https://hqd.mah.mybluehost.me/themes/dreamla/travel/wp-content/uploads/2019/07/alexandre-chambon-115386-unsplash-960x750.jpg"}
              alt={blog?.title}
          />
        </Grid>
        <Grid items xs={12} md={8}>
          <CardContent sx={{paddingY:0,marginY:0,paddingRight:0}}>
            <Box sx={{ display:isMinifiedVersion?'none':'flex' }}>
              <Avatar
                alt="Remy Sharp"
                src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
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
                By Celine Dee .EUROPE
              </Typography>
            </Box>
            <Typography variant="h5" mt={isMinifiedVersion?0:1} sx={{fontSize:isMinifiedVersion?'12px':'16px'}}>
             {blog?.title}
            </Typography>
            <Typography variant="body2" mt={1} className={classes.multiLineEllipsis} sx={{ display:!isMinifiedVersion?' "-webkit-box"':'none',}}>
              {blog.shortDescription}
            </Typography>
            <Typography variant="body1" mt={1}>
            <MdPunchClock></MdPunchClock>November 8,2021
          </Typography>
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
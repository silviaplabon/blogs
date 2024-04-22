import {
  useAddAReactionMutation,
  useGetAllBlogsByTabsQuery,
  useGetAllBlogsQuery,
  useGetRandomBlogsQuery,
  useGetSpecificBlogQuery,
} from "../../features/blogs/blogsApiSlice";
import {
  Avatar,
  Box,
  CardMedia,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import VerticalCard from "../ui/cards/verticalCard";
import HorizontalCard from "../ui/cards/horizontalCard";
import AddAComment from "../comments/addAComment";
import SearchAppBar from "../appbar/appbar";
import CustomRating from "../ui/ratings/rating";
import { useSelector } from "react-redux";
import '../blogs/css/blogDetails.css'
import { MdFavorite } from "react-icons/md";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const category=useSelector(state=>state.blog.selectedCategory);
  
  const userId=useSelector(state=>state.auth.user._id)
  const [rating, { data,isSuccess:isReactionSuccess, error: responseError }] = useAddAReactionMutation();
    
  const {data:randomBlogs,isLoading:isRandomBlogsLoading,refetch:refetchRandomBlogs}=useGetRandomBlogsQuery({category:category?.value});

  const {data:blogsData,isLoading:isLoadingLatest,refetch}=useGetAllBlogsByTabsQuery({tabName:"LATEST",category:category?.value,page:1,limit:10});

  const {
    data: blog,
    isLoading: isLoading,
    isError,
    isSuccess,
  } = useGetSpecificBlogQuery(id);
  
 
  const [isFavourite,setIsFavourite]=useState(false)
  const handleAddToFavourites=()=>{
    rating({blogId:id,userId:userId,reaction:true})
  }

  useEffect(()=>{
     setIsFavourite(!isFavourite)
  },[isReactionSuccess])

  useEffect(()=>{
    if(blog?.reactions){
       const reactionData=blog.reactions.filter(reaction=>reaction.user==userId);
       setIsFavourite(reactionData[0]?reactionData[0].reaction:false)   
    }
  },[blog])

  return (
    <>
      <SearchAppBar></SearchAppBar>
      <Container>
        <Grid container spacing={4} mt={1}>
          <Grid item xs={12} md={9} sx={{ paddingRight: "10px" }}>
           
            <Box sx={{ display: "flex" }} mb={1}>
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
            <Typography variant="h5" my={1}>
              {blog?.title}
            </Typography>
           
            <CardMedia
              component="img"
              height="400"
              image={
                blog?.featuredImage
                  ? blog.featuredImage
                  : "https://hqd.mah.mybluehost.me/themes/dreamla/travel/wp-content/uploads/2019/07/alexandre-chambon-115386-unsplash-960x750.jpg"
              }
              alt={blog?.title}
            />

            <Typography variant="body2" mt={1}>
              {blog?.shortDescription}
            </Typography>
            <div  
              dangerouslyzSetInnerHTML={{
                __html: blog?.longDescription,
              }}
              className="longDescription"
            ></div>
            <Box display="flex" justifyContent="space-between">
               <CustomRating  blogId={id} userId={userId}></CustomRating>
               <MdFavorite size="40" onClick={()=>handleAddToFavourites()} color={isFavourite?"red":'white'}></MdFavorite>

            </Box>
            <Divider/>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              YOU MIGHT ALSO LIKE
            </Typography>
            <Divider></Divider>
            <Grid container spacing={2} mt={1} sx={{marginBottom:'24px'}}>
              {randomBlogs &&
                randomBlogs?.blogs?.map((blog, index) => (
                  <Grid item xs={12} md={4} key={index} mt={1}>
                    <VerticalCard
                      key={index}
                      isMinifiedVersion={true}
                      blog={blog}
                      height="230px"
                    ></VerticalCard>
                  </Grid>
                ))}
            </Grid>
         
            <Typography>LEAVE A REPLY</Typography>
            <Divider color="white"></Divider>
            <AddAComment></AddAComment>
     
          </Grid>
          <Grid items xs={12} md={3}>
            <Box
              mt={15}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography sx={{ width: "50%" }}>Latest Posts</Typography>{" "}
              <hr
                style={{
                  border: "1px solid white",
                  width: "50%",
                  height: "0px",
                  textAlign: "center",
                }}
              ></hr>
            </Box>
            {blogsData &&
              blogsData?.blogs?.map((blog, index) => (
                <Grid item xs={12} md={12} key={index} mt={1}>
                  <HorizontalCard
                    key={index}
                    isMinifiedVersion={true}
                    blog={blog}
                    height="70px"
                  ></HorizontalCard>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogDetails;

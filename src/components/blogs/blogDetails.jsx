import { useGetAllBlogsQuery, useGetSpecificBlogQuery } from '../../features/blogs/blogsApiSlice';
import { Avatar, Box, CardMedia,Container,Divider,Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import VerticalCard from '../ui/cards/verticalCard';
import HorizontalCard from '../ui/cards/horizontalCard';
import AddAComment from '../comments/addAComment';
import SearchAppBar from '../appbar/appbar';


const BlogDetails = () => {
    const { id } = useParams();
    const {data:blogs}=useGetAllBlogsQuery()
    const {data:blog,isLoading:isLoading,isError,isSuccess}=useGetSpecificBlogQuery(id);
    console.log(blog,isLoading,isError,isSuccess)
    return (
      <>
      <SearchAppBar></SearchAppBar>
      <Container>
        <Grid container spacing={4} mt={1}>
           <Grid item xs={12} md={9} sx={{paddingRight:'10px'}}>
           <Box sx={{ display:'flex' }} mb={1}>
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
            <Typography variant="h5" my={1} >
             {blog?.title}
            </Typography>
           <CardMedia
            component="img"
            height="400"
            image={blog?.featuredImage?blog.featuredImage:"https://hqd.mah.mybluehost.me/themes/dreamla/travel/wp-content/uploads/2019/07/alexandre-chambon-115386-unsplash-960x750.jpg"}
              alt={blog?.title}
          />
         
   
            <Typography variant="body2" mt={1} >
              {blog?.shortDescription}
            </Typography>
            <div
                        dangerouslySetInnerHTML={{
                          __html: blog?.longDescription
                        }}
                      ></div>
               <Typography variant="h4" sx={{textAlign:'center'}}>YOU MIGHT ALSO LIKE</Typography>
               <Divider></Divider>
               <Grid container spacing={2} mt={1}>
                {blogs && blogs?.map((blog, index) => (
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
             <Divider></Divider>
             <AddAComment></AddAComment>

           </Grid>
           <Grid items xs={12} md={3} >
            <Box mt={15} sx={{display:'flex',justifyContent: 'space-between'}}>
            <Typography sx={{width:'50%'}} >Latest Posts</Typography> <hr style={{border:'1px solid black',width:'50%',height:'0px',textAlign:'center'}}></hr>
            </Box>
            {blogs && blogs?.map((blog, index) => (
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
import { Box, Grid, Pagination, Typography } from "@mui/material";
import {  useState } from "react";
import CustomTab from "../components/ui/tabs/index.jsx";
import { makeStyles } from "@material-ui/core";
import CategoriesPost from "../components/categoriesPost/categoriesPost.jsx";
import HorizontalCard from "../components/ui/cards/horizontalCard.jsx";
import {  useGetAllBlogsQuery } from "../features/blogs/blogsApiSlice.jsx";
import SearchAppBar from "../components/appbar/appbar.jsx";
const useStyles = makeStyles((theme) => ({
  paginationRoot: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
    '& .MuiPaginationItem-root': {
      color: 'white',
      // borderRadius: '50%', // Adjust this value for different roundness
      // margin: theme.spacing(0.5),
      // '&:hover': {
      //   backgroundColor: 'rgba(255, 255, 255, 0.1)',
      // },
    },
    '& .Mui-selected': {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
    },
  },
}));


const Home = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(1);
 
  const {data:blogs,isLoading:isLoading}=useGetAllBlogsQuery()
  // useEffect(() => {
  //   login({ email: "silviaplabon@gmail.com", password: "123456" });
  // }, []);

  console.log(blogs, "data", isLoading);

  const tabs = ["LATEST", "BESTSELLERS", "BEST RATED", "SPECIALS"];
 

  return (
    <>
 
      <SearchAppBar></SearchAppBar>
    <Box p={2}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={4} lg={3}>
    
          <Box  >
           <Typography  sx={{ padding:'10px',maxWidth:'360px',textAlign: "center",backgroundColor:'black',color:'white'}}>
           YOU MIGHT LIKE
            </Typography> 
          </Box>
          <Grid container spacing={2} mt={1}>
            
            {blogs && blogs?.map((blog, index) => (
              <Grid item xs={12} md={11} key={index} mt={1}>
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
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <CategoriesPost blogs={blogs}></CategoriesPost>
          <CustomTab
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          ></CustomTab>
          <Grid container spacing={2} mt={1}>
            {blogs && blogs?.map((blog, index) => (
              <Grid item xs={12} md={11} key={index} mt={1}>
                <HorizontalCard
                  key={index}
                  blog={blog}
                  height="230px"
                ></HorizontalCard>
              </Grid>
            ))}
          </Grid>
          <Pagination count={10} variant="outlined" shape="rounded" className={classes.paginationRoot} />
        </Grid>
       </Grid>
    </Box>
    </>
  );
};

export default Home;

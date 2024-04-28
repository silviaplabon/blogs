import { Box, Grid, Pagination, Skeleton, Typography } from "@mui/material";
import {  useEffect, useState } from "react";
import CustomTab from "../components/ui/tabs/index.jsx";
import { makeStyles } from "@material-ui/core";
import CategoriesPost from "../components/categoriesPost/categoriesPost.jsx";
import HorizontalCard from "../components/ui/cards/horizontalCard.jsx";
import {  useGetAllBlogsByTabsQuery, useGetRandomBlogsQuery} from "../features/blogs/blogsApiSlice.jsx";
import SearchAppBar from "../components/appbar/appbar.jsx";
import { useSelector } from "react-redux";
import CustomNoRowsOverlay from "../components/noContentFound/noContentFound.jsx";

const useStyles = makeStyles((theme) => ({
  paginationRoot: {
    '& .MuiPagination-ul': {
      justifyContent: 'end',
    },
    '& .MuiPaginationItem-root': {
      color: 'white'
    },
    '& .Mui-selected': {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
    },
  },
}));


const Home = () => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState(0);
  
  const tabs = ["LATEST", "BEST RATED", "SPECIALS"];
  const [page,setPage]=useState(1);
  const limit=5;
  const searchText=useSelector(state=>state.blog.title);

  
  
  const category=useSelector(state=>state.blog.selectedCategory);

  const {data:blogsData,isLoading:isLoading,refetch}=useGetAllBlogsByTabsQuery({tabName:selectedTab ? tabs[selectedTab]: tabs[0],category:category?.value,page:page,limit:limit});
  const {data:randomBlogs,isLoading:isRandomBlogsLoading,refetch:refetchRandomBlogs}=useGetRandomBlogsQuery({category:category?.value});


  useEffect(()=>{
    refetch({ category: category?.value, page: page, limit: limit });
  },[selectedTab])

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    refetch({ category: category?.value, page: newPage, limit: limit  });
  };


  return (
    <>
    <SearchAppBar showSearchBar={false} showCategories={true}></SearchAppBar>
     <Box p={2}>
       <Grid container spacing={6}>
         {/* <Grid item xs={0} sm={0} md={0} lg={3} xl={2}>
    
          <Box  >
           <Typography  sx={{ padding:'10px',maxWidth:'360px',textAlign: "center",backgroundColor:'black',color:'white'}}>
           YOU MIGHT LIKE
            </Typography> 
          </Box>
          {
            isRandomBlogsLoading &&<>
            <Skeleton animation="wave" mt="1" width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            </>
          }
          
          <Grid container spacing={1} mt={1}>
            
            { randomBlogs && randomBlogs?.blogs?.map((blog, index) => (
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
          {    !isLoading && randomBlogs &&randomBlogs?.blogs?.length<1   &&
<CustomNoRowsOverlay/>
}
      
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {
            category?.value && <>
            <Typography variant="h6">Selected Category</Typography>
            <Typography>{category?.value}</Typography>
            </>

          }
          <CategoriesPost></CategoriesPost>
          <CustomTab
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          ></CustomTab>
          {
            isLoading &&<>
            <Skeleton animation="wave" mt="1" width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            </>
          }
          <Grid container spacing={4} mt={1}>
            {blogsData && blogsData?.blogs?.map((blog, index) => (
              <Grid item xs={12} md={11} key={index} mt={1} sx={{paddingLeft:'50px!important'}}>
                <HorizontalCard
                  key={index}
                  blog={blog}
                  height="230px"
                ></HorizontalCard>
              </Grid>
            ))}
          </Grid>
{    !isLoading && blogsData &&blogsData?.blogs?.length<1   &&
<CustomNoRowsOverlay/>
}
             <Pagination count={blogsData?.count?blogsData.count:1} variant="outlined" shape="rounded" className={classes.paginationRoot} page={page} 
      onChange={handlePageChange}  />
        </Grid>
       </Grid>
    </Box>
    </>
  );
};

export default Home;

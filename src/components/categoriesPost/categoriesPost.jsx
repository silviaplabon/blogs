/* eslint-disable react/prop-types */
import { Box, Grid, Pagination, Skeleton, Typography } from "@mui/material";
import VerticalCard from "../ui/cards/verticalCard";
import { makeStyles } from "@material-ui/core";
import { useGetAllBlogsQuery } from "../../features/blogs/blogsApiSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomNoRowsOverlay from "../noContentFound/noContentFound";
const useStyles = makeStyles((theme) => ({
  paginationRoot: {
    '& .MuiPagination-ul': {
      justifyContent: 'end',
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


const CategoriesPost = () => {
  const classes=useStyles();
    
  const userId=useSelector(state=>state.auth.user?._id);
  const category=useSelector(state=>state.blog.selectedCategory);
  const [page,setPage]=useState(1);
  const limit=5;

  const {data:blogsData,isLoading:isLoading,refetch}=useGetAllBlogsQuery({userId:userId,category:category?.value,page:page,limit:limit})
  
  useEffect(() => {
    refetch({ userId: userId, category: category?.value, page: page, limit: limit });
  }, [category]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    refetch({ userId: userId, category: category?.value, page: newPage, limit: limit });
  };


  return (
    <Box sx={{paddingLeft:'0px!important'}}>
         {
            isLoading &&<>
            <Skeleton animation="wave" mt="1" width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            <Skeleton animation="wave"  width="100%" height={60} />
            </>
          }
     
          <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <Box sx={{height:'100%',paddingLeft:'10px'}} mt={1}>
              {
                blogsData && blogsData?.blogs[0] &&
                    <VerticalCard
                    key={0}
                    blog={blogsData?.blogs[0]}
                    height="480"
                  
                    ></VerticalCard>
              }
                    </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container >
                {!isLoading && blogsData?.blogs?.length>0 ? blogsData?.blogs?.slice(1).map((blog, index) => (
                <Grid item xs={12} md={6} key={index} mt={1}>
                    <VerticalCard
                    key={index}
                    blog={blog}
                    height="200"
                    ></VerticalCard>
                </Grid>
                )):<CustomNoRowsOverlay/>}
            </Grid>
          </Grid>
          </Grid>
          {
                blogsData && blogsData?.blogs[0] &&
          <Pagination count={blogsData?.count?blogsData.count:1} variant="outlined" shape="rounded" className={classes.paginationRoot} page={page} 
      onChange={handlePageChange}  />
          }
    </Box>
  );
};

export default CategoriesPost;

import React, { useEffect, useState } from 'react';
import SearchAppBar from '../appbar/appbar';
import { Container, Grid, Pagination, Skeleton, Typography } from '@mui/material';
import HorizontalCard from '../ui/cards/horizontalCard';
import { useSelector } from 'react-redux';
import { useGetAllBlogsBySearchQuery, useGetAllBlogsByTabsQuery } from '../../features/blogs/blogsApiSlice';
import { makeStyles } from "@material-ui/core";
import CustomNoRowsOverlay from '../noContentFound/noContentFound';

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

const SearchBlogs = () => {
  const classes=useStyles()
  const [page,setPage]=useState(1);
  const limit=10;
  const category=useSelector(state=>state.blog.selectedCategory);
  const searchText=useSelector(state=>state.blog.title);

  
  

    const {data:blogsData,isLoading:isLoading,refetch}=useGetAllBlogsBySearchQuery({title:searchText,category:category?.value,page:page,limit:limit});

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        refetch({ title:'sport', page: newPage, limit: limit  });
    };
    useEffect(()=>{
        setPage(1)
        refetch({ title:searchText, page: 1, limit: limit  });
    },[searchText,category])

    return (
        <>
        <SearchAppBar showSearchBar={true}  showCategories={true}></SearchAppBar>
        <Container>
        {
            category?.value && <>
            <Typography variant="h6" sx={{marginTop:"20px"}}>Selected Category: {category?.value}</Typography>
            </>
          }
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
          <Grid container spacing={2} mt={1}>
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
        </Container>
        </>
    );
};

export default SearchBlogs;
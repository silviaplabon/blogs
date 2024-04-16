import { Box, Grid, Typography } from "@mui/material";
import {  useState } from "react";
import CustomTab from "../components/ui/tabs/index.jsx";
import CustomizedAccordions from "../components/ui/nestedList/nestedList.jsx";
// import KeepMountedModal from "../components/ui/modal/modal.jsx";
// import { useLoginMutation } from "../features/user/userApiSlice.jsx";
import CategoriesPost from "../components/categoriesPost/categoriesPost.jsx";
import HorizontalCard from "../components/ui/cards/horizontalCard.jsx";
import {  useGetAllBlogsQuery } from "../features/blogs/blogsApiSlice.jsx";
import SearchAppBar from "../components/appbar/appbar.jsx";

const Home = () => {
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
          <CustomizedAccordions></CustomizedAccordions>
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
        
        </Grid>
       </Grid>
    </Box>
    </>
  );
};

export default Home;

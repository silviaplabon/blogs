/* eslint-disable react/prop-types */
import { Box, Grid } from "@mui/material";
import VerticalCard from "../ui/cards/verticalCard";


const CategoriesPost = ({blogs}) => {


  return (
    <Box p={2}>
     
          
          <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={5}>
            <Box  sx={{height:'100%'}} mt={1}>
                    <VerticalCard
                    key={0}
                    blog={blogs && blogs[0]}
                    height="480"
                    ></VerticalCard>
                    </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
                {blogs?.slice(1).map((blog, index) => (
                <Grid item xs={12} md={6} key={index} mt={1}>
                    <VerticalCard
                    key={index}
                    blog={blog}
                    height="200"
                    ></VerticalCard>
                </Grid>
                ))}
            </Grid>
          </Grid>
          </Grid>
    </Box>
  );
};

export default CategoriesPost;

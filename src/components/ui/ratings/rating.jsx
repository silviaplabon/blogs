import { Box, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { useAddAReviewMutation } from "../../../features/blogs/blogsApiSlice";

const CustomRating = ({blogId,userId}) => {
    const [review, { data,isSuccess, error: responseError }] = useAddAReviewMutation();
    
    const [value, setValue] = useState(2);
    
    return (
   
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          review({rating:newValue,userId:userId,blogId:blogId})
        }}
      /> 
    )
};

export default CustomRating;
/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProductsInCarts } from "../../../features/carts/cartsSlice";

// eslint-disable-next-line react/prop-types
const ProductCard=({ product })=> {
  const dispatch=useDispatch();
  const handleClick=()=>{
    dispatch(addProductsInCarts(product))
  };
  const data=useSelector(state=>state.carts);

  
  return (
    <Card sx={{  position: "relative" }}>
      <CardMedia component="img" height="194" image={product?.imgUrl} alt={product?.name} />
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: "1px",
          right: "10px",
          zIndex: 1,
          width: "30px",
        }}
        onClick={()=>handleClick()}
      >
        NEW
      </Button>
      <Button
        variant="contained"
        className="mt-1"
        sx={{
          position: "absolute",
          top: "40px",
          right: "10px",
          zIndex: 1,
          width: "30px",
        }}
      >
        HOT
      </Button>
      <CardContent>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontSize: "13px", color: "#61b0e4", textAlign: "center" }}
        >
          {product?.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", fontSize: "16px" }}
        >
          ${product?.price}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>Buy Now</Box>
        <Box>Ask Questions</Box>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import CollapseListItem from "./collapseListItem";
import { Box } from "@mui/material";
import { categories } from "../../../utils/categories";

export default function NestedList() {
  
   

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <Box>
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ textAlign: "center",backgroundColor:'black',color:'white'}}
          >
            CATEGORIES
          </ListSubheader>
        </Box>
      }
    >
      {categories?.map((item, index) => (
        <CollapseListItem key={index} item={item}></CollapseListItem>
      ))}
    </List>
  );
}

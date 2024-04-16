import {  Button, Container, FormGroup, Typography } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { makeStyles } from "@material-ui/core";
import { EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'

import {  useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../inputFields/textInput/textInput";
import CustomSelect from "../inputFields/select/select";
import TextAreaInput from "../inputFields/textInput/textAreaInput";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { useAddBlogMutation } from "../../features/blogs/blogsApiSlice";
import { useNavigate } from "react-router-dom";
import { categories } from "../../utils/categories";
import { InputLabel } from '@material-ui/core';
import SearchAppBar from "../appbar/appbar";
const useStyles = makeStyles(() => ({
  inputLabel: {
    marginTop:"0.6rem!important",
    marginBottom:'0.3rem'
  },
}))


const AddABlog = () => {
  const navigate = useNavigate();
  const classes=useStyles();
  const [addBlog,{isLoading,isError,isSuccess}]=useAddBlogMutation()
   const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `
  const ContentBlock = htmlToDraft(initialContent)
  const contentState = ContentState.createFromBlockArray(
    ContentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);
  const [RichContent, setRichContent] = useState(editorState);
  
  const [selectedCategory,setSelectedCategory]=useState([]);

  const {
    formState: { errors },
    handleSubmit,
    control
  } = useForm({ defaultValues: {
   title:'',
   category:'',
   subCategory:'',
   shortDescription:'',
   longDescription:'',
   featuredImage:''
  },})


  const onSubmit= (data) => {
    var finalContent= draftToHtml(convertToRaw(RichContent.getCurrentContent()));

    if (typeof finalContent == 'undefined' || finalContent== null) {
      finalContent = '';
    }

    if (finalContent.slice(0, -1) == "<p></p>") {
      finalContent = '';
    }
    data.longDescription=finalContent;
    console.log(data)
    addBlog(data)
  }
  if(isSuccess){
    navigate("/")
  } else if(isLoading){
      return <p>Loading</p>
  }else if(isError){
    <p>ERROR</p>
  }else{
    return (
      <>
 <SearchAppBar></SearchAppBar>
      <Container >
        <Typography variant="h4">ADD A BLOG</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <CustomInput
              labelName="Title"
              name="title"
              isEditable={true} 
              control={control} 
              errors={errors}
            />
          
            <CustomSelect
            labelName="Category"
            name="category"
            options={categories}
            isEditable={true} 
            control={control} 
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            errors={errors}
            ></CustomSelect>
            
            <TextAreaInput    
            labelName="Short Description"
            name="shortDescription"
            isEditable={true} 
            control={control} 
            errors={errors}>
            </TextAreaInput>

            
              <InputLabel
                  htmlFor="richContent"
                  variant='standard' 
                  className={classes.inputLabel}
                >Long Description</InputLabel>
                <Editor
                editorState={RichContent}
                onEditorStateChange={(data) => setRichContent(data)}
                />
       
          </FormGroup>
          
          <Button
            variant="contained"
            mb={1}
            type="submit"
            sx={{ borderRadius: "20px!important" }}
          >
          SUBMIT
          </Button>
        </form>  
      </Container>
      </>
    );
  }

};

export default AddABlog

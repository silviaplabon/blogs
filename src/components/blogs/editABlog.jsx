import { Button, Container, FormGroup, Typography } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { makeStyles } from "@material-ui/core";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../inputFields/textInput/textInput";
import CustomSelect from "../inputFields/select/select";
import TextAreaInput from "../inputFields/textInput/textAreaInput";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { useAddBlogMutation, useGetSpecificBlogQuery, useUpdateABlogMutation } from "../../features/blogs/blogsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../../utils/categories";
import { InputLabel } from "@material-ui/core";
import SearchAppBar from "../appbar/appbar";
import { useSelector } from "react-redux";
const useStyles = makeStyles(() => ({
  inputLabel: {
    marginTop: "0.6rem!important",
    marginBottom: "0.3rem",
  },
}));

const EditABlog = () => {
    const { id } = useParams();  
  const {
        data: blog
      } = useGetSpecificBlogQuery(id);

  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth.user);
  const classes = useStyles();
  const [updateBlog, { isLoading, isError, isSuccess }] = useUpdateABlogMutation();

  const [RichContent, setRichContent] = useState('');

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      title: blog?.title,
      category:blog?.category,
      shortDescription: blog?.shortDescription,
      longDescription: blog?.longDescription,
      featuredImage: blog?.featuredImage,
      userId: userDetails?._id,
      email: userDetails?.email,
      userName: userDetails?.name,
      profileImage:userDetails?.profileImage,
      isEnabledPaidService:blog?.isEnabledPaidService ? blog.isEnabledPaidService:false
    },
  });
  useEffect(()=>{
    const initialContent = blog?.longDescription?blog?.longDescription:''
    if(initialContent!=""){
      const ContentBlock = htmlToDraft(initialContent);
      const contentState = ContentState.createFromBlockArray(
        ContentBlock.contentBlocks
      );
    
       const  editorState = EditorState.createWithContent(contentState);
       setRichContent(editorState)

    }
  },[blog])


  const onSubmit = (data) => {
    var finalContent = draftToHtml(
      convertToRaw(RichContent.getCurrentContent())
    );

    if (typeof finalContent == "undefined" || finalContent == null) {
      finalContent = "";
    }

    if (finalContent.slice(0, -1) == "<p></p>") {
      finalContent = "";
    }
    data.longDescription = finalContent;
    console.log(data);
    updateBlog(data);
  };
  if (isSuccess) {
    navigate("/");
  } else if (isLoading) {
    return <p>Loading</p>;
  } else if (isError) {
    <p>ERROR</p>;
  } else {
    return (
      <>
        <SearchAppBar></SearchAppBar>
        <Container>
          <Typography variant="h4">Edit A BLOG</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <CustomInput
                labelName="Title"
                name="title"
                isEditable={true}
                isRequired={true}
                control={control}
                errors={errors}
              />

              <CustomSelect
                labelName="Category"
                name="category"
                options={categories}
                isEditable={true}
                control={control}
                isRequired={true}
                errors={errors}
              ></CustomSelect>
               <CustomSelect
                labelName="Paid Service"
                name="isEnabledPaidService"
                options={[{value:true,label:"True"},{value:false,label:"False"}]}
                isEditable={true}
                control={control}
                isRequired={true}
                errors={errors}
              ></CustomSelect>
              <CustomInput
                labelName="Featured Image"
                name="featuredImage"
                isEditable={true}
                isRequired={true}
                control={control}
                errors={errors}
            />

              <TextAreaInput
                labelName="Short Description"
                name="shortDescription"
                isEditable={true}
                control={control}
                isRequired={true}
                errors={errors}
              ></TextAreaInput>
        

              <InputLabel
                htmlFor="richContent"
                variant="standard"
                className={classes.inputLabel}
              >
                Long Description
              </InputLabel>
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

export default EditABlog;

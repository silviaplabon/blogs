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
import { useAddBlogMutation, useGetSpecificBlogQuery } from "../../features/blogs/blogsApiSlice";
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
  const [addBlog, { isLoading, isError, isSuccess }] = useAddBlogMutation();
  const initialContent = `
  `;
  const ContentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    ContentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);
  const [RichContent, setRichContent] = useState(editorState);

  const [selectedCategory, setSelectedCategory] = useState([]);

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
      profileImage:userDetails?.profileImage
    },
  });
  useEffect(()=>{
    const initialContent = blog?.longDescription
  const ContentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    ContentBlock.contentBlocks
  );

   const  editorState = EditorState.createWithContent(contentState);
   setRichContent(editorState)
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
    addBlog(data);
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
              <CustomInput
                labelName="Featured Image"
                name="featuredImage"
                isEditable={true}
                control={control}
                errors={errors}
            />

              <TextAreaInput
                labelName="Short Description"
                name="shortDescription"
                isEditable={true}
                control={control}
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

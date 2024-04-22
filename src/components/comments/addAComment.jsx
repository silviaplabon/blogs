import { Box, Button, FormGroup, Typography } from "@mui/material";
import CustomInput from "../inputFields/textInput/textInput";
import { useForm } from "react-hook-form";
import TextAreaInput from "../inputFields/textInput/textAreaInput";
import { useDispatch, useSelector } from "react-redux";
import { useAddACommentMutation } from "../../features/blogs/blogsApiSlice";
import { ImReply } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { addExecutingCommentId } from "../../features/comments/commentsSlice";

const AddAComment = ({blogId}) => {
  const commentId=useSelector(state=>state.comment.executingCommentId);
  const commentData=useSelector(state=>state.comment.comment);
  const userData=useSelector(state=>state.auth.user);
  const dispatch=useDispatch()
    const {
        formState: { errors },
        handleSubmit,
        control
      } = useForm({ defaultValues: {
      comment:'',
      name:userData?.name,
      userId:userData?._id,
      website:'',
      blogId:blogId,
      profileImage:userData?.profileImage,
      parentId:commentId?commentId:''
    },})

    
  const [addAComment, { isLoading, isError, isSuccess }] = useAddACommentMutation();  

  const onSubmit= (data) => {
    data.parentId=commentId;
    data.userId=userData?._id;
    addAComment(data)
  }
  
  const handleDelete=(data)=>{
    dispatch(addExecutingCommentId({executingCommentId:'',comment:{}}))
  }

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup >
          {commentId &&<Box display="flex" alignItems="center" sx={{marginTop:"25px"}}>
            <ImReply/> 
             <Typography sx={{marginLeft:'20px',marginRight:'50px'}}>Replying To {commentData?.author?.name} </Typography>
      
             <RxCross1 sx={{marginLeft:'20px'}}  onClick={()=>handleDelete()}></RxCross1>

          
          </Box>}
        <TextAreaInput   
            labelName="Comment"
            name="comment"
            placeholder="Comment*"
            isEditable={true} 
            control={control} 
            isRequired={true}
            errors={errors}>
            </TextAreaInput>

            
           <CustomInput
            labelName="Name"
            name="name"
            isEditable={true} 
            isRequired={true}
            control={control} 
            errors={errors}
          />
        
          <CustomInput
            labelName="Website"
            name="website"
            isEditable={true} 
            isRequired={false}
            control={control} 
            errors={errors}
          />

          <Button
              variant="contained"
              mb={1}
              type="submit"
              isDisabled={isLoading}
              sx={{ borderRadius: "20px!important",marginTop:'20px',backgroundColor:'#82b440' }}
            >
              SUBMIT
            </Button>
          </FormGroup>
        </form>
    );
};

export default AddAComment;
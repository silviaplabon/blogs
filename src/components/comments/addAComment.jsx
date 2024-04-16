import { FormGroup } from "@mui/material";
import CustomInput from "../inputFields/textInput/textInput";
import { useForm } from "react-hook-form";
import TextAreaInput from "../inputFields/textInput/textAreaInput";

const AddAComment = () => {
    const {
        formState: { errors },
        handleSubmit,
        control
      } = useForm({ defaultValues: {
      comment:'',
      name:'',
      email:'',
      website:''
      },})
    
    

  const onSubmit= (data) => {
  console.log(data)
  }

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
        <TextAreaInput   
            labelName="Comment"
            name="comment"
            placeholder="Comment*"
            isEditable={true} 
            control={control} 
            errors={errors}>
            </TextAreaInput>

            
           <CustomInput
            labelName="Name"
            name="name"
            isEditable={true} 
            control={control} 
            errors={errors}
          />
           <CustomInput
            labelName="Email"
            name="email"
            isEditable={true} 
            control={control} 
            errors={errors}
          />
          </FormGroup>
        </form>
    );
};

export default AddAComment;
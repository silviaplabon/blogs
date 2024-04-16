import { Box, Button, Card,  FormGroup,Typography } from '@mui/material';
import CustomInput from '../components/inputFields/textInput/textInput';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/user/userApiSlice';
import Swal from 'sweetalert2'
import { useEffect } from 'react';

const Login = () => {
     const [Login, { data,isSuccess, error: responseError }] = useLoginMutation();
     const navigate=useNavigate()
     console.log(responseError,":EEEEEEEEEEEEEEEEEEEEEEEE")
    const {
        formState: { errors },
        handleSubmit,
        control
      } = useForm({ defaultValues: {
            email:'',
            password:'',
      },})
    
    console.log(data,isSuccess,responseError,"data,isSuccess,responseError")

  const onSubmit= (data) => {
    Login(data);
  }
  useEffect(()=>{
    if (responseError) {
        Swal.fire({
          title: 'Error!',
          text: responseError?.data?.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    
  },[responseError])


  if(isSuccess){
     navigate("/")
  }else{
      return (
         <Box sx={{ width: '100%',  backgroundImage: 'linear-gradient(to right, #ffe4e4, #ffb8b8)', display: 'flex', justifyContent: 'center',alignItems:'center',height:'100vh'}}>
             <Card  sx={{ backgroundImage: "url('https://images.unsplash.com/photo-1707246989621-d269d8de2300?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      backgroundSize: "cover",
      backgroundPosition: "center",width:'60%',height:"60%"}}>
              <Box pl={10} py={5} sx={{marginRight:'420px'}}>
              <Typography variant="h4" >LOGIN</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>

                  <CustomInput
                      labelName="Email"
                      name="email"
                      isEditable={true} 
                      control={control} 
                      errors={errors}
                  />
      
   
          
              <CustomInput
              labelName="Password"
              name="password"
              isEditable={true} 
              control={control} 
              errors={errors}
            />
                     
           
             <Button
              variant="contained"
              mt={1}
              type="submit"
              sx={{ borderRadius: "20px!important",marginTop: "20px!important"}}
            >
            SUBMIT
            </Button>
           
            </FormGroup>
          </form>
              </Box>
  
             </Card>
         </Box>
  
      );
  }
};

export default Login;
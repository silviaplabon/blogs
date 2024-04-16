import { Box, Button, Card,  FormGroup, Grid, Typography } from '@mui/material';
import CustomInput from '../components/inputFields/textInput/textInput';
import { useForm } from 'react-hook-form';
import CustomCheckbox from '../components/inputFields/checkbox/checkbox';
import {  useRegisterMutation } from '../features/user/userApiSlice';
import { useNavigate } from 'react-router-dom';


const Register = () => {
     const [register, { data,isSuccess, error: responseError }] = useRegisterMutation();
     const navigate=useNavigate()
    const {
        formState: { errors },
        handleSubmit,
        control
      } = useForm({ defaultValues: {
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            isAgreedWithTerms:false
      },})
    
    console.log(data,isSuccess,responseError,"data,isSuccess,responseError")

  const onSubmit= (data) => {
    register(data);
  }
  if(isSuccess){
     navigate("/")
  }else if(responseError){
    return <p>ERROR</p>
  }else{
      return (
         <Box sx={{ width: '100%',  backgroundImage: 'linear-gradient(to right, #ffe4e4, #ffb8b8)', display: 'flex', justifyContent: 'center',alignItems:'center',height:'100vh'}}>
             <Card  sx={{ backgroundImage: "url('https://images.unsplash.com/photo-1707246989621-d269d8de2300?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      backgroundSize: "cover",
      backgroundPosition: "center",width:'60%',height:"60%"}}>
              <Box pl={10} py={5} sx={{marginRight:'420px'}}>
              <Typography variant="h4" >SIGN UP</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
          <Grid container spacing={4} mt={1}>
             <Grid item xs={12} md={6} >
                  <CustomInput
                      labelName="Name"
                      name="name"
                      isEditable={true} 
                      control={control} 
                      errors={errors}
                  />
                  </Grid>
                  <Grid item xs={12} md={6} >
                  <CustomInput
                      labelName="Email"
                      name="email"
                      isEditable={true} 
                      control={control} 
                      errors={errors}
                  />
           </Grid>
           </Grid>
   
          
              <CustomInput
              labelName="Password"
              name="password"
              isEditable={true} 
              control={control} 
              errors={errors}
            />
                     
             <CustomCheckbox  control={control} labelName="I've read and agree with terms of service and privacy policy"  name=" isAgreedWithTerms"></CustomCheckbox>
             <Button
              variant="contained"
              mb={1}
              type="submit"
              sx={{ borderRadius: "20px!important" }}
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

export default Register;
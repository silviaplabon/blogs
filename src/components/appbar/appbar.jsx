import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";
import { PlusOne } from '@mui/icons-material';
import { FaPlus } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from 'react';

import { categories } from '../../utils/categories';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const navigate=useNavigate()
  const isLoggedIn = useAuth();
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#005652'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="body"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            onClick={()=>navigate('/')}
          >
           HOME
          </Typography>
    

          <Box display="flex" justifyContent="space-between" >
          <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:'white',marginRight:'20px'}}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
        categories?.map((item,index)=>{
          return(
            <MenuItem key={index} onClick={handleClose} sx={{paddingX:'30px'}}>
            {item.logo} <Typography sx={{marginLeft:'20px'}}>
            {item.value}
              </Typography>
            </MenuItem>
          )
        })}


      </Menu>
              <Typography
                variant="body"
                noWrap
                component="div"
                ml="10"
                sx={{display:'flex' , flexGrow: 1,alignItems:'center',marginRight:'20px'}}
                onClick={()=>navigate('/blogs/addABlog')}
              >
                <CiSquarePlus ></CiSquarePlus> Blog
              </Typography>
              {
                !isLoggedIn ?
                <>
                 <Typography
                variant="body"
                noWrap
                ml="5"
                component="div"
                sx={{display:'flex', flexGrow: 1,alignItems:'center',marginRight:'20px'}}
                onClick={()=>navigate('/register')}
              >
                <CiSquarePlus ></CiSquarePlus>REGISTER
              </Typography>
              <Typography
                variant="body"
                noWrap
                component="div"
                sx={{display:'flex',flexGrow: 1,alignItems:'center'}}
                onClick={()=>navigate('/login')}
              >LOGIN
              </Typography>
                </>: <Typography
                variant="body"
                noWrap
                component="div"
                sx={{display:'flex',flexGrow: 1,alignItems:'center',marginRight:'20px'}}
                onClick={()=>navigate('/login')}
              >Profile
              </Typography>
              }
             

          </Box>

         

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
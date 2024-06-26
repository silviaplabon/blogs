/* eslint-disable react/prop-types */
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { FormHelperText, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
const TextAreaInput = (({ labelName,
    name,
    control,
    placeholder,
    isRequired,
    errors}) => {
      const commentId=useSelector(state=>state.comment.executingCommentId);
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
      };
    
      const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
      };
    
      const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: 'white';
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        &:focus-visible {
          outline: 0;
        }
      `,
      );
      const textareaRef = useRef(null);
      useEffect(() => {
        if (textareaRef.current && name=="comment") {
            textareaRef.current.focus();
        }
    }, [commentId]);
    return (
      <>
        <InputLabel sx={{ marginTop:'1rem!important',fontSize:'14px!important',color:'white!important',marginBottom:'0.3rem'}} >{labelName}</InputLabel>
        <Controller
          name={name}
          control={control}
          rules={{ required: isRequired }}
          render={({ field }) => (
            <Textarea {...field} aria-label="minimum height"   ref={textareaRef}  minRows={3} placeholder={placeholder} />
          )}
          />
          {errors[name] && (
                <FormHelperText error>{`${labelName} is required`}</FormHelperText>
          )}
      </>
    );
});

export default TextAreaInput
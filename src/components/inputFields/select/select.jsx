/* eslint-disable react/prop-types */
import {
  FormGroup,
  FormHelperText,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import { styled } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
   
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 13,
    padding: '0.35rem',
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const useStyles = makeStyles(() => ({
  inputLabel: {
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0rem",
    marginRight: "1rem",
    marginTop:'0.6rem!important',
    marginBottom: "0",
    fontSize: "14px!important",
    fontWeight: "normal",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    color:'white!important'
  
  },
}));
const CustomSelect = ({
  labelName,
  name,
  options,
  control,
  errors,
}) => {
  const classes = useStyles();
  return (
    <FormGroup>
      <InputLabel className={classes.inputLabel}>{labelName}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            id={labelName}
            input={<BootstrapInput />}
            label={labelName}
            
          >
            <MenuItem value="">
              {" "}
              <em>None</em>
            </MenuItem>
            {
                options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
  
            }
          </Select>
        )}
      />
      {errors[name] && (
        <FormHelperText error>{`${labelName} is required`}</FormHelperText>
      )}
    </FormGroup>
  );
};

export default CustomSelect;

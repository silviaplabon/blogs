/* eslint-disable react/prop-types */
import { InputLabel, TextField, makeStyles } from "@material-ui/core";
import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const useStyles = makeStyles(() => ({
  inputContainer: {},
  notchedOutline: {
    // borderWidth: '0'
  },
  input: {
    padding: "0.35rem",
    fontSize: "0.875rem",
    backgroundColor:'white',
    borderRadius:'5px',

    width: "100%",
    "& .MuiFormControl-root": {
      width: "100%!important",
    },
  },
  inputLabel: {
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    color: "white!important",
    padding: "0.5rem 0rem",
    marginTop: "0.6rem!important",
    marginRight: "1rem",
    marginBottom: "0px",
    fontSize: "14px!important",
    fontWeight: "normal",
    fontStyle: "normal",
    whiteSpace: "nowrap",
  },
  formControlRoot: {
    width: "100%!important",
  },
}));

const CustomInput = ({
  labelName,
  name,
  isEditable,
  control,
  errors,
  isRequired,
}) => {
  const classes = useStyles();

  return (
    <>
      <InputLabel
        className={classes.inputLabel}
        htmlFor={name}
        variant="standard"
      >
        {labelName}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: isRequired }}
        render={({ field }) => (
          <TextField
            id={name}
            // placeholder={labelName}
            {...field}
            disabled={!isEditable}
            aria-disabled={!isEditable}
            variant="outlined"
            classes={{ root: classes.formControlRoot }}
            InputProps={{
              classes: {
                input: classes.input,
                notchedOutline: classes.notchedOutline,
              },
            }}
            InputLabelProps={{
              shrink: false,
            }}
            sx={{
              "& .MuiInputBase-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                caretColor: "black",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                borderRadius: "25px",
                backgroundColor: "white!important",
              },
            }}
          />
        )}
      />
      {errors[name] && (
        <FormHelperText error>{`${labelName} is required`}</FormHelperText>
      )}
    </>
  );
};

export default CustomInput;

/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomCheckbox = ({ control,labelName,name,isRequired }) => {
  return (
    <Controller
      control={control}
      rules={{ required: isRequired }}
      defaultValue={false} 
      name={name && name}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} />}
          label={labelName && labelName}
        />
      )}
    />
  );
};

export default  CustomCheckbox;

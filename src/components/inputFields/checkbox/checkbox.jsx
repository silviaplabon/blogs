/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomCheckbox = ({ control,labelName,name }) => {
  return (
    <Controller
      control={control}
      rules={{ required: true }}
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

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, IconButton } from "@mui/material";

const Input = ({
  header,
  type,
  placeholder,
  name,
  id,
  value,
  required,
  onChange = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col space-y-2">
      <TextField
        label={placeholder}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        name={name}
        id={id}
        required={required ?? false}
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                color={!showPassword ? "info" : "success"}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        style={{ width: "30rem" }}
      />
    </div>
  );
};

export { Input };

import React from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  className,
  disabled,
  required,
}) => (
  <input
    required={required}
    disabled={disabled}
    className={`col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm uppercase ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    name={name}
  />
);

export default InputField;

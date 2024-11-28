import React from "react";

const FormControl = ({ children, placeholder }) => {
  return (
    <div className="form-control">
      {children} <span className="placeholder">{placeholder}</span>
    </div>
  );
};

export default FormControl;

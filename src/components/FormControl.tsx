import React, { ReactNode } from "react";

// Define a interface para as props do componente
interface FormControlProps {
  children: ReactNode;
  placeholder?: string;
}

const FormControl: React.FC<FormControlProps> = ({ children, placeholder }) => {
  return (
    <div className="form-control">
      {children} <span className="placeholder">{placeholder}</span>
    </div>
  );
};

export default FormControl;

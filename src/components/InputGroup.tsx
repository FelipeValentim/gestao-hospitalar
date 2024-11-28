import React, { ReactNode } from "react";

// Define a interface para as props do componente
interface InputGroupProps {
  children: ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ children }) => {
  return <div className="input-group">{children}</div>;
};

export default InputGroup;

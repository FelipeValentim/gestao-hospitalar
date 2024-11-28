import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type: string;
  title?: string;
}

const Input: React.FC<InputProps> = ({ value, type, title, ...props }) => {
  return (
    <div className="field">
      <input
        className={value ? "has-value" : ""}
        title={title}
        type={type}
        value={value}
        {...props}
      />
    </div>
  );
};

export default Input;

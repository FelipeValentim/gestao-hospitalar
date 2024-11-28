import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  title: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, title, className }) => {
  return (
    <div
      className={className ? `button ${className}` : "button"}
      onClick={onClick}
      title={title}
    >
      <span className="button-text">{text}</span>
      <div className="button-bg"></div>
    </div>
  );
};

export default Button;

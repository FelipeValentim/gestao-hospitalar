import React from "react";
import ReactInputMask, { Props as InputMaskProps } from "react-input-mask";

interface InputMaskComponentProps extends Omit<InputMaskProps, "onChange"> {
  value: string;
  type?: string;
  title?: string;
  mask: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputMask: React.FC<InputMaskComponentProps> = ({
  value,
  type = "text",
  title,
  mask,
  onChange,
  ...props
}) => {
  return (
    <div className="field">
      <ReactInputMask
        mask={mask}
        title={title}
        type={type}
        value={value}
        onChange={onChange}
        maskChar=""
      >
        {(inputProps) => (
          <input
            {...inputProps}
            className={value ? "has-value" : ""}
            type={type}
            {...props}
          />
        )}
      </ReactInputMask>
    </div>
  );
};

export default InputMask;

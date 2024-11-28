import React, { useCallback } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  title?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  value,
  title,
  ...props
}) => {
  const [visibility, setVisibility] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      const currentTarget = e.currentTarget;
      // Dá tempo para o navegador focar no próximo elemento
      requestAnimationFrame(() => {
        // Verifica se o novo elemento focado é um filho do container original
        if (!currentTarget.contains(document.activeElement)) {
          setShow(false);
        }
      });
    },
    [setShow]
  );

  return (
    <div
      className="field"
      onFocus={() => setShow(true)}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <input
        className={value ? "has-value" : ""}
        title={title}
        type={visibility ? "text" : "password"}
        value={value}
        {...props}
      />
      {value &&
        show &&
        (visibility ? (
          <span className="visibility" onClick={() => setVisibility(false)}>
            <VisibilityIcon />
          </span>
        ) : (
          <span className="visibility" onClick={() => setVisibility(true)}>
            <VisibilityOffIcon />
          </span>
        ))}
    </div>
  );
};

export default InputPassword;

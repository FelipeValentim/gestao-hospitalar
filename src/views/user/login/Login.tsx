import { useState } from "react";
import "./Login.css"; // Importação do arquivo CSS
import { useDispatch } from "react-redux";
import { generateToken } from "../../../services/jwtService";
import { setToken } from "../../../helpers/storage";
import { setUser } from "../../../redux/user";
import { db } from "../../../database/dbContext";
import InputGroup from "../../../components/InputGroup";
import FormControl from "../../../components/FormControl";
import InputMask from "../../../components/InputMask";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";
import InputPassword from "../../../components/InputPassword";
import logo from "../../../assets/images/logo-texto.png";
import { toast } from "react-toastify";

const Login = () => {
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (cpf && password) {
      const paciente = await db.pacientes
        .filter((x) => x.cpf == cpf && x.senha == password)
        .first();
      if (paciente) {
        const token = await generateToken(paciente.id);
        setToken(token);
        dispatch(setUser(paciente.id));
      } else {
        toast.error("Usuário ou senha incorreta", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="auth">
      <div className="card">
        <h1>Bem-vindo</h1>
        <img src={logo} className="logo" title="logo" />
        <InputGroup>
          <FormControl placeholder="CPF">
            <InputMask
              mask={"999.999.999-99"}
              title="CPF"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value.replace(/[^\d]/g, ""))}
            ></InputMask>
          </FormControl>
          <FormControl placeholder="Senha">
            <InputPassword
              title="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></InputPassword>
          </FormControl>
        </InputGroup>
        <Button text={"Login"} title={"Login"} onClick={handleSubmit} />
        <div>
          Não tem uma conta? <Link to={"/user/register"}>Registre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

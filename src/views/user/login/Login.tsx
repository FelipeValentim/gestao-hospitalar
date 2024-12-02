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
      // Tenta encontrar um paciente
      const paciente = await db.pacientes
        .filter((x) => x.cpf == cpf && x.senha == password)
        .first();

      if (paciente) {
        // Usuário é um paciente
        const token = await generateToken(paciente.id, ["paciente"]);
        setToken(token);
        dispatch(setUser({ id: paciente.id, roles: ["paciente"] }));
      } else {
        // Caso não seja um paciente, tenta encontrar um médico
        const medico = await db.medicos
          .filter((x) => x.cpf == cpf && x.senha == password)
          .first();

        if (medico) {
          // Usuário é um médico
          const token = await generateToken(medico.id, ["medico"]);
          setToken(token);
          dispatch(setUser({ id: medico.id, roles: ["medico"] }));
        } else {
          // Caso nenhum seja encontrado, exibe erro
          toast.error("Usuário ou senha incorreta", {
            position: "top-right",
            autoClose: 5000,
          });
        }
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

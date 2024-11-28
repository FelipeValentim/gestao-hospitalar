import React, { useState } from "react";
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
        console.log("Usuário ou senha incorreto");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <h1>Bem-vindo</h1>
        <img src={logo} className="logo" title="logo" />
        <InputGroup>
          <FormControl placeholder="CPF">
            <InputMask
              mask={"999.999.999-00"}
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
          Não tem uma conta? <Link to={"/registrar"}>Registre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./Login.css"; // Importação do arquivo CSS
import InputMask from "react-input-mask";
import { useDispatch } from "react-redux";
import { generateToken } from "../../../services/jwtService";
import { setToken } from "../../../helpers/storage";
import { setUser } from "../../../redux/user";
import { db } from "../../../database/dbContext";

const Login = () => {
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="login-container">
      <h2>Bem-vindo de Volta!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <InputMask
          mask="999.999.999-99"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value.replace(/[^\d]/g, ""))}
          maskChar=""
        >
          {(inputProps) => <input {...inputProps} type="text" />}
        </InputMask>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        {/* <a href="#">Esqueceu sua senha?</a> */}
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./Login.css"; // Importação do arquivo CSS
import InputMask from "react-input-mask";
import { db } from "./database/dbContext";
import { generateToken } from "./services/jwtService";
import { setToken } from "./helpers/storage";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/user";

const Login = () => {
  const [cpf, setCpf] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(cpf);

    e.preventDefault();
    if (cpf && password) {
      const user = await db.usuarios
        .where("cpf")
        .equals(cpf)
        .and((x) => x.senha == password)
        .first();

      if (user) {
        const token = await generateToken(user);
        setToken(token);
        dispatch(setUser(user.id));
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

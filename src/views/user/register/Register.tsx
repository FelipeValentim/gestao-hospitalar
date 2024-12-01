import { useState } from "react";
import "./Register.css"; // Importação do arquivo CSS
import { db } from "../../../database/dbContext";
import InputGroup from "../../../components/InputGroup";
import FormControl from "../../../components/FormControl";
import InputMask from "../../../components/InputMask";
import Button from "../../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../../components/InputPassword";
import Input from "../../../components/Input";
import logo from "../../../assets/images/logo-texto.png";
import { phonePattern } from "../../../helpers/patterns";
import { Paciente } from "../../../models/Paciente";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    password: "",
    celular: "",
  });

  // Atualiza os campos dinamicamente
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { nome, cpf, password, celular } = formData;

    if (cpf && password && celular && nome) {
      if (phonePattern.test(celular) && cpf.length === 11) {
        const teste = await db.pacientes.where("cpf").equals(cpf).first();
        if (teste == undefined) {
          const paciente = new Paciente(
            cpf,
            nome,
            "paciente@exemplo.com",
            password,
            celular,
            "Rua Exemplo, 123",
            new Date(1990, 0, 1)
          );
          db.pacientes.add(paciente);
          toast.success("Usuário criado com sucesso!", {
            position: "top-left",
            autoClose: 5000,
          });
          setFormData({
            nome: "",
            cpf: "",
            password: "",
            celular: "",
          });
          navigate("/user/login");
        } else {
          toast.error("Já existe cadastro para este CPF!", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }
    } else {
      toast.warning("Por favor, preencha todos os campos.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="auth">
      <div className="card">
        <h1>Registre-se</h1>
        <img src={logo} className="logo" title="logo" />
        <InputGroup>
          <FormControl placeholder="Nome">
            <Input
              title="Nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            ></Input>
          </FormControl>
          <FormControl placeholder="CPF">
            <InputMask
              mask={"999.999.999-99"}
              title="CPF"
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cpf: e.target.value.replace(/[^\d]/g, ""),
                }))
              }
            ></InputMask>
          </FormControl>
          <FormControl placeholder="Celular">
            <InputMask
              mask={"(99) 99999-9999"}
              title="Celular"
              type="text"
              name="celular"
              value={formData.celular}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  celular: e.target.value,
                }))
              }
            ></InputMask>
          </FormControl>
          <FormControl placeholder="Senha">
            <InputPassword
              title="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></InputPassword>
          </FormControl>
        </InputGroup>
        <Button text={"Salvar"} title={"Salvar"} onClick={handleSubmit} />
        <div>
          Já possui uma conta? Faça o <Link to={"/user/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

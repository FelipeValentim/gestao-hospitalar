import { useEffect, useState } from "react";
import "./Horario.css"; // Certifique-se de importar o arquivo CSS
import { useSelector } from "react-redux";
import RootState from "../../../interfaces/RootState";
import { Disponibilidade } from "../../../models/Disponibilidade";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../../database/dbContext";
import { toast } from "react-toastify";
import Input from "../../../components/Input";
import Button from "../../../components/common/Button";

const Horario = () => {
  const [horarios, setHorarios] = useState<Array<Disponibilidade>>([]);
  const [horario, setHorario] = useState<string>("");
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getHorarios = async () => {
      if (user) {
        const data = await Disponibilidade.getHorarios(user.id);
        setHorarios(data);
      }
    };
    getHorarios();
  }, [user]);

  const deleteDisponibilidade = (id: number) => {
    if (horarios.length <= 1) {
      toast.error(
        "Não é possível deletar, deve haver pelo menos um horário disponível.",
        {
          position: "top-left",
          autoClose: 5000,
        }
      );
      return;
    }

    db.disponibilidades.delete(id);
    setHorarios(horarios.filter((x) => x.id !== id));
    toast.success("Horário deletado com sucesso", {
      position: "top-left",
      autoClose: 5000,
    });
  };

  const criarHorario = async () => {
    if (horario && user) {
      const exists = await db.disponibilidades
        .where("horario")
        .equals(horario)
        .first();

      if (exists) {
        toast.error("Este horário já existe.", {
          position: "top-left",
          autoClose: 5000,
        });
      } else {
        const horarioEntry = new Disponibilidade(horario, user.id);
        horarioEntry.criarHorario();
        toast.success("Horário criado com sucesso.", {
          position: "top-left",
          autoClose: 5000,
        });
        const newHorarios = [...horarios, horarioEntry].sort((a, b) =>
          a.horario.localeCompare(b.horario)
        );
        setHorarios(newHorarios);
        setHorario("");
      }
    }
  };

  return (
    <div className="container">
      <h2>Disponibilidade</h2>
      <div className="time-container">
        <Input
          type="time"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />
        <Button
          text={"Adicionar"}
          title={"Adicionar"}
          onClick={() => criarHorario()}
        />
      </div>
      <div className="disponibilidades">
        {horarios.map((disponibilidade) => (
          <div className="disponibilidade" key={disponibilidade.id}>
            <div className="card info">
              <span className="status">{disponibilidade.horario}</span>
            </div>
            <div
              className="card action"
              onClick={() => deleteDisponibilidade(disponibilidade.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Horario;

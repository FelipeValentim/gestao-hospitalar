import { useEffect, useState } from "react";
import { db } from "../../../database/dbContext";
import "./Home.css"; // Certifique-se de importar o arquivo CSS
import { Consulta } from "../../../models/Consulta";
import { useSelector } from "react-redux";
import RootState from "../../../interfaces/RootState";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
const Home = () => {
  const [consultas, setConsultas] = useState<Array<Consulta>>([]);
  const user = useSelector((state: RootState) => state.user);
  const formatDateTime = (dateTimeString: string): string => {
    const formattedString = dateTimeString.replace(" ", "T"); // ISO 8601 exige o 'T'
    const date = new Date(formattedString);

    // Verificar se a data é válida
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }

    // Extrair partes da data
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses começam em 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  };

  const deleteConsulta = (id: number) => {
    db.consultas.delete(id);
    setConsultas(consultas.filter((x) => x.id !== id));
    toast.success("Consulta deletada com sucesso", {
      position: "top-left",
      autoClose: 5000,
    });
  };

  useEffect(() => {
    const getConsultas = async () => {
      if (user) {
        const data = await Promise.all(
          (
            await db.consultas.where("pacienteId").equals(user).toArray()
          ).map(async (consulta) => {
            const horario = await db.horarios.get(consulta.horarioId);
            let medico;
            if (horario) {
              medico = await db.medicos.get(horario.medicoId);
            }
            return { ...consulta, horario, medico };
          })
        );

        setConsultas(data as Consulta[]);
      }
    };
    getConsultas();
  }, [user]);

  return (
    <div className="container">
      <h2>Consultas</h2>
      <div className="consultas">
        {consultas.map((consulta) => (
          <div className="consulta">
            <div key={consulta.id} className="card info">
              <span className="medico">{consulta.medico?.nome}</span>
              <span className="data">
                {formatDateTime(
                  `${consulta.data} ${consulta.horario?.horario}`
                )}
              </span>
              <span className="especialidade">
                {consulta.medico?.especialidade}
              </span>
            </div>
            <div
              className="card delete"
              onClick={() => deleteConsulta(consulta.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

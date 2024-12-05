import { useEffect, useState } from "react";
import "./Home.css"; // Certifique-se de importar o arquivo CSS
import { Consulta } from "../../../models/Consulta";
import { useSelector } from "react-redux";
import RootState from "../../../interfaces/RootState";
import { Medico } from "../../../models/Medico";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
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

  useEffect(() => {
    const getConsultas = async () => {
      if (user) {
        const data = await Medico.getConsultas(user.id);
        setConsultas(data);
      }
    };
    getConsultas();
  }, [user]);

  const realizar = async (consultaId: number) => {
    await Medico.realizaConsulta(consultaId);
    alterarStatus(consultaId, "Realizada");
  };

  const alterarStatus = (id: number, status: "Realizada" | "Cancelada") => {
    setConsultas(
      (prevConsultas) =>
        prevConsultas.map((consulta) =>
          consulta.id === id ? { ...consulta, status } : consulta
        ) as Consulta[]
    );
  };

  const cancelar = async (consultaId: number) => {
    await Medico.cancelaConsulta(consultaId);
    alterarStatus(consultaId, "Cancelada");
  };

  return (
    <div className="container">
      <h2>Consultas</h2>
      <div className="medico-consultas">
        {consultas.map((consulta) => (
          <div
            className={`consulta ${consulta.status.toLowerCase()}`}
            key={consulta.id}
          >
            <div className="card info">
              <span className="medico">{consulta.paciente?.nome}</span>
              <span className="data">
                {formatDateTime(`${consulta.data} ${consulta.horario}`)}
              </span>
              <span className="status">{consulta.status}</span>
            </div>
            {consulta.status === "Agendada" && (
              <>
                <div
                  className="card action"
                  onClick={() => realizar(consulta.id)}
                >
                  <DoneIcon />
                </div>
                <div
                  className="card action"
                  onClick={() => cancelar(consulta.id)}
                >
                  <ClearIcon />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

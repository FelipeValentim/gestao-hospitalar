import { useEffect, useState } from "react";
import { db } from "../../../database/dbContext";
import "./Home.css"; // Certifique-se de importar o arquivo CSS
import { Consulta } from "../../../models/Consulta";
import { useSelector } from "react-redux";
import RootState from "../../../interfaces/RootState";
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
        const data = await Promise.all(
          (
            await db.consultas.filter((x) => x.medicoId == user.id).toArray()
          ).map(async (consulta) => {
            const paciente = await db.pacientes.get(consulta.pacienteId);
            return { ...consulta, paciente };
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
          <div className="consulta" key={consulta.id}>
            <div className="card info">
              <span className="medico">{consulta.paciente?.nome}</span>
              <span className="data">
                {formatDateTime(`${consulta.data} ${consulta.horario}`)}
              </span>
              <span className="status">{consulta.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

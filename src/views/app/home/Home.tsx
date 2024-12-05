import { useEffect, useState } from "react";
import "./Home.css"; // Certifique-se de importar o arquivo CSS
import { Consulta } from "../../../models/Consulta";
import { useSelector } from "react-redux";
import RootState from "../../../interfaces/RootState";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Paciente } from "../../../models/Paciente";
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

  const deleteConsulta = async (id: number) => {
    const consulta = await Consulta.getConsulta(id);
    if (consulta?.status == "Agendada") {
      Consulta.delete(consulta.id);
      setConsultas(consultas.filter((x) => x.id !== id));
      toast.success("Consulta deletada com sucesso", {
        position: "top-left",
        autoClose: 5000,
      });
    } else {
      toast.error("Não é possível deletar consultas realizadas e canceladas.", {
        position: "top-left",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const getConsultas = async () => {
      if (user) {
        const data = await Paciente.getConsultas(user.id);

        setConsultas(data);
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
              <span className="medico">{consulta.medico?.nome}</span>
              <span className="data">
                {formatDateTime(`${consulta.data} ${consulta.horario}`)}
              </span>
              <span className="especialidade">
                {consulta.medico?.especialidade?.nome}
              </span>
              <span className="status">{consulta.status}</span>
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

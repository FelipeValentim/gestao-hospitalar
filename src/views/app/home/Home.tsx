import { useEffect, useState } from "react";
import { Medico } from "../../../models/Medico";
import { db } from "../../../database/dbContext";
import { Horario } from "../../../models/Horario";
import "./Home.css"; // Certifique-se de importar o arquivo CSS

const Home = () => {
  const [medicos, setMedicos] = useState<Array<Medico>>([]);
  const [medico, setMedico] = useState<Medico | null>(null);
  const [horarios, setHorarios] = useState<Array<Horario>>([]);

  const getMedicos = async () => {
    const data = await db.medicos.orderBy("especialidade").toArray();
    setMedicos(data);
  };

  const getHorarios = async () => {
    if (medico) {
      const data = await db.horarios
        .where("medicoId")
        .equals(medico.id)
        .toArray();
      setHorarios(data);
    }
  };

  useEffect(() => {
    getMedicos();
  }, []);

  useEffect(() => {
    getHorarios();
  }, [medico]);

  return (
    <div className="container">
      <h2>Médicos Disponíveis</h2>
      <div className="medico-list">
        {medicos.map((medico) => (
          <div
            key={medico.id}
            className="medico-card"
            onClick={() => setMedico(medico)}
          >
            <p>
              <strong>{medico.nome}</strong>
            </p>
            <p>{medico.especialidade}</p>
          </div>
        ))}
      </div>

      {medico && <div>{medico.nome}</div>}

      {medico && (
        <div className="horarios">
          <h2>Horários Disponíveis</h2>
          {horarios.length > 0 ? (
            horarios.map((horario) => (
              <div key={horario.id} className="horario-card">
                {horario.horario}
              </div>
            ))
          ) : (
            <p className="no-horarios">
              Selecione um médico para ver os horários.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

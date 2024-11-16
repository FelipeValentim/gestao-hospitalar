import { useEffect, useState } from "react";
import { Medico } from "../../../models/Medico";
import { db } from "../../../database/dbContext";
import { Horario } from "../../../models/Horario";
import "./Home.css"; // Certifique-se de importar o arquivo CSS

const Home = () => {
  const [medicos, setMedicos] = useState<Array<Medico>>([]);
  const [medico, setMedico] = useState<Medico | null>(null);
  const [horarios, setHorarios] = useState<Array<Horario>>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [horarioSelecionado, setHorarioSelecionado] = useState<Horario | null>(
    null
  );
  const [consulta, setConsulta] = useState({});

  const agendar = async () => {};

  const getMedicos = async () => {
    const data = await db.medicos.orderBy("especialidade").toArray();
    setMedicos(data);
  };

  const getHorarios = async () => {
    if (consulta.medico && consulta.data) {
      const data = await db.horarios
        .where("medicoId")
        .equals(consulta.medico.id)
        .toArray();

      setHorarios(data);
      setConsulta({ ...consulta, horario: null });
    }
  };

  const getMaxDate = () => {
    const hoje = new Date();
    hoje.setMonth(hoje.getMonth() + 1); // Adiciona 1 mês à data atual
    return hoje.toISOString().split("T")[0]; // Retorna a data no formato yyyy-mm-dd
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsulta({ ...consulta, data: e.target.value });
  };

  useEffect(() => {
    getMedicos();
  }, []);

  useEffect(() => {
    getHorarios();
  }, [consulta.medico, consulta.data]);

  return (
    <div className="container">
      <h2>Médicos Disponíveis</h2>
      <div className="medico-list">
        {medicos.map((medico) => (
          <div
            key={medico.id}
            className="medico-card"
            onClick={() => setConsulta({ medico })}
          >
            <p>
              <strong>{medico.nome}</strong>
            </p>
            <p>{medico.especialidade}</p>
          </div>
        ))}
      </div>

      {consulta.medico && (
        <div className="horarios">
          <h2>Horários Disponíveis</h2>

          {/* Seletor de data */}
          <div className="date-picker">
            <label htmlFor="data">Escolha o Dia:</label>
            <input
              type="date"
              id="data"
              name="data"
              value={consulta.data}
              onChange={handleDataChange}
              min={new Date().toISOString().split("T")[0]} // Impede a seleção de datas passadas
              max={getMaxDate()}
            />
          </div>

          {/* Exibição dos horários filtrados */}
          {horarios.length > 0 ? (
            horarios.map((horario) => (
              <div
                key={horario.id}
                onClick={() => setConsulta({ ...consulta, horario })}
                className="horario-card"
              >
                {horario.horario}
              </div>
            ))
          ) : (
            <p className="no-horarios">
              Selecione um médico e um dia para ver os horários.
            </p>
          )}
        </div>
      )}

      {consulta.horario && <button onClick={agendar}>Agendar</button>}
    </div>
  );
};

export default Home;

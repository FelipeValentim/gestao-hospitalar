import { useEffect, useState } from "react";
import { Medico } from "../../../models/Medico";
import { db } from "../../../database/dbContext";
import { Horario } from "../../../models/Horario";
import "./Home.css"; // Certifique-se de importar o arquivo CSS
import { Consulta } from "../../../models/Consulta";
import { useSelector } from "react-redux";
import RootState from "../../../interfaces/RootState";

// Definir a interface Consulta
interface ConsultaState {
  medicoId: number | null;
  data: string | null;
  horarioId: number | null;
}

const Home = () => {
  const [medicos, setMedicos] = useState<Array<Medico>>([]);
  const [horarios, setHorarios] = useState<Array<Horario>>([]);
  const [consulta, setConsulta] = useState<ConsultaState>({
    medicoId: null,
    data: null,
    horarioId: null,
  });
  const [consultas, setConsultas] = useState<Array<Consulta>>([]);
  const user = useSelector((state: RootState) => state.user);

  const agendar = async () => {
    if (consulta.data && consulta.horarioId && consulta.medicoId && user) {
      console.log(consulta, user);
      const consultaEntry = new Consulta(
        consulta.data,
        "Agendada",
        user,
        consulta.horarioId
      );
      await db.consultas.add(consultaEntry);
      setConsulta({
        medicoId: null,
        data: null,
        horarioId: null,
      });
      setHorarios([]);
    }
  };

  const getMedicos = async () => {
    const data = await db.medicos.orderBy("especialidade").toArray();
    setMedicos(data);
  };

  const getHorarios = async () => {
    if (consulta.medicoId && consulta.data) {
      const data = await db.horarios
        .where("medicoId")
        .equals(consulta.medicoId)
        .toArray();

      const consultas = await db.consultas
        .filter(
          (x) =>
            data.some((h) => h.id == x.horarioId) && x.data == consulta.data
        )
        .toArray();

      const horariosDisponiveis = data.filter(
        (h) => !consultas.some((x) => x.horarioId === h.id)
      );

      setHorarios(horariosDisponiveis);
      setConsulta({ ...consulta, horarioId: null }); // Limpa o horário ao mudar a data
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
    const getConsultas = async () => {
      const data = await Promise.all(
        (
          await db.consultas.toArray()
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
    };
    getConsultas();
  }, [consulta]);

  useEffect(() => {
    getHorarios();
  }, [consulta.medicoId, consulta.data]);

  return (
    <div className="container">
      <h2>Consultas</h2>
      {consultas.map((consulta) => (
        <div key={consulta.id}>
          <p>
            <strong>
              {consulta.medico?.nome} | {consulta.data} |{" "}
              {consulta.horario?.horario}
            </strong>
          </p>
        </div>
      ))}

      <h2>Médicos Disponíveis</h2>
      <div className="medico-list">
        {medicos.map((medico) => (
          <div
            key={medico.id}
            onClick={() => setConsulta({ ...consulta, medicoId: medico.id })}
            className={
              medico.id == consulta.medicoId
                ? "medico-card active"
                : "medico-card"
            }
          >
            <p>
              <strong>{medico.nome}</strong>
            </p>
            <p>{medico.especialidade}</p>
          </div>
        ))}
      </div>

      {consulta.medicoId && (
        <div className="horarios">
          <h2>Horários Disponíveis</h2>

          {/* Seletor de data */}
          <div className="date-picker">
            <label htmlFor="data">Escolha o Dia:</label>
            <input
              type="date"
              id="data"
              name="data"
              value={consulta.data || ""}
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
                onClick={() =>
                  setConsulta({ ...consulta, horarioId: horario.id })
                }
                className={
                  consulta.horarioId == horario.id
                    ? "horario-card active"
                    : "horario-card"
                }
              >
                {horario.horario}
              </div>
            ))
          ) : consulta.data ? (
            <p className="no-horarios">
              Sem horário disponivel para essa data e esse médico
            </p>
          ) : (
            <p className="no-horarios">
              Selecione um médico e um dia para ver os horários.
            </p>
          )}
        </div>
      )}

      {consulta.horarioId && <button onClick={agendar}>Agendar</button>}
    </div>
  );
};

export default Home;

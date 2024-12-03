import { useEffect, useState } from "react";
import { Medico } from "../../../models/Medico";
import { HorarioDisponibilidade } from "../../../models/HorarioDisponibilidade";
import { Consulta } from "../../../models/Consulta";
import { useSelector } from "react-redux";
import RootState from "../../../interfaces/RootState";
import "./Schedule.css"; // Certifique-se de importar o arquivo CSS
import { toast } from "react-toastify";
import Button from "../../../components/common/Button";
import { useNavigate } from "react-router-dom";

// Definir a interface Consulta
interface ConsultaState {
  medicoId: number | null;
  data: string | null;
  horarioDisponibilidade: HorarioDisponibilidade | null;
}

const Schedule = () => {
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState<Array<Medico>>([]);
  const [horarios, setHorarios] = useState<Array<HorarioDisponibilidade>>([]);
  const [consulta, setConsulta] = useState<ConsultaState>({
    medicoId: null,
    data: null,
    horarioDisponibilidade: null,
  });
  const user = useSelector((state: RootState) => state.user);

  const agendar = async () => {
    if (
      consulta.data &&
      consulta.horarioDisponibilidade &&
      consulta.medicoId &&
      user
    ) {
      const consultaEntry = new Consulta(
        consulta.data,
        consulta.horarioDisponibilidade.horario,
        "Agendada",
        user.id,
        consulta.medicoId
      );

      await consultaEntry.criarConsulta();

      setConsulta({
        medicoId: null,
        data: null,
        horarioDisponibilidade: null,
      });
      setHorarios([]);
      toast.success("Consulta agendada com sucesso", {
        position: "top-left",
        autoClose: 5000,
      });
      navigate("/");
    }
  };

  const getMedicos = async () => {
    const data = await Medico.getAll();
    setMedicos(data);
  };

  const getHorarios = async () => {
    if (consulta.medicoId && consulta.data) {
      const horarios = await Medico.getHorariosDisponiveis(
        consulta.medicoId,
        consulta.data
      );

      setHorarios(horarios);
      setConsulta({ ...consulta, horarioDisponibilidade: null }); // Limpa o horário ao mudar a data
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
  }, [consulta.medicoId, consulta.data]);

  return (
    <div className="container">
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
            <p>{medico.especialidade?.nome}</p>
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
                  setConsulta({ ...consulta, horarioDisponibilidade: horario })
                }
                className={
                  consulta.horarioDisponibilidade?.id == horario.id
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

      {consulta.horarioDisponibilidade && (
        <Button
          className="agendar mt-4"
          text={"Agendar"}
          title={"Agendar"}
          onClick={agendar}
        />
      )}
    </div>
  );
};

export default Schedule;

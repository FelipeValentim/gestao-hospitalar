import { Horario } from "./Horario";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export class Consulta {
  id!: number;
  data: string;
  status: "Agendada" | "Realizada" | "Cancelada";
  pacienteId: number;
  medicoId: number;
  medico?: Medico;
  horarioId: number;
  horario?: Horario;
  observacoes?: string | null;

  constructor(
    data: string,
    status: "Agendada" | "Realizada" | "Cancelada",
    pacienteId: number,
    medicoId: number,
    horarioId: number,
    observacoes?: string
  ) {
    this.data = data;
    this.status = status;
    this.pacienteId = pacienteId;
    this.medicoId = medicoId;
    this.horarioId = horarioId;
    this.observacoes = observacoes;
  }

  marcarConsulta(
    medico: Medico,
    paciente: Paciente,
    data: Date,
    observacoes: string,
    horario: Horario
  ): void {
    // Lógica para marcar uma consulta
    console.log(
      `Consulta marcada para o paciente ${paciente.telefone} com o médico ${medico.crm}, ${data}, ${horario.horario}, ${observacoes}`
    );
  }

  cancelarConsulta(consulta: Consulta): void {
    // Lógica para cancelar uma consulta
    consulta.status = "Cancelada";
    console.log("Consulta cancelada");
  }
}

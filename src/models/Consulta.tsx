import { db } from "../database/dbContext";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export class Consulta {
  id!: number;
  data: string;
  horario: string;
  status: "Agendada" | "Realizada" | "Cancelada";
  pacienteId: number;
  paciente?: Paciente;
  medicoId: number;
  medico?: Medico;
  observacoes?: string | null;

  constructor(
    data: string,
    horario: string,
    status: "Agendada" | "Realizada" | "Cancelada",
    pacienteId: number,
    medicoId: number,
    observacoes?: string
  ) {
    this.data = data;
    this.horario = horario;
    this.status = status;
    this.pacienteId = pacienteId;
    this.medicoId = medicoId;
    this.observacoes = observacoes;
  }

  async criarConsulta(): Promise<void> {
    await db.consultas.add(this);
  }

  cancelarConsulta(consulta: Consulta): void {
    // Lógica para cancelar uma consulta
    consulta.status = "Cancelada";
    console.log("Consulta cancelada");
  }
}

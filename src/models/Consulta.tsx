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

  static async getConsulta(consultaId: number): Promise<Consulta | undefined> {
    return await db.consultas.get(consultaId);
  }

  async criarConsulta(): Promise<void> {
    await db.consultas.add(this);
  }

  static async realizaConsulta(consultaId: number): Promise<void> {
    // Lógica para cancelar uma consulta
    const consulta = await this.getConsulta(consultaId);
    if (consulta) {
      consulta.status = "Realizada";
      await db.consultas.update(consulta.id, consulta);
    }
  }

  static async cancelaConsulta(consultaId: number): Promise<void> {
    const consulta = await this.getConsulta(consultaId);
    if (consulta) {
      consulta.status = "Cancelada";
      await db.consultas.update(consulta.id, consulta);
    }
  }
}

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

  constructor(
    data: string,
    horario: string,
    status: "Agendada" | "Realizada" | "Cancelada",
    pacienteId: number,
    medicoId: number
  ) {
    this.data = data;
    this.horario = horario;
    this.status = status;
    this.pacienteId = pacienteId;
    this.medicoId = medicoId;
  }

  static async getConsulta(consultaId: number): Promise<Consulta | undefined> {
    return await db.consultas.get(consultaId);
  }

  async criarConsulta(): Promise<void> {
    await db.consultas.add(this);
  }
  static async delete(id: number): Promise<void> {
    await db.consultas.delete(id);
  }
}

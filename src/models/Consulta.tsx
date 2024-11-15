import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export class Consulta {
  id!: number;
  data: Date;
  status: string;
  observacoes: string;
  pacienteId: number;
  medicoId: number;

  constructor(
    data: Date,
    status: string,
    observacoes: string,
    pacienteId: number,
    medicoId: number
  ) {
    this.data = data;
    this.status = status;
    this.observacoes = observacoes;
    this.pacienteId = pacienteId;
    this.medicoId = medicoId;
  }

  marcarConsulta(
    medico: Medico,
    paciente: Paciente,
    data: Date,
    observacoes: string
  ): void {
    // Lógica para marcar uma consulta
    console.log(
      `Consulta marcada para o paciente ${paciente.telefone} com o médico ${medico.crm}`
    );
  }

  cancelarConsulta(consulta: Consulta): void {
    // Lógica para cancelar uma consulta
    consulta.status = "Cancelada";
    console.log("Consulta cancelada");
  }
}

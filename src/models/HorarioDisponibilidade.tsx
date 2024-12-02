export class HorarioDisponibilidade {
  id!: number;
  medicoId: number;
  horario: string;

  constructor(horario: string, medicoId: number) {
    this.horario = horario;
    this.medicoId = medicoId;
  }
}

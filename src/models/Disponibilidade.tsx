import { db } from "../database/dbContext";

export class Disponibilidade {
  id!: number;
  medicoId: number;
  horario: string;

  constructor(horario: string, medicoId: number) {
    this.horario = horario;
    this.medicoId = medicoId;
  }

  async criarHorario(): Promise<void> {
    await db.disponibilidades.add(this);
  }

  static async getHorariosDisponiveis(
    medicoId: number,
    dataPretendida: string
  ): Promise<Disponibilidade[]> {
    const data = await db.disponibilidades
      .orderBy("horario")
      .filter((x) => x.medicoId == medicoId)
      .toArray();
    const consultas = await db.consultas
      .filter(
        (x) =>
          data.some((h) => h.horario == x.horario) && x.data == dataPretendida
      )
      .toArray();

    const horariosDisponiveis = data.filter(
      (h) => !consultas.some((x) => x.horario === h.horario)
    );

    return horariosDisponiveis;
  }

  static async getHorarios(medicoId: number): Promise<Disponibilidade[]> {
    const data = await db.disponibilidades
      .orderBy("horario")
      .filter((x) => x.medicoId == medicoId)
      .toArray();

    return data;
  }
}

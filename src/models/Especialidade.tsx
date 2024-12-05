import { db } from "../database/dbContext";

export class Especialidade {
  id!: number;
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }

  static async getAll(): Promise<Especialidade[]> {
    return await db.especialidades.toArray();
  }

  static async getEspecialidade(
    id: number
  ): Promise<Especialidade | undefined> {
    return await db.especialidades.get(id);
  }
}

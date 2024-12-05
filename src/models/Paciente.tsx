import { db } from "../database/dbContext";
import { Consulta } from "./Consulta";
import { Especialidade } from "./Especialidade";
import { Usuario } from "./Usuario";

export class Paciente extends Usuario {
  telefone: string;

  constructor(cpf: string, nome: string, senha: string, telefone: string) {
    super(cpf, nome, senha);
    this.telefone = telefone;
  }

  async criarConta(): Promise<void> {
    await db.pacientes.add(this);
  }

  static async getConsultas(pacienteId: number): Promise<Consulta[]> {
    const data = await Promise.all(
      (
        await db.consultas.where("pacienteId").equals(pacienteId).toArray()
      ).map(async (consulta) => {
        const medico = await db.medicos.get(consulta.medicoId);
        if (medico) {
          medico.especialidade = await Especialidade.getEspecialidade(
            medico.especialidadeId
          );
        }
        return { ...consulta, medico };
      })
    );

    return data as Consulta[];
  }

  static async login(
    cpf: string,
    password: string
  ): Promise<Paciente | undefined> {
    return await db.pacientes
      .filter((x) => x.cpf == cpf && x.senha == password)
      .first();
  }

  static async CPFExistente(cpf: string): Promise<boolean> {
    return (await db.pacientes.where("cpf").equals(cpf).count()) > 0;
  }
}

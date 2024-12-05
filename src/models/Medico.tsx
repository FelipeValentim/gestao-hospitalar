import { Usuario } from "./Usuario";
import { Especialidade } from "./Especialidade";
import { db } from "../database/dbContext";
import { Consulta } from "./Consulta";

export class Medico extends Usuario {
  especialidadeId: number;
  especialidade?: Especialidade;
  crm: string;

  constructor(
    cpf: string,
    nome: string,
    senha: string,
    especialidadeId: number,
    crm: string
  ) {
    // Chama o construtor da classe Usuario com os parâmetros necessários
    super(cpf, nome, senha);

    // Inicializa as propriedades específicas de Medico
    this.especialidadeId = especialidadeId;
    this.crm = crm;
  }

  static async getAll(): Promise<Medico[]> {
    return (await Promise.all(
      (
        await db.medicos.orderBy("especialidadeId").toArray()
      ).map(async (medico) => {
        const especialidade = await Especialidade.getEspecialidade(
          medico.especialidadeId
        );

        return { ...medico, especialidade };
      })
    )) as Medico[];
  }

  static async getConsultas(medicoId: number): Promise<Consulta[]> {
    return (await Promise.all(
      (
        await db.consultas.filter((x) => x.medicoId == medicoId).toArray()
      ).map(async (consulta) => {
        const paciente = await db.pacientes.get(consulta.pacienteId);
        return { ...consulta, paciente };
      })
    )) as Consulta[];
  }

  static async login(
    cpf: string,
    password: string
  ): Promise<Medico | undefined> {
    return await db.medicos
      .filter((x) => x.cpf == cpf && x.senha == password)
      .first();
  }

  static async realizaConsulta(consultaId: number): Promise<void> {
    // Lógica para cancelar uma consulta
    const consulta = await Consulta.getConsulta(consultaId);
    if (consulta) {
      consulta.status = "Realizada";
      await db.consultas.update(consulta.id, consulta);
    }
  }

  static async cancelaConsulta(consultaId: number): Promise<void> {
    const consulta = await Consulta.getConsulta(consultaId);
    if (consulta) {
      consulta.status = "Cancelada";
      await db.consultas.update(consulta.id, consulta);
    }
  }
}

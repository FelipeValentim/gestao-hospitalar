import { Usuario } from "./Usuario";
import { Especialidade } from "./Especialidade";
import { db } from "../database/dbContext";
import { HorarioDisponibilidade } from "./HorarioDisponibilidade";
import { Consulta } from "./Consulta";

export class Medico extends Usuario {
  especialidadeId: number;
  especialidade?: Especialidade;
  crm: string;

  constructor(
    cpf: string,
    nome: string,
    email: string,
    senha: string,
    especialidadeId: number,
    crm: string
  ) {
    // Chama o construtor da classe Usuario com os parâmetros necessários
    super(cpf, nome, email, senha);

    // Inicializa as propriedades específicas de Medico
    this.especialidadeId = especialidadeId;
    this.crm = crm;
  }

  static async getAll(): Promise<Medico[]> {
    return (await Promise.all(
      (
        await db.medicos.orderBy("especialidadeId").toArray()
      ).map(async (medico) => {
        const especialidade = await db.especialidades.get(
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

  static async getHorariosDisponiveis(
    medicoId: number,
    dataPretendida: string
  ): Promise<HorarioDisponibilidade[]> {
    const data = await db.horarios.where("medicoId").equals(medicoId).toArray();
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

  static async login(
    cpf: string,
    password: string
  ): Promise<Medico | undefined> {
    return await db.medicos
      .filter((x) => x.cpf == cpf && x.senha == password)
      .first();
  }
}

import Dexie from "dexie";
import { Usuario } from "../models/Usuario";
import { Paciente } from "../models/Paciente";
import { Medico } from "../models/Medico";
import { Consulta } from "../models/Consulta";
import { Receita } from "../models/Receita";
import { Horario } from "../models/Horario";

// Definindo a estrutura do banco de dados usando Dexie
class ClinicaDB extends Dexie {
  pacientes: Dexie.Table<Paciente, number>;
  medicos: Dexie.Table<Medico, number>;
  consultas: Dexie.Table<Consulta, number>;
  receitas: Dexie.Table<Receita, number>;
  horarios: Dexie.Table<Horario, number>;

  constructor() {
    super("ClinicaDB");

    this.version(1).stores({
      medicos: "++id, especialidade, crm, cpf, nome, email, senha",
      pacientes:
        "++id, telefone, endereco, dataNascimento, cpf, nome, email, senha",
      receitas: "++id, consultaId, prescricao",
      consultas: "++id, data, status, observacoes, pacienteId, medicoId",
      horarios: "++id, horario, medicoId",
    });

    this.pacientes = this.table("pacientes");
    this.medicos = this.table("medicos");
    this.consultas = this.table("consultas");
    this.receitas = this.table("receitas");
    this.horarios = this.table("horarios");

    this.initializeDefaultValues();
  }

  private async initializeDefaultValues() {
    const defaultCpf = "00000000000"; // CPF do usuário padrão
    const usuario = await this.pacientes
      .where("cpf")
      .equals(defaultCpf)
      .first();

    if (!usuario) {
      // Criando o paciente padrão vinculado ao usuário padrão
      const paciente = new Paciente(
        defaultCpf,
        "Paciente Padrão",
        "paciente@exemplo.com",
        "123",
        "123456789",
        "Rua Exemplo, 123",
        new Date(1990, 0, 1)
      );
      await this.pacientes.add(paciente);
    }

    // Dados dos médicos a serem criados, caso não existam
    const medicos = [
      {
        cpf: "11122233344",
        nome: "Dr. João Silva",
        email: "joao.silva@clinica.com",
        senha: "123",
        especialidade: "Cardiologia",
        crm: "CRM123456",
        horarios: ["12:00", "14:20", "15:00"], // Horários disponíveis
      },
      {
        cpf: "55566677788",
        nome: "Dra. Maria Oliveira",
        email: "maria.oliveira@clinica.com",
        senha: "123",
        especialidade: "Pediatria",
        crm: "CRM654321",
        horarios: ["14:00", "14:40", "15:20"], // Horários disponíveis
      },
    ];

    for (const medicoData of medicos) {
      const usuarioMedico = await this.medicos
        .where("cpf")
        .equals(medicoData.cpf)
        .first();

      if (!usuarioMedico) {
        // Criando o médico
        const medico = new Medico(
          medicoData.cpf,
          medicoData.nome,
          medicoData.email,
          medicoData.senha,
          medicoData.especialidade,
          medicoData.crm
        );
        const medicoId = await this.medicos.add(medico);

        for (const horario of medicoData.horarios) {
          const horarioEntry = new Horario(horario, medicoId);
          await this.horarios.add(horarioEntry);
        }
      }
    }
  }
}

// Instância do banco de dados
export const db = new ClinicaDB();

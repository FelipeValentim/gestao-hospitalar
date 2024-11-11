import Dexie from "dexie";
import { Usuario } from "../models/Usuario";
import { Paciente } from "../models/Paciente";
import { Medico } from "../models/Medico";
import { Consulta } from "../models/Consulta";
import { Receita } from "../models/Receita";

// Definindo a estrutura do banco de dados usando Dexie
class ClinicaDB extends Dexie {
  usuarios: Dexie.Table<Usuario, number>;
  pacientes: Dexie.Table<Paciente, number>;
  medicos: Dexie.Table<Medico, number>;
  consultas: Dexie.Table<Consulta, number>;
  receitas: Dexie.Table<Receita, number>;

  constructor() {
    super("ClinicaDB");

    this.version(1).stores({
      medicos: "++id, especialidade, crm, usuarioId",
      pacientes: "++id, telefone, endereco, dataNascimento, usuarioId",
      receitas: "++id, consultaId, prescricao",
      consultas: "++id, data, status, observacoes, pacienteId, medicoId",
      usuarios: "++id, cpf, nome, email, senha, tipo",
    });

    this.usuarios = this.table("usuarios");
    this.pacientes = this.table("pacientes");
    this.medicos = this.table("medicos");
    this.consultas = this.table("consultas");
    this.receitas = this.table("receitas");

    this.initializeDefaultValues();
  }

  private async initializeDefaultValues() {
    const defaultCpf = "00000000000"; // CPF do usuário padrão
    const usuario = await this.usuarios.where("cpf").equals(defaultCpf).first();

    if (!usuario) {
      // Criando o usuário padrão
      const usuarioDefault = new Usuario(
        defaultCpf,
        "Paciente Padrão",
        "paciente@exemplo.com",
        "123",
        "paciente"
      );
      const usuarioId = await this.usuarios.add(usuarioDefault);

      // Criando o paciente padrão vinculado ao usuário padrão
      const paciente = new Paciente(
        "123456789",
        "Rua Exemplo, 123",
        new Date(1990, 0, 1),
        usuarioId
      );

      await this.pacientes.add(paciente);
      console.log("Usuário e paciente padrão adicionados ao banco de dados.");
    }
  }
}

// Instância do banco de dados
export const db = new ClinicaDB();

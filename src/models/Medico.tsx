import { Usuario } from "./Usuario";
import { Consulta } from "./Consulta";
import { Especialidade } from "./Especialidade";

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

  atenderConsulta(consulta: Consulta): void {
    // Lógica para atendimento da consulta
    console.log(`${consulta.id}`);
  }

  verificarDisponibilidade(medico: Medico, data: Date): boolean {
    // Lógica para verificar a disponibilidade do médico
    console.log(`${medico.crm}, ${data}`);
    return true; // Suponha que está disponível para simplificação
  }

  criarConta(usuario: Usuario, medico: Medico): void {
    // Lógica para criar conta do médico
    console.log(`Conta criada para o médico ${usuario.nome}, ${medico.crm}`);
  }
}

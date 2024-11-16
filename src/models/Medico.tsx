import { Usuario } from "./Usuario";
import { Consulta } from "./Consulta";

export class Medico extends Usuario {
  especialidade: string;
  crm: string;

  constructor(
    cpf: string,
    nome: string,
    email: string,
    senha: string,
    especialidade: string,
    crm: string
  ) {
    // Chama o construtor da classe Usuario com os parâmetros necessários
    super(cpf, nome, email, senha);

    // Inicializa as propriedades específicas de Medico
    this.especialidade = especialidade;
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

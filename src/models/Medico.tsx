import { Usuario } from "./Usuario";
import { Consulta } from "./Consulta";

export class Medico {
  id!: number;
  especialidade: string;
  crm: string;
  usuarioId: number;

  constructor(especialidade: string, crm: string, usuarioId: number) {
    this.especialidade = especialidade;
    this.crm = crm;
    this.usuarioId = usuarioId;
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

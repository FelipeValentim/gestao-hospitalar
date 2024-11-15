import { Usuario } from "./Usuario";

export class Paciente {
  id!: number;
  telefone: string;
  endereco: string;
  dataNascimento: Date;
  usuarioId: number;

  constructor(
    telefone: string,
    endereco: string,
    dataNascimento: Date,
    usuarioId: number
  ) {
    this.telefone = telefone;
    this.endereco = endereco;
    this.dataNascimento = dataNascimento;
    this.usuarioId = usuarioId;
  }

  criarConta(usuario: Usuario, paciente: Paciente): void {
    // Lógica para criar uma conta de paciente
    console.log(`Conta criada para o paciente ${usuario.nome}`);
  }
}

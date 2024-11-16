import { Usuario } from "./Usuario";

export class Paciente extends Usuario {
  telefone: string;
  endereco: string;
  dataNascimento: Date;

  constructor(
    cpf: string,
    nome: string,
    email: string,
    senha: string,
    telefone: string,
    endereco: string,
    dataNascimento: Date
  ) {
    super(cpf, nome, email, senha);
    this.telefone = telefone;
    this.endereco = endereco;
    this.dataNascimento = dataNascimento;
  }

  criarConta(usuario: Usuario, paciente: Paciente): void {
    // Lógica para criar uma conta de paciente
    console.log(
      `Conta criada para o paciente ${usuario.nome}, ${paciente.endereco}`
    );
  }
}

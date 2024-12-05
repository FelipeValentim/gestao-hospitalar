export class Usuario {
  id!: number;
  cpf: string;
  nome: string;
  senha: string;

  constructor(cpf: string, nome: string, senha: string) {
    this.cpf = cpf;
    this.nome = nome;
    this.senha = senha;
  }
}

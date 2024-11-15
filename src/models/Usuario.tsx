export class Usuario {
  id!: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;

  constructor(
    cpf: string,
    nome: string,
    email: string,
    senha: string,
    tipo: string
  ) {
    this.cpf = cpf;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
  }

  login(usuario: Usuario): boolean {
    // Lógica de autenticação
    return this.email === usuario.email && this.senha === usuario.senha;
  }
}

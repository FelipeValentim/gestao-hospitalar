export class Receita {
  id!: number;
  prescricao: string;
  consultaId: number;

  constructor(prescricao: string, consultaId: number) {
    this.prescricao = prescricao;
    this.consultaId = consultaId;
  }

  gerarReceita(prescricao: string): void {
    console.log(`Receita gerada: ${prescricao}`);
  }
}

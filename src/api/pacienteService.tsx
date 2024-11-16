import { db } from "../database/dbContext";
import { Paciente } from "../models/Paciente";

export const getPacienteById = async (
  id: number
): Promise<Paciente | undefined> => {
  // Busca o usuário pelo CPF
  const paciente = await db.pacientes.where("usuarioId").equals(id).first();

  return paciente;
};

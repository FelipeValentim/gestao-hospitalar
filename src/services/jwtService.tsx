import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { Usuario } from "../models/Usuario";
import { ResponseMessage } from "../utils/ResponseMessage";

const SECRET_KEY = new TextEncoder().encode(
  "f61b1b0ea363f0176e95d296633235732df870ec2547acf1db93cee0268d6fa1 f61b1b0ea363f0176e95d296633235732df870ec2547acf1db93cee0268d6fa1"
); // Necessário ser um valor estático pois se não ficará gerando a todo momento e dará usuário inválido

export interface CustomJwtPayload extends JWTPayload {
  id: number;
}
export const generateToken = async (usuario: Usuario): Promise<string> => {
  const jwt = await new SignJWT({ id: usuario.id }) // Dados que você quer incluir no payload
    .setProtectedHeader({ alg: "HS256" }) // Define o algoritmo
    .setIssuedAt() // Define a hora de emissão
    .setExpirationTime("2h") // Tempo de expiração (ex.: 2 horas)
    .sign(SECRET_KEY); // Assina com a chave secreta

  return jwt;
};

export const decodeToken = async (token: string): Promise<ResponseMessage> => {
  try {
    // Decodifica e verifica o token
    const { payload } = await jwtVerify(token, SECRET_KEY); // Extrai o payload após a verificação

    const data = payload as CustomJwtPayload;

    return new ResponseMessage(200, data); // Retorna uma instância de TokenResponse com sucesso
  } catch {
    return new ResponseMessage(401, null, "Token inválido"); // Retorna uma instância de TokenResponse com sucesso
  }
};

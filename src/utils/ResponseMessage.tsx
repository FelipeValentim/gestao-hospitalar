import { CustomJwtPayload } from "../services/jwtService";

export class ResponseMessage {
  status: number;
  data?: CustomJwtPayload | null;
  message?: string;

  constructor(
    status: number,
    data?: CustomJwtPayload | null,
    message?: string
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

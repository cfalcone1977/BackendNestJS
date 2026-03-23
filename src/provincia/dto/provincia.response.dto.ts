import { Provincia } from "../entities/provincia.entity";

export interface ResponseDTO {
  code: number
  message: string
  data: Provincia[];
}
import { IGenerico } from "./IGenerico.ts";

export interface IUsuario extends IGenerico {
   email: string;
   senha: string;
}
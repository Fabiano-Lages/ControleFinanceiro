import { IGenerico } from "./IGenerico.ts";

export interface IUsuario extends IGenerico {
   emall: string;
   senha: string;
}
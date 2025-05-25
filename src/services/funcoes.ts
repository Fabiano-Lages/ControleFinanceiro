import { IGenerico } from "../interfaces/IGenerico.ts";

export const ordenaLista = (lista: IGenerico[]) => {
   lista.sort((a, b) => a.nome.localeCompare(b.nome));
};

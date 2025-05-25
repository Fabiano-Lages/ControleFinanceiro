import { IUsuario } from './IUsuario.ts';
import { IEstadoCorretora } from '../store/modulos/corretora/index.ts';

export interface IEstado {
   usuario: IUsuario,
   corretora: IEstadoCorretora
}
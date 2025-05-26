import { IUsuario } from './IUsuario.ts';
import { IEstadoCorretora } from '../store/modulos/corretora/index.ts';
import { IEstadoTipoInvestimento } from '../store/modulos/tipoinvestimento/index.ts';
import { IEstadoPapel } from '../store/modulos/papel/index.ts';

export interface IEstado {
   usuario: IUsuario,
   corretora: IEstadoCorretora,
   tipoInvestimento: IEstadoTipoInvestimento,
   papel: IEstadoPapel
}
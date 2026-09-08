import { IUsuario } from './IUsuario.ts';
import { IEstadoCorretora } from '../store/modulos/corretora/index.ts';
import { IEstadoTipoInvestimento } from '../store/modulos/tipoinvestimento/index.ts';
import { IEstadoPapel } from '../store/modulos/papel/index.ts';
import { IEstadoMoeda } from '../store/modulos/moeda/index.ts';
import { INotificacao } from './INotificacao.ts';

export interface IEstado {
   usuario: IUsuario,
   corretora: IEstadoCorretora,
   tipoInvestimento: IEstadoTipoInvestimento,
   papel: IEstadoPapel,
   moeda: IEstadoMoeda,
   notificacoes: INotificacao[]
}
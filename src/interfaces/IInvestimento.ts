import { IGenerico } from "./IGenerico.ts";
import { IPapel } from "./IPapel.ts";
import { IMovimento } from "./IMovimento.ts";
import { IHistoricoPreco } from "./IHistoricoPreco.ts";
import { IHistoricoDividendo } from "./IHistoricoDividendo.ts";
import { IHistoricoRendimento } from "./IHistoricoRendimento.ts";

export interface IInvestimento {
   id: number;
   corretora: IGenerico;
   papel: IPapel;
   tipo: IGenerico;
   moeda: IGenerico;
   quantidade: number;
   custoMedio: number;
   valorInvestido: number;
   valorLocal: number;
   taxa: number;
   valorReal: number;
   movimento: IMovimento[];
   historicoPreco: IHistoricoPreco[];
   historicoRendimentos: IHistoricoRendimento[],
   historicoDividendo: IHistoricoDividendo[]
};
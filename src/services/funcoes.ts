import { IGenerico } from "../interfaces/IGenerico.ts";
import { TipoNotificacao } from '../interfaces/INotificacao.ts';
import useNotificar from '../hooks/Notificador.ts';

export const ordenaLista = (lista: IGenerico[]) => {
   lista.sort((a, b) => a.nome.localeCompare(b.nome));
};

export const mensagem = (tipo : string, titulo : string, texto : string) : void => {
   const { notificar } = useNotificar();
   const erros : string[] = ["falha", "erro", "danger"];
   const tn = tipo.toLowerCase() == 'sucesso' 
                  ? 
                     TipoNotificacao.SUCESSO 
                  : 
                     (erros.find(err => err === tipo.toLowerCase()) != null 
                        ? 
                           TipoNotificacao.FALHA 
                        : 
                           TipoNotificacao.ATENCAO
                     );

   notificar(tn, titulo, texto);
};
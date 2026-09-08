import { TipoNotificacao } from "../interfaces/INotificacao.ts";
import { store } from "../store/index.ts";
import { Notificacao } from "../store/mutations.ts";

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
}

export default () : Notificador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) : void  => {
        store.commit(Notificacao.NOTIFICAR, {
            titulo,
            texto,
            tipo
        });
    };

    return({
        notificar
    });
};
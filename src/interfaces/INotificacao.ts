export enum TipoNotificacao {
    SUCESSO = 'success',
    FALHA = 'danger',
    ATENCAO = 'warning'
};

export interface INotificacao {
    id: number
    titulo: string
    texto: string,
    tipo: TipoNotificacao
};
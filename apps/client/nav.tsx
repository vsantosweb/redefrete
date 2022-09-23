import { ReactElement } from "react";

export type NavProps = {
    name: string,
    path: string,
    private: boolean,
    icon: ReactElement,
    visible: boolean,
    description?: string
}

const _nav: Array<NavProps> = [
    { name: 'Painel de Controle', path: '/', visible: false, icon: <i className="las la-trophy"></i>, private: true },
    {
        name: 'Veículos', path: '/veiculos', visible: true, icon: <i className={'las la-users'}></i>, private: true,
        description: 'Cadastre e gerencie seus veiculos'
    },
    {
        name: 'Escalas', path: '/#', visible: true, icon: <i className={'las la-users'}></i>, private: true,
        description: 'Gerencie suas escalas'

    },
    {
        name: 'Dados Bancários', path: '/#', visible: true, icon: <i className={'las la-users'}></i>, private: true,
        description: 'Vincule multiplas contas bancárias na sua conta redefrete'
    },
    {
        name: 'Extrato', path: '/#', visible: true, icon: <i className={'las la-users'}></i>, private: true,
        description: 'Veja seu extrato e relatórios'
    },
]

export default _nav
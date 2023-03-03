import { ReactElement } from "react"

export interface NavProps {
    name: string,
    path: string,
    private: boolean,
    icon: ReactElement,
    visible: boolean,
}

const _nav: Array<NavProps> = [
    { name: 'Dashboard', path: '/', icon: <i className={'las la-tachometer-alt'}></i>, private: true, visible: true },
    { name: 'Pre-Cadastros', path: '/pre-cadastros', icon: <i className="las la-poll-h"></i>, private: true, visible: true },
    { name: 'Contas de Usuários', path: '/drivers', icon: <i className={'las la-users'}></i>, private: true, visible: true },
    { name: 'Usuário', path: '/drivers/[id]', icon: <i className={'las la-users'}></i>, private: true, visible: false },
    { name: 'Contratos GR', path: '/contratos', icon: <i className={'las la-file-alt'}></i>, private: true, visible: true },
    
    // { name: 'Captação', path: '/captacao', icon: <i className="las la-bullhorn"></i>, private: true },
    // { name: 'Disputas', path: '/#', icon: <i className="las la-trophy"></i>, private: true },
    // { name: 'Escalas', path: '/#', icon: <i className={'las la-list'}></i>, private: true },
]

export default _nav
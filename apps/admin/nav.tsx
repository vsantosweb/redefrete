import { ReactElement } from "react"

export interface NavProps {
    name: string,
    path: string,
    private: boolean,
    icon: ReactElement
}

const _nav: Array<NavProps> = [
    { name: 'Dashboard', path: '/', icon: <i className={'las la-tachometer-alt'}></i>, private: true },
    { name: 'Motoristas', path: '/drivers', icon: <i className={'las la-users'}></i>, private: true },
    { name: 'Captação', path: '/captacao', icon: <i className="las la-bullhorn"></i>, private: true },
    
    // { name: 'Captação', path: '/captacao', icon: <i className="las la-bullhorn"></i>, private: true },
    // { name: 'Disputas', path: '/#', icon: <i className="las la-trophy"></i>, private: true },
    // { name: 'Escalas', path: '/#', icon: <i className={'las la-list'}></i>, private: true },
]

export default _nav
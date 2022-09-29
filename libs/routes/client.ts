
import { RouteProps } from "./route"

const routes: Array<RouteProps> = [
    { name: 'Painel de Controle',   path: '/',              private: true },
    { name: 'Veículos',             path: '/veiculos',      private: true },
    { name: 'Escalas',              path: '/#',             private: true },
    { name: 'Dados Bancários',      path: '/#',             private: true },
    { name: 'Extrato',              path: '/#',             private: true },
]

export default routes;
import React from 'react'
import Router, { useRouter } from 'next/router'
import { AuthEndpoints, authService } from './services';
import _nav, { NavProps } from './nav';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverAuthRepository } from '@redefrete/interfaces';

import routes from '@redefrete/client/routes';

type RouteGuard = {
    user: any,
    authorized: boolean,
    rendering: boolean
}

const RouteGuardContext = React.createContext<RouteGuard>({
    user: null,
    authorized: null,
    rendering: null,
});

const privatePaths = routes.filter((nav: NavProps) => nav.private).map(x => x.path);

const driverAuth = container.get<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH);

function RouteGuard({ children }) {

    const [authorized, setAuthorized] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<any>(false);
    const [rendering, setRendering] = React.useState<boolean>(true);
    const router = useRouter();

    React.useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath)

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setRendering(true)

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    const authCheck = async (url) => {

        const path = url.split('?')[0];

        return await driverAuth.session().then((user) => {

            if (user && router.pathname === AuthEndpoints.LOGIN) {
                router.push(`/`)
            }

            if (!user && privatePaths.includes(window.location.pathname)) {
                router.push('/minha-conta/login');
                setAuthorized(false);
                setUser({})

            } else { setAuthorized(true); setUser(user.data) }

            setRendering(false)

        }).catch(() => {

            setAuthorized(false);
            router.push('/minha-conta/login');
            setUser({});
            setRendering(false);
        })


    }


    if (rendering || (!authorized && window.location.pathname !== AuthEndpoints.LOGIN)) return null

    return <RouteGuardContext.Provider value={{ user, authorized, rendering, }}>{children}</RouteGuardContext.Provider>


}

export { RouteGuardContext, RouteGuard }
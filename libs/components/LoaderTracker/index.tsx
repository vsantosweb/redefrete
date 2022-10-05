import React from 'react';

import * as Loader from './styles';
import { Spinner } from '@chakra-ui/react';

type Props = { fill?: boolean, text?: string, isPromisse?: boolean, area?: string, children?: any, promisse: any }


function LoaderTracker({ children, text, fill, promisse, ...rest }: Props) {

    if (typeof promisse === 'boolean' && promisse) {
        return <Loader.Container fullContainer={true} {...rest}><Spinner color={'#fff'} size={'lg'} /> </Loader.Container>

        return <Loader.Container container={fill} {...rest}><Spinner /> <span>{text}</span> {children} </Loader.Container>
    }

    if (promisse === null || typeof promisse === 'undefined') {
        return <Loader.Container container={fill} {...rest}><Spinner /> </Loader.Container>

        return <Loader.Container container={fill} {...rest}><Spinner /> <span>{text}</span> </Loader.Container>
    }

    if (Array.isArray(promisse) && promisse.length === 0) {
        return <Loader.Container container={fill} {...rest}><Spinner /> </Loader.Container>

        return <Loader.Container container={fill} {...rest}><Spinner /> <span>{text}</span> </Loader.Container>
    }

    if (typeof promisse === 'object' && Object.keys(promisse).length === 0 && Object.getPrototypeOf(promisse) === Object.prototype) {
        return <Loader.Container container={fill} {...rest}><Spinner /> </Loader.Container>

        return <Loader.Container {...rest}><Spinner /> <span>{text}</span> </Loader.Container>
    }

    return children

}

export default LoaderTracker;
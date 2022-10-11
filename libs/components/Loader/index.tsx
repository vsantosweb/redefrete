import React from 'react';

import * as Styled from './styles';
import { Spinner } from '@chakra-ui/react';
import { usePromiseTracker } from 'react-promise-tracker';

type Props = { fill?: boolean, text?: string, isPromisse?: boolean, area?: string, children?: any, promisse?: any }


export function LoaderTracker({ children, text, fill, promisse, ...rest }: Props) {

    if (typeof promisse === 'boolean' && promisse) {
        return <Styled.Container fullContainer={true} {...rest}><Spinner color={'#fff'} size={'lg'} /> </Styled.Container>
    }

    if (promisse === null || typeof promisse === 'undefined') {
        return <Styled.Container container={fill} {...rest}><Spinner /> </Styled.Container>
    }

    if (Array.isArray(promisse) && promisse.length === 0) {
        return <Styled.Container container={fill} {...rest}><Spinner /> </Styled.Container>
    }

    if (typeof promisse === 'object' && Object.keys(promisse).length === 0 && Object.getPrototypeOf(promisse) === Object.prototype) {
        return <Styled.Container container={fill} {...rest}><Spinner /> </Styled.Container>
    }

    return children

}

export function Loader({ children, text, isPromisse, area, fill, ...rest }: Props ) {

    const { promiseInProgress } = usePromiseTracker({ area: area });
    
    if (isPromisse) {
        return promiseInProgress ? <Styled.Container fullScreen={fill} {...rest}><Spinner /> <span>{text}</span> </Styled.Container> : children
    }

    return <Styled.Container {...rest}><Spinner /> <span>{text}</span> </Styled.Container>

}

export default { LoaderTracker, Loader };
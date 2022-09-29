import React from 'react';

import * as Styled from './styles';
// import { usePromiseTracker } from 'react-promise-tracker';
import { Spinner } from '@chakra-ui/react';

type Props = { fill?: boolean, text?: string, isPromisse?: boolean, area?: string, children?: any, promisse: any }


function Loader({ children, text, fill, promisse, ...rest }: Props) {

    if (typeof promisse === 'boolean' && promisse) {

        return <Styled.Container container={fill} {...rest}><Spinner /> <span>{text}</span> </Styled.Container>
    }

    if (promisse === null || typeof promisse === 'undefined') {

        return <Styled.Container container={fill} {...rest}><Spinner /> <span>{text}</span> </Styled.Container>
    }

    if (Array.isArray(promisse) && promisse.length === 0) {
        return <Styled.Container container={fill} {...rest}><Spinner /> <span>{text}</span> </Styled.Container>
    }

    if (typeof promisse === 'object' && Object.keys(promisse).length === 0 && Object.getPrototypeOf(promisse) === Object.prototype) {

        return <Styled.Container {...rest}><Spinner /> <span>{text}</span> </Styled.Container>
    }

    return children

}

export default Loader;
import React from 'react'
import * as Styled from './styles';
import { Box, Link } from '@chakra-ui/react';
import ServiceHeader from '../../components/ServiceHeader';
import Image from 'next/image';

export default function AuthLayout({ children }) {
    return (
        <React.Fragment>
            <Styled.AuthContainer>

                <Styled.AuthWrapper>
                    <img src={'/redefrete.png'} width={"130px"} />
                    {children}
                    <Styled.AuthFooter>
                        <small>
                            Problemas para acessar? Entre em contato  <Link color={'secondary.50'} href="#" target="_blank"> suporte@redefrete.com.br</Link>
                        </small>
                        <hr />
                        <small>
                            Todos os direitos reservados.
                            Direitos autorais {new Date().getFullYear()} - redefrete.com.br®
                        </small>
                    </Styled.AuthFooter>
                </Styled.AuthWrapper>
            </Styled.AuthContainer>
        </React.Fragment>
    )
}
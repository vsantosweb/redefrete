import React from 'react'
import * as Styled from './styles';
import { Box, Link } from '@chakra-ui/react';
import ServiceHeader from '../../components/ServiceHeader';
import Image from 'next/image';

export default function AuthLayout({ children }) {
    return (
        <React.Fragment>
            <ServiceHeader />
            <Styled.AuthContainer>

                {/* <Styled.AuthBanner>
                    <Styled.AuthLeadTitle>
                        TRABALHE ENTREGANDO PEQUENOS PACOTES PARA OS MAIORES E-COMMERCES DO BRASIL
                    </Styled.AuthLeadTitle>
                    <Image width={600} height={600} src={'/mix/mail-sent.png'} />
                </Styled.AuthBanner> */}
                <Styled.AuthWrapper>
                    {children}
                    <Styled.AuthFooter>
                        <small>
                            Ao fazer login ou registrar uma conta na redefrete.com.br, confirmo que li e concordei com
                            <Link color={'secondary.50'} href="#" target="_blank"> Termos e condições</Link> e
                            <Link color={'secondary.50'} href="#" target="_blank"> Declaração de Privacidade </Link>
                            da redefrete.com.br
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
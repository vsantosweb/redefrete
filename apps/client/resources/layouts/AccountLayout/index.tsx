import React from 'react'
import * as Styled from './styles';
import Image from 'next/image';
import { IconButton } from '@chakra-ui/react';
import { authService } from '../../../services';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverAuthRepository } from '@redefrete/interfaces';


const driverAuth = container.get<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH);

export default function AccountLayout({ children, ...props }) {
    return (
        <Styled.AccountWrapper>
            <Styled.AccountHeader>
                <Styled.AccountHeaderWrapper>
                    <Styled.AccountHeaderBar>
                        <Styled.AccountLogoArea><img src={'/redefrete-white.png'} width={"130px"} /></Styled.AccountLogoArea>
                        <Styled.AccountNavigation>
                            <Styled.AccountNavItem>
                                <IconButton fontSize={'1.4em'} colorScheme={'blackAlpha'} variant={'outline'} borderRadius={'100%'} aria-label='profile' icon={<i className={'las la-user'}></i>} />
                            </Styled.AccountNavItem>
                            <a onClick={() => driverAuth.logout()}>Sair</a>
                        </Styled.AccountNavigation>
                    </Styled.AccountHeaderBar>

                    <Styled.AccountHeaderResmue>
                        <Styled.AccountResume>
                            <Styled.AccountResumeText>Balanço do mês</Styled.AccountResumeText>
                            <Styled.AccountResumeAmount>R$ 2.860,00</Styled.AccountResumeAmount>
                        </Styled.AccountResume>
                    </Styled.AccountHeaderResmue>
                </Styled.AccountHeaderWrapper>
            </Styled.AccountHeader>
            <Styled.Account>
            {children}
            </Styled.Account>
        </Styled.AccountWrapper>
    )
}
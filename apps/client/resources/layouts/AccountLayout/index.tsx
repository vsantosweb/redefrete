import React from 'react'
import * as Styled from './styles';
import Image from 'next/image';
import { Avatar, Button, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react';
import { authService } from '../../../services';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverAuthRepository } from '@redefrete/interfaces';
import { RouteGuardContext } from 'apps/client/RouteGuard';



const driverAuth = container.get<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH);


export default function AccountLayout({ children, ...props }) {

    const { user } = React.useContext(RouteGuardContext);
    return (
        <Styled.AccountWrapper>
            <Styled.AccountHeader>
                <Styled.AccountHeaderWrapper>
                    <Styled.AccountHeaderBar>
                        <Styled.AccountLogoArea><img src={'/redefrete.png'} width={"130px"} /></Styled.AccountLogoArea>
                        <Styled.AccountNavigation>
                            <Styled.AccountNavItem>
                                <Menu>
                                    <MenuButton>
                                        <Avatar as={'button'} bg={'secondary.500'} color={'#fff'} name={user.name} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuGroup title='Help'>
                                            <MenuItem onClick={() => driverAuth.logout()}>Sair</MenuItem>
                                        </MenuGroup>
                                    </MenuList>
                                </Menu>

                            </Styled.AccountNavItem>
                            {/* <a onClick={() => driverAuth.logout()}>Sair</a> */}
                        </Styled.AccountNavigation>
                    </Styled.AccountHeaderBar>
                </Styled.AccountHeaderWrapper>
                {/* <Styled.AccountHeaderResmue>
                    <Styled.AccountResume>
                        <Styled.AccountResumeText>Balanço do mês</Styled.AccountResumeText>
                        <Styled.AccountResumeAmount>R$ 2.860,00</Styled.AccountResumeAmount>
                    </Styled.AccountResume>
                </Styled.AccountHeaderResmue> */}
            </Styled.AccountHeader>
            <Styled.Account>
                {children}
            </Styled.Account>
        </Styled.AccountWrapper>
    )
}
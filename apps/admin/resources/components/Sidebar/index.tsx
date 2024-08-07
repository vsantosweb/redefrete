import { Badge } from '@chakra-ui/react';
import React from 'react'
import _nav from '../../../nav';

import * as Styled from './styles';
import { useRouter } from "next/router";
import Link from 'next/link';

function SidebarMenu() {

    const router = useRouter();

    return (
        <Styled.Sidebar>
            <Styled.SidebarInner>
                <Styled.SidebarHeader>
                    <div><img src={'/redefrete-white.png'} width={"130px"} /></div>

                </Styled.SidebarHeader>
                <Styled.SidebarContent>
                    <Styled.SidebarMenu>
                        <div>
                            {_nav.map(route => route.visible && <Styled.SidebarMenuItem key={route.path} active={router.pathname === route.path}>
                                <Link href={route.path}><div className={`innerItem`} >
                                    <div className={'icon-wrapper'}>
                                        <div className={'icon'}>{route.icon}</div>
                                    </div>
                                    <div className={'itemLink'}>{route.name}</div>
                                    {/* <Badge variant={'solid'}>6</Badge> */}
                                </div></Link>
                            </Styled.SidebarMenuItem>)}

                        </div>

                    </Styled.SidebarMenu>
                </Styled.SidebarContent>
            </Styled.SidebarInner>
        </Styled.Sidebar>
    )
}

export default React.memo(SidebarMenu)
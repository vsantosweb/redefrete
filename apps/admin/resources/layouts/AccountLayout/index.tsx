import React from 'react'
import * as Styled from './styles';
import Image from 'next/image';
import { IconButton } from '@chakra-ui/react';
import SidebarMenu from '../../components/Sidebar';
import PageHeader from '../../components/PageHeader';

export default function AccountLayout({ children, title }) {
    
    return (
        <Styled.Wrapper>
            <Styled.SideBar>
                <SidebarMenu />
            </Styled.SideBar>
            <Styled.AppWrapper>
                <PageHeader title={title} />
                <Styled.AppContent> {children}</Styled.AppContent>
            </Styled.AppWrapper>
        </Styled.Wrapper>
    )
}
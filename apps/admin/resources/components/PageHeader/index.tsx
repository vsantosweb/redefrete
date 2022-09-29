import { IconButton } from '@chakra-ui/react';
import { Router, useRouter } from 'next/router';
import React from 'react'
import { RouteGuardContext } from '../../../RouteGuard';
import { authService } from '../../../services';
import * as Styled from './styles';


const PageHeader = ({  title }) => {
    const router = useRouter();
    const { user } = React.useContext(RouteGuardContext);

    return (
        <Styled.PageHeaderWrapper>
            <Styled.PageHeaderContent>
                <Styled.HeaderMenu>
                    <Styled.HeaderMenuList>
                        <Styled.HeaderMenuListItem><strong>{user?.name} ({user?.email})</strong></Styled.HeaderMenuListItem>
                        <Styled.HeaderMenuListItem> <a href={'#'} onClick={() => authService.signOut()}>Sair</a> </Styled.HeaderMenuListItem>
                    </Styled.HeaderMenuList>
                </Styled.HeaderMenu>
            </Styled.PageHeaderContent>
            <Styled.PageHeaderInfo>
                <IconButton onClick={() => router.back()} variant={'outline'} size={'sm'} borderRadius={'50%'} aria-label={'go-back'} icon={<i className={'las la-arrow-left'}></i>} />
                <h3>{title}</h3>
            </Styled.PageHeaderInfo>
        </Styled.PageHeaderWrapper>
    );
}

export default React.memo(PageHeader)
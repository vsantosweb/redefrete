import * as Styled from './styles';
import { IconButton } from '@chakra-ui/react';
import Router from 'next/router';

export default function ViewLayout({ children, title }) {
    return (
        <Styled.AccountWrapper>
            <Styled.AccountHeaderWrapper>
                <Styled.AccountHeaderBar>
                    <IconButton onClick={() => Router.back()}
                        borderRadius={'100%'}
                        color={'black'}
                        variant={'ghost'}
                        aria-label={'backbar'}
                        icon={<i className={'las la-angle-left'}></i>}
                        />
                        <small style={{flex: 1}}>{title}</small>
                    <Styled.AccountLogoArea><img src={'/redefrete.png'} width={"130px"} /></Styled.AccountLogoArea>
                </Styled.AccountHeaderBar>
            </Styled.AccountHeaderWrapper>
            <Styled.ViewContent>
                {children}
            </Styled.ViewContent>
        </Styled.AccountWrapper>
    )
}
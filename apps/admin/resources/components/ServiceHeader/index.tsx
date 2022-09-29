import React from 'react'
import * as Styled from './styles';

export default function ServiceHeader(){
    return(
        <Styled.ServiceHeader>
            <Styled.ServiceHeaderLogoArea><img src={'/redefrete.png'} width={"130px"} /></Styled.ServiceHeaderLogoArea>
        </Styled.ServiceHeader>
    )
}
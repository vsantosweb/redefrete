import React from 'react';

import * as Styled from './styles';

export default function AccountApps() {
    return (
        <Styled.AccountAppsContainer>
            <Styled.AccountAppList>
                <Styled.AccountAppListItem>
                    <Styled.AccountAppTitle>Veiculos</Styled.AccountAppTitle>
                    <p>cadastre e gerencie seus veiculos</p>
                </Styled.AccountAppListItem>
                <Styled.AccountAppListItem>
                    <Styled.AccountAppTitle>Escalas</Styled.AccountAppTitle>
                    <p>cadastre e gerencie seus veiculos</p>
                </Styled.AccountAppListItem>
                <Styled.AccountAppListItem>
                    <Styled.AccountAppTitle>Extrato</Styled.AccountAppTitle>
                    <p>cadastre e gerencie seus veiculos</p>
                </Styled.AccountAppListItem>
                <Styled.AccountAppListItem>
                    <Styled.AccountAppTitle>Dados de pagamento</Styled.AccountAppTitle>
                    <p>cadastre e gerencie seus veiculos</p>
                </Styled.AccountAppListItem>
                <Styled.AccountAppListItem>
                    <Styled.AccountAppTitle>Relatórios</Styled.AccountAppTitle>
                    <p>cadastre e gerencie seus veiculos</p>
                </Styled.AccountAppListItem>
            </Styled.AccountAppList>
        </Styled.AccountAppsContainer>
    )
}
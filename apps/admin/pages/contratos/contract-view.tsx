import { Badge } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';

import * as Styled from './styles';

const fields = {
    "id": 'ID',
    "risk_manager": 'Gerente de Risco',
    "driver_partner_id": 'id',
    "external_id": "ID Controle",
    "ref": "Referência",
    "status": "Status",
    "issue_date": "Data de emissão",
    "expire_at": "Validade do Contrato",
    "requester_name": "Nome Solicitante",
    "requester_email": "Email Solcitante",
    "requester_phone": "Telefone Solicitante",
    "requester_document": "CPF/CNPJ Solicitante",
    "driver_name": "Nome do motorista",
    "driver_email": "Email do motorista",
    "driver_phone": "Telefone/Whatsapp",
    "driver_document_1": "CPF/CNPJ",
    "driver_gender": "Gênero",
    "driver_birthday": "Dt. Nascimento",
    "driver_address": "Endereço",
    "driver_zipcode": "CEP",
    "driver_licence_number": "CNH",
    "driver_licence_security_code": "Cód. CNH",
    "driver_licence_expire_at": "Validade",
    "driver_licence_first_licence_date": "Dt. Primeira Habilitação",
    "driver_licence_uf": "UF",
    "driver_licence_mother_name": "Nome da mãe",
    "vehicle_brand": "Marca",
    "vehicle_model": "Modelo",
    "vehicle_licence_plate": "Placa",
    "vehicle_licence_number": "RENAVAM",
    "created_at": "Criado em",
    'hubs': `Hub's Disponíveis`
}

export default function DriverContractView({ data }) {
    
    return (
        <Styled.Container>

            <Styled.DetailView>
                {Object.keys(data).map((item, key) => <Styled.DetailViewContent key={key}>
                    <Styled.DetailViewItem >
                        <Styled.DetailViewItemLabel>{fields[item]}</Styled.DetailViewItemLabel>
                        {
                            _.isArray(data[item]) ? data[item].map((item, key) =>
                                <Styled.DetailViewItemContent style={{display: 'inline-block'}} key={key}><Badge ml={2} colorScheme={'green'}>{item.name}</Badge></Styled.DetailViewItemContent>) :
                                <Styled.DetailViewItemContent>{data[item]}</Styled.DetailViewItemContent>
                        }

                    </Styled.DetailViewItem>
                </Styled.DetailViewContent>)}
            </Styled.DetailView>
        </Styled.Container>
    )
}
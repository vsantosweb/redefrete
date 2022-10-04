import React from 'react';
import suspenseResource from '../../suspenseResource';
import {  Input, Spinner, Stack, Link as ChakraLink, Box, Avatar } from '@chakra-ui/react';
import { Page } from '../_app';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { ICaptureLead } from '@redefrete/interfaces';
import { DataGrid } from '@redefrete/components';
import axios from 'axios';

const leads = container.get<ICaptureLead>(SERVICE_KEYS.CAPTURE_LEAD_REPOSITORY);



const columns: Array<IColumn> = [
    { name: 'id', header: 'id', defaultVisible: false },
    {
        name: 'name', header: 'Nome', defaultFlex: 2.6, render: ({ value, ...rest }) => <strong>{rest.data.name}</strong> 
      },
    { name: 'email', header: 'Email', defaultFlex: 1.3 },
    { name: 'phone', header: 'Telefone/Whatsapp', defaultFlex: 1.3 },
    { name: 'licence_plate', header: 'Placa do veículo', defaultFlex: 1 },
    { name: 'vehicle_type', header: 'Tipo de veículo', defaultFlex: 1 },
    { name: 'zipcode', header: 'CEP', defaultFlex: 1 },
    { name: 'created_at', header: 'Criado em', defaultFlex: 1 },
];

const CaptationLead: Page = () => {

    const [loading, setLoading] = React.useState(false);

    const loadData = ({ skip, sortInfo, limit }) => {
        return leads.get('?skip=' + skip + '&limit=' + limit )
          .then(response => {
            console.log(response, 'porraaaa')
            return { data:response.data, count: response.count };
          })
      }

      const dataSource = React.useCallback(loadData, [])

    return (
        <React.Suspense fallback={<Spinner />}>
            <Stack h={'100%'}>
                
                <DataGrid
                    pagination
                    columns={columns}
                    dataSource={dataSource}
                    onLoadingChange={setLoading}
                />
            </Stack>
        </React.Suspense>
    )
}

CaptationLead.config = { title: 'Captação', layout: 'AccountLayout' }

export default CaptationLead

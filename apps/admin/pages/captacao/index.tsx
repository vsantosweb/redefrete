import React from 'react';
import suspenseResource from '../../suspenseResource';
import {  Input, Spinner, Stack, Link as ChakraLink } from '@chakra-ui/react';
import { Page } from '../_app';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { ICaptureLead } from '@redefrete/interfaces';
import { DataGrid } from '@redefrete/components';

const leads = container.get<ICaptureLead>(SERVICE_KEYS.CAPTURE_LEAD_REPOSITORY);


const resource = suspenseResource(leads.get)

const columns: Array<IColumn> = [
    { name: 'id', header: 'id', defaultVisible: false },
    { name: 'name', header: 'Nome', defaultFlex: 2.6 },
    { name: 'phone', header: 'Telefone/Whatsapp', defaultFlex: 1.3 },
    { name: 'licence_plate', header: 'Placa do veículo', defaultFlex: 1 },
    { name: 'vehicle_type', header: 'Tipo de veículo', defaultFlex: 1 },
    { name: 'zipcode', header: 'CEP', defaultFlex: 1 },
    { name: 'created_at', header: 'Criado em', defaultFlex: 1 },
];

const CaptationLead: Page = () => {

    const [lead, setlead] = React.useState(resource.read());
    const [search, setSearch] = React.useState('');

    // const onSelectionChange = React.useCallback(({ data }) => { Router.push(`/lead/${data[0].id}`) }, [])

    const filterlead = search.length > 0 ? lead.filter(driver => driver.phone.includes(search)) : []

    return (
        <React.Suspense fallback={<Spinner />}>
            <Stack h={'100%'}>
                
                <DataGrid
                    // onSelectionChange={onSelectionChange}
                    columns={columns}
                    dataSource={search.length > 0 ? filterlead : lead || []}
                />
            </Stack>
        </React.Suspense>
    )
}

CaptationLead.config = { title: 'Captação', layout: 'AccountLayout' }

export default CaptationLead

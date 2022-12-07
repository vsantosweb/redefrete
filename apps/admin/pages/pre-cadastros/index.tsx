import React from 'react';
import suspenseResource from '../../suspenseResource';
import { Input, Spinner, Stack, Link as ChakraLink, Box, Avatar } from '@chakra-ui/react';
import { Page } from '../_app';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { ICaptureLead } from '@redefrete/interfaces';
import { DataGrid } from '@redefrete/components';
import axios from 'axios';
import { Badge, Button, InputPicker } from 'rsuite';

const leads = container.get<ICaptureLead>(SERVICE_KEYS.CAPTURE_LEAD_REPOSITORY);
import csvDownload from 'json-to-csv-export'
import _ from 'lodash';

interface CsvDownloadProps {
    data: any[];
    filename?: string;
    delimiter?: string;
    headers?: string[];
}

const columns: Array<IColumn> = [
    { name: 'id', header: 'id', defaultVisible: false },
    {
        name: 'name', header: 'Nome', defaultFlex: 1.8, render: ({ value, ...rest }) => <strong>{rest.data.name}</strong>
    },
    { name: 'email', header: 'Email', defaultFlex: 1.3 },
    { name: 'phone', header: 'Telefone/Whatsapp', defaultFlex: 1.3 },
    { name: 'licence_plate', header: 'Placa do veículo', defaultFlex: 1 },
    { name: 'vehicle_type', header: 'Tipo de veículo', defaultFlex: .7 },
    { name: 'zipcode', header: 'CEP', defaultFlex: 1 },
    { name: 'hub', header: 'HUB', defaultFlex: 1.4, render: ({ value, ...rest }) => <Badge color="violet" content={rest.data.hub} /> },
    { name: 'code', header: 'Código', defaultFlex: .6 },
    { name: 'company', header: 'Empresa', defaultFlex: 1 },
    {
        name: 'is_avaiable', header: 'Status', defaultFlex: 1, render: ({ value, ...rest }) => {
            return <strong style={{ color: rest.data.is_avaiable ? '#24b224' : 'red' }}>{!rest.data.is_avaiable ? 'Fora de area' : 'Disponível'}</strong>
        }
    },
    { name: 'created_at', header: 'Criado em', defaultFlex: 1 },
];



const CaptationLead: Page = () => {

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);

    const loadData = ({ skip, sortInfo, limit }) => {
        return leads.get('?skip=' + skip + '&limit=' + limit)
            .then(response => {
                setData(response.data)
                return { data: response.data, count: response.count };
            })
    }

    const dataSource = React.useCallback(loadData, [])

    const dataToConvert: CsvDownloadProps = {
        data: data,
        filename: 'pre-cadastros',
        delimiter: ',',
        headers: data.length > 0 && Object.keys(data[0])
    }

    console.log(Object.keys(_.groupBy(data, 'hub')))

    return (
        <React.Suspense fallback={<Spinner />}>
            <Stack h={'100%'}>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    {/* <InputPicker placeholder={'HUB'} data={Object.keys(_.groupBy(data, 'hub')).map(item => ({ label: item, value: item }))} /> */}
                    <Button appearance={'ghost'} onClick={() => csvDownload(dataToConvert)}>Exportar em CSV</Button>
                </div>

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

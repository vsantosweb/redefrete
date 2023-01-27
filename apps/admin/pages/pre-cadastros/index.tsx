import React from 'react';
import { Spinner, Stack, Link as ChakraLink, Input, Button, Select } from '@chakra-ui/react';
import { Page } from '../_app';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { ICaptureLead } from '@redefrete/interfaces';
import { DataGrid } from '@redefrete/components';
import { Badge } from 'rsuite';

import queryString from 'query-string';

const leads = container.get<ICaptureLead>(SERVICE_KEYS.CAPTURE_LEAD_REPOSITORY);
import csvDownload from 'json-to-csv-export'
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import hubs from './hubs.json';
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
    { name: 'phone', header: 'Telefone/Whatsapp', defaultFlex: 1 },
    { name: 'email', header: 'Email', defaultFlex: 1 },
    { name: 'vehicle_type', header: 'Tipo de veículo', defaultFlex: 1 },
    { name: 'city', header: 'Cidade', defaultFlex: 1 },
    { name: 'hub', header: 'HUB', defaultFlex: 1, render: ({ value, ...rest }) => <Badge color="violet" content={rest.data.hub} /> },
    { name: 'company', header: 'Empresa', defaultFlex: 1 },
    {
        name: 'is_avaiable', header: 'Status', defaultFlex: 1, render: ({ value, ...rest }) => {
            return <strong style={{ color: rest.data.is_avaiable ? '#24b224' : 'red' }}>{!rest.data.is_avaiable ? 'Fora de area' : 'Disponível'}</strong>
        }
    },
];


const CaptationLead: Page = () => {

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);

    const route = useRouter()

    const [filterData, setFilterData] = React.useState<string>(null)

    const filter = useForm();

    const loadData = ({ skip, sortInfo, limit }) => {
        return leads.get('?skip=' + skip + '&limit=' + limit + '&' + filterData)
            .then(response => {
                setData(response.data)
                return { data: response.data, count: response.count };
            })
    }

    const dataSource = React.useCallback(loadData, [filterData])

    const dataToConvert: CsvDownloadProps = {
        data: data,
        filename: 'pre-cadastros',
        delimiter: ',',
        headers: data.length > 0 && Object.keys(data[0])
    }

    const submitFilter = (formData) => {

        Object.keys(formData).map(data => formData[data] == '' && delete formData[data])
        setFilterData(queryString.stringify(formData))
    }
    return (
        <React.Suspense fallback={<Spinner />}>
            <Stack h={'100%'}>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <form onSubmit={filter.handleSubmit(submitFilter)}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <div>
                                <Input size={'md'} {...filter.register('zipcode')} placeholder="CEP" />
                            </div>

                            <div>
                                <Select {...filter.register('vehicle_type')} placeholder={'Tipo de Veículo'}>
                                    {['Carro', 'Moto', 'Caminhão'].map((item, key) => (<option key={key}>{item}</option>))}
                                </Select>
                            </div>

                            <div>
                                <Input size={'md'} type={'date'} {...filter.register('created_at')} placeholder="CEP" />
                            </div>

                            <div>
                                <Select {...filter.register('hub')} placeholder={'Hub'}>
                                    {hubs.map((item) => (<option key={item}>{item}</option>))}
                                </Select>
                            </div>
                            <div>
                                <Select {...filter.register('is_avaiable')} placeholder={'Status'}>
                                    {['Indisponível', 'Disponível'].map((item, index) => (<option value={index} key={index}>{item}</option>))}
                                </Select>
                            </div>
                            <div>
                                {filterData && <Button onClick={() => [setFilterData(null), filter.reset()]} rightIcon={<i className={'las la-times'}></i>}>Limpar</Button>}
                            </div>
                            <div>
                                <Button type={'submit'} colorScheme={'primary'}>Pesquisar</Button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <Button colorScheme={'primary'} variant={'outline'} onClick={() => csvDownload(dataToConvert)}>Exportar em CSV</Button>
                    </div>
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

CaptationLead.config = { title: 'Pré-Cadastros', layout: 'AccountLayout' }

export default CaptationLead

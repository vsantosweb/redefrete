import React from 'react';
import { Badge, Button, Input, Select, Spinner, Stack } from '@chakra-ui/react';
import { Page } from '../_app';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverContractRepository } from '@redefrete/interfaces';
import { DataGrid } from '@redefrete/components';
import { Drawer } from 'rsuite';
import queryString from 'query-string';

const driverContract = container.get<IDriverContractRepository>(SERVICE_KEYS.DRIVER_CONTRACT);
import csvDownload from 'json-to-csv-export'
import _ from 'lodash';
import DriverContractView from './contract-view';
import { useForm } from 'react-hook-form';

interface CsvDownloadProps {
    data: any[];
    filename?: string;
    delimiter?: string;
    headers?: string[];
}

const columns: Array<IColumn> = [
    { name: 'id', header: 'id', defaultFlex: .4 },  
    { name: 'risk_manager', header: 'GR', defaultFlex: 1, render: ({ value, ...rest }) => <Badge variant={'solid'} colorScheme={'blue'}>{rest.data.risk_manager}</Badge> },
    { name: 'ref', header: 'ref', defaultFlex: 1 },
    { name: 'status', header: 'Status', defaultFlex: 1 },
    { name: 'requester_name', header: 'Solicitante', defaultFlex: 1 },
    { name: 'driver_name', header: 'Motorista', defaultFlex: 1 },
    { name: 'driver_email', header: 'Email', defaultFlex: 1 },
    { name: 'driver_phone', header: 'Telefone', defaultFlex: 1 },
    { name: 'driver_licence_number', header: 'CNH', defaultFlex: 1 },
    { name: 'driver_licence_security_code', header: 'Cód. CNH', defaultFlex: 1 },
    { name: 'vehicle_licence_plate', header: 'Placa', defaultFlex: 1 },
    { name: 'created_at', header: 'Criado Em', defaultFlex: 1 },
];



const DriverContract: Page = () => {

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectRow, setSelectedRow] = React.useState<any>({});
    const [filterData, setFilterData] = React.useState<string>(null)

    const filter = useForm();

    const loadData = ({ skip, sortInfo, limit }) => {
        return driverContract.get('?skip=' + skip + '&limit=' + limit + '&' + filterData)
            .then(response => {
                setData(response.data)
                return { data: response.data, count: response.count };
            })
    }

    const dataSource = React.useCallback(loadData, [filterData])

    const onSelectionChange = React.useCallback(({ data }) => {
        setSelectedRow(data)
        setOpen(true)
    }, [])

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
                                <Input size={'md'} {...filter.register('driver_document_1')} placeholder="CPF/CNPJ" />
                            </div>

                            <div>
                                <Input size={'md'} {...filter.register('vehicle_licence_plate')} placeholder="Placa deo veículo" />
                            </div>

                            <div>
                                <Input size={'md'} type={'date'} {...filter.register('created_at')}  />
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
                    columns={columns}
                    dataSource={dataSource}
                    onLoadingChange={setLoading}
                    onSelectionChange={onSelectionChange}
                    enableSelection={true}
                    pagination
                />

            </Stack>

            <Drawer size={'full'} placement={'bottom'} open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>{selectRow?.driver_name}</Drawer.Title>

                </Drawer.Header>
                <Drawer.Body>
                    <DriverContractView data={selectRow} />
                </Drawer.Body>
            </Drawer>

        </React.Suspense>
    )
}

DriverContract.config = { title: 'Contratos de Motoristas', layout: 'AccountLayout' }

export default DriverContract

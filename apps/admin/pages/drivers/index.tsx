import React from 'react';
import suspenseResource from '../../suspenseResource';
import { Avatar, Box, Input, Spinner, Stack, Link as ChakraLink, Select, Button } from '@chakra-ui/react';
import { Page } from '../_app';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import Link from 'next/link';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverRepository } from '@redefrete/interfaces';
import { DataGrid } from '@redefrete/components';
import { useForm } from 'react-hook-form';
import csvDownload from 'json-to-csv-export';
import queryString from 'query-string';

const driverRepository = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);

interface CsvDownloadProps {
  data: any[];
  filename?: string;
  delimiter?: string;
  headers?: string[];
}


const columns: Array<IColumn> = [
  { name: 'id', header: 'id', defaultVisible: false },
  {
    name: 'name', header: 'Nome', defaultFlex: 2.6, render: ({ value, ...rest }) => {

      return <Box display={'flex'} alignItems={'center'} gap={'10px'}><Avatar size={'sm'} name={value} /><Link href={'/drivers/' + rest.data.id}><ChakraLink>{value} <strong>({rest.data.email})</strong></ChakraLink></Link></Box>
    }
  },
  { name: 'document_1', header: 'CPF/CNPJ', defaultFlex: 1 },
  { name: 'phone', header: 'Telefone/Whatsapp', defaultFlex: 1 },
  { name: 'status', header: 'Status', defaultFlex: 1 },
  { name: 'created_at', header: 'Criado em', defaultFlex: 1 },
];

const Driver: Page = () => {

  const [drivers, setDrivers] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [filterData, setFilterData] = React.useState<string>(null)
  const [loading, setLoading] = React.useState(false);
  const [driverStatuses, setDriverStatuses] = React.useState([]);

  const filter = useForm();

  // const onSelectionChange = React.useCallback(({ data }) => { Router.push(`/drivers/${data[0].id}`) }, [])

  const filterDrivers = search.length > 0 ? drivers.filter(driver => driver.document_1.includes(search)) : []


  const loadData = ({ skip, sortInfo, limit }) => {
    return driverRepository.list('?skip=' + skip + '&limit=' + limit + '&' + filterData)
      .then(response => {
        console.log(response)
        setDrivers(response.data)
        return { data: response.data, count: response.count };
      })
  }

  React.useEffect(() => {
    driverRepository.statusList().then(response => setDriverStatuses(response.data))
  }, [])

  const dataSource = React.useCallback(loadData, [filterData])

  const submitFilter = (formData) => {

    Object.keys(formData).map(data => formData[data] == '' && delete formData[data])
    setFilterData(queryString.stringify(formData))
  }

  // const dataToConvert: CsvDownloadProps = {
  //   data: drivers,
  //   filename: 'pre-cadastros',
  //   delimiter: ',',
  //   headers: drivers?.length > 0 && Object.keys(drivers[0])
  // }

  return (
    <Stack h={'100%'}>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
        <div>
          <Input name={'search'} onChange={e => setSearch(e.target.value)} placeholder='CPF do motorista' />
        </div>
        <form onSubmit={filter.handleSubmit(submitFilter)}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>

            <div>
              <Input size={'md'} type={'date'} {...filter.register('created_at')} placeholder="CEP" />
            </div>

            <div>
              <Select {...filter.register('driver_status_id')} placeholder={'Status'}>
                {driverStatuses.map((item, index) => (<option value={item.id} key={index}>{item.name}</option>))}
              </Select>
            </div>
            <div>
              {filterData && <Button onClick={() => [setFilterData(null), filter.reset()]} rightIcon={<i className={'las la-times'}></i>}>Limpar</Button>}
            </div>
            <div>
              <Button type={'submit'} rightIcon={<i className={'las la-filter'}></i>} colorScheme={'primary'}>Pesquisar</Button>
            </div>
          </div>
        </form>
        {/* <div>
            <Button colorScheme={'primary'} variant={'outline'} onClick={() => csvDownload(dataToConvert)}>Exportar em CSV</Button>
          </div> */}
      </div>

      <DataGrid
        pagination
        columns={columns}
        dataSource={search.length > 0 ? filterDrivers : dataSource || []}
        onLoadingChange={setLoading}
      />
    </Stack>
  )
}

Driver.config = { title: 'Conta de Usuários', layout: 'AccountLayout' }

export default Driver
